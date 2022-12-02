import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import 'react-dropzone/examples/theme.css';
import { useToast } from 'contexts/toast-context';
import LoadingButton from './loading-button';
import { HttpMethod, HttpStatus } from 'utils/http';
import { useForm } from 'react-hook-form';

interface MusicFileMetadata {
  fileId: string;
  title: string;
  artist: string;
  duration: number;
}

export default function UploadMusic() {
  const [uploadFile, setUploadFile] = useState<File>();
  const { info, error } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MusicFileMetadata>();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'audio/mpeg': ['.mp3'],
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024,
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setUploadFile(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  const uploadMusic = async (music: File) => {
    const fd = new FormData();
    fd.append('file', music);
    try {
      const response = await fetch('/api/musics/file', {
        method: HttpMethod.POST,
        body: fd,
      });
      const body = await response.json();
      if (response.status === HttpStatus.Created) {
        info('上传成功');
        // setValue(body);
      } else {
        error(body.message);
      }
    } catch (e) {
      error('上传文件失败');
    }
  };

  const onSave = (data: MusicFileMetadata) => {};

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-6 container">
        <div
          {...getRootProps({
            className: 'dropzone h-40 !flex-none justify-center cursor-pointer',
          })}
        >
          <input {...getInputProps()} />
          <p>{uploadFile ? uploadFile.name : '上传 mp3 文件'}</p>
        </div>
        <div className="mt-5">
          <LoadingButton
            onClick={async () => {
              if (uploadFile) {
                await uploadMusic(uploadFile);
                return;
              }
              error(`请先选择mp3文件`);
            }}
          >
            上传
          </LoadingButton>
        </div>
      </div>
      <div className="col-span-6">
        <form
          className="border rounded-md shadow-md shadow-gray-400 p-10 bg-white"
          onSubmit={handleSubmit(onSave)}
        >
          <div className="mb-10">
            <button type="submit" className="primary-button w-full">
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
