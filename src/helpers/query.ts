import { ParamsRequest } from "base-models";

class QueryHelper {
  static buildQueryParams(params: ParamsRequest): string {
    const urlParams = new URLSearchParams();

    urlParams.append("page", String(params.page));
    urlParams.append("pageSize", String(params.pageSize));
    if (params.search) urlParams.append("search", params.search);

    return urlParams.toString();
  }
}

export default QueryHelper;
