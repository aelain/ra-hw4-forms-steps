import PropTypes from 'prop-types';

const Training = ({ data = [], handleDeleteItem }) => {
  if (data.length === 0) {
    return;
  }

  const dataSorted = data.sort(function (a, b) {
    const aDay = a.date.slice(0, 2);
    const aMonth = a.date.slice(3, 5);
    const aYear = a.date.slice(6);
    const aDate = aYear + '-' + aMonth + '-' + aDay;
    const bDay = b.date.slice(0, 2);
    const bMonth = b.date.slice(3, 5);
    const bYear = b.date.slice(6);
    const bDate = bYear + '-' + bMonth + '-' + bDay;
    return new Date(bDate) - new Date(aDate);
  });

  const tableTraining = dataSorted.map((item, index) => {
    return (
      <tr key={index}>
        <th>{item.date}</th>
        <th>{item.traversed}</th>
        <th>
          <a href="#" className='close' onClick={(event) => handleDeleteItem(event)}>&#10008;</a></th>
      </tr>
    );
  });

  return (
    <tbody>
      {tableTraining}
    </tbody>
  );
};

export default Training;

Training.propTypes = {
  data: PropTypes.array.isRequired,
  handleDeleteItem: PropTypes.func,
};
