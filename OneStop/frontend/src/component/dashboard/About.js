import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { setAlert } from '../../actions/alert';

// basicallly we have destructured our prop(profile here)
const About= ({
  profile: {
    user: { _id, name, avatar, email },
    website,
    bio,
    company,
    location,
    skills
  }
}) => {

  const changePassword = async () => {
    const data = {_id, name, email};
    console.log("here");
    const res = await axios.post("/user/reset_password", data);
    setAlert(res.data.msg, "success");
    
  }

  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2 className='headings'>{name}</h2>
        <p className='text'> {bio} from {location && <span>{location}</span>} </p>
        <Link to='/create_profile' className='btn btn-primary'>
            <i className='fas fa-user-circle text-primary className=my-1' /> Edit Profile
        </Link>
        <button onClick={changePassword} className='btn btn-primary' >
          Reset Password
        </button>
      
      </div>
      <ul>
        <p className='text'>Skills</p>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check' /> {skill}
          </li>
        ))}
      </ul>

      <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
    
    </div>
  );
};

About.propTypes = {
  profile: PropTypes.object.isRequired
};

export default About;
