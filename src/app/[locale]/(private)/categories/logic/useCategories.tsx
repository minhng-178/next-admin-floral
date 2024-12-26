import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useBoolean } from "usehooks-ts";
import { useTranslations } from "next-intl";
import { ColumnDef } from "@tanstack/react-table";
import { ViewUtil } from "@/utils";
import { EActions } from "@/enums";
import { Category } from "@prisma/client";
import CategoryService from "@/services/category.service";
import { ActionsDropdown, DeleteDialog, Header } from "@/components/common";
import { CategoryCard, CategoryForm, categorySchema } from "@/modules";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type FormMappingValues = {
  title: string;
  children: React.ReactNode;
};

const useCategories = () => {
  const t = useTranslations();

  const {
    value: open,
    setTrue: setOpen,
    setFalse: setClose,
  } = useBoolean(false);
  const {
    value: fetching,
    setTrue: setFetching,
    setFalse: setFetched,
  } = useBoolean(false);
  const [actions, setActions] = useState<EActions>(EActions.CREATE);
  const [id, setId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { data: category, isLoading } = useQuery({
    queryKey: ["category", id],
    queryFn: () => CategoryService.detail(id?.toString() || ""),
    enabled: !!id,
  });

  const createCategoryMutation = useMutation({
    mutationFn: (data: z.infer<typeof categorySchema>) =>
      CategoryService.create(data),
    onMutate: () => {
      setFetching();
    },
    onError: () => {
      setFetched();
      toast.error(t("message.an-error-occurred"));
      onDismiss();
    },
    onSuccess: () => {
      setFetched();
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success(t("message.create-success"));
      onDismiss();
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: (data: z.infer<typeof categorySchema>) =>
      CategoryService.update(id?.toString() || "", data),
    onMutate: () => {
      setFetching();
    },
    onError: () => {
      setFetched();
      toast.error(t("message.an-error-occurred"));
      onDismiss();
    },
    onSuccess: () => {
      setFetched();
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success(t("message.update-success"));
      onDismiss();
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => CategoryService.delete(id),
    onMutate: () => {
      setFetching();
    },
    onError: () => {
      setFetched();
      toast.error(t("message.an-error-occurred"));
      onDismiss();
    },
    onSuccess: () => {
      setFetched();
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success(t("message.delete-success"));
      onDismiss();
    },
  });

  function onOpenChange(action: EActions, id?: string) {
    setId(id || "");
    setActions(action);
    setOpen();
  }

  function onDismiss() {
    setId(null);
    setClose();
  }

  async function onSubmit(data: z.infer<typeof categorySchema>) {
    if (actions === EActions.CREATE) {
      createCategoryMutation.mutate(data);
    }
    if (actions === EActions.UPDATE) {
      updateCategoryMutation.mutate(data);
    }
  }

  function formConfigMap(action: EActions): FormMappingValues {
    const mappingValues: Record<EActions, FormMappingValues> = {
      [EActions.CREATE]: {
        title: t("title.create-item"),
        children: (
          <CategoryForm
            submitting={fetching}
            onSubmit={onSubmit}
            onDismiss={onDismiss}
          />
        ),
      },
      [EActions.UPDATE]: {
        title: t("title.edit-item"),
        children: (
          <CategoryForm
            isLoading={isLoading}
            submitting={fetching}
            onSubmit={onSubmit}
            onDismiss={onDismiss}
            defaultValues={{
              name: category?.data?.name || "",
              id: category?.data?.id || "",
              description: category?.data?.description || null,
              createdAt: category?.data?.createdAt || new Date(),
              updatedAt: category?.data?.updatedAt || new Date(),
              status: category?.data?.status || false,
            }}
          />
        ),
      },
      [EActions.VIEW]: {
        title: t("title.view-item"),
        children: (
          <CategoryCard
            isLoading={isLoading}
            name={category?.data?.name || ""}
            description={category?.data?.description || ""}
            createdAt={category?.data?.createdAt?.toString() || ""}
          />
        ),
      },
      [EActions.DELETE]: {
        title: t("title.delete-item"),
        children: (
          <DeleteDialog
            submitting={fetching}
            onDismiss={onDismiss}
            onClick={() => deleteCategoryMutation.mutate(id?.toString() || "")}
          />
        ),
      },
    };
    return mappingValues[action];
  }

  const formConfig = formConfigMap(actions);

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Header
          column={column}
          title={ViewUtil.displayValue(t("title.name"))}
        />
      ),
      cell: ({ row }) => ViewUtil.displayValue(row.original.name),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <Header
          column={column}
          title={ViewUtil.displayValue(t("title.description"))}
        />
      ),
      cell: ({ row }) => ViewUtil.displayValue(row.original.description),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Header
          column={column}
          title={ViewUtil.displayValue(t("title.createAt"))}
        />
      ),
      cell: ({ row }) => ViewUtil.displayDate(row.original.createdAt),
    },
    {
      accessorKey: "actions",
      header: ViewUtil.displayValue(t("title.actions")),
      cell: ({ row }) => {
        return (
          <ActionsDropdown
            onView={() => onOpenChange(EActions.VIEW, row.original.id)}
            onEdit={() => onOpenChange(EActions.UPDATE, row.original.id)}
            onDelete={() => onOpenChange(EActions.DELETE, row.original.id)}
          />
        );
      },
    },
  ];

  const breadcrumb = [
    {
      title: t("common.categories"),
      url: "/categories",
    },
  ];

  return {
    open,
    actions,
    columns,
    fetching,
    breadcrumb,
    formConfig,
    isLoading,
    onOpenChange,
    onDismiss,
    onSubmit,
  };
};

export default useCategories;
