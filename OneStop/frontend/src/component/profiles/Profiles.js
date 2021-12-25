import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
// import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';
import ProfileList from './ProfileList';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
    console.log("Once");
    //eslint-disable-next-line
  }, [getProfiles]);


  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <ProfileList profiles={profiles} title='Developers' loading={loading} />
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps,{ getProfiles })(Profiles);
