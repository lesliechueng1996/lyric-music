import {
  ArrowsUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/20/solid';

export type SortType = 'ASC' | 'DESC' | undefined;

export default function SortIcon({
  sortType,
}: {
  sortType: SortType
}) {
  if (sortType === 'ASC') {
    return <ArrowUpIcon className="w-5 h-5" />;
  }
  if (sortType === 'DESC') {
    return <ArrowDownIcon className="w-5 h-5" />;
  }
  return <ArrowsUpDownIcon className="w-5 h-5" />;
}
