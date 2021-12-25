import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { followTopic, unfollowTopic } from '../../actions/topic'

const TopicItem = ({topic, auth: {user}, followTopic, unfollowTopic}) => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        // console.log(topic);
        const getPhotos = async () => {
            // console.log(topic.title)
            const res = await axios.get(`https://api.unsplash.com/search/photos?query=${topic.title}&client_id=eWQQIMfEsNXOFw4Ahsf2NF00jfDT-u98NP-xlCKt7gA`);
            // console.log(res.data);
            setPhotos(res.data.results);
        }
        getPhotos();
    }, [topic])

    const onClick = (e) => {
        e.preventDefault();
        // // console.log(e.target.innerHTML);
        // console.log(topic._id);
        if(!topic.loading && e.target.innerHTML === "Follow"){
            followTopic(topic._id);
        }
        else if(!topic.loading && e.target.innerHTML === "Unfollow"){
            unfollowTopic(topic._id);
        }
    }

    return (
        <Fragment>
            <div className="card" >
                <img src={photos.length > 0 && photos[0].urls.thumb} className="card-img-top" alt={topic.title} />
                <div className="card-body">
                    <h5 className="card-title">{topic.title}</h5>
                    <p className="card-text">Followers: {topic.followers.length}</p>
                    <Button onClick={onClick} className="btn btn-primary">{topic.followers.some((follower) => follower.user.toString() === user._id.toString()) ? "Unfollow" : "Follow"}</Button>
                    <Link to={`/posts/explore/${topic.title}`} className="btn btn-secondary ml-3">Explore</Link>
                </div>
            </div>
        </Fragment>
    )
}

TopicItem.propTypes = {
    topic: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    followTopic: PropTypes.func.isRequired,
    unfollowTopic: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {followTopic, unfollowTopic})(TopicItem);
