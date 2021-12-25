import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { getProfileById, getProfiles } from '../../actions/profile'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { connect } from 'react-redux'
import ProfileList from '../profiles/ProfileList'

const ProfileFollowers = ({getProfileById, getProfiles, profile: {profile, loading, profiles}}) => {

    const {id} = useParams();
    const [followers, setFollowers] = useState([]);
    useEffect(() => {
        getProfileById(id);
        getProfiles();
    }, [getProfileById, getProfiles, id]);

    useEffect(() => {
        setFollowers(profiles.filter((pfr) => profile.followers.some((follower) => follower.user.toString() === pfr.user._id.toString())));
    }, [profile, profiles])

    return (
        <Fragment >
            <ProfileList profiles={followers} title='Followers' loading={loading} />
        </Fragment>
    )
}

ProfileFollowers.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired,
    getProfiles: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfileById, getProfiles})(ProfileFollowers)
