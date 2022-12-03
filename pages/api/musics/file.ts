import type { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethod, HttpStatus } from 'utils/http';
import { IncomingForm, File } from 'formidable';
import logger from '../../../utils/logger';
import { parseFile } from 'music-metadata';
import { uploadMusic as uploadMusicFile } from '../../../utils/storage';
import { nanoid } from 'nanoid';
import { getToken } from 'next-auth/jwt';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMusic = async (req: NextApiRequest, res: NextApiResponse) => {
  logger.info('begin /api/musics/file upload file');
  const form = new IncomingForm();

  const uploadPromise = new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject();
        return;
      }
      resolve(files.file as File);
    });
  });

  try {
    const file = await uploadPromise;
    const metadata = await parseFile(file.filepath);
    const {
      format: { duration },
      common: { title, artist },
    } = metadata;
    const musicMetadata = {
      title,
      artist,
      duration,
    };
    logger.info(musicMetadata, 'upload music file metadata');

    const fileId = nanoid();
    const extIndex = file.filepath.lastIndexOf('.');
    const ext = file.filepath.substring(extIndex);
    await uploadMusicFile(file.filepath, `${fileId}${ext}`);

    res.status(HttpStatus.Created).json({
      fileId,
      ...musicMetadata,
    });
  } catch (e) {
    logger.error(e, 'upload file error');
    res
      .status(HttpStatus.InternalServerError)
      .json({ message: '上传文件失败' });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  logger.info('begin /api/musics/file');
  const token = await getToken({ req });
  if (!token) {
    res.status(HttpStatus.Unauthorized).json({});
    return;
  }

  if (req.method === HttpMethod.POST) {
    await uploadMusic(req, res);
  } else {
    res.status(HttpStatus.MethodNotAllowed).json({});
  }
};
