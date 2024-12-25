"use client";

import React from "react";
import { EActions } from "@/enums";
import { useCategories } from "./logic";
import CategoryService from "@/services/category.service";
import { PostView, ResponsiveDialog } from "@/components/common";

export default function CategoriesPage(): React.ReactElement {
  const { open, columns, formConfig, breadcrumb, onOpenChange, onDismiss } =
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
          onClick: () => onOpenChange(EActions.CREATE),
        }}
        showSearch
        showRefresh
      />

      <ResponsiveDialog
        title={formConfig.title}
        open={open}
        onDismiss={onDismiss}
      >
        {formConfig.children}
      </ResponsiveDialog>
    </>
  );
}
