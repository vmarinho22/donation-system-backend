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
  let mockLeftJoin: jest.Mock;

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
    doctorName: 'firstName lastName',
    patientId: id,
  } satisfies CreateDonationPreRatingDto;

  const mockedReturnedDonationPreRating = {
    id,
    ...mockedSendedDonationPreRating,
    createdAt: new Date(),
    updatedAt: new Date(),
  } satisfies DonationPreRating;

  const mockedReturnedQuery = {
    donationPreRating: mockedReturnedDonationPreRating,
    firstName: 'firstName',
    lastName: 'lastName',
  }

  beforeEach(() => {
    mockInsert = jest.fn().mockReturnThis();
    mockValues = jest.fn().mockReturnThis();
    mockReturning = jest.fn().mockReturnThis();
    
    mockSelect = jest.fn().mockReturnThis();
    mockFrom = jest.fn().mockReturnThis();
    mockLeftJoin = jest.fn().mockReturnThis();
    
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

      const createdDonationPreRating = await donationPreRatingService.create(mockedSendedDonationPreRating);

      expect(createdDonationPreRating).toEqual(id);
    });

    it('should return null if not created', async () => {
      mockInsert.mockImplementation(() => ({
        values: mockValues,
      }));
      mockValues.mockImplementation(() => ({
        returning: mockReturning,
      }));
      mockReturning.mockImplementation(() => []);

      const createdDonationPreRating = await donationPreRatingService.create(mockedSendedDonationPreRating);

      expect(createdDonationPreRating).toEqual(null);
    });
  });

  describe('getUnique', () => {
    it('should return a donation pre rating', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      
      mockFrom.mockImplementation(() => ({
        leftJoin: mockLeftJoin
      }));

      mockLeftJoin
      .mockImplementationOnce(() => ({
        leftJoin: mockLeftJoin,
      }))
      .mockImplementationOnce(() => ({
        leftJoin: mockLeftJoin,
      }))
      .mockImplementationOnce(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedQuery]),
      }));

      const returnedDonationPreRating = await donationPreRatingService.getUnique(id);

      expect(returnedDonationPreRating).toEqual(mockedReturnedDonationPreRating);
    });
  });

  describe('getAll', () => {
    it('should return all donation pre rating', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      mockFrom.mockImplementation(() => ({
        leftJoin: mockLeftJoin
      }));

      mockLeftJoin
      .mockImplementationOnce(() => ({
        leftJoin: mockLeftJoin,
      }))
      .mockImplementationOnce(() => ({
        leftJoin: jest.fn().mockResolvedValue([mockedReturnedQuery]),
      }))
    
      const returnedDonationPreRatings = await donationPreRatingService.getAll();

      expect(returnedDonationPreRatings).toEqual([mockedReturnedDonationPreRating]);
    });
  });

  describe('getAllByPatientId', () => {
    it('should return all donation pre rating by patient id', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      mockFrom.mockImplementation(() => ({
        leftJoin: mockLeftJoin
      }));

      mockLeftJoin
      .mockImplementationOnce(() => ({
        leftJoin: mockLeftJoin,
      }))
      .mockImplementationOnce(() => ({
        leftJoin: mockLeftJoin,
      }))
      .mockImplementationOnce(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedQuery]),
      }));

      const returnedDonationPreRatings = await donationPreRatingService.getAllByPatientId(id);

      expect(returnedDonationPreRatings).toEqual([mockedReturnedDonationPreRating]);
    });
  });

  describe('getAllByDoctorId', () => {
    it('should return all donation pre rating by doctor id', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      mockFrom.mockImplementation(() => ({
        leftJoin: mockLeftJoin
      }));

      mockLeftJoin
      .mockImplementationOnce(() => ({
        leftJoin: mockLeftJoin,
      }))
      .mockImplementationOnce(() => ({
        leftJoin: mockLeftJoin,
      }))
      .mockImplementationOnce(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedQuery]),
      }));

      const returnedDonationPreRatings = await donationPreRatingService.getAllByDoctorId(id);

      expect(returnedDonationPreRatings).toEqual([mockedReturnedDonationPreRating]);
    });
  });

  describe('getUniqueByDoctorId', () => {
    it('should return a donation pre rating', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      mockFrom.mockImplementation(() => ({
        leftJoin: mockLeftJoin
      }));

      mockLeftJoin
      .mockImplementationOnce(() => ({
        leftJoin: mockLeftJoin,
      }))
      .mockImplementationOnce(() => ({
        leftJoin: mockLeftJoin,
      }))
      .mockImplementationOnce(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedQuery]),
      }));

      const returnedDonationPreRating = await donationPreRatingService.getUniqueByDoctorId(id);

      expect(returnedDonationPreRating).toEqual(mockedReturnedDonationPreRating);
    });
  });

  describe('update', () => {
    it('should update and return true', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));

      mockFrom.mockImplementation(() => ({
        leftJoin: mockLeftJoin
      }));

      mockLeftJoin
      .mockImplementationOnce(() => ({
        leftJoin: mockLeftJoin,
      }))
      .mockImplementationOnce(() => ({
        leftJoin: mockLeftJoin,
      }))
      .mockImplementationOnce(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedQuery]),
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
        leftJoin: mockLeftJoin
      }));

      mockLeftJoin
      .mockImplementationOnce(() => ({
        leftJoin: mockLeftJoin,
      }))
      .mockImplementationOnce(() => ({
        leftJoin: mockLeftJoin,
      }))
      .mockImplementationOnce(() => ({
        where: jest.fn().mockResolvedValue([]),
      }));

      const updated = await donationPreRatingService.update(id, mockedSendedDonationPreRating);

      expect(updated).toEqual(null);
    });
  });

});