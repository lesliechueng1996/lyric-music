import {
  ArrowsUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/20/solid';

export default function SortIcon({
  sortType,
}: {
  sortType: 'ASC' | 'DESC' | undefined;
}) {
  if (sortType === 'ASC') {
    return <ArrowUpIcon className="w-5 h-5" />;
  }
  if (sortType === 'DESC') {
    return <ArrowDownIcon className="w-5 h-5" />;
  }
  return <ArrowsUpDownIcon className="w-5 h-5" />;
}
