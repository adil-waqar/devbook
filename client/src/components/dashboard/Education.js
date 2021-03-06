import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { removeEducation } from '../../store/actions/profile';

const Education = ({ education, removeEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td className='hide-sm'>{edu.fieldofstudy}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{moment.utc(edu.from)}</Moment> -{' '}
        {edu.to === null ? (
          ' Present'
        ) : (
          <Moment format='YYYY/MM/DD'>{moment.utc(edu.to)}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => removeEducation(edu._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='my-2'>Education</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Field of study</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  removeEducation: PropTypes.func.isRequired
};

export default connect(null, { removeEducation })(Education);
