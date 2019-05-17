import { UserDTO } from "../dtos/user.dto";
import { User } from "../models/user";

export const convertUserDTO = (user:UserDTO) => new User (
  user.id,
  user.username,
  user.first_name,
  user.last_name,
  user.email,
  user.role_name
)
