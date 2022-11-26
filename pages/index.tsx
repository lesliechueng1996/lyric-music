import Layout from '../components/layout';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { status } = useSession();

  if (status === 'loading') {
    return <Layout>loading...</Layout>;
  }

  if (status === 'unauthenticated') {
    window.location.href = '/login';
    return;
  }

  return (
    <Layout>
      <div>test</div>
    </Layout>
  );
}
