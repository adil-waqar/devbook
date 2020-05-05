import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getProfileById,
  clearVisitingProfile
} from '../../store/actions/profile';
import Spinner from '../UI/Spinner/Spinner';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({
  visitingProfile,
  loading,
  auth,
  match,
  getProfileById,
  clearVisitingProfile
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    return () => {
      clearVisitingProfile();
    };
  }, [getProfileById, match.params.id, clearVisitingProfile]);

  return visitingProfile && !loading ? (
    <Fragment>
      <Link to='/profiles' className='btn btn-light'>
        Go back
      </Link>
      {auth.isAuthenticated && auth.user._id === visitingProfile.user._id && (
        <Link to='/edit-profile' className='btn btn-dark'>
          Edit profile
        </Link>
      )}
      <div className='profile-grid my-1'>
        <ProfileTop profile={visitingProfile} />
        <ProfileAbout profile={visitingProfile} />
        <div className='profile-exp bg-white p-2'>
          <h2 className='text-primary'>Experience</h2>
          {visitingProfile.experience.length > 0 ? (
            visitingProfile.experience.map((experience) => {
              return (
                <ProfileExperience
                  key={experience._id}
                  experience={experience}
                />
              );
            })
          ) : (
            <h4>No experiences listed</h4>
          )}
        </div>
        <div className='profile-edu bg-white p-2'>
          <h2 className='text-primary'>Education</h2>
          {visitingProfile.education.length > 0 ? (
            <Fragment>
              {visitingProfile.education.map((education) => (
                <ProfileEducation key={education._id} education={education} />
              ))}
            </Fragment>
          ) : (
            <h4>No education credentials</h4>
          )}
        </div>

        {visitingProfile.githubusername && (
          <ProfileGithub username={visitingProfile.githubusername} />
        )}
      </div>
    </Fragment>
  ) : (
    <Spinner />
  );
};

Profile.propTypes = {
  visitingProfile: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  auth: PropTypes.object
};

const mapStateToProps = (state) => ({
  visitingProfile: state.profile.visitingProfile,
  loading: state.profile.loading,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getProfileById,
  clearVisitingProfile
})(Profile);
