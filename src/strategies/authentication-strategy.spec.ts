import { comparePassword, makePassword } from "./authentication-strategy";


describe('hashing test', () => {

  test('comparing a hash to a correct password should return true.', () => {
    const result = comparePassword('password', '$2a$10$9Gob83Rzothq6Hw4yVHSOOhnAaDvIyeNozjzGRTjGWTdYTxErSRQa')
    expect(result).toEqual(true)
  })

  test('comparing an incorrect password to a hash should return false', () => {
    const result = comparePassword('pas', '$2a$10$9Gob83Rzothq6Hw4yVHSOOhnAaDvIyeNozjzGRTjGWTdYTxErSRQa')
    expect(result).toEqual(false)
  })

})

describe('making a hash test', () => {

  test('the result should match the imput when compared', () => {
    const password = 'password'
    const result = makePassword('password')
    const comparison = comparePassword(password, result)
    expect(comparison).toEqual(true)
  })

})
