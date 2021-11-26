import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import Badge from '../Badge';

import removeSvg from '../../assets/img/remove.svg';

import './List.scss';

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {
  const removeList = (item) => {
    if (window.confirm('Вы действительно хотите удалить список')) {
      axios.delete('/lists/' + item.id).then(() => {
        onRemove(item.id);
      });
    }
  }

  return (    
    <ul className="list" onClick={onClick}>
      {
        items.map((item, index) => (
          <li key={index} className={classNames(item.className, {active: item.active ? item.active : activeItem && activeItem.id === item.id})} onClick={onClickItem ? () => onClickItem(item) : null}>
            <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
            <div>
              <span title={item.name}>{item.name}</span>
              {item.tasks && <span>({item.tasks.length})</span>}              
            </div>            
            {isRemovable && <img src={removeSvg} alt="Remove" className="list__remove-icon" onClick={() => removeList(item)} />}
          </li>
        ))
      }      
    </ul>        
  );
}

export default List;