import { Body, Controller, Path, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import { createStoreInRegion } from "../services/store.service.js";
import { CreateStoreRequestDTO } from "../dtos/store.dto.js";
import { ErrorResponse } from "../../../common/error.dto.js";

@Route("api/v1")
@Tags("Store")
export class StoreController extends Controller {
  /**
   * 특정 지역에 가게 추가 API
   * regionId 경로 변수에 해당하는 지역에 새 가게를 등록합니다.
   */
  @Post("regions/{regionId}/stores")
  @SuccessResponse(201, "가게 추가 성공")
  @Response<ErrorResponse>(400, "존재하지 않는 지역 또는 잘못된 입력", {
    isSuccess: false,
    code: 400,
    message: "존재하지 않는 지역입니다.",
  })
  public async createStore(
    @Path() regionId: number,
    @Body() body: CreateStoreRequestDTO
  ): Promise<any> {
    this.setStatus(201);
    const result = await createStoreInRegion(regionId, body);
    return { isSuccess: true, code: 201, message: "가게 추가 성공", result };
  }
}