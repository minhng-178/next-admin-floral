import { ActionsDropdown, Header } from "@/components/common";
import { EActions } from "@/enums";
import { ViewUtil } from "@/utils";
import { Flower } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useBoolean } from "usehooks-ts";

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

  function onOpenChange(action: EActions, id?: string) {
    setId(id || "");
    setActions(action);
    setOpen();
  }

  function onDismiss() {
    setId(null);
    setClose();
  }

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
    onOpenChange,
    onDismiss,
  };
};

export default useFlowers;
