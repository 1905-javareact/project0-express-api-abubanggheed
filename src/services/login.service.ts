import { getUserByUsername } from "../daos/login.dao";
import { comparePassword } from "../strategies/authentication-strategy";
import jwt from 'jsonwebtoken';
import jwtConfig from '../jwtconfig';
import { convertUserDTO } from "../strategies/user-conversion";

export const loginService = async (username, password) => {
  try {
    const user = await getUserByUsername(username)
    if (comparePassword(password, user.password)) {
      return {
        token: jwt.sign({
          id: user.id,
          role: user.role_name
        },
          jwtConfig.jwtSecret,
          { expiresIn: '1h' }),
        self: convertUserDTO(user)
      }
    } else {
      throw 'invalid credentials'
    }
  } catch (error) {
    throw error
  }
}
