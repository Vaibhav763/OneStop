import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

const TopicItem = (topic) => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const getPhotos = async () => {
            console.log(topic.topic.title)
            const res = await axios.get(`https://api.unsplash.com/search/photos?query=${topic.topic.title}&client_id=eWQQIMfEsNXOFw4Ahsf2NF00jfDT-u98NP-xlCKt7gA`);
            console.log(res.data);
            setPhotos(res.data.results);
        }
        getPhotos();
    }, [topic])

    return (
        <Fragment>
            <div className="card" >
                <img src={photos.length > 0 && photos[0].urls.thumb} className="card-img-top" alt={topic.topic.title} />
                <div className="card-body">
                    <h5 className="card-title">{topic.topic.title}</h5>
                    <p className="card-text">Followers: {topic.topic.followers.length}</p>
                    <Button className="btn btn-primary">Follow</Button>
                    <Button className="btn btn-secondary ml-3">Explore</Button>
                </div>
            </div>
        </Fragment>
    )
}

TopicItem.propTypes = {
    topic: PropTypes.object.isRequired,
}

export default connect(null)(TopicItem);
