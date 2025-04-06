import React, { useEffect, useState } from "react";
import { LoginContext } from '../context/LoginContext';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAction } from '../actions/loginActions';
import { Link } from "react-router-dom";
import { CiLogout, CiUser } from "react-icons/ci";
import '../style/header.scss'
import { IoPersonOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { userDataInitialState } from "../reducers/loginReducer";



const Header = () => {
    const {dispatchUserData} = useContext(LoginContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(() => {
            const storedUserData = localStorage.getItem('userData');
            return storedUserData ? JSON.parse(storedUserData) : null;
        });

    useEffect(()=>{
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        } else {
            setUserData(null); // reset state if no user data
        }
        }, [localStorage.getItem('userData')])  //localStorage.getItem('userData')

    const onClickLogout = () => {
        dispatchUserData(logoutAction());
        navigate("/");
    }
    return (
        <div className="header">
            <div className="icons">
                <div className="page_header_home">
                    <Link to={'/'}>
                        <IoHomeOutline size={23}/>
                    </Link>
                </div>
                <div className="page_header_connection">
                    {
                        
                        userData?//userData.user?
                        (<div>
                            <CiLogout size={23} onClick={()=>onClickLogout()}/>
                        </div>) : 
                        (<Link to={'/connect'} >
                            <CiUser className='costumer-icon' size={23}/>
                        </Link>)
                    }
                </div>
                <div className="page_header_heroes">
                    {
                        userData? //userData.user?
                        (<Link to={'/myHeroes'} >
                            <IoPersonOutline size={23} color="black"/>
                        </Link>) : 
                        (<div></div>)
                    }  
                </div>
            </div>
        </div>
    )
}

export default Header;