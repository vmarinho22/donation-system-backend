import authService from '../../src/services/auth';
import dbClient from '../../src/clients/db';

jest.mock('../../src/clients/db')
jest.mock('fastify', () => jest.fn().mockImplementation(() => ({
  register: jest.fn(),
  setErrorHandler: jest.fn(),
  listen: jest.fn(),
  jwt: {
    sign: jest.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
  }
})))

describe('auth service', () => {
  let mockSelect: jest.Mock;
  let mockFrom: jest.Mock;

  const mockedReturnedUser = {
    id: "184e3edc-f1d3-4844-8766-310701a3eae7",
    email: "test@test.com",
    password: "$2b$10",
    role: "patient",
    lastLogin: new Date(),
  }
  
  const mockedUserSignIn = {
    email: 'test@test.com',
    password: 'test'
  };

  beforeAll(() => {
    mockSelect = jest.fn().mockReturnThis();
    mockFrom = jest.fn().mockReturnThis();

    dbClient.select = mockSelect;
  });

  describe('authenticate', () => {
    it('should return a token', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
  
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedUser]),
      }));
  
      const token = await authService.authenticate(mockedUserSignIn.email, mockedUserSignIn.password);

      expect(token).toBeDefined();
    });
  });

});