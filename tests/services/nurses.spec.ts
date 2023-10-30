import nursesService, { CreateNurseDto, Nurse } from '../../src/services/nurses';
import dbClient from '../../src/clients/db';

jest.mock('../../src/clients/db');

describe('nurses service', () => {
  let mockInsert: jest.Mock;
  let mockValues: jest.Mock;
  let mockReturning: jest.Mock;
  let mockSelect: jest.Mock;
  let mockFrom: jest.Mock;
  let mockLeftJoin: jest.Mock;
  let mockUpdate: jest.Mock;
  let mockSet: jest.Mock;
  let mockDelete: jest.Mock;

  const id = "184e3edc-f1d3-4844-8766-310701a3eae7"

  const mockedSendedNurse = {
    specialty: 'test',
    coren_number: '232323232323',
    emergencyTelContact: 'test',
    userId: id,
  } satisfies CreateNurseDto;

  const mockedReturnedNurse = {
    id,
    ...mockedSendedNurse,
    subspecialties: null,
    disabled: false,
    disabledAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  } satisfies Nurse;

  beforeEach(() => {
    mockInsert = jest.fn().mockReturnThis();
    mockValues = jest.fn().mockReturnThis();
    mockReturning = jest.fn().mockReturnThis();
    
    mockSelect = jest.fn().mockReturnThis();
    mockFrom = jest.fn().mockReturnThis();
    mockLeftJoin = jest.fn().mockReturnThis();
    
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
      mockReturning.mockImplementation(() => [mockedReturnedNurse]);

      const createdDoctorId = await nursesService.create(mockedSendedNurse);

      expect(createdDoctorId).toEqual(id);
    });

    it('should return null if not created', async () => {
      mockInsert.mockImplementation(() => ({
        values: mockValues,
      }));
      mockValues.mockImplementation(() => ({
        returning: mockReturning,
      }));
      mockReturning.mockImplementation(() => []);

      const createdDoctorId = await nursesService.create(mockedSendedNurse);

      expect(createdDoctorId).toEqual(null);
    });
  });

  describe('getUnique', () => {
    it('should return a nurse', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      
      mockFrom.mockImplementation(() => ({
        leftJoin: mockLeftJoin,
      }));

      mockLeftJoin
        .mockImplementationOnce(() => ({
          leftJoin: mockLeftJoin,
        }))
        .mockImplementationOnce(() => ({
          where: jest.fn().mockResolvedValue([mockedReturnedNurse]),
        }));

      const returnedDoctor = await nursesService.getUnique(id);

      expect(returnedDoctor).toEqual(mockedReturnedNurse);
    });
  });

  describe('getAll', () => {
    it('should return all nurses', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));

      mockFrom.mockImplementation(() => ({
        leftJoin: mockLeftJoin,
      }));

      mockLeftJoin
      .mockImplementationOnce(() => ({
        leftJoin: jest.fn().mockResolvedValue([mockedReturnedNurse]),
      }))


      const returnedDoctors = await nursesService.getAll();

      expect(returnedDoctors).toEqual([mockedReturnedNurse]);
    });
  });

  describe('getUniqueByUserId', () => {
    it('should return a nurse', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      mockFrom.mockImplementation(() => ({
        leftJoin: mockLeftJoin,
      }));

      mockLeftJoin
        .mockImplementationOnce(() => ({
          leftJoin: mockLeftJoin,
        }))
        .mockImplementationOnce(() => ({
          where: jest.fn().mockResolvedValue([mockedReturnedNurse]),
        }));

      const returnedDoctor = await nursesService.getUniqueByUserId(id);

      expect(returnedDoctor).toEqual(mockedReturnedNurse);
    });
  });

  describe('update', () => {
    it('should update and return true', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));

      mockFrom.mockImplementation(() => ({
        leftJoin: mockLeftJoin,
      }));

      mockLeftJoin
        .mockImplementationOnce(() => ({
          leftJoin: mockLeftJoin,
        }))
        .mockImplementationOnce(() => ({
          where: jest.fn().mockResolvedValue([mockedReturnedNurse]),
        }));


      mockUpdate.mockImplementation(() => ({
        set: mockSet,
      }));
      mockSet.mockImplementation(() => ({
        where: mockReturning,
      }));

      mockReturning.mockImplementation(() => ({
        returning: jest.fn().mockResolvedValue([mockedReturnedNurse])
      }));

      const updated = await nursesService.update(id, mockedSendedNurse);

      expect(updated).toEqual(true);
    });

    it('should return null if not updated', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      
      mockFrom.mockImplementation(() => ({
        leftJoin: mockLeftJoin,
      }));

      mockLeftJoin
        .mockImplementationOnce(() => ({
          leftJoin: mockLeftJoin,
        }))
        .mockImplementationOnce(() => ({
          where: jest.fn().mockResolvedValue([]),
        }));

      const updated = await nursesService.update(id, mockedSendedNurse);

      expect(updated).toEqual(null);
    });
  });

});