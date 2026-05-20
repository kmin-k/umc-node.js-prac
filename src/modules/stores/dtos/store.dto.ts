export interface CreateStoreRequestDTO {
  name: string;
  address?: string;
}

export interface StoreResponseDTO {
  storeId: number;
  regionId: number;
  name: string;
  address: string | null;
  score: number;
}