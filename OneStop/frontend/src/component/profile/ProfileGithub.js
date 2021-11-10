import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGithubRepos } from '../../actions/profile'
import Spinner from '../layout/Spinner'

const ProfileGithub = ({profile: {repos}, username, getGithubRepos}) => {
    useEffect(() => {
        getGithubRepos(username);
    }, [getGithubRepos, username])
    return (
        <div className="profile-github">
            <h2 class="text-primary my-1">
                <i class="fab fa-github"></i> Github Repos
            </h2>
            {repos.length > 0 ? (
                <Fragment>
                {repos== null ? (<Spinner/>) : (repos.map(repo => (
                    <div class="repo bg-white p-1 my-1" key={repo.id}>
                    <div>
                    <h4><a href={repo.html_url} target="_blank"
                        rel="noopener noreferrer">{repo.name}</a></h4>
                    <p>
                        {repo.description}
                    </p>
                    </div>
                    <div>
                    <ul>
                        <li class="badge badge-primary">Stars: {repo.stargazers_count}</li>
                        <li class="badge badge-dark">Watchers: {repo.watchers_count}</li>
                        <li class="badge badge-light">Forks: {repo.forks_count}</li>
                    </ul>
                    </div>
                </div>
                )))}
                </Fragment>
            ) : ( 
                <h4>No repositories found.</h4>
            )}
        </div>
    )
}

ProfileGithub.propTypes = {
    username: PropTypes.string,
    profile: PropTypes.object.isRequired,
    getGithubRepos: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getGithubRepos})(ProfileGithub);
