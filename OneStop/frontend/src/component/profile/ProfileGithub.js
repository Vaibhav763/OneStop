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
        <div className="profile-github bord">
            <h2 class="text-primary my-3 profileheadings">
                <i class="fab fa-github"></i> Github Repos
            </h2>
            {repos.length > 0 ? (
                <Fragment className="m-3 bordr">
                {repos== null ? (<Spinner/>) : (repos.map(repo => (
                    <div className=''>
                    <div class="repo bg-white p-1 my-1" key={repo.id}>
                    <div>
                    <h4 className='p-3'><a href={repo.html_url} target="_blank"
                        rel="noopener noreferrer">{repo.name}</a></h4>

                    <p className='basictext'> {repo.description} </p>
                    </div>
                    <div>
                        <ul>
                            <li class="my-2 badge badge-primary bordr">Stars: {repo.stargazers_count}</li>
                            <li class="my-2 badge badge-light bordr">Forks: {repo.forks_count}</li>
                        </ul>
                    </div>
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
