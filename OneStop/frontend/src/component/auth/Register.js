import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

// connect is used to link this component with redux
import { connect } from 'react-redux';

const Register = ({ setAlert , register}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  // destructured all values from our object
  const { name, email, password, password2 } = formData;

  // function to store the input values(e.target values) to our state
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value});


  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');  //*
    } else {
      register({name,email,password});
    }
  };

  // * = 
  // this will pass this msg to our alert action (basically calls our setAlert function in action) 
  //  which in turn dispatch our type to change state 

  return (
    <Fragment>
      <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};


export default connect(null, { setAlert, register})(Register);

// connect takes two argument first the state we wanna map and other the object with actions
