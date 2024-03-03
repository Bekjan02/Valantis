import { FC } from 'react';

interface IProps {
  items: string[];
  onChange: (value: string) => void;
}

export const BrandSelect: FC<IProps> = ({ items, onChange }) => {
  return (
    <select
      name='brand'
      onChange={(e) => onChange(e.target.value)}
      className='block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
    >
      {items.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};
