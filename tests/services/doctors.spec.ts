import doctorsService, { CreateDoctorDto, Doctor} from '../../src/services/doctors';
import dbClient from '../../src/clients/db';

jest.mock('../../src/clients/db');

describe('doctors service', () => {
  let mockInsert: jest.Mock;
  let mockValues: jest.Mock;
  let mockReturning: jest.Mock;
  let mockSelect: jest.Mock;
  let mockFrom: jest.Mock;
  let mockUpdate: jest.Mock;
  let mockSet: jest.Mock;
  let mockDelete: jest.Mock;

  const id = "184e3edc-f1d3-4844-8766-310701a3eae7"

  const mockedSendedDoctor = {
    specialty: 'test',
    registrationNumber: '232323232323',
    emergencyTelContact: 'test',
    userId: id,
  } satisfies CreateDoctorDto;

  const mockedReturnedDoctor = {
    id,
    ...mockedSendedDoctor,
    subspecialties: null,
    disabled: false,
    disabledAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  } satisfies Doctor;

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
    it('should create and return a doctor', async () => {
      mockInsert.mockImplementation(() => ({
        values: mockValues,
      }));
      mockValues.mockImplementation(() => ({
        returning: mockReturning,
      }));
      mockReturning.mockImplementation(() => [mockedReturnedDoctor]);

      const createdDoctorId = await doctorsService.create(mockedSendedDoctor);

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

      const createdDoctorId = await doctorsService.create(mockedSendedDoctor);

      expect(createdDoctorId).toEqual(null);
    });
  });

  describe('getUnique', () => {
    it('should return a doctor', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedDoctor])
      }));

      const returnedDoctor = await doctorsService.getUnique(id);

      expect(returnedDoctor).toEqual(mockedReturnedDoctor);
    });
  });

  describe('getAll', () => {
    it('should return all doctors', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      mockFrom.mockImplementation(() => [mockedReturnedDoctor]);

      const returnedDoctors = await doctorsService.getAll();

      expect(returnedDoctors).toEqual([mockedReturnedDoctor]);
    });
  });

  describe('getUniqueByUserId', () => {
    it('should return a doctor', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedDoctor])
      }));

      const returnedDoctor = await doctorsService.getUniqueByUserId(id);

      expect(returnedDoctor).toEqual(mockedReturnedDoctor);
    });
  });

  describe('update', () => {
    it('should update and return true', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));

      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedDoctor])
      }));

      mockUpdate.mockImplementation(() => ({
        set: mockSet,
      }));
      mockSet.mockImplementation(() => ({
        where: mockReturning,
      }));

      mockReturning.mockImplementation(() => ({
        returning: jest.fn().mockResolvedValue([mockedReturnedDoctor])
      }));

      const updated = await doctorsService.update(id, mockedSendedDoctor);

      expect(updated).toEqual(true);
    });

    it('should return null if not updated', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([])
      }));

      const updated = await doctorsService.update(id, mockedSendedDoctor);

      expect(updated).toEqual(null);
    });
  });

});