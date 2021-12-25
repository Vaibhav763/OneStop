import React, {useEffect, useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
import ProfileItem from './ProfileItem';

const ProfileList = ({profiles,  title, loading}) => {
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
              <h1 className='large text-primary'>{title}</h1>
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

ProfileList.propTypes = {
    profiles: PropTypes.array.isRequired,
    title: PropTypes.string,
}

export default ProfileList;
