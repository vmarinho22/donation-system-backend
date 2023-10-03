import patientMedicamentsService, { CreatePatientMedicamentDto, PatientMedicament } from '../../src/services/patientMedicaments';
import dbClient from '../../src/clients/db';

jest.mock('../../src/clients/db');

describe('patientMedicaments service', () => {
  let mockInsert: jest.Mock;
  let mockValues: jest.Mock;
  let mockReturning: jest.Mock;
  let mockSelect: jest.Mock;
  let mockFrom: jest.Mock;
  let mockUpdate: jest.Mock;
  let mockSet: jest.Mock;

  const id = "184e3edc-f1d3-4844-8766-310701a3eae7"

  const mockedSendedPatientMedicament = {
    name: 'test',
    stripe: 'no_stripe',
    frequency: 'one of day',
    dosage: 1,
    start_date: new Date(),
    end_date: new Date(),
    patientId: id,
  } satisfies CreatePatientMedicamentDto;

  const mockedReturnedPatientMedicament = {
    id,
    ...mockedSendedPatientMedicament,
    createdAt: new Date(),
    updatedAt: new Date(),
  } satisfies PatientMedicament;

  beforeEach(() => {
    mockInsert = jest.fn().mockReturnThis();
    mockValues = jest.fn().mockReturnThis();
    mockReturning = jest.fn().mockReturnThis();
    
    mockSelect = jest.fn().mockReturnThis();
    mockFrom = jest.fn().mockReturnThis();
    
    mockUpdate = jest.fn().mockReturnThis();
    mockSet = jest.fn().mockReturnThis();

    dbClient.insert = mockInsert;
    dbClient.select = mockSelect;
    dbClient.update = mockUpdate;
  });

  describe('create', () => {
    it('should create and return a patientMedicament', async () => {
      mockInsert.mockImplementation(() => ({
        values: mockValues,
      }));
      mockValues.mockImplementation(() => ({
        returning: mockReturning,
      }));
      mockReturning.mockImplementation(() => [mockedReturnedPatientMedicament]);

      const createdPatientMedicamentId = await patientMedicamentsService.create(mockedSendedPatientMedicament);

      expect(createdPatientMedicamentId).toEqual(id);
    });

    it('should return null if not created', async () => {
      mockInsert.mockImplementation(() => ({
        values: mockValues,
      }));
      mockValues.mockImplementation(() => ({
        returning: mockReturning,
      }));
      mockReturning.mockImplementation(() => []);

      const createdPatientMedicamentId = await patientMedicamentsService.create(mockedSendedPatientMedicament);

      expect(createdPatientMedicamentId).toEqual(null);
    });
  });

  describe('getUnique', () => {
    it('should return a patientMedicament', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedPatientMedicament])
      }));

      const returnedPatientMedicament = await patientMedicamentsService.getUnique(id);

      expect(returnedPatientMedicament).toEqual(mockedReturnedPatientMedicament);
    });
  });

  describe('getAll', () => {
    it('should return all patientMedicaments', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      mockFrom.mockImplementation(() => [mockedReturnedPatientMedicament]);

      const returnedPatientMedicaments = await patientMedicamentsService.getAll();

      expect(returnedPatientMedicaments).toEqual([mockedReturnedPatientMedicament]);
    });
  });

  describe('getUniqueByPatientId', () => {
    it('should return a patientMedicament', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedPatientMedicament])
      }));

      const returnedPatientMedicament = await patientMedicamentsService.getUniqueByPatientId(id);

      expect(returnedPatientMedicament).toEqual(mockedReturnedPatientMedicament);
    });
  });

  describe('update', () => {
    it('should update and return true', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));

      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedPatientMedicament])
      }));

      mockUpdate.mockImplementation(() => ({
        set: mockSet,
      }));
      mockSet.mockImplementation(() => ({
        where: jest.fn(),
      }));

      const updated = await patientMedicamentsService.update(id, mockedSendedPatientMedicament);

      expect(updated).toEqual(true);
    });

    it('should return null if not updated', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([])
      }));

      const updated = await patientMedicamentsService.update(id, mockedSendedPatientMedicament);

      expect(updated).toEqual(null);
    });
  });
});