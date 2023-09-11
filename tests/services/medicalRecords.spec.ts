import medicalRecordsService from '../../src/services/medicalRecords';
import dbClient from '../../src/clients/db';

jest.mock('../../src/clients/db');

describe('medicalRecords service', () => {
  let mockInsert: jest.Mock;
  let mockValues: jest.Mock;
  let mockReturning: jest.Mock;
  let mockSelect: jest.Mock;
  let mockFrom: jest.Mock;
  let mockUpdate: jest.Mock;
  let mockSet: jest.Mock;

  const id = "184e3edc-f1d3-4844-8766-310701a3eae7"

  const mockedSendedMedicalRecord = {
    hasChronicDiseases: false,
    chronicDiseases: null,
    hasMedicalConditions: false,
    medicalConditions: null,
    hasPreviousSurgeries: false,
    previousSurgeries: null,
    hasBloodBorneDiseases: false,
    hasCommunicableDiseases: false,
    communicableDiseases: null,
    hasIst: false,
    ist: null,
    useIllicitDrugs: false,
    useInjectingDrugs: false,
    hasPracticeUnprotectedSex: false,
    hadPregnancy: false,
    recentlyBreastfed: false,
    lastBreastfeeding: null,
    notes: null,
  };

  const mockedReturnedMedicalRecord = {
    id,
    ...mockedSendedMedicalRecord,
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
    it('should create and return a medical record', async () => {
      mockInsert.mockImplementation(() => ({
        values: mockValues,
      }));
      mockValues.mockImplementation(() => ({
        returning: mockReturning,
      }));
      mockReturning.mockImplementation(() => [mockedReturnedMedicalRecord]);

      const createdMedicalRecord = await medicalRecordsService.create(mockedSendedMedicalRecord);

      expect(createdMedicalRecord).toEqual(id);
    });
  });

  describe('getUnique', () => {
    it('should return a medical record', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));

      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedMedicalRecord])
      }));

      const returnedMedicalRecord = await medicalRecordsService.getUnique(id);

      expect(returnedMedicalRecord).toEqual(mockedReturnedMedicalRecord);
      expect(mockSelect).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAll', () => {
    it('should return all medical records', async () => {
      mockSelect.mockImplementation(() => ({
        from: jest.fn().mockResolvedValue([mockedReturnedMedicalRecord]),
      }));

      const returnedMedicalRecord = await medicalRecordsService.getAll();

      expect(returnedMedicalRecord).toEqual([mockedReturnedMedicalRecord]);
      expect(mockSelect).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a medical record', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
  
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedMedicalRecord]),
      }));

      mockUpdate.mockImplementation(() => ({
        set: mockSet,
      }));
  
      mockSet.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([{id}]),
      }));

      const updatedMedicalRecord = await medicalRecordsService.update(id, mockedSendedMedicalRecord);

      expect(updatedMedicalRecord).toBeTruthy();
      expect(mockSelect).toHaveBeenCalledTimes(1);
      expect(mockUpdate).toHaveBeenCalledTimes(1);
    });
  });
});