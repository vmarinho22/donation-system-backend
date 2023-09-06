import passwordRecoveryService from '../../src/services/passwordRecovery';
import dbClient from '../../src/clients/db';
import smsClient from '../../src/clients/sms';

jest.mock('../../src/clients/db');
jest.mock('../../src/clients/sms');

describe('passwordRecovery service', () => {
  let mockSelect: jest.Mock;
  let mockFrom: jest.Mock;
  let mockLeftJoin: jest.Mock;
  let mockInsert: jest.Mock;
  let mockValues: jest.Mock;
  let mockReturning: jest.Mock;
  let mockOrderBy: jest.Mock;
  let mockLimit: jest.Mock;
  let mockUpdate: jest.Mock;
  let mockSet: jest.Mock;

  beforeAll(() => {
    mockSelect = jest.fn().mockReturnThis();
    mockFrom = jest.fn().mockReturnThis();
    mockLeftJoin = jest.fn().mockReturnThis();
    
    mockInsert = jest.fn().mockReturnThis();
    mockValues = jest.fn().mockReturnThis();
    mockReturning = jest.fn().mockReturnThis();

    mockOrderBy = jest.fn().mockReturnThis();
    mockLimit = jest.fn().mockReturnThis();
    
    mockUpdate = jest.fn().mockReturnThis();
    mockSet = jest.fn().mockReturnThis();

    dbClient.select = mockSelect;
    dbClient.insert = mockInsert;
    dbClient.update = mockUpdate;

    smsClient.send = jest.fn().mockResolvedValue({
      messages: [
        {
          "message-id": "184e3edc-f1d3-4844-8766-310701a3eae7"
        }
      ]
    })
  });

  describe('sendRecoveryCode', () => {
    const mockedReturnedUser = {
      id: "184e3edc-f1d3-4844-8766-310701a3eae7",
      phone: "5512123451234"
    }

    it ('should send a recovery code', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
  
      mockFrom.mockImplementation(() => ({
        leftJoin: mockLeftJoin,
      }));

      mockLeftJoin.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedUser]),
      }));

      mockInsert.mockImplementation(() => ({
        values: mockValues,
      }));

      mockValues.mockImplementation(() => ({
        returning: mockReturning,
      }));

      mockReturning.mockImplementation(() => ({
        returning: jest.fn().mockResolvedValue([{
          id: mockedReturnedUser.id
        }])
      }));

      await passwordRecoveryService.sendRecoveryCode(mockedReturnedUser.phone);

      expect(dbClient.select).toHaveBeenCalled();
      expect(smsClient.send).toHaveBeenCalled();
    });
  });

  describe('validateRecoveryCode', () => {
    const mockedReturnedUser = {
      id: "184e3edc-f1d3-4844-8766-310701a3eae7",
      code: 123456,
      validate: new Date()
    };

    it('should validate a recovery code', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
  
      mockFrom.mockImplementation(() => ({
        leftJoin: mockLeftJoin,
      }));

      mockLeftJoin.mockImplementation(() => ({
        where: mockOrderBy,
      }));

      mockOrderBy.mockImplementation(() => ({
        orderBy: mockLimit,
      }));

      mockLimit.mockImplementation(() => ({
        limit: jest.fn().mockResolvedValue([mockedReturnedUser]),
      }));
      

      await passwordRecoveryService.validateRecoveryCode("test@test.com", mockedReturnedUser.code);

      expect(dbClient.select).toHaveBeenCalled();
    });
  });

  describe('changePassword', () => {
    const userId = "184e3edc-f1d3-4844-8766-310701a3eae7";

    it('should change the user password', async () => {
      passwordRecoveryService.validateRecoveryCode = jest.fn().mockResolvedValue(userId);

      mockUpdate.mockImplementation(() => ({
        set: mockSet,
      }));

      mockSet.mockImplementation(() => ({
        where: mockReturning,
      }));

      mockReturning.mockImplementation(() => ({
        returning: jest.fn().mockResolvedValue([{
          id: userId
        }])
      }));
      
      await passwordRecoveryService.changePassword("test@test.com", "12345678", 123456);

      expect(dbClient.insert).toHaveBeenCalled();
    });
  });
});