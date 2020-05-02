import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getUserProfile } from '../../store/actions/profile';
import PropTypes from 'prop-types';
import Spinner from '../UI/Spinner/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';

const Dashboard = ({ getUserProfile, profile, loading, auth: { user } }) => {
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
            </Fragment>
          ) : (
            <Fragment>
              <p>You haven't set-up a profile yet, please add some info.</p>
              <Link to='/create-profile' className='btn btn-primary my-1'>
                Create Profile
              </Link>
            </Fragment>
          )}
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

export default connect(mapStateToProps, { getUserProfile })(Dashboard);
