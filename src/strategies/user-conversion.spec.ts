import { convertUserDTO } from "./user-conversion";
import { User } from "../models/user";
import { UserDTO } from "../dtos/user.dto";

describe('user conversion test', () => {
  const dto1 = {
    id: 1,
    username: 'username',
    first_name: 'first',
    last_name: 'last',
    email: 'email',
    role_name: 'role'
  }
  const dto2 = new UserDTO()
  let user1 = convertUserDTO(dto1)
  let user2 = convertUserDTO(dto2)
  test('our converter should be able to predict the user converted from a dto', () => {
    expect(user1).toMatchObject({
      userId: 1,
      username: 'username',
      firstName: 'first',
      lastName: 'last',
      email: 'email',
      role: 'role'
    })
  })
  test('our result should be recognized as a user', () => {
    expect(user1).toBeInstanceOf(User)
  })
  test('all user fields may be undefined', () => {
    expect(user2).toMatchObject({
      userId: undefined,
      username: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      role: undefined
    })
  })
})
