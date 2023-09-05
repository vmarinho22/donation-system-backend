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

  const mockedReturnedUser = {
    id: "184e3edc-f1d3-4844-8766-310701a3eae7",
    phone: "5512123451234"
  }

  beforeAll(() => {
    mockSelect = jest.fn().mockReturnThis();
    mockFrom = jest.fn().mockReturnThis();
    mockLeftJoin = jest.fn().mockReturnThis();
    
    mockInsert = jest.fn().mockReturnThis();
    mockValues = jest.fn().mockReturnThis();
    mockReturning = jest.fn().mockReturnThis();

    dbClient.select = mockSelect;
    dbClient.insert = mockInsert;
    smsClient.send = jest.fn().mockResolvedValue({
      messages: [
        {
          "message-id": "184e3edc-f1d3-4844-8766-310701a3eae7"
        }
      ]
    })
  });

  describe('sendRecoveryCode', () => {

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
});