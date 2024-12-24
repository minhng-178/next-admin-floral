import { ViewUtil } from "@/utils";
import { Category } from "@prisma/client";
import { useTranslations } from "next-intl";
import { ColumnDef } from "@tanstack/react-table";
import { ActionsDropdown, Header } from "@/components/common";

const useCategories = () => {
  const t = useTranslations();

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
            onView={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
            onCopy={() =>
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
    columns,
    breadcrumb,
  };
};

export default useCategories;
