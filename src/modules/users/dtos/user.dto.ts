export interface SignupRequestDTO {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
}

export interface SignupResponseDTO {
  userId: number;
  name: string;
  email: string;
}