import { Sex } from './../../src/types/sex.d';
import patientsService from '../../src/services/patients';
import dbClient from '../../src/clients/db';

jest.mock('../../src/clients/db');

describe('patients service', () => {
  let mockInsert: jest.Mock;
  let mockValues: jest.Mock;
  let mockReturning: jest.Mock;
  let mockSelect: jest.Mock;
  let mockFrom: jest.Mock;
  let mockUpdate: jest.Mock;
  let mockSet: jest.Mock;

  const id = "184e3edc-f1d3-4844-8766-310701a3eae7"

  const mockedSendedPatient = {
    birthDate: new Date(),
    sex: "man" as Sex,
    gender: null,
    age: 23,
    weight: 111.5,
    height: 175,
    rg: "1234567890",
    userId: id,
    medicalRecordId: id,
    bloodId: id
  };

  const mockedReturnedPatient = {
    id,
    ...mockedSendedPatient,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

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
    it('should create and return a patient', async () => {
      mockInsert.mockImplementation(() => ({
        values: mockValues,
      }));
      mockValues.mockImplementation(() => ({
        returning: mockReturning,
      }));
      mockReturning.mockImplementation(() => [mockedReturnedPatient]);

      const createdMedicalRecord = await patientsService.create(mockedSendedPatient);

      expect(createdMedicalRecord).toEqual(id);
    });
  });

  describe('getUnique', () => {
    it('should return a medical record', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));

      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedPatient])
      }));

      const returnedMedicalRecord = await patientsService.getUnique(id);

      expect(returnedMedicalRecord).toEqual(mockedReturnedPatient);
      expect(mockSelect).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAll', () => {
    it('should return all medical records', async () => {
      mockSelect.mockImplementation(() => ({
        from: jest.fn().mockResolvedValue([mockedReturnedPatient]),
      }));

      const returnedMedicalRecord = await patientsService.getAll();

      expect(returnedMedicalRecord).toEqual([mockedReturnedPatient]);
      expect(mockSelect).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUniqueByUserId', () => {
    it('should return a patient record', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));

      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedPatient])
      }));

      const returnedPatientRecord = await patientsService.getUniqueByUserId(id);

      expect(returnedPatientRecord).toEqual(mockedReturnedPatient);
      expect(mockSelect).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a medical record', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
  
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedPatient]),
      }));

      mockUpdate.mockImplementation(() => ({
        set: mockSet,
      }));
  
      mockSet.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([{id}]),
      }));

      const updatedMedicalRecord = await patientsService.update(id, mockedSendedPatient);

      expect(updatedMedicalRecord).toBeTruthy();
      expect(mockSelect).toHaveBeenCalledTimes(1);
      expect(mockUpdate).toHaveBeenCalledTimes(1);
    });
  });
});