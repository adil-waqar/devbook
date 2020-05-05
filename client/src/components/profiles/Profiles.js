import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';
import { getAllProfiles } from '../../store/actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ getAllProfiles, profiles, loading }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  return !loading ? (
    <Fragment>
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'></i> Browse and connect with
        Developers
      </p>
      <div className='profiles'>
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
        ) : (
          <h4>No profiles found</h4>
        )}
      </div>
    </Fragment>
  ) : (
    <Spinner />
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profiles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
  loading: state.profile.loading
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
