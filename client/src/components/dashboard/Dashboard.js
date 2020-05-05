import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getUserProfile, deleteAccount } from '../../store/actions/profile';
import PropTypes from 'prop-types';
import Spinner from '../UI/Spinner/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
  getUserProfile,
  profile,
  loading,
  auth: { user },
  deleteAccount
}) => {
  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <div>
      {!loading ? (
        <Fragment>
          <h1 className='large text-primary'>Dashboard</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Welcome {user.name}
          </p>
          {profile ? (
            <Fragment>
              <DashboardActions />
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
            </Fragment>
          ) : (
            <Fragment>
              <p>You haven't set-up a profile yet, please add some info.</p>
              <Link to='/create-profile' className='btn btn-primary my-1'>
                Create Profile
              </Link>
            </Fragment>
          )}
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

Dashboard.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
    loading: state.profile.loading,
    auth: state.auth
  };
};

export default connect(mapStateToProps, { getUserProfile, deleteAccount })(
  Dashboard
);
