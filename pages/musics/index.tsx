import Layout from '@/components/layout';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';

export default function MusicsPage() {
  return <Layout title="全部歌曲">musics</Layout>;
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const token = await getToken({ req: context.req });
//   if (!token) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// };
