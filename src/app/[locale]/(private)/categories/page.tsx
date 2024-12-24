"use client";

import React from "react";
import { useCategories } from "./logic";
import { PostView } from "@/components/common";
import CategoryService from "@/services/category.service";

export default function CategoriesPage(): React.ReactElement {
  const { columns, breadcrumb } = useCategories();

  return (
    <PostView
      columns={columns}
      breadcrumb={breadcrumb}
      queryConfig={{
        queryKey: ["categories"],
        queryFn: CategoryService.list,
      }}
      showAdd
      showSearch
      showRefresh
    />
  );
}
