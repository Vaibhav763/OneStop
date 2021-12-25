import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { getProfileById, getProfiles } from '../../actions/profile'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { connect } from 'react-redux'
import ProfileList from '../profiles/ProfileList'

const ProfileFollowed = ({getProfileById, getProfiles, profile: {profile, loading, profiles}}) => {

    const {id} = useParams();
    const [followed, setFollowed] = useState([]);
    useEffect(() => {
        getProfileById(id);
        getProfiles();
    }, [getProfileById, getProfiles, id]);

    useEffect(() => {
        setFollowed(profiles.filter((pfr) => profile.followed.some((followed) => followed.user.toString() === pfr._id.toString())));
    }, [profile, profiles])

    return (
        <Fragment >
            <ProfileList loading={loading} profiles={followed} title='Following' />
        </Fragment>
    )
}

ProfileFollowed.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired,
    getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfileById, getProfiles})(ProfileFollowed)
