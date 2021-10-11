import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile,deleteAccount } from '../../actions/profile';
import About from './About';
import Experience from './Experience';
import Education from './Education';
import Load from './load/Load'

const Dashboard = ({getCurrentProfile, auth: {user}, profile: {profile} }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome {user && user.name}
        </p>
        { profile !== null ? (
          <Fragment>

            <About profile={profile} /> 
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            <div className="my-3">
              <button className="btn btn-danger" onClick={() => deleteAccount()}>
                <i className="fas fa-user-minus" /> Delete My Account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create_profile" className="btn btn-primary my-1 ">
              Create Profile
            </Link>
            <Load/>
          </Fragment>
        )}
      </section>
    </Fragment>
    
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

