import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitUser } from '../actions';

import Success from './Success';

// INITIAL STATE
const initialState = {
  email: '',
  password: '',
  checkbox: false,
  touched: {
    emailTouched: false,
    passwordTouched: false,
  },
  isSubmitted: false,
  submitRequest: false
}

class Form extends Component {
  constructor(props){
    super(props);

    // GET VALUES FROM INITIALSTATE, USEFUL WHEN RESETING FORM
    this.state = initialState;
  }

  //FUNCTION PASSED AS PROPS TO SUCCESS COMPONENT, RESPONSIBLE FOR RESETING FORM
  resetForm(){
    this.setState(initialState)
  }

  //FUNCTION RESPONSIBLE FOR CHECKING INPUT TOUCHED VALUE
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  //FUNCTION RESPONSIBLE FOR VALIDATING FORM
  validateForm(values){
    const errors = {};
    const {email, password} = values;
    const atpos = email.indexOf("@");
    const dotpos = email.lastIndexOf(".");

    if(!email || atpos < 0 || dotpos < atpos+1 || dotpos+2 > email.length) {
      errors.email = 'Enter valid email!';
    }
    if(password.search(/[0-9]/) < 0){
        errors.password = 'Your password should contain at least 1 number!';
    }
    if(password.search(/[a-z]/) < 0){
        errors.password = 'Your password should contain at least 1 lowercase letter!';
    }
    if(password.search(/[A-Z]/) < 0){
        errors.password = 'Your password should contain at least 1 uppercase letter!';
    }
    if(password.length < 6) {
      errors.password = 'Your password should be at least 6 characters long!';
    }

    return errors;
  }

  //FUNCTION RESPONSIBLE FOR SUBMITTING FORM AND SAVING DATA IN db.json
  sumbitForm(e){
    e.preventDefault();
    const {email, password, checkbox} = this.state;
    const values = { email, password, checkbox}
    const errors = this.validateForm(values);

    this.validateForm(values);
    this.setState({ submitRequest: true });

    if(_.isEmpty(errors)){
      this.setState({ isSubmitted: true });
      this.props.submitUser(values);
    }
  }

  //FUNCTION RESPONSIBLE FOR RENDERING FORM
  renderField(){
    const errors = this.validateForm(this.state);
    const { email, password } = errors;
    const { emailTouched, passwordTouched } = this.state.touched;
    const { submitRequest } = this.state;

    return (
      <form className='form' onSubmit={this.sumbitForm.bind(this)}>
        <fieldset className='form-container'>
          <h1 className='form-title'>LOGIN</h1>
          <div className='form-control'>
            <label className='label-text'>Email:</label>
            <input
              type="text"
              value={this.state.email}
              onBlur={this.handleBlur('emailTouched')}
              onChange={(e) => this.setState({ email: e.target.value})}
            />
            <p className='has-error'>{emailTouched || submitRequest ? email : ''}</p>
          </div>
          <div className='form-control'>
            <label className='label-text'>Password:</label>
            <input
              type='password'
              value={this.state.password}
              onBlur={this.handleBlur('passwordTouched')}
              onChange={(e) => this.setState({ password: e.target.value})}
            />
            <p className='has-error'>{passwordTouched || submitRequest ? password : ''}</p>
          </div>
          <div className='form-checkbox' data-toggle="buttons">
            <label className="active checkbox-label">
              <input
                className='checkboxSquare'
                type="checkbox"
                value={this.state.checkbox}
                onChange={() => this.setState({checkbox: !this.state.checkbox})}
              />
              <i className="fa fa-square-o fa-2x"></i>
              <i className="fa fa-check-square-o fa-2x"></i>
              <span> Remember Me</span>
            </label>
          </div>
          <button className='button-submit' type='submit'>Submit</button>
        </fieldset>
      </form>
    )
  }
  // FUNCTION RESPONSIBLE FOR RENDERING SUCCESS COMPONENT
  renderSuccess(){
    return (
      <Success email={this.state.email} back={this.resetForm.bind(this)}/>
    )
  }
  render(){
    const { isSubmitted } = this.state;
    return (
      <div className='renderElement'>
        { isSubmitted ? this.renderSuccess() : this.renderField() }
      </div>
    )
  }
}

export default connect(null, { submitUser })(Form);
