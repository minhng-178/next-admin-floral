"use client";

import React from "react";
import { EActions } from "@/enums";
import { useFlowers } from "./logic";
import FlowerService from "@/services/flower.service";
import { PostView, ResponsiveSheet } from "@/components/common";

export default function FlowersPage(): React.ReactElement {
  const { open, formConfig, columns, breadcrumb, onDismiss, onOpenChange } =
    useFlowers();

  return (
    <>
      <PostView
        columns={columns}
        queryConfig={{
          queryKey: ["flowers"],
          queryFn: FlowerService.list,
        }}
        breadcrumb={breadcrumb}
        showAdd
        addConfig={{
          onClick: () => onOpenChange(EActions.CREATE),
        }}
        showRefresh
        showSearch
      />

      <ResponsiveSheet
        title={formConfig.title}
        open={open}
        onDismiss={onDismiss}
      >
        {formConfig.children}
      </ResponsiveSheet>
    </>
  );
}
