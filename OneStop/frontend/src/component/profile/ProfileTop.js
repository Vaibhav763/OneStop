import React from 'react';
import PropTypes from 'prop-types';
import { followProfile, unfollowProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileTop = ({
  auth,
  profile: {profile: {
    _id,
    status,
    company,
    location,
    website,
    social,
    followers,
    followed,
    followed_topics,
    user
  }},
  followProfile,
  unfollowProfile
}) => {

  const onClick = (e) => {
    e.preventDefault();
    // // console.log(e.target.innerHTML);
    // console.log(topic._id);
    if(e.target.innerHTML === "Follow"){
        followProfile(_id);
    }
    else if(e.target.innerHTML === "Unfollow"){
        unfollowProfile(_id);
    }
    window.location.reload();
}

  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={user.avatar} alt="" />
      <h1 className="large">{user.name}</h1>
      <p className="lead">
        {status} {company ? <span> at {company}</span> : null}
      </p>
      <p>{location ? <span>{location}</span> : null}</p>
      <div className="icons my-1">
        {website ? (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x" />
          </a>
        ) : null}
        {social
          ? Object.entries(social)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab fa-${key} fa-2x`}></i>
                </a>
              ))
          : null}
      </div>
      <div className="container m-0 bg-primary p-3 profile-top">
        <div className="row align-items-center">
          <div className="col-6">
            { !(auth.user._id.toString() === user._id.toString()) && <button onClick={onClick} className="btn btn-primary">{followers.some((follower) => follower.user.toString() === auth.user._id.toString()) ? "Unfollow" : "Follow"}</button>}
          </div>
          {/* <div className="col-6">
            <button className="btn btn-primary">Message</button>
          </div> */}
        </div>
        <div className="row align-items-center mt-2">
          <div className="col-4"> <Link to={`/profile/${user._id}/followers`} className="btn btn-secondary"> Followers: {followers ? followers.length : 0} </Link> </div>
          <div className="col-4 "> <Link to={`/profile/${user._id}/following`} className="btn btn-secondary"> Following: {followed ? followed.length : 0} </Link></div>
          <div className="col-4 "> <Link to={"#!"} className="btn btn-secondary"> Topics: {followed_topics ? followed_topics.length : 0} </Link></div>
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  followProfile: PropTypes.func.isRequired,
  unfollowProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, {followProfile, unfollowProfile})(ProfileTop);
