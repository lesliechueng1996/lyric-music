/**
 * @jest-environment node
 */

import handler from '@/pages/api/musics/music';
import { getToken } from 'next-auth/jwt';
import { isMusicExist } from '@/utils/storage';
import { saveMusicRecord } from '@/utils/db/music-dao';

jest.mock('next-auth/jwt');
jest.mock('@/utils/storage');
jest.mock('@/utils/db/music-dao');

describe('/api/musics/music test', () => {
  test('without token 401', async () => {
    getToken.mockResolvedValue(null);

    const req = {};
    const res = {
      status: jest.fn((status) => res),
      json: jest.fn(),
    };
    await handler(req, res);
    expect(res.status.mock.lastCall[0]).toBe(401);
    expect(res.json.mock.lastCall[0]).toEqual({});
  });

  describe('with token', () => {
    beforeAll(() => {
      getToken.mockResolvedValue('mock token');
    });

    test('method not allowed', async () => {
      const req = {
        method: 'GET',
      };
      const res = {
        status: jest.fn((status) => res),
        json: jest.fn(),
      };
      await handler(req, res);
      expect(res.status.mock.lastCall[0]).toBe(405);
      expect(res.json.mock.lastCall[0]).toEqual({});
    });

    test('miss fileId in request body', async () => {
      const req = {
        method: 'POST',
        body: {},
      };
      const res = {
        status: jest.fn((status) => res),
        json: jest.fn(),
      };
      await handler(req, res);
      expect(res.status.mock.lastCall[0]).toBe(400);
      expect(res.json.mock.lastCall[0]).toEqual({
        message: '参数异常, 保存失败',
      });
    });

    test('miss title in request body', async () => {
      const req = {
        method: 'POST',
        body: {
          fileId: 'mock fileId',
        },
      };
      const res = {
        status: jest.fn((status) => res),
        json: jest.fn(),
      };
      await handler(req, res);
      expect(res.status.mock.lastCall[0]).toBe(400);
      expect(res.json.mock.lastCall[0]).toEqual({
        message: '参数异常, 保存失败',
      });
    });

    test('miss artist in request body', async () => {
      const req = {
        method: 'POST',
        body: {
          fileId: 'mock fileId',
          title: 'mock title',
        },
      };
      const res = {
        status: jest.fn((status) => res),
        json: jest.fn(),
      };
      await handler(req, res);
      expect(res.status.mock.lastCall[0]).toBe(400);
      expect(res.json.mock.lastCall[0]).toEqual({
        message: '参数异常, 保存失败',
      });
    });

    test('miss duration in request body', async () => {
      const req = {
        method: 'POST',
        body: {
          fileId: 'mock fileId',
          title: 'mock title',
          artist: 'mock artist',
        },
      };
      const res = {
        status: jest.fn((status) => res),
        json: jest.fn(),
      };
      await handler(req, res);
      expect(res.status.mock.lastCall[0]).toBe(400);
      expect(res.json.mock.lastCall[0]).toEqual({
        message: '参数异常, 保存失败',
      });
    });

    test('music file not exist', async () => {
      isMusicExist.mockResolvedValue(false);

      const req = {
        method: 'POST',
        body: {
          fileId: 'mock fileId',
          title: 'mock title',
          artist: 'mock artist',
          duration: 300,
        },
      };
      const res = {
        status: jest.fn((status) => res),
        json: jest.fn(),
      };
      await handler(req, res);
      expect(res.status.mock.lastCall[0]).toBe(500);
      expect(res.json.mock.lastCall[0]).toEqual({
        message: '请重新上传文件',
      });
    });

    test('save db success', async () => {
      isMusicExist.mockResolvedValue(true);
      saveMusicRecord.mockResolvedValue();

      const req = {
        method: 'POST',
        body: {
          fileId: 'mock fileId',
          title: 'mock title',
          artist: 'mock artist',
          duration: 300,
        },
      };
      const res = {
        status: jest.fn((status) => res),
        json: jest.fn(),
      };
      await handler(req, res);
      expect(res.status.mock.lastCall[0]).toBe(201);
      expect(res.json.mock.lastCall[0]).toEqual({});
      expect(saveMusicRecord.mock.lastCall[0]).toEqual({
        musicId: req.body.fileId,
        name: req.body.title,
        singer: req.body.artist,
        duration: String(req.body.duration),
        isFavorite: false,
      });
    });

    test('save db fail', async () => {
      isMusicExist.mockResolvedValue(true);
      saveMusicRecord.mockRejectedValue(new Error('mock error'));

      const req = {
        method: 'POST',
        body: {
          fileId: 'mock fileId',
          title: 'mock title',
          artist: 'mock artist',
          duration: 300,
        },
      };
      const res = {
        status: jest.fn((status) => res),
        json: jest.fn(),
      };
      await handler(req, res);
      expect(res.status.mock.lastCall[0]).toBe(500);
      expect(res.json.mock.lastCall[0]).toEqual({ message: '保存失败' });
      expect(saveMusicRecord.mock.lastCall[0]).toEqual({
        musicId: req.body.fileId,
        name: req.body.title,
        singer: req.body.artist,
        duration: String(req.body.duration),
        isFavorite: false,
      });
    });
  });
});
