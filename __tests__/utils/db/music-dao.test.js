/**
 * @jest-environment node
 */

import { saveMusicRecord } from '@/utils/db/music-dao';
import MusicModel from '@/models/db/music';
import { connect } from '@/utils/db/index';

jest.mock('@/utils/db/index', () => {
  return {
    connect: jest.fn(),
  };
});

jest.mock('@/models/db/music', () => {
  return {
    create: jest.fn(),
  };
});

describe('music dao test', () => {
  test('save music record success', async () => {
    const param = {
      musicId: 'musicId',
      lyricId: 'lyricId',
      name: 'name',
      singer: 'singer',
      duration: 'duration',
      isFavorite: false,
    };
    await saveMusicRecord(param);
    expect(connect).toHaveBeenCalled();
    expect(MusicModel.create.mock.lastCall[0]).toEqual(param);
  });
});
