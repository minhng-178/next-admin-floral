import { Spinner } from "@/components/ui/spinner";
import { ViewUtil } from "@/utils";
import React from "react";

interface CategoryCardProps {
  name?: string;
  description?: string;
  createdAt?: string;
  isLoading?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  const { name, description, createdAt, isLoading } = props;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="bg-white p-4">
      <h1 className="text-xl font-bold">{ViewUtil.displayValue(name)}</h1>
      <p className="text-gray-500">{ViewUtil.displayValue(description)}</p>
      <p>{ViewUtil.displayDate(createdAt)}</p>
    </div>
  );
};

export default React.memo(CategoryCard);
