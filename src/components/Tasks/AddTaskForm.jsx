import React, {useState} from 'react';
import axios from 'axios';

import addSvg from '../../assets/img/add.svg';

const AddTaskForm = ({list, onAddTask}) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] =useState();

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue('');
  }

  const addTask = () => {
    const obj = {      
      listId: list.id,
      text: inputValue,
      completed: false
    };
    setIsLoading(true);
    axios.post('/tasks', obj).then(({data}) => { 
      onAddTask(list.id, data);
      toggleFormVisible();
    }).catch(() => {
      alert('Ошибка при добавлении задачи!');
    }).finally(() => {
      setIsLoading(false);
    });    
  }

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div className="tasks__form-new" onClick={toggleFormVisible}>
          <img src={addSvg} alt="add" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input type="text" className="field" placeholder="Текст задачи" value={inputValue} onChange={e => setInputValue(e.target.value)} />
          <button className="button" onClick={addTask} disabled={isLoading}>
            {isLoading ? 'Добавление...' : 'Добавить задачу'}
          </button>
          <button className="button button--grey" onClick={toggleFormVisible}>Отмена</button>
        </div>
      )}     
    </div>     
  );
}

export default AddTaskForm;