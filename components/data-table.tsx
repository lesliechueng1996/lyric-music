import SortIcon from './sort-icon';

export interface Column {
  key: string;
  title: string;
  sortable?: boolean;
  hidden?: boolean;
}

export default function DataTable<T extends { [key: string]: string }>({
  data,
  columns,
  uniqueKey,
}: {
  data: Array<T>;
  columns: Array<Column>;
  uniqueKey: string;
}) {
  return (
    <div className="rounded-2xl border overflow-hidden">
      <table className="table-auto w-full border-collapse text-slate-400">
        <thead className="bg-slate-50 text-left font-medium border-b">
          <tr>
            {columns
              .filter((column) => !column.hidden)
              .map((column) => (
                <th className="p-4 pl-8 cursor-pointer" key={column.key}>
                  <div className="flex flex-row items-center gap-2">
                    {column.title}
                    {column.sortable && <SortIcon sortType={undefined} />}
                  </div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row[uniqueKey]}>
              {columns
                .filter((column) => !column.hidden)
                .map((column) => (
                  <td
                    key={`${row[uniqueKey]}-${column.key}`}
                    className="border-b border-slate-100 p-4 pl-8 text-slate-500"
                  >
                    {row[column.key]}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
