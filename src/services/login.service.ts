import { getUserByUsername } from "../daos/login.dao";
import { comparePassword } from "../strategies/authentication-strategy";
import jwt from 'jsonwebtoken';
import jwtConfig from '../jwtconfig';

export const loginService = async (username, password) => {
  try {
    const user = await getUserByUsername(username)
    if(comparePassword(password, user.password)) {
      return jwt.sign({
        username: user.username
      },
        jwtConfig.jwtSecret,
        { expiresIn: '1h' })
    } else {
      throw 'invalid credentials'
    }
  } catch (error) {
    throw error
  }
}
