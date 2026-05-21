import { Body, Controller, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import { signupUser } from "../services/user.service.js";
import { SignupRequestDTO } from "../dtos/user.dto.js";
import { ErrorResponse } from "../../../common/error.dto.js";

@Route("api/v1/users")
@Tags("User")
export class UserController extends Controller {
  /**
   * 회원가입 API
   * 신규 유저를 등록합니다. 비밀번호는 bcrypt로 해싱되어 저장됩니다.
   */
  @Post("signup")
  @SuccessResponse(201, "회원가입 성공")
  @Response<ErrorResponse>(400, "이메일 중복 또는 잘못된 입력", {
    isSuccess: false,
    code: 400,
    message: "이미 사용 중인 이메일입니다.",
  })
  public async signup(@Body() body: SignupRequestDTO): Promise<any> {
    this.setStatus(201);
    const result = await signupUser(body);
    return { isSuccess: true, code: 201, message: "회원가입 성공", result };
  }
}