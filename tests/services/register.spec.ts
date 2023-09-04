import registerService from '../../src/services/register'
import dbClient from '../../src/clients/db' 
import { Roles } from '../../src/types/roles';

jest.mock('../../src/clients/db')
jest.mock('fastify', () => jest.fn().mockImplementation(() => ({
  register: jest.fn(),
  setErrorHandler: jest.fn(),
  listen: jest.fn(),
  jwt: {
    sign: jest.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
  }
})))

describe('register service', () => {
  const mockedUser = {
    email: "test@test.com",
    password: "123456",
    cpf: "36648204877",
    role: "patient" as Roles,
    profileId: "184e3edc-f1d3-4844-8766-310701a3eae7"
  };

  const mockedProfile = {
    firstName: "Test",
    lastName: "Test",
    photoUrl: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    addressId: "184e3edc-f1d3-4844-8766-310701a3eae7"
  }

  const mockedAddress = {
    postalCode: 12236063,
    street: "Rua Test",
    number: 300,
    district: "Test",
    city: "Test",
    state: "Test",
    country: "Test",
    uf: "SP"
  }


  beforeAll(() => {
    dbClient.transaction = jest.fn().mockResolvedValue(true)
  })

  it('should return a token', async () => {
    const token = await registerService.register({
      user: mockedUser,
      profile: mockedProfile,
      address: mockedAddress
    });

    expect(typeof token).toBe('string');
  });

  it('should throw an error if the data is fails', async () => {

    await expect(registerService.register({
      user: mockedUser,
      profile: mockedProfile,
      address: {...mockedAddress, postalCode: "123456789" as unknown as number }
    })).rejects.toThrowError()
  });

});