import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// basicallly we have destructured our prop(profile here)
const About= ({
  profile: {
    user: { _id, name, avatar },
    website,
    bio,
    company,
    location,
    skills
  }
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2 className='headings'>{name}</h2>
        <p className='text'> {bio} from {location && <span>{location}</span>} </p>
        <Link to='/create_profile' className='btn btn-primary'>
            <i className='fas fa-user-circle text-primary className=my-1' /> Edit Profile
        </Link>

      </div>
      <ul>
        <p className='text'>Skills</p>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check' /> {skill}
          </li>
        ))}
      </ul>
      
    </div>
  );
};

About.propTypes = {
  profile: PropTypes.object.isRequired
};

export default About;
