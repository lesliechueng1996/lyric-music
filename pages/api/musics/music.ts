import { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethod, HttpStatus } from 'utils/http';
import logger from 'utils/logger';
import {
  CreateMusicReq,
  schema,
} from '../../../models/request/create-music-req';
import Ajv from 'ajv';
import { isMusicExist } from '../../../utils/storage';
import { saveMusicRecord } from '../../../utils/db/music-dao';
import { getToken } from 'next-auth/jwt';

const ajv = new Ajv();

const createMusicRecord = async (
  body: CreateMusicReq,
  res: NextApiResponse
) => {
  const fileExist = isMusicExist(body.fileId);
  if (!fileExist) {
    logger.error(body, 'file not exist');
    res
      .status(HttpStatus.InternalServerError)
      .json({ message: '请重新上传文件' });
    return;
  }
  try {
    logger.info('start save music record to db');
    await saveMusicRecord({
      musicId: body.fileId,
      name: body.title,
      singer: body.artist,
      duration: String(body.duration),
      isFavorite: false,
    });
    logger.info('music save success');
    res.status(HttpStatus.OK);
  } catch (e) {
    logger.error(e, 'save music error');
    res.status(HttpStatus.InternalServerError).json({ message: '保存失败' });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  logger.info('begin /api/musics/music');
  const token = await getToken({ req });
  if (!token) {
    res.status(HttpStatus.Unauthorized).json({});
    return;
  }

  if (req.method === HttpMethod.POST) {
    logger.info('create music record');
    const validate = ajv.compile(schema);
    if (!validate(req.body)) {
      logger.error(validate.errors, 'request body validate error');
      res.status(HttpStatus.BadRequest).json({ message: '参数异常, 保存失败' });
      return;
    }
    await createMusicRecord(req.body, res);
  } else {
    res.status(HttpStatus.MethodNotAllowed).json({});
  }
};
