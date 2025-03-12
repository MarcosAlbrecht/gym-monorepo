import { UserDto } from "./userDto";

export interface AuthResponse {
  token: string;
  user: UserDto;
}
