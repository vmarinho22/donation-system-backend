import userService from '../../src/services/user';
import dbClient from '../../src/clients/db';

jest.mock('../../src/clients/db');

describe('user service', () => {
  let mockSelect: jest.Mock;
  let mockFrom: jest.Mock;
  let mockUpdate: jest.Mock;
  let mockSet: jest.Mock;

  const mockedReturnedUser = {
    id: "184e3edc-f1d3-4844-8766-310701a3eae7",
    email: "test@test.com",
    role: "patient",
    lastLogin: new Date(),
  }

  beforeAll(() => {
    mockSelect = jest.fn().mockReturnThis();
    mockFrom = jest.fn().mockReturnThis();
    
    mockUpdate = jest.fn().mockReturnThis();
    mockSet = jest.fn().mockReturnThis();


    dbClient.select = mockSelect;
    dbClient.update = mockUpdate;
  });

  describe('getUnique', () => {
    it('should return a user', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
  
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedUser]),
      }));
  
      const user = await userService.getUnique(mockedReturnedUser.id);
      
      expect(user).toBeDefined();
      expect(user).toEqual(mockedReturnedUser);
    });

    it('should return null if the user is not found', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
  
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([]),
      }));
  
      const user = await userService.getUnique(mockedReturnedUser.id);

      expect(user).toBeNull();
    });
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      mockSelect.mockImplementation(() => ({
        from: jest.fn().mockResolvedValue([mockedReturnedUser]),
      }));
  
      const users = await userService.getAll();

      expect(users).toBeDefined();
      expect(users).toEqual([mockedReturnedUser]);
    });

    it('should return null if the user is not found', async () => {
      mockSelect.mockImplementation(() => ({
        from: jest.fn().mockResolvedValue([]),
      }));
  
      const users = await userService.getAll();

      expect(users).toHaveLength(0);
    });
  });

  describe('update', () => {
    it('should return true if the user is updated', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
  
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedUser]),
      }));

      mockUpdate.mockImplementation(() => ({
        set: mockFrom,
      }));
  
      mockSet.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([{ id: mockedReturnedUser.id }]),
      }));

      const hasUpdated = await userService.update(mockedReturnedUser.id, { email: 'test@test.com'});

      expect(hasUpdated).toBeTruthy();
      expect(mockUpdate).toHaveBeenCalledTimes(1);
    });
  });
});