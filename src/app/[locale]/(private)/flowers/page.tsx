import { PostView, ResponsiveDialog } from "@/components/common";
import React from "react";
import { useFlowers } from "./logic";
import FlowerService from "@/services/flower.service";
import { EActions } from "@/enums";

export default function FlowersPage(): React.ReactElement {
  const { open, actions, columns, breadcrumb, onDismiss, onOpenChange } =
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
        // addConfig={{
        //   onClick: () => actions.onOpenChange(EActions.CREATE),
        // }}
        showRefresh
        showSearch
      />

      {/* <ResponsiveDialog
        title={formConfig.title}
        open={open}
        onDismiss={onDismiss}
      >
        {formConfig.children}
      </ResponsiveDialog> */}
    </>
  );
}
