import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { useEffect } from 'react'
import { getTopics } from '../../actions/topic'
import Spinner from '../layout/Spinner'
import TopicItem from './TopicItem'


const Topics = ({getTopics, topic, post: {posts} }) => {
    useEffect(() => {
        getTopics();
    }, [getTopics]);

    

    return (
        <Fragment>
            {topic.loading ? <Spinner/> : (
                <div className="container">
                    <h1 className="text-primary large">Topics</h1>
                    <div className="container mt-5">
                        <div className="row">
                            {topic.topics.map((tpic) => (
                                <div key={tpic._id} className="col-12 col-md-6 col-lg-4">
                                    <TopicItem topic={tpic} />
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
    getTopics: PropTypes.func.isRequired,
    topic: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    topic: state.topic,
    post: state.post
})

export default connect(mapStateToProps, {getTopics})(Topics);
