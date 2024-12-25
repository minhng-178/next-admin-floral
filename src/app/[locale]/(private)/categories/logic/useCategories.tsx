import { ViewUtil } from "@/utils";
import { Category } from "@prisma/client";
import { useTranslations } from "next-intl";
import { ColumnDef } from "@tanstack/react-table";
import { ActionsDropdown, Header } from "@/components/common";
import { toast } from "sonner";
import { useState } from "react";
import { z } from "zod";
import { categorySchema } from "../ui";

const useCategories = () => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const onOpenChange = () => setOpen(!open);
  const onDismiss = () => setOpen(false);
  async function onSubmit(data: z.infer<typeof categorySchema>) {
    console.log(data);
    onDismiss();
  }

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
            allowCopy
            onView={() => {}}
            onEdit={onOpenChange}
            onDelete={() => {}}
            onCopy={() =>
              toast(t("title.copied-to-clipboard")) &&
              navigator.clipboard.writeText(row.original.id?.toString() || "")
            }
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
    columns,
    breadcrumb,
    onOpenChange,
    onDismiss,
    onSubmit,
  };
};

export default useCategories;
