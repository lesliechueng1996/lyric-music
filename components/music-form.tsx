import { useToast } from 'contexts/toast-context';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export interface MusicFileMetadata {
  fileId: string;
  title: string;
  artist: string;
  duration: number;
}

export default function MusicForm({
  metadata,
  onFormSave,
}: {
  metadata: MusicFileMetadata;
  onFormSave: (data: MusicFileMetadata) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MusicFileMetadata>({
    defaultValues: metadata,
  });
  const { error } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setValue('title', metadata.title);
    setValue('artist', metadata.artist);
    setValue('duration', metadata.duration);
  }, [metadata]);

  const onSave = async (data: MusicFileMetadata) => {
    if (!metadata.fileId) {
      error('请先上传歌曲');
      return;
    }
    setLoading(true);
    try {
      await onFormSave({
        ...data,
        fileId: metadata.fileId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="border rounded-md shadow-md shadow-gray-400 p-10 bg-white"
      onSubmit={handleSubmit(onSave)}
    >
      <div className="mb-10">
        <input
          id="title"
          className="w-full"
          placeholder="请输入歌曲名"
          {...register('title', {
            required: '请输入歌曲名',
          })}
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        {errors.title && (
          <p className="text-red-500 mt-2">{errors.title.message}</p>
        )}
      </div>
      <div className="mb-10">
        <input
          id="artist"
          className="w-full"
          placeholder="请输入歌手"
          {...register('artist', {
            required: '请输入歌手',
          })}
          aria-invalid={errors.artist ? 'true' : 'false'}
        />
        {errors.artist && (
          <p className="text-red-500 mt-2">{errors.artist.message}</p>
        )}
      </div>
      <div className="mb-10">
        <input
          id="duration"
          className="mr-5"
          placeholder="请输入时长"
          {...register('duration', {
            required: '请输入时长',
          })}
          aria-invalid={errors.duration ? 'true' : 'false'}
        />
        秒
        {errors.duration && (
          <p className="text-red-500 mt-2">{errors.duration.message}</p>
        )}
      </div>
      <div className="mb-10">
        <button
          type="submit"
          className={
            loading ? 'disabled-button w-full' : 'primary-button w-full'
          }
        >
          保存
        </button>
      </div>
    </form>
  );
}
