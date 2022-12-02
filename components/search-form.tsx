import { useRef, useState, ReactNode } from 'react';
import LoadingButton from './loading-button';

export interface SearchFormItem<T> {
  label: string;
  key: Extract<keyof T, string>;
  type: 'text' | 'select';
  options?: Array<{ text: string; value: string }>;
}

export default function SearchForm<T>({
  formData,
  onSearch,
  children,
}: {
  formData: Array<SearchFormItem<T>>;
  onSearch: (data: T) => Promise<void> | void;
  children?: ReactNode;
}) {
  const elements = useRef<{
    [key: string]: HTMLInputElement | HTMLSelectElement | null;
  }>({});
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        {formData.map((formItem) => (
          <div
            className="grid grid-cols-4 gap-3 items-center"
            key={formItem.key}
          >
            <label
              htmlFor={formItem.key}
              className="col-span-1 text-base space-text"
            >
              {formItem.label}
            </label>
            {formItem.type === 'select' ? (
              <select
                id={formItem.key}
                name={formItem.key}
                className="col-span-3"
                ref={(el) => (elements.current[formItem.key] = el)}
              >
                {formItem.options?.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id="musicName"
                name="musicName"
                className="col-span-3"
                ref={(el) => (elements.current[formItem.key] = el)}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-end items-center gap-3">
        <LoadingButton
          onClick={async () => {
            const data: T = Object.keys(elements.current).reduce(
              (preValue, curValue) => ({
                ...preValue,
                [curValue]: elements.current[curValue]?.value,
              }),
              {} as T
            );
            await onSearch(data);
          }}
        >
          搜索
        </LoadingButton>
        {children}
      </div>
    </div>
  );
}
