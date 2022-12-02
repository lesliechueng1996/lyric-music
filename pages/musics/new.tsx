import Layout from '@/components/layout';
import UploadMusic from '@/components/upload-music';
import { Tab } from '@headlessui/react';

const tabClass = ({ selected }: { selected: boolean }) =>
  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
    selected
      ? 'bg-white shadow'
      : 'text-blue-400 hover:bg-white/[0.12] hover:text-white'
  }`;

export default function NewMusicPage() {
  return (
    <Layout title="添加歌曲">
      <div className="h-full bg-white p-5">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab key="file" className={tabClass}>
              文件导入
            </Tab>
            <Tab key="url" className={tabClass}>
              URL导入
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
              <UploadMusic />
            </Tab.Panel>
            <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
              456
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Layout>
  );
}
