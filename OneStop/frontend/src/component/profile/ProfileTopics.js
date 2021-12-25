import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { getProfileById, getProfiles } from '../../actions/profile'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { connect } from 'react-redux'
import ProfileList from '../profiles/ProfileList'

const ProfileTopics = ({getProfileById, profile: {profile, loading, profiles}}) => {

    const {id} = useParams();
    const [followed, setFollowed] = useState([]);
    useEffect(() => {
        getProfileById(id);
        getProfiles();
    }, [getProfileById, id]);

    useEffect(() => {
        setFollowed(profiles.filter((pfr) => profile.followed.some((followed) => followed.user.toString() === pfr.user.toString())));
    }, [profile, profiles])

    return (
        <Fragment >
            <ProfileList loading={loading} profiles={followed} title='Following' />
        </Fragment>
    )
}

ProfileTopics.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfileById})(ProfileTopics)
