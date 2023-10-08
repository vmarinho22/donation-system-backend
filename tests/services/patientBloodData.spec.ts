import patientBloodDataService, { CreatePatientBloodDataDto, PatientBloodData } from '../../src/services/patientBloodData';
import dbClient from '../../src/clients/db';

jest.mock('../../src/clients/db');

describe('patientBloodData service', () => {
  let mockInsert: jest.Mock;
  let mockValues: jest.Mock;
  let mockReturning: jest.Mock;
  let mockSelect: jest.Mock;
  let mockFrom: jest.Mock;
  let mockUpdate: jest.Mock;
  let mockSet: jest.Mock;
  let mockDelete: jest.Mock;

  const id = "184e3edc-f1d3-4844-8766-310701a3eae7"

  const mockedPatientBloodData = {
    factor_rh: '+',
    patientId: id,
  } satisfies CreatePatientBloodDataDto;

  const mockedReturnedPatientBloodData = {
    id,
    ...mockedPatientBloodData,
    createdAt: new Date(),
    updatedAt: new Date(),
  } satisfies PatientBloodData;

  beforeEach(() => {
    mockInsert = jest.fn().mockReturnThis();
    mockValues = jest.fn().mockReturnThis();
    mockReturning = jest.fn().mockReturnThis();
    
    mockSelect = jest.fn().mockReturnThis();
    mockFrom = jest.fn().mockReturnThis();
    
    mockUpdate = jest.fn().mockReturnThis();
    mockSet = jest.fn().mockReturnThis();

    mockDelete = jest.fn().mockReturnThis();

    dbClient.insert = mockInsert;
    dbClient.select = mockSelect;
    dbClient.update = mockUpdate;
    dbClient.delete = mockDelete;
  });

  describe('create', () => {
    it('should create and return a nurse', async () => {
      mockInsert.mockImplementation(() => ({
        values: mockValues,
      }));
      mockValues.mockImplementation(() => ({
        returning: mockReturning,
      }));
      mockReturning.mockImplementation(() => [mockedReturnedPatientBloodData]);

      const createdPatientBloodDataId = await patientBloodDataService.create(mockedPatientBloodData);

      expect(createdPatientBloodDataId).toEqual(id);
    });

    it('should return null if not created', async () => {
      mockInsert.mockImplementation(() => ({
        values: mockValues,
      }));
      mockValues.mockImplementation(() => ({
        returning: mockReturning,
      }));
      mockReturning.mockImplementation(() => []);

      const createdPatientBloodDataId = await patientBloodDataService.create(mockedPatientBloodData);

      expect(createdPatientBloodDataId).toEqual(null);
    });
  });

  describe('getUnique', () => {
    it('should return a nurse', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedPatientBloodData])
      }));

      const returnedPatientBloodData = await patientBloodDataService.getUnique(id);

      expect(returnedPatientBloodData).toEqual(mockedReturnedPatientBloodData);
    });
  });

  describe('getAll', () => {
    it('should return all nurses', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      mockFrom.mockImplementation(() => [mockedReturnedPatientBloodData]);

      const returnedPatientBloodData = await patientBloodDataService.getAll();

      expect(returnedPatientBloodData).toEqual([mockedReturnedPatientBloodData]);
    });
  });

  describe('getByPatientId', () => {
    it('should return a nurse', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedPatientBloodData])
      }));

      const returnedPatientBloodData = await patientBloodDataService.getByPatientId(id);

      expect(returnedPatientBloodData).toEqual([mockedReturnedPatientBloodData]);
    });
  });

  describe('update', () => {
    it('should update and return true', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));

      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedPatientBloodData])
      }));

      mockUpdate.mockImplementation(() => ({
        set: mockSet,
      }));
      mockSet.mockImplementation(() => ({
        where: mockReturning,
      }));

      mockReturning.mockImplementation(() => ({
        returning: jest.fn().mockResolvedValue([mockedReturnedPatientBloodData])
      }));

      const updated = await patientBloodDataService.update(id, mockedPatientBloodData);

      expect(updated).toEqual(true);
    });

    it('should return null if not updated', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([])
      }));

      const updated = await patientBloodDataService.update(id, mockedPatientBloodData);

      expect(updated).toEqual(null);
    });
  });

});