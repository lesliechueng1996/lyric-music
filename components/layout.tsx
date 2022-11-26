import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full h-screen flex flex-col">
      <Head>
        <title>{title ?? 'Lyric Music'}</title>
      </Head>
      <header className="w-full h-16 shadow-sm shadow-gray-400 flex flex-row justify-between px-10 py-2 items-center shrink-0">
        <div>
          <Link href="/">
            <Image src="/images/logo.png" alt="LOGO" width={200} height={48} />
          </Link>
        </div>
        <div className="text-lg">
          <span>请登录</span>
        </div>
      </header>
      <main className="grow pt-2">{children}</main>
    </div>
  );
}
