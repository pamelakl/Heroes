import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { LoginContext } from "../context/LoginContext";
import { loginAction } from "../actions/loginActions";
import '../style/login.scss'

const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailinputValid, setIsEmailInputValid] = useState(true);
	const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);
    const [action, setAction] = useState('LogIn')
    const {dispatchUserData} = useContext(LoginContext);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const isFormInavlid = () => {
		return email === "" || password === "";
	};

    const onBlurEmailInput = (event) => {
		const theEmail = event.target.value.trim();
		if (theEmail === "") {
			setEmail("");
			setIsEmailInputValid(false);
		} else {
			setEmail(theEmail);
			setIsEmailInputValid(true);
		}
	};

	const onBlurPasswordInput = (event) => {
		const thePassword = event.target.value.trim();
		setPassword(thePassword === "" ? "" : thePassword);
		setIsPasswordInputValid(thePassword !== "");
	};

    const authSubmitHandler = async (email, password) => {
        if(action === "LogIn") {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const responseData = await response.json();
            console.log(responseData);
            if(response.status >=200 && response.status<300){
                return responseData;
            }
            throw new Error(responseData.error);
           
        } else {
         //   try{
            console.log("here")
            const response = await fetch('http://localhost:3000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            console.log("response:" +  response);
            const responseData = await response.json();
            console.log("response Data:" +  responseData);
            if(response.status >=200 && response.status<300){
                return responseData;
            }
            throw new Error(responseData.error);
           // return responseData
            // } catch (err) {
            //     console.log("err" + err);
            // }
        }
    }

    const onSubmitform = (event) => {
		event.preventDefault();
		console.log("login form:", email, password);
        if(action === 'LogIn') {
            authSubmitHandler(email, password).then(
                (userData) => {
                    console.log("loging");
                    console.log(userData);
                    console.log(userData.data);
                    console.log(userData.data.user)
                    dispatchUserData(loginAction(userData.data.user));
                    navigate("/");
                },
                (err) => {
                    console.log("error");
                  //  if (err.message === "Email or password are invalid.") {
                        setErrorMessage(err.message);
                  //  }
                }
            );
        } 
        else{
            authSubmitHandler(email, password).then(
                (userData) => {
                    console.log("1");
                    console.log(userData);
                    dispatchUserData(loginAction(userData.data.user));
                    navigate("/");
                },
                (err) => {
                    //if (err.message === "EMAIL_EXISTS") {
                        setErrorMessage(err.message);
                   // alert(err.message);
                   // }
                }
            )
        }
		
	};

    return (
      <div className="login-form-container">
        {action === 'SignUp' ? <h2>Sign Up</h2> : <h2>Connect</h2>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={onSubmitform} className='login-form'>
             <input placeholder="Email" onBlur={ onBlurEmailInput } className='form-input' />
		    { !isEmailinputValid && <div className="invalid-message">You must enter your email.</div> }
		    <input type="password" placeholder="Password" onBlur={ onBlurPasswordInput } className='form-input'/>
		    { !isPasswordInputValid && <div className="invalid-message">You must enter your password.</div> }
            <div className="login-form__nav">
			    <button type="submit"  disabled={ isFormInavlid() } className='submit-form-button'>Submit</button>
		    </div>
        </form>
        <div>
            {action === 'SignUp' ? <button onClick={()=>setAction('LogIn')} className='form-button'>כניסה</button> :
             <button onClick={()=>setAction('SignUp')} className='form-button'>הרשמה</button>}
            
        </div>
      </div>
    );
}
export default LoginForm;