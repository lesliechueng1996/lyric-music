import { JSONSchemaType } from 'ajv';

export interface CreateMusicReq {
  fileId: string;
  title: string;
  artist: string;
  duration: number;
}

export const schema: JSONSchemaType<CreateMusicReq> = {
  type: 'object',
  properties: {
    fileId: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    artist: {
      type: 'string',
    },
    duration: {
      type: 'number',
    },
  },
  required: ['fileId', 'title', 'artist', 'duration'],
};
