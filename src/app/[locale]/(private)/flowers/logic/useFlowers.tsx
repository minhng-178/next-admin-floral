import { ActionsDropdown, DeleteDialog, Header } from "@/components/common";
import { EActions } from "@/enums";
import { useUploadFile } from "@/hooks";
import { FlowerCard, FlowerForm, flowerSchema } from "@/modules";
import FlowerService from "@/services/flower.service";
import { ViewUtil } from "@/utils";
import { AttachmentType, Flower, Image } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { FormMappingValues } from "form-types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";
import { CloudinaryResponse } from "upload";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";

const useFlowers = () => {
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
  const { isUploading, progresses, uploadedFiles, onUpload } = useUploadFile({
    defaultUploadedFiles: [],
  });

  const { data: flower, isLoading } = useQuery({
    queryKey: ["flower", id],
    queryFn: () => FlowerService.detail(id?.toString() || ""),
    enabled: !!id,
  });

  const createFlowerMutation = useMutation({
    mutationFn: (data: z.infer<typeof flowerSchema>) =>
      FlowerService.create(data),
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
        queryKey: ["flowers"],
      });
      toast.success(t("message.create-success"));
      onDismiss();
    },
  });

  const updateFlowerMutation = useMutation({
    mutationFn: (data: z.infer<typeof flowerSchema>) =>
      FlowerService.update(id || "", data),
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
        queryKey: ["flowers"],
      });
      toast.success(t("message.update-success"));
      onDismiss();
    },
  });

  const deleteFlowerMutation = useMutation({
    mutationFn: (id: string) => FlowerService.delete(id),
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
        queryKey: ["flowers"],
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

  async function onSubmit(data: z.infer<typeof flowerSchema>) {
    const images: Image[] = [];

    onUpload(data?.images || []);
    if (uploadedFiles) {
      const formatImages = uploadedFiles?.map((image: CloudinaryResponse) => {
        return {
          id: image.public_id,
          url: image.secure_url,
          type: AttachmentType.IMAGE,
          altText: image.original_filename,
          status: true,
        };
      });
      images.push(...formatImages);
    }

    if (actions === EActions.CREATE) {
      createFlowerMutation.mutate(data);
    } else {
      updateFlowerMutation.mutate(data);
    }
  }

  function formConfigMap(action: EActions): FormMappingValues {
    const mappingValues: Record<EActions, FormMappingValues> = {
      [EActions.CREATE]: {
        title: t("title.create-item"),
        children: (
          <FlowerForm
            submitting={fetching || isUploading}
            progresses={progresses}
            uploadedFiles={uploadedFiles}
            onSubmit={onSubmit}
            onDismiss={onDismiss}
          />
        ),
      },
      [EActions.UPDATE]: {
        title: t("title.edit-item"),
        children: (
          <FlowerForm
            isLoading={isLoading}
            submitting={fetching || isUploading}
            progresses={progresses}
            uploadedFiles={uploadedFiles}
            onSubmit={onSubmit}
            onDismiss={onDismiss}
            defaultValues={{
              id: flower?.data?.id || "",
              name: flower?.data?.name || "",
              description: flower?.data?.description || "",
              price: flower?.data?.price || 0,
              stock: flower?.data?.stock || 0,
              createdAt: flower?.data?.createdAt || new Date(),
              updatedAt: flower?.data?.updatedAt || new Date(),
              status: flower?.data?.status || false,
              categoryId: flower?.data?.categoryId || "",
            }}
          />
        ),
      },
      [EActions.VIEW]: {
        title: t("title.view-item"),
        children: (
          <FlowerCard
          // isLoading={isLoading}
          // name={category?.data?.name || ""}
          // description={category?.data?.description || ""}
          // createdAt={category?.data?.createdAt?.toString() || ""}
          />
        ),
      },
      [EActions.DELETE]: {
        title: t("title.delete-item"),
        children: (
          <DeleteDialog
            submitting={fetching}
            onDismiss={onDismiss}
            onClick={() => deleteFlowerMutation.mutate(id?.toString() || "")}
          />
        ),
      },
    };
    return mappingValues[action];
  }

  const formConfig = formConfigMap(actions);

  const columns: ColumnDef<Flower>[] = [
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
      title: t("common.flowers"),
      url: "/flowers",
    },
  ];

  return {
    open,
    actions,
    columns,
    fetching,
    breadcrumb,
    formConfig,
    onOpenChange,
    onDismiss,
  };
};

export default useFlowers;
