import mongoose from 'mongoose';
import logger from 'utils/logger';

export async function connect() {
  await mongoose.connect(process.env.MONGODB_URL ?? '');
  logger.info('db connected');
}
