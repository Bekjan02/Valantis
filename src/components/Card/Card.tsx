import { FC, memo } from 'react';

import { IItem } from 'types/index';

interface IProps {
  items: IItem[];
}

const CardComponent: FC<IProps> = ({ items }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {items.map((item, i) => (
        <div key={item.id} className='card shadow-lg rounded-lg p-4'>
          {i + 1}
          <h5>id: {item.id}</h5>
          <span>price: {item.price}</span>
          <p>brand name: {item.brand}</p>
          description: {item.product}
        </div>
      ))}
    </div>
  );
};

export const Card = memo(CardComponent);
Card.displayName = 'Card';
