import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, Fragment } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  PencilIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/20/solid';

export default function Layout({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  const { data: session, status } = useSession();

  const logout = () => {
    signOut({
      callbackUrl: '/login',
    });
  };

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
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-orange-300 px-4 py-2 text-sm font-medium text-black hover:bg-orange-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  {session.user?.avatar && (
                    <div>
                      <Image
                        src={session.user?.avatar}
                        alt="avatar"
                        width={40}
                        height={40}
                      />
                    </div>
                  )}
                  {session.user?.nickname}
                  <ChevronDownIcon
                    className="ml-2 -mr-1 h-5 w-5 text-black"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? 'bg-orange-300 text-white'
                              : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <PencilIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          用户信息
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`${
                            active
                              ? 'bg-orange-300 text-white'
                              : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <ArrowLeftOnRectangleIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          登出
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
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
