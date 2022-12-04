import { uploadMusic, isMusicExist } from '@/utils/storage';

jest.mock('minio', () => {
  return {
    Client: jest.fn().mockImplementation(() => {
      return {
        setRequestOptions: () => {},
        fPutObject: (bucketName, objectName, filePath, metedata, callback) => {
          if (objectName) {
            callback(null, 'mock result');
          } else {
            callback(new Error('objectName empty'));
          }
        },
        getObjectTagging: (bucketName, objectName, callback) => {
          if (objectName) {
            callback(null, true);
          } else {
            callback(new Error('objectName error'));
          }
        },
      };
    }),
  };
});

describe('storage test', () => {
  test('upload music success', async () => {
    const result = await uploadMusic('mock file path', 'mock name');
    expect(result).toEqual('mock result');
  });

  test('upload music failed', async () => {
    const promise = uploadMusic('mock file path', null);
    expect(promise).rejects.toThrowError(new Error('objectName empty'));
  });

  test('is music exist success', async () => {
    const result = await isMusicExist('mock name');
    expect(result).toBe(true);
  });

  test('is music exist failed', async () => {
    const result = await isMusicExist(null);
    expect(result).toBe(false);
  });
});
