import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { useEffect } from 'react'
import { getTopics } from '../../actions/topic'
import Spinner from '../layout/Spinner'

const Topics = ({ topic: {topics, loading}, post: {posts} }) => {

    useEffect(() => {
        getTopics()
    }, []);

    return (
        <Fragment>
            {loading ? <Spinner/> : (
                <div className="container">
                    <h1 className="text-primary large">Topics</h1>
                    <div className="container mt-5">
                        <div className="row">
                            {topics.map((topic) => (
                                <div className="col-12 col-md-4 col-lg-3">
                                    { topic.title }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            
        </Fragment>
    )
}

Topics.propTypes = {
    topic: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    topic: state.topic,
    post: state.post
})

export default connect(mapStateToProps)(Topics);
