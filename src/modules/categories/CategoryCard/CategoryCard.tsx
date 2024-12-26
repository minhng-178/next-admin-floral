import { Row } from "@/components/layout";
import { Spinner } from "@/components/ui/spinner";
import { ViewUtil } from "@/utils";
import { useTranslations } from "next-intl";
import React from "react";

interface CategoryCardProps {
  name?: string;
  description?: string;
  createdAt?: string;
  isLoading?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  const { name, description, createdAt, isLoading } = props;
  const t = useTranslations();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-3 border border-gray-200 p-4 rounded-lg">
      <Row label={t("title.name")} value={ViewUtil.displayValue(name)} />
      <Row
        label={t("title.description")}
        value={ViewUtil.displayValue(description)}
      />
      <Row
        label={t("title.createAt")}
        value={ViewUtil.displayDate(createdAt)}
      />
    </div>
  );
};

export default React.memo(CategoryCard);
