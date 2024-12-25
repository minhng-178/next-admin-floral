import {
  Eye,
  MoreHorizontal,
  Pencil,
  FileSpreadsheet,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface ActionsDropdownProps {
  id?: string;
  allowCopy?: boolean;
  allowView?: boolean;
  onView: () => void;
  allowEdit?: boolean;
  onEdit: () => void;
  allowDelete?: boolean;
  onDelete: () => void;
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({
  id,
  allowCopy,
  allowView = true,
  allowEdit = true,
  allowDelete = true,
  onView,
  onEdit,
  onDelete,
}) => {
  const t = useTranslations();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {allowCopy && (
          <>
            <DropdownMenuItem
              onClick={() =>
                toast(t("title.copied-to-clipboard")) &&
                navigator.clipboard.writeText(id?.toString() || "")
              }
            >
              <FileSpreadsheet className="h-4 w-4 mr-1" />
              {t("common.copy")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        {allowView && (
          <DropdownMenuItem onClick={onView}>
            <Eye className="h-4 w-4 mr-1" />
            {t("common.view")}
          </DropdownMenuItem>
        )}
        {allowEdit && (
          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="h-4 w-4 mr-1" />
            {t("common.edit")}
          </DropdownMenuItem>
        )}
        {allowDelete && (
          <DropdownMenuItem onClick={onDelete}>
            <Trash className="h-4 w-4 mr-1" />
            {t("common.delete")}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default React.memo(ActionsDropdown);
