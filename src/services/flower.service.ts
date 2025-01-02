import { http } from "@/configs";
import { QueryHelper } from "@/helpers";
import { Flower } from "@prisma/client";
import stringBuilder from "string-format";
import { BaseResponse, PagingResponse, ParamsRequest } from "base-models";
import { flowerPath } from "@/constants";
import { FlowerPayload } from "flower-models";

export default class FlowerService {
  static async list(
    params: ParamsRequest
  ): Promise<BaseResponse<PagingResponse<Flower>>> {
    const queryParams = QueryHelper.buildQueryParams(params);
    const url = `${flowerPath.LIST}?${queryParams}`;

    return (await http.get(url))?.data;
  }

  static async detail(id: string): Promise<BaseResponse<Flower>> {
    return (await http.get(stringBuilder(flowerPath.DETAIL, id)))?.data;
  }

  static async create(payload: FlowerPayload): Promise<BaseResponse<Flower>> {
    return (await http.post(flowerPath.CREATE, payload)).data;
  }

  static async update(
    id: string,
    payload: FlowerPayload
  ): Promise<BaseResponse<Flower>> {
    return (await http.patch(stringBuilder(flowerPath.UPDATE, id), payload))
      .data;
  }

  static async delete(id: string): Promise<BaseResponse<void>> {
    return (await http.delete(stringBuilder(flowerPath.DELETE, id))).data;
  }
}
