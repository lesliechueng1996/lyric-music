import Layout from '../components/layout';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';

interface LoginFields {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>();

  const onSubmit = (data: LoginFields) => {
    console.log(data);
  };

  return (
    <Layout title="登录">
      <div className="mx-auto max-w-xl pt-24">
        <form
          className="border rounded-md shadow-md shadow-gray-400 p-10 bg-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-center text-2xl font-bold mb-16">登录</h3>
          <div className="mb-10">
            <input
              id="email"
              className="w-full"
              placeholder="请输入邮箱"
              {...register('email', {
                required: '请输入邮箱地址',
                pattern: {
                  value:
                    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                  message: '邮箱地址格式错误',
                },
              })}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="text-red-500 mt-2">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-10">
            <input
              id="password"
              className="w-full"
              placeholder="请输入密码"
              type="password"
              {...register('password', {
                required: '请输入密码',
              })}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && (
              <p className="text-red-500 mt-2">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-10">
            <Button
              variant="contained"
              className="w-full primary-button"
              type="submit"
            >
              登录
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
