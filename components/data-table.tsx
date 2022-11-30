import { ReactNode, useState } from 'react';
import SortIcon, { SortType } from './sort-icon';

export interface Column<T> {
  key: string;
  title: string;
  sortable?: boolean;
  hidden?: boolean;
  render?: (data: T) => ReactNode;
}

interface InnerColumn<T> extends Column<T> {
  sortType: SortType;
}

export default function DataTable<T extends { [key: string]: string }>({
  data,
  columns,
  uniqueKey,
  onSort,
}: {
  data: Array<T>;
  columns: Array<Column<T>>;
  uniqueKey: string;
  onSort?: (data: {
    field: keyof T;
    sortType: SortType;
  }) => void | Promise<void>;
}) {
  const initColumn = columns.map((col) => ({
    ...col,
    sortType: undefined,
  }));
  const [innerColumn, setInnerColumn] =
    useState<Array<InnerColumn<T>>>(initColumn);

  const onHeaderClick = (column: InnerColumn<T>) => async () => {
    if (!column.sortable) {
      return;
    }
    const index = innerColumn.findIndex((item) => item.key === column.key);

    if (column.sortType === undefined) {
      column.sortType = 'ASC';
    } else if (column.sortType === 'ASC') {
      column.sortType = 'DESC';
    } else if (column.sortType === 'DESC') {
      column.sortType = 'ASC';
    } else {
      column.sortType = undefined;
    }
    innerColumn[index] = column;
    innerColumn.forEach((col, i) => {
      if (i !== index) {
        col.sortType = undefined;
      }
    });
    setInnerColumn([...innerColumn]);
    onSort && (await onSort({ field: column.key, sortType: column.sortType }));
  };

  return (
    <div className="rounded-2xl border overflow-hidden">
      <table className="table-auto w-full border-collapse text-slate-400">
        <thead className="bg-slate-50 text-left font-medium border-b">
          <tr>
            {innerColumn
              .filter((column) => !column.hidden)
              .map((column) => (
                <th
                  className={`p-4 pl-8 ${
                    column.sortable ? 'cursor-pointer' : ''
                  }`}
                  key={column.key}
                  onClick={onHeaderClick(column)}
                >
                  <div className="flex flex-row items-center gap-2">
                    {column.title}
                    {column.sortable && <SortIcon sortType={column.sortType} />}
                  </div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row[uniqueKey]}>
              {innerColumn
                .filter((column) => !column.hidden)
                .map((column) => (
                  <td
                    key={`${row[uniqueKey]}-${column.key}`}
                    className="border-b border-slate-100 p-4 pl-8 text-slate-500"
                  >
                    {!!column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
