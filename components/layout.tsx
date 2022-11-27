import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';

export default function Layout({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  const { data: session, status } = useSession();

  return (
    <div className="w-full h-screen flex flex-col">
      <Head>
        <title>{title ?? 'Lyric Music'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="w-full h-16 shadow-inner shadow-gray-9=400 flex flex-row justify-between px-10 py-2 items-center shrink-0">
        <div>
          <Link href="/">
            <Image src="/images/logo.png" alt="LOGO" width={200} height={48} />
          </Link>
        </div>
        {status === 'loading' && (
          <div className="text-lg">
            <span>加载中</span>
          </div>
        )}
        {status === 'unauthenticated' && (
          <div className="text-lg">
            <Link href="/login">请登录</Link>
          </div>
        )}
        {status === 'authenticated' && (
          <div className="text-lg">
            <span>{session.user?.nickname}</span>
          </div>
        )}
      </header>
      <main
        className="grow pt-2 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: 'url("./images/bg.jpg")' }}
      >
        {children}
      </main>
    </div>
  );
}
