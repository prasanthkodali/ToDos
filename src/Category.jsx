import React from 'react';
import './Category.scss';

function Category(props) {
  return (
    <div
      className={`Category ${props.selected ? 'selected' : ''}`}
      onClick={() => props.onSelect(props.id)}
    >
      {props.name}
    </div>
  );
}

export default Category;
