export const USER_ROLES = ["user", "campus_admin", "super_admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface JwtAccessPayload {
  sub: string;
  email: string;
  role: UserRole;
}
