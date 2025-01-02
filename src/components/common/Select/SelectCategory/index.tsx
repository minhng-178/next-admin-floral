import React from "react";
import { SelectQuery } from "@/components/common";
import CategoryService from "@/services/category.service";

interface SelectCategoryProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const SelectCategory: React.FC<SelectCategoryProps> = (props) => {
  const { placeholder, value, onChange } = props;
  return (
    <SelectQuery
      queryConfig={{
        queryKey: "categories",
        queryFn: CategoryService.list,
      }}
      defaultValue={value}
      placeholder={placeholder}
      itemLabelKey="name"
      itemValueKey="id"
      onValueChange={onChange}
      mode="single"
    />
  );
};

export default React.memo(SelectCategory);
