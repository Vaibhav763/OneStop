import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
    console.log("Once");
    //eslint-disable-next-line
  }, [getProfiles]);

  useEffect(() => {
    setProfiles(profiles);
    console.log("twice");
  }, [profiles]);
  const [filteredProfiles, setProfiles] = useState(profiles);
  const [text, setText] = useState('');
  const onChange = (e) => {
    setText(e.target.value.toLowerCase());
  }
  const onSubmit = (e) => {
    e.preventDefault()
    loading = true;
    // const profiles2 = profiles;
    setProfiles(profiles.filter((profile) => (profile.user.name.toLowerCase().includes(text) || profile.user.email.toLowerCase().includes(text) || profile.skills.toString().toLowerCase().includes(text))));
    console.log(filteredProfiles);
    loading = false;
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="container">
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse and connect with
            developers
          </p>
          <div className="container mt-2">
            <form onSubmit={onSubmit}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Filter by name/email or skills"
                  aria-label="Filter by name/email or skills"
                  aria-describedby="basic-addon2"
                  value={text}
                  onChange={onChange}
                />
                <Button type='submit' variant="outline-secondary" id="button-addon2">
                  Filter
                </Button>
              </InputGroup>
            </form>
          </div>
          <div className='profiles'>
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
          </section>
        </Fragment>
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
