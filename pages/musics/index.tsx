import DataTable, { Column } from '@/components/data-table';
import Layout from '@/components/layout';
import SearchForm, { SearchFormItem } from '@/components/search-form';

interface MusicSearchForm {
  musicName: string;
  singer: string;
  hasLyric: string;
}

interface MusicData {
  id: string;
  musicName: string;
  singer: string;
  duration: string;
  hasLyric: string;
}

const cols: Array<Column<MusicData>> = [
  {
    key: 'id',
    title: '',
    hidden: true,
  },
  {
    key: 'musicName',
    title: '歌曲名称',
    sortable: true,
  },
  {
    key: 'singer',
    title: '歌手',
    sortable: true,
  },
  {
    key: 'duration',
    title: '时长',
    sortable: true,
  },
  {
    key: 'hasLyric',
    title: '是否有歌词',
    sortable: true,
  },
  {
    key: 'tools',
    title: '操作',
    render: (row: MusicData) => (
      <div>
        <button className="primary-button">删除</button>
      </div>
    ),
  },
];

export default function MusicsPage() {
  const formData: Array<SearchFormItem<MusicSearchForm>> = [
    { label: '歌曲名称', key: 'musicName', type: 'text' },
    { label: '歌手', key: 'singer', type: 'text' },
    {
      label: '是否有歌词',
      key: 'hasLyric',
      type: 'select',
      options: [
        { text: '全部', value: '' },
        { text: '是', value: '1' },
        { text: '否', value: '0' },
      ],
    },
  ];

  const tableData = [
    {
      id: '1',
      musicName: 'musicName1',
      singer: 'singer1',
      duration: 'duration1',
      hasLyric: 'hasLyric1',
    },
    {
      id: '2',
      musicName: 'musicName2',
      singer: 'singer2',
      duration: 'duration2',
      hasLyric: 'hasLyric2',
    },
    {
      id: '3',
      musicName: 'musicName3',
      singer: 'singer3',
      duration: 'duration3',
      hasLyric: 'hasLyric3',
    },
  ];

  return (
    <Layout title="全部歌曲">
      <div className="flex flex-col gap-5 h-full">
        <div className="bg-white p-5 shrink-0">
          <SearchForm
            formData={formData}
            onSearch={(data: MusicSearchForm) => {
              console.log(data);
            }}
          />
        </div>
        <div className="bg-white p-5 grow">
          <DataTable
            columns={cols}
            data={tableData}
            uniqueKey="id"
            onSort={({ field, sortType }) => {
              console.log(field, sortType);
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
