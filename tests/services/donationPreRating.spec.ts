import donationPreRatingService, { CreateDonationPreRatingDto, DonationPreRating } from '../../src/services/donationPreRating';
import dbClient from '../../src/clients/db';

jest.mock('../../src/clients/db');

describe('donationPreRatingService service', () => {
  let mockInsert: jest.Mock;
  let mockValues: jest.Mock;
  let mockReturning: jest.Mock;
  let mockSelect: jest.Mock;
  let mockFrom: jest.Mock;
  let mockUpdate: jest.Mock;
  let mockSet: jest.Mock;

  const id = "184e3edc-f1d3-4844-8766-310701a3eae7"

  const mockedSendedDonationPreRating = {
    status: 'starting',
    isEligibility: true,
    performedNecessaryTests: true,
    testNotes: 'testNotes',
    fullTestLink: 'fullTestLink',
    type: 'blood',
    approved: true,
    doctorId: id,
    patientId: id,
  } satisfies CreateDonationPreRatingDto;

  const mockedReturnedDonationPreRating = {
    id,
    ...mockedSendedDonationPreRating,
    createdAt: new Date(),
    updatedAt: new Date(),
  } satisfies DonationPreRating;

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
    it('should create and return a donation pre rating', async () => {
      mockInsert.mockImplementation(() => ({
        values: mockValues,
      }));
      mockValues.mockImplementation(() => ({
        returning: mockReturning,
      }));
      mockReturning.mockImplementation(() => [mockedReturnedDonationPreRating]);

      const createdPatientMedicamentId = await donationPreRatingService.create(mockedSendedDonationPreRating);

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

      const createdPatientMedicamentId = await donationPreRatingService.create(mockedSendedDonationPreRating);

      expect(createdPatientMedicamentId).toEqual(null);
    });
  });

  describe('getUnique', () => {
    it('should return a donation pre rating', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedDonationPreRating])
      }));

      const returnedPatientMedicament = await donationPreRatingService.getUnique(id);

      expect(returnedPatientMedicament).toEqual(mockedReturnedDonationPreRating);
    });
  });

  describe('getAll', () => {
    it('should return all donation pre rating', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      mockFrom.mockImplementation(() => [mockedReturnedDonationPreRating]);

      const returnedPatientMedicaments = await donationPreRatingService.getAll();

      expect(returnedPatientMedicaments).toEqual([mockedReturnedDonationPreRating]);
    });
  });

  describe('getUniqueByDoctorId', () => {
    it('should return a donation pre rating', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedDonationPreRating])
      }));

      const returnedPatientMedicament = await donationPreRatingService.getUniqueByDoctorId(id);

      expect(returnedPatientMedicament).toEqual(mockedReturnedDonationPreRating);
    });
  });

  describe('update', () => {
    it('should update and return true', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));

      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedDonationPreRating])
      }));

      mockUpdate.mockImplementation(() => ({
        set: mockSet,
      }));
      mockSet.mockImplementation(() => ({
        where: mockReturning,
      }));

      mockReturning.mockImplementation(() => ({
        returning: jest.fn().mockResolvedValue([mockedReturnedDonationPreRating])
      }));

      const updated = await donationPreRatingService.update(id, mockedSendedDonationPreRating);

      expect(updated).toEqual(true);
    });

    it('should return null if not updated', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([])
      }));

      const updated = await donationPreRatingService.update(id, mockedSendedDonationPreRating);

      expect(updated).toEqual(null);
    });
  });

});