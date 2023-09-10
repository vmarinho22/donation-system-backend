import { langEnum } from './../../src/types/lang.d';
import profileService from '../../src/services/profile';
import dbClient from '../../src/clients/db';

jest.mock('../../src/clients/db');

describe('profile service', () => {
  let mockSelect: jest.Mock;
  let mockFrom: jest.Mock;
  let mockReturning: jest.Mock;
  let mockInnerJoin1: jest.Mock;
  let mockInnerJoin2: jest.Mock;
  let mockInsert: jest.Mock;
  let mockValues: jest.Mock;
  let mockUpdate: jest.Mock;
  let mockSet: jest.Mock;

  const id = "184e3edc-f1d3-4844-8766-310701a3eae7"

  const mockedSentProfile = {
    firstName: "Test",
    lastName: "Test",
    socialName: null,
    lang: "pt_br" as langEnum.PT_BR,
    photoUrl: "https://test.com",
    phone: "999999999",
    addressId: id,
  };

  const mockedReturnedProfile = {
    id,
    ...mockedSentProfile,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  beforeEach(() => {
    mockSelect = jest.fn().mockReturnThis();
    mockFrom = jest.fn().mockReturnThis();
    mockInnerJoin1 = jest.fn().mockReturnThis();
    mockInnerJoin2 = jest.fn().mockReturnThis();

    mockInsert = jest.fn().mockReturnThis();
    mockValues = jest.fn().mockReturnThis();
    mockReturning = jest.fn().mockReturnThis();
    
    mockUpdate = jest.fn().mockReturnThis();
    mockSet = jest.fn().mockReturnThis();

    dbClient.select = mockSelect;
    dbClient.insert = mockInsert;
    dbClient.update = mockUpdate;
  });

  describe('create', () => {
    it('should create and return a profile', async () => {
      mockInsert.mockImplementation(() => ({
        values: mockValues,
      }));
      mockValues.mockImplementation(() => ({
        returning: mockReturning,
      }));
      mockReturning.mockImplementation(() => [{id: mockedReturnedProfile.id}]);

      const profile = await profileService.create(mockedSentProfile);

      expect(profile).toBeDefined();
      expect(profile).toEqual(mockedReturnedProfile.id);
      expect(mockInsert).toBeCalledTimes(1);
      expect(dbClient.insert).toBeCalled();
    });
  });

  describe('getUnique', () => {
    it('should return a profile', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
  
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedProfile]),
      }));
  
      const profile = await profileService.getUnique(mockedReturnedProfile.id);
      
      expect(profile).toBeDefined();
      expect(profile).toEqual(mockedReturnedProfile);
      expect(mockSelect).toBeCalledTimes(1);
      expect(dbClient.select).toBeCalled();
    });
  });

  describe('getAll', () => {
    it('should return all profiles', async () => {
      mockSelect.mockImplementation(() => ({
        from: jest.fn().mockResolvedValue([mockedReturnedProfile]),
      }));
  
      const profiles = await profileService.getAll();

      expect(profiles).toBeDefined();
      expect(profiles).toEqual([mockedReturnedProfile]);
      expect(mockSelect).toBeCalledTimes(1);
      expect(dbClient.select).toBeCalled();
    });
  });

  describe('update', () => {
    it('should update and return a profile', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
  
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedProfile]),
      }));

      mockUpdate.mockImplementation(() => ({
        set: mockSet,
      }));
  
      mockSet.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedProfile]),
      }));
  
      const profile = await profileService.update(mockedReturnedProfile.id, mockedSentProfile);
      
      expect(profile).toBeDefined();
      expect(profile).toBeTruthy();
      expect(mockSelect).toBeCalledTimes(1);
      expect(mockUpdate).toBeCalledTimes(1);
      expect(dbClient.select).toBeCalled();
      expect(dbClient.update).toBeCalled();
    });
  });

  describe('getFullProfile', () => {
    it('should return a full profile', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
  
      mockFrom.mockImplementation(() => ({
        innerJoin: mockInnerJoin1,
      }));

      mockInnerJoin1.mockImplementation(() => ({
        innerJoin: mockInnerJoin2,
      }));
      
      mockInnerJoin2.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedProfile]),
      }));
  
      const profile = await profileService.getFullProfile(mockedReturnedProfile.id);
      
      expect(profile).toBeDefined();
      expect(profile).toEqual(mockedReturnedProfile);
      expect(mockSelect).toBeCalledTimes(1);
      expect(dbClient.select).toBeCalled();
    });
  });
});