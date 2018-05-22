import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../actions';
import SuccessLogin from './SuccessLogin';


const initialState = {
  email: '',
  password: '',
  checkbox: false,
  isSubmitted: false,
  submitRequest: false,
  errors: ''
}

class FormLogin extends Component {
  constructor(props){
    super(props);

    this.state = initialState;
  }
  componentDidMount(){
    // GET ALL USERS
    this.props.getUsers()
  }
  //FUNCTION PASSED AS PROPS TO SUCCESS COMPONENT, RESPONSIBLE FOR RESETING FORM
  resetForm(){
    this.setState(initialState)
  }
  //FUNCTION RESPONSIBLE FOR VALIDATING FORM
  validateUser(){
    const { users } = this.props;
    const { email, password } = this.state;

    const selectedUser = _.filter(users, user => user.email == email && user.password == password);

    if(_.isEmpty(selectedUser) || selectedUser == []){
      this.setState({errors: 'Invalid email or password'});
    } else {
      this.setState({ isSubmitted: true })
    }

  }
  //FUNCTION RESPONSIBLE FOR SUBMITTING FORM
  submitForm(e){
    e.preventDefault();
    const {email, password, errors} = this.state;

    this.setState({ submitRequest: true })
    this.validateUser();

  }
  // FUNCTION RESPONSIBLE FOR RENDERING SUCCESS COMPONENT
  
  renderSuccess(){
    return <SuccessLogin email={this.state.email} back={this.resetForm.bind(this)}/>
  }
  //FUNCTION RESPONSIBLE FOR RENDERING FORM
  renderForm() {
    const {errors} = this.state
    return (
        <form className='form' onSubmit={this.submitForm.bind(this)}>
          <fieldset className='form-container'>
            <h1 className='form-title'>Login</h1>
            <div className='form-control'>
              <label className='label-text'>Email:</label>
              <input
                type="text"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value})}
              />
            </div>
            <div className='form-control'>
              <label className='label-text'>Password:</label>
              <input
                type='password'
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value})}
              />
              <p className='has-errors'>{ errors == '' ? '' : errors}</p>
            </div>
            <div className='form-checkbox' data-toggle="buttons">
              <label className="active checkbox-label">
                <input
                  className='checkboxSquare'
                  type="checkbox"
                  onClick={e => this.setState({ checkbox: !this.state.checkbox})}
                />
                <i className="fa fa-square-o fa-2x"></i>
                <i className="fa fa-check-square-o fa-2x"></i>
                <span> Remember Me</span>
              </label>
            </div>
            <button className='button-submit' type='submit'>Log in</button>
            <p className='register-back-text'>Or click
              <Link to='/register'> here </Link>
            to create a new account</p>
          </fieldset>
        </form>
    )
  }
  render(){

    return (
      <div className='renderElement'>
        { this.state.isSubmitted ? this.renderSuccess() : this.renderForm() }
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps, { getUsers })(FormLogin);
