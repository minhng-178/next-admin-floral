"use client";

import React from "react";
import { useCategories } from "./logic";
import { PostView, ResponsiveDialog } from "@/components/common";
import CategoryService from "@/services/category.service";
import { CategoryForm } from "./ui";

export default function CategoriesPage(): React.ReactElement {
  const { open, columns, breadcrumb, onOpenChange, onDismiss, onSubmit } =
    useCategories();

  return (
    <>
      <PostView
        columns={columns}
        breadcrumb={breadcrumb}
        queryConfig={{
          queryKey: ["categories"],
          queryFn: CategoryService.list,
        }}
        showAdd
        addConfig={{
          onClick: onOpenChange,
        }}
        showSearch
        showRefresh
      />

      <ResponsiveDialog
        title="Add Category"
        open={open}
        onOpenChange={onOpenChange}
      >
        <CategoryForm onSubmit={onSubmit} onDismiss={onDismiss} />
      </ResponsiveDialog>
    </>
  );
}
