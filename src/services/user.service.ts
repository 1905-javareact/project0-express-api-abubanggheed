import { getAllUsers, getUserById, patchUserByFields } from "../daos/user.dao";
import { UserDTO } from "../dtos/user.dto";
import { convertUserDTO } from "../strategies/user-conversion";
import { getRoleIdByRoleName } from "../daos/role.dao";

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

export const getUserByIdService = async id => {
  try {
    let user:UserDTO = await getUserById(id)
    return user ? convertUserDTO(user) : undefined
  } catch (error) {
    throw error
  }
}

export const patchUserByBodyService = async body => {
  try {
    let user:UserDTO = await getUserById(body.id)
    if(!user) {
      throw 'no user'
    }
    let newRole
    if(body.role) {
      newRole = await getRoleIdByRoleName(body.role)
    } else {
      newRole = await getRoleIdByRoleName(user.role_name)
    }
    const updatedUser = (await patchUserByFields({
      username: body.username || user.username,
      first_name: body.firstName || user.first_name,
      last_name: body.lastName || user.last_name,
      email: body.email || user.email,
      role_id: newRole,
      id: body.id
    })).rows[0]
    updatedUser.role_name = body.role || user.role_name
    return convertUserDTO(updatedUser)
  } catch (error) {
    throw error
  }
}
