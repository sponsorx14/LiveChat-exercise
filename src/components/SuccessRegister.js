import React from 'react';

const SuccessRegister = (props) => {
  return (
    <div className="success-message">
      <svg viewBox="0 0 76 76" className="success-message-icon icon-checkmark">
          <circle cx="38" cy="38" r="36"/>
          <path fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M17.7,40.9l10.9,10.9l28.7-28.7"/>
      </svg>
      <h1 className="success-message-title">Registration successful</h1>
      <div className="success-message-content">
          <p>We sent an email to <span className='email-bold'>{props.email}</span> with the confirmation</p>
      </div>
      <button className='go-back' onClick={() => props.back()}>OK</button>
  </div>
  )
}

export default SuccessRegister;
