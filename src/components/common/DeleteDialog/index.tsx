import { Button } from "@/components/ui/button";

import { useTranslations } from "next-intl";
import React from "react";

interface DeleteDialogProps {
  onClick: () => void;
  onDismiss: () => void;
  submitting: boolean;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  onClick,
  onDismiss,
  submitting,
}) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-bold">{t("title.are-you-sure")}</h2>
        <p>{t("common.cannot-be-undone")}</p>
      </div>
      <div className="flex w-full mt-4">
        <Button
          type="button"
          variant={"secondary"}
          onClick={onDismiss}
          className="w-auto md:w-full mr-2"
        >
          {t("title.cancel")}
        </Button>
        <Button
          onClick={onClick}
          disabled={submitting}
          className="w-auto md:w-full"
        >
          {t("title.confirm")}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(DeleteDialog);
