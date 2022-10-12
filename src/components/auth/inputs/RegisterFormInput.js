import React, { useState } from 'react';
import { registerUser } from '../../../utils/api/CallApi';
import './auth.scss';
import { useNavigate } from "react-router-dom";


const FormInput = () => {
  const navigate = useNavigate();

  const [isEmty, setIsEmty] = useState([false, false, false, false]);
  const [isValidate, setIsValidate] = useState([false, false, false, false]);
  const [isHide, setIsHide] = useState([true, true]);
  const [isRerender, setIsRerender] = useState(true);
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      label: 'Username',
      placeholder: "Ex: Vu Hong Quan",
      errorMessage: "Username should be 3-32 characters and shouldn't include any special characters.",
      regex: (value) => /^[A-Za-z0-9]{3,32}$/.test(value)
    },
    {
      id: 2,
      name: 'email',
      type: 'text',
      label: 'Email',
      placeholder: "Ex: email@domain.com",
      errorMessage: 'It should be a valid email address.',
      regex: (value) => /\S+@\S+\.\S+/.test(value)
    },
    {
      id: 3,
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: "Enter password",
      errorMessage: 'Password must contain at least 8 characters and include at least 1 letter and 1 number.',
      regex: (value) => /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+).{7,30}$/.test(value)
    },
    {
      id: 4,
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
      placeholder: "Confirm Password",
      errorMessage: "Password don't match",
      regex: (value) => value === values.password
    }
  ];
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [duplicateData, setDuplicateData] = useState('');


  const handleHideShowPassword = (e, id) => {
    isHide[id - 3] = isHide[id - 3] ? false : true;
    setIsHide(isHide);
    setIsRerender(!isRerender)
  }

  function onChange(e, id, regex) {
    // console.log(values);
    setValues({ ...values, [e.target.name]: e.target.value })
    if (e.target.value != '') {
      isEmty[id - 1] = false
      setIsEmty(isEmty)
      if (!regex(e.target.value)) {
        isValidate[id - 1] = true
        setIsValidate(isValidate);
      } else {
        isValidate[id - 1] = false
        setIsValidate(isValidate);
      }
    } else {
      isEmty[id - 1] = true
      setIsEmty(isEmty)
    }
  }

  function handleBlur(e, id, regex) {
    setValues({ ...values, [e.target.name]: e.target.value })
    if (e.target.value != '') {
      isEmty[id - 1] = false
      setIsEmty(isEmty)
      if (!regex(e.target.value)) {
        isValidate[id - 1] = true
        setIsValidate(isValidate);
      } else {
        isValidate[id - 1] = false
        setIsValidate(isValidate);
      }
    } else {
      isEmty[id - 1] = true
      setIsEmty(isEmty)
    }
  }

  async function handleRegister(e) {
    e.preventDefault()
    if (values.username === '' || values.email === '' || values.password === '' || values.confirmPassword === '') {
      return
    }
    if (isValidate.includes(true)) {
      return
    }
    const response = await registerUser(values);

    if (response.error_code === 0) {
      setDuplicateData('')
      navigate(`/verify-email/${values.email}`);
    } else if (response.error_code === 403) {
      setDuplicateData('Username')
    } else if (response.error_code === 500) {
      setDuplicateData('Email')
    }


  }

  return (
    <div className='input-wrapper'>
      {/* <div>{JSON.stringify(isValidate)}</div>
      <div>{JSON.stringify(values)}</div> */}
      {inputs.map(input =>
        <div key={input.id} className='form-input form-group'>
          <label className="form-label">{input.label}</label>
          <input
            onBlur={(e) => { handleBlur(e, input.id, input.regex) }}
            onChange={(e) => onChange(e, input.id, input.regex)}
            className="form-control"
            type={isHide[input.id - 3] ? input.type : 'text'}
            id={input.id}
            name={input.name}
            label={input.label}
            placeholder={input.placeholder}
          >
          </input>
          {input.label === 'Password' || input.label === 'Confirm Password' ? <div onClick={(e) => handleHideShowPassword(e, input.id)} className='hide-show'>
            {!isHide[input.id - 3] ? <i className='bx bxs-show'></i> : <i className='bx bxs-hide' ></i>}
          </div> : false}
          {isEmty[input.id - 1] && <span className='error-message'>{`${input.label} can't be blank`}</span>}
          {isEmty[input.id - 1] || isValidate[input.id - 1] && <span className='error-message'>{input.errorMessage}</span>}
        </div>)}
      <button className="form-submit" onClick={(e) => handleRegister(e)} >Register</button>
      {duplicateData && <p className='error-message'>{`* ${duplicateData} already exist`}</p>}
    </div>

  )
}

export default FormInput;