import patientTransfusionHistoryService, { CreatePatientTransfusionHistoryDto, PatientTransfusionHistory } from '../../src/services/patientTransfusionHistory';
import dbClient from '../../src/clients/db';

jest.mock('../../src/clients/db');

describe('patientTransfusionHistory service', () => {
  let mockInsert: jest.Mock;
  let mockValues: jest.Mock;
  let mockReturning: jest.Mock;
  let mockSelect: jest.Mock;
  let mockFrom: jest.Mock;
  let mockUpdate: jest.Mock;
  let mockSet: jest.Mock;

  const id = "184e3edc-f1d3-4844-8766-310701a3eae7"

  const mockedSendedPatientTransfusionHistory = {
    date: new Date(),
    location: 'Hospital test',
    reason: 'test',
    typeTransfusedBloodComponent: 'test',
    quantity: 20.5,
    results: 'test',
    reactions: null,
    notes: null,
    patientId: id,
    doctorId: id,
    nurseId: id,
  } satisfies CreatePatientTransfusionHistoryDto;

  const mockedReturnedPatientTransfusionHistory = {
    id,
    ...mockedSendedPatientTransfusionHistory,
    createdAt: new Date(),
    updatedAt: new Date(),
  } satisfies PatientTransfusionHistory;

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
    it('should create and return a patient transfusion history', async () => {
      mockInsert.mockImplementation(() => ({
        values: mockValues,
      }));
      mockValues.mockImplementation(() => ({
        returning: mockReturning,
      }));
      mockReturning.mockImplementation(() => [mockedReturnedPatientTransfusionHistory]);

      const createdDoctorId = await patientTransfusionHistoryService.create(mockedSendedPatientTransfusionHistory);

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

      const createdDoctorId = await patientTransfusionHistoryService.create(mockedSendedPatientTransfusionHistory);

      expect(createdDoctorId).toEqual(null);
    });
  });

  describe('getUnique', () => {
    it('should return a patient transfusion history', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedPatientTransfusionHistory])
      }));

      const returnedDoctor = await patientTransfusionHistoryService.getUnique(id);

      expect(returnedDoctor).toEqual(mockedReturnedPatientTransfusionHistory);
    });
  });

  describe('getAll', () => {
    it('should return all patient transfusion historys', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      mockFrom.mockImplementation(() => [mockedReturnedPatientTransfusionHistory]);

      const returnedDoctors = await patientTransfusionHistoryService.getAll();

      expect(returnedDoctors).toEqual([mockedReturnedPatientTransfusionHistory]);
    });
  });

  describe('getUniqueByPatientId', () => {
    it('should return a patient transfusion history', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedPatientTransfusionHistory])
      }));

      const returnedDoctor = await patientTransfusionHistoryService.getUniqueByPatientId(id);

      expect(returnedDoctor).toEqual(mockedReturnedPatientTransfusionHistory);
    });
  });

  describe('update', () => {
    it('should update and return true', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));

      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([mockedReturnedPatientTransfusionHistory])
      }));

      mockUpdate.mockImplementation(() => ({
        set: mockSet,
      }));
      mockSet.mockImplementation(() => ({
        where: mockReturning,
      }));

      mockReturning.mockImplementation(() => ({
        returning: jest.fn().mockResolvedValue([mockedReturnedPatientTransfusionHistory])
      }));

      const updated = await patientTransfusionHistoryService.update(id, mockedSendedPatientTransfusionHistory);

      expect(updated).toEqual(true);
    });

    it('should return null if not updated', async () => {
      mockSelect.mockImplementation(() => ({
        from: mockFrom,
      }));
      
      mockFrom.mockImplementation(() => ({
        where: jest.fn().mockResolvedValue([])
      }));

      const updated = await patientTransfusionHistoryService.update(id, mockedSendedPatientTransfusionHistory);

      expect(updated).toEqual(null);
    });
  });

});