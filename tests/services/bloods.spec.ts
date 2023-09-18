import { Blood } from './../../src/services/blood';
import bloodService from '../../src/services/blood';
import dbClient from '../../src/clients/db';

jest.mock('../../src/clients/db');

describe('Blood service', () => {
  let mockSelect: jest.Mock;
  let mockFrom: jest.Mock;

  const id = "184e3edc-f1d3-4844-8766-310701a3eae7"

  const mockedReturnedBloods  = {
    id,
    factor_rh: '+',
    type: 'A+',
    createdAt: new Date(),
    updatedAt: new Date(),
  } satisfies Blood;

  beforeEach(() => {
    mockSelect = jest.fn().mockReturnThis();
    mockFrom = jest.fn().mockReturnThis();

    dbClient.select = mockSelect;
  });

  describe('getUnique', () => {
    it('should return a medical record', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));

      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedBloods])
      }));

      const returnedMedicalRecord = await bloodService.getUnique(id);

      expect(returnedMedicalRecord).toEqual(mockedReturnedBloods);
      expect(mockSelect).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAll', () => {
    it('should return all medical records', async () => {
      mockSelect.mockImplementation(() => ({
        from: jest.fn().mockResolvedValue([mockedReturnedBloods]),
      }));

      const returnedMedicalRecord = await bloodService.getAll();

      expect(returnedMedicalRecord).toEqual([mockedReturnedBloods]);
      expect(mockSelect).toHaveBeenCalledTimes(1);
    });
  });
});