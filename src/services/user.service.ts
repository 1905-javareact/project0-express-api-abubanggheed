import { getAllUsers, getUserById } from "../daos/user.dao";
import { UserDTO } from "../dtos/user.dto";
import { convertUserDTO } from "../strategies/user-conversion";

export const getAllUsersService = async () => {
  try {
    let allUsers = await getAllUsers()
    return allUsers.map((user: UserDTO) => (
      convertUserDTO(user)
    ))
  } catch (error) {
    throw error
  }
}

export const getUserByIdService = async (id) => {
  try {
    let user:UserDTO = await getUserById(id)
    return user ? convertUserDTO(user) : undefined
  } catch (error) {
    throw error
  }
}
