import { getAllUsers } from "../daos/user.dao";
import { User } from "../models/user";
import { UserDTO } from "../dtos/user.dto";

export const getAllUsersService = async () => {
  try {
    let allUsers = await getAllUsers()
    return allUsers.map((user: UserDTO) => new User(
      user.id,
      user.username,
      user.first_name,
      user.last_name,
      user.email,
      user.role_name
    ))
  } catch (error) {
    throw error
  }

}
