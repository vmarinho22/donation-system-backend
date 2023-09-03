import ApiError from '../../../src/utils/errors/apiError'

describe('ApiError', () => {
  it('should be an instance of Error', () => {
    const apiError = new ApiError(400, 'Bad Request');

    expect(apiError).toBeInstanceOf(Error);
  });

  it('should have a statusCode property', () => {
    const apiError = new ApiError(400, 'Bad Request');

    expect(apiError.statusCode).toBe(400);
  });

  it('should have a message property', () => {
    const apiError = new ApiError(400, 'Bad Request');

    expect(apiError.message).toBe('Bad Request');
  });

  it('should have a stack property', () => {
    const apiError = new ApiError(400, 'Bad Request');

    expect(apiError.stack).toBeDefined();
  });
});