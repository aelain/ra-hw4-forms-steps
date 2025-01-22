import { useState } from 'react';
import './App.css';
import Training from './Training';

function App() {
  const [training, setTraining] = useState([]);

  const onSubmit = event => {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData);
    data.traversed = parseFloat(data.traversed) || 0;

    const dateFormated = date => {
      const fullDate = new Date(date);
      const day = fullDate.getDate();
      const month = fullDate.getMonth() + 1;
      const year = fullDate.getFullYear();
      const resultDay = day > 9 ? day : '0' + day;
      const resultMonth = month > 9 ? month : '0' + month;
      return resultDay + '.' + resultMonth + '.' + year;
    };

    data.date = dateFormated(data.date);
    const indexSameDate = training.findIndex(item => item.date === data.date);

    if (training.length === 0 || indexSameDate === -1) {
      setTraining([...training, data]);
    } else {
      setTraining(training.map(item => {
        if (item.date === data.date) {
          data.traversed = Number(item.traversed) + Number(data.traversed);
          return data;
        } else {
          return item;
        }
      }));
    }

    event.target.reset();
  };

  const handleDeleteItem = event => {
    event.preventDefault();
    const dateToDelete = event.target.closest('tr').firstChild.textContent;
    setTraining(training.filter(item => item.date !== dateToDelete));
  };

  return (
    <div>
      <form onSubmit={(event) => onSubmit(event)}>
        <label>
          Дата
          <input type="date" name='date' required />
        </label>
        <label>
          Пройдено км
          <input type="text" name='traversed' required />
        </label>
        <button>OK</button>
      </form>

      <table className='table-training'>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Пройдено км</th>
            <th>Действия</th>
          </tr>
        </thead>
        <Training data={training} handleDeleteItem={handleDeleteItem} />
      </table>
    </div>
  );
}

export default App;
