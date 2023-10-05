import patientAllergiesService, { CreatePatientMedicamentDto, PatientAllergy } from '../../src/services/patientAllergies';
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
  let mockDelete: jest.Mock;

  const id = "184e3edc-f1d3-4844-8766-310701a3eae7"

  const mockedSendedPatientAllergy = {
    causative: 'test',
    intensity: 'low',
    patientId: id,
  } satisfies CreatePatientMedicamentDto;

  const mockedReturnedPatientAllergy = {
    id,
    ...mockedSendedPatientAllergy,
    createdAt: new Date(),
    updatedAt: new Date(),
  } satisfies PatientAllergy;

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
    it('should create and return a patient allergy', async () => {
      mockInsert.mockImplementation(() => ({
        values: mockValues,
      }));
      mockValues.mockImplementation(() => ({
        returning: mockReturning,
      }));
      mockReturning.mockImplementation(() => [mockedReturnedPatientAllergy]);

      const createdPatientMedicamentId = await patientAllergiesService.create(mockedSendedPatientAllergy);

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

      const createdPatientMedicamentId = await patientAllergiesService.create(mockedSendedPatientAllergy);

      expect(createdPatientMedicamentId).toEqual(null);
    });
  });

  describe('getUnique', () => {
    it('should return a patient allergy', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedPatientAllergy])
      }));

      const returnedPatientMedicament = await patientAllergiesService.getUnique(id);

      expect(returnedPatientMedicament).toEqual(mockedReturnedPatientAllergy);
    });
  });

  describe('getAll', () => {
    it('should return all patient allergy', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      mockFrom.mockImplementation(() => [mockedReturnedPatientAllergy]);

      const returnedPatientMedicaments = await patientAllergiesService.getAll();

      expect(returnedPatientMedicaments).toEqual([mockedReturnedPatientAllergy]);
    });
  });

  describe('getUniqueByPatientId', () => {
    it('should return a patient allergy', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedPatientAllergy])
      }));

      const returnedPatientMedicament = await patientAllergiesService.getUniqueByPatientId(id);

      expect(returnedPatientMedicament).toEqual(mockedReturnedPatientAllergy);
    });
  });

  describe('update', () => {
    it('should update and return true', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));

      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedPatientAllergy])
      }));

      mockUpdate.mockImplementation(() => ({
        set: mockSet,
      }));
      mockSet.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedPatientAllergy]),
      }));

      const updated = await patientAllergiesService.update(id, mockedSendedPatientAllergy);

      expect(updated).toEqual(true);
    });

    it('should return null if not updated', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([])
      }));

      const updated = await patientAllergiesService.update(id, mockedSendedPatientAllergy);

      expect(updated).toEqual(null);
    });
  });

  describe('remove', () => {
    it('should remove and return true', async () => {
      mockDelete.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedPatientAllergy])
      }));

      const updated = await patientAllergiesService.remove(id);

      expect(updated).toEqual(true);
    });

    it('should return null if not deleted', async () => {
      mockDelete.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([])
      }));

      const updated = await patientAllergiesService.remove(id);

      expect(updated).toEqual(null);
    });
  });
});