"use client";

import React from "react";
import { QueryClient, useQuery, UseQueryResult } from "@tanstack/react-query";
import { BaseResponse, PagingResponse, QueryConfig } from "base-models";
import { useIsMounted } from "usehooks-ts";
import { SingleSelect } from "@/components/ui/single-select";
import { MultiSelect } from "@/components/ui/multi-select";
import { AnyFunction } from "function";

interface SelectQueryProps {
  queryConfig: QueryConfig;
  placeholder: string;
  className?: string;
  defaultValue?: string | string[];
  mode?: "single" | "multiple";
  itemLabelKey: string;
  itemValueKey: string;
  onValueChange: AnyFunction;
}

const SelectQuery: React.FC<SelectQueryProps> = ({
  queryConfig,
  placeholder,
  defaultValue,
  className,
  itemLabelKey,
  itemValueKey,
  mode = "single",
  onValueChange,
}) => {
  const queryClient = new QueryClient();
  const isMounted = useIsMounted();

  const params = {
    ...queryConfig,
    defaultPaging: { page: 1, pageSize: 10 },
  };

  const { data, isLoading }: UseQueryResult<BaseResponse<PagingResponse<any>>> =
    useQuery(
      {
        queryKey: ["select", queryConfig.queryKey],
        queryFn: () => queryConfig.queryFn(params.defaultPaging),
        refetchOnWindowFocus: false,
        enabled: isMounted(),
      },
      queryClient
    );

  if (mode === "multiple") {
    return (
      <MultiSelect
        options={
          data?.data?.items?.map((item) => ({
            label: String(item[itemLabelKey]),
            value: String(item[itemValueKey]),
          })) || []
        }
        isLoading={isLoading}
        onValueChange={(values) => onValueChange(values)}
        placeholder={String(placeholder)}
        defaultValue={Array.isArray(defaultValue) ? defaultValue : []}
        className={className}
      />
    );
  } else {
    return (
      <SingleSelect
        options={
          data?.data?.items.map((item) => ({
            label: String(item[itemLabelKey]),
            value: String(item[itemValueKey]),
          })) || []
        }
        isLoading={isLoading}
        onValueChange={(value) => onValueChange(value)}
        placeholder={String(placeholder)}
        defaultValue={Array.isArray(defaultValue) ? defaultValue[0] : ""}
        className={className}
      />
    );
  }
};

export default React.memo(SelectQuery);
