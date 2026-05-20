export interface CreateMissionRequestDTO {
  content: string;
  reward: number;
  deadline?: string; // ISO date string (예: "2026-12-31T23:59:59")
}

export interface MissionResponseDTO {
  missionId: number;
  storeId: number;
  content: string;
  reward: number;
  deadline: string | null;
}

export interface ChallengeMissionRequestDTO {
  missionId: number;
}

export interface ChallengeMissionResponseDTO {
  userMissionId: number;
  userId: number;
  missionId: number;
  status: "ongoing" | "complete";
}