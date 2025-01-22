import PropTypes from 'prop-types';

const Training = ({ data = [], handleDeleteItem }) => {
  if (data.length === 0) {
    return;
  }

  const dataSorted = data.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
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
