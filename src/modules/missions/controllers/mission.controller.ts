import { Body, Controller, Get, Patch, Path, Post, Query, Response, Route, SuccessResponse, Tags } from "tsoa";
import {
  addMissionToStore,
  challengeMissionByUser,
  getMissionsByStore,
  getUserMissionsByStatus,
  completeMission,
} from "../services/mission.service.js";
import { CreateMissionRequestDTO, ChallengeMissionRequestDTO } from "../dtos/mission.dto.js";
import { ErrorResponse } from "../../../common/error.dto.js";

@Route("api/v1")
@Tags("Mission")
export class MissionController extends Controller {
  /**
   * 가게에 미션 추가 API
   * 가게 존재 여부와 리워드(0 이상) 검증.
   */
  @Post("stores/{storeId}/missions")
  @SuccessResponse(201, "미션 추가 성공")
  @Response<ErrorResponse>(400, "존재하지 않는 가게 또는 잘못된 리워드", {
    isSuccess: false,
    code: 400,
    message: "존재하지 않는 가게입니다.",
  })
  public async createMission(
    @Path() storeId: number,
    @Body() body: CreateMissionRequestDTO
  ): Promise<any> {
    this.setStatus(201);
    const result = await addMissionToStore(storeId, body);
    return { isSuccess: true, code: 201, message: "미션 추가 성공", result };
  }

  /**
   * 특정 가게의 미션 목록 조회 API
   */
  @Get("stores/{storeId}/missions")
  @SuccessResponse(200, "가게 미션 목록 조회 성공")
  @Response<ErrorResponse>(400, "존재하지 않는 가게", {
    isSuccess: false,
    code: 400,
    message: "존재하지 않는 가게입니다.",
  })
  public async getStoreMissions(@Path() storeId: number): Promise<any> {
    const result = await getMissionsByStore(storeId);
    return { isSuccess: true, code: 200, message: "가게 미션 목록 조회 성공", result };
  }

  /**
   * 미션 도전하기 API
   * 같은 유저가 같은 미션을 중복 도전할 수 없습니다.
   */
  @Post("users/{userId}/missions")
  @SuccessResponse(201, "미션 도전 성공")
  @Response<ErrorResponse>(400, "유저/미션 없음 또는 중복 도전", {
    isSuccess: false,
    code: 400,
    message: "이미 도전 중이거나 완료한 미션입니다.",
  })
  public async challengeMission(
    @Path() userId: number,
    @Body() body: ChallengeMissionRequestDTO
  ): Promise<any> {
    this.setStatus(201);
    const result = await challengeMissionByUser(userId, body);
    return { isSuccess: true, code: 201, message: "미션 도전 성공", result };
  }

  /**
   * 내 미션 목록 조회 API
   * status 쿼리 파라미터로 ongoing 또는 complete를 지정할 수 있습니다. 기본값은 ongoing.
   */
  @Get("users/{userId}/missions")
  @SuccessResponse(200, "내 미션 목록 조회 성공")
  @Response<ErrorResponse>(400, "존재하지 않는 유저", {
    isSuccess: false,
    code: 400,
    message: "존재하지 않는 유저입니다.",
  })
  public async getMyMissions(
    @Path() userId: number,
    @Query() status?: "ongoing" | "complete"
  ): Promise<any> {
    const result = await getUserMissionsByStatus(userId, status ?? "ongoing");
    return { isSuccess: true, code: 200, message: "내 미션 목록 조회 성공", result };
  }

  /**
   * 미션 완료 처리 API
   * 도전 중(ongoing) 상태의 미션만 완료(complete) 상태로 변경할 수 있습니다.
   */
  @Patch("users/{userId}/missions/{missionId}")
  @SuccessResponse(200, "미션 완료 처리 성공")
  @Response<ErrorResponse>(400, "도전 중인 미션이 아니거나 이미 완료됨", {
    isSuccess: false,
    code: 400,
    message: "도전 중인 미션이 아닙니다.",
  })
  public async markMissionComplete(
    @Path() userId: number,
    @Path() missionId: number
  ): Promise<any> {
    const result = await completeMission(userId, missionId);
    return { isSuccess: true, code: 200, message: "미션 완료 처리 성공", result };
  }
}