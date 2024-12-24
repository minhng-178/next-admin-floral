import { http } from "@/configs";
import { categoryPath } from "@/constants";
import { QueryHelper } from "@/helpers";
import { Category } from "@prisma/client";
import stringBuilder from "string-format";
import { BaseResponse, PagingResponse, ParamsRequest } from "base-models";

export default class CategoryService {
  static async list(
    params: ParamsRequest
  ): Promise<BaseResponse<PagingResponse<Category>>> {
    const queryParams = QueryHelper.buildQueryParams(params);
    const url = `${categoryPath.LIST}?${queryParams}`;

    return (await http.get(url))?.data;
  }

  static async detail(id: string): Promise<BaseResponse<Category>> {
    return (await http.get(stringBuilder(categoryPath.DETAIL, id)))?.data;
  }

  static async create(payload: any): Promise<BaseResponse<Category>> {
    return (await http.post(categoryPath.CREATE, payload)).data;
  }

  static async update(
    id: string,
    payload: any
  ): Promise<BaseResponse<Category>> {
    return (await http.put(stringBuilder(categoryPath.UPDATE, id), payload))
      .data;
  }

  static async delete(id: string): Promise<BaseResponse<void>> {
    return (await http.delete(stringBuilder(categoryPath.DELETE, id))).data;
  }
}
