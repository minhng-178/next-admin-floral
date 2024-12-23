"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable, Search } from "@/components/common";
import { FilterOption } from "base-models";
import { useTranslations } from "next-intl";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface BreadCrumb {
  title: string;
  url: string;
}

export interface ExtraButtonProps {
  key?: string;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface PostViewProps {
  breadcrumb: BreadCrumb[];
  columns: ColumnDef<any, any>[];
  data: any[];
  title?: React.ReactNode;
  extraLeft?: React.ReactNode;
  extraButtons?: ExtraButtonProps[];
  showSearch?: boolean;
  searchConfig?: {
    placeholder?: string;
    delay?: number;
  };
  showRefresh?: boolean;
  refreshConfig?: object;
  showFilter?: boolean;
  filterConfig?: {
    default?: any;
    options: FilterOption[];
    title?: string;
  };
  showSetting?: boolean;
  settingConfig?: object;
  showAdd?: boolean;
  addConfig?: {
    text?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    customRender?: React.ReactNode;
  };
}

export function PostView({
  breadcrumb,
  columns,
  data,
  showAdd,
  showSearch,
  showRefresh,
  addConfig,
  searchConfig,
}: PostViewProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-col h-full">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex justify-between items-center w-full px-4">
          <div className="flex items-center gap-2 px-4">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumb.map((item, index) => (
                  <BreadcrumbItem key={index}>
                    <BreadcrumbLink href={item.url}>
                      {item.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            {showSearch && (
              <Search
                placeholder={searchConfig?.placeholder || t("common.search")}
              />
            )}

            {showRefresh && (
              <RotateCcw
                className="cursor-pointer text-neutral-500 h-5 w-5"
                onClick={() => {}}
              />
            )}

            {showAdd && (
              <Button onClick={addConfig?.onClick}>
                <Plus className="text-white h-5 w-5" />
                {addConfig?.text || t("common.add")}
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DataTable columns={columns} data={data} />
      </main>
    </div>
  );
}

export default React.memo(PostView);
