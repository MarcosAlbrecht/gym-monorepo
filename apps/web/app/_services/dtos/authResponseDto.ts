import { UserDto } from "./userDto";

export interface AuthResponse {
  token: string;
  refresh_token: string;
  user: UserDto;
}
