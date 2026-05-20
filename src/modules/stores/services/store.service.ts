import {
  findRegionById,
  createStore,
  findStoreById,
} from "../repositories/store.repository.js";
import {
  CreateStoreRequestDTO,
  StoreResponseDTO,
} from "../dtos/store.dto.js";

export const createStoreInRegion = async (
  regionId: number,
  data: CreateStoreRequestDTO
): Promise<StoreResponseDTO> => {
  // 1. 지역 존재 검증
  const region = await findRegionById(regionId);
  if (!region) {
    throw new Error("존재하지 않는 지역입니다.");
  }

  // 2. 가게 생성
  const storeId = await createStore(regionId, data.name, data.address ?? null);

  // 3. 생성된 가게 조회 후 응답 형태로 변환
  const store = await findStoreById(storeId);
  if (!store) {
    throw new Error("가게 생성 후 조회에 실패했습니다.");
  }

  return {
    storeId: store.id,
    regionId: store.region_id,
    name: store.name,
    address: store.address,
    score: Number(store.score), // DECIMAL은 문자열로 오니까 숫자 변환
  };
};