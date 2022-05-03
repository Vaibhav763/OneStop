import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// basicallly we have destructured our prop(profile here)
const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
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
        <h2 className='headings'>{name} </h2>
        <p className='text'> {bio} From {location && <span>{location}</span>}  </p>
        <p className='text'> {status} {company && <span> at {company}</span>} </p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
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

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
