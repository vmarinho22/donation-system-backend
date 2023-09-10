import medicalRecordsService from '../../src/services/medicalRecords';
import dbClient from '../../src/clients/db';

jest.mock('../../src/clients/db');

describe('medicalRecords service', () => {
  let mockInsert: jest.Mock;
  let mockValues: jest.Mock;
  let mockReturning: jest.Mock;

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

    dbClient.insert = mockInsert;
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

    it('should throw an error when the medical record is not created', async () => {
      mockInsert.mockImplementation(() => ({
        values: mockValues,
      }));
      mockValues.mockImplementation(() => ({
        returning: mockReturning,
      }));
      mockReturning.mockImplementation(() => []);

      await expect(medicalRecordsService.create(mockedSendedMedicalRecord)).rejects.toThrowError();
    });
  });
});