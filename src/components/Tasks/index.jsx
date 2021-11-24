import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import AddTaskForm from './AddTaskForm';
import Task from './Task';

import editSvg from '../../assets/img/edit.svg';

import './Tasks.scss';

const Tasks = ({list, onEditTitle, onAddTask, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask}) => {
  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios.patch('http://localhost:3001/lists/' + list.id, {
        name: newTitle
      }).catch(() => {
        alert('Не удалось обновить название списка!');
      });
    }
  }  

  return (
    <div className="tasks">      
      <h2 className="tasks__title" style={{color: list.color.hex}}>
        <Link to={`/lists/${list.id}`}>
          {list.name}
        </Link>
        <img src={editSvg} alt="edit" onClick={editTitle} />
      </h2>      
      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {
          list.tasks && list.tasks.map(task => (
            <Task key={task.id} list={list} onEdit={onEditTask} onRemove={onRemoveTask} onComplete={onCompleteTask} {...task} />
          ))
        }  
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />    
      </div>
    </div>
  );
}

export default Tasks;