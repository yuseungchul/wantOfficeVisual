import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { callLogoutAPI } from '../../apis/MemberAPICalls';
import HeaderCSS from "./Header.module.css";
import { decodeJwt } from "../../utils/tokenUtils";


function Header() {

    const isLogin = window.localStorage.getItem('accessToken');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginModal, setLoginModal] = useState(false);

    const onClickLogoHandler = () => {
        navigate("/Main", { replace : true });
    }

    const onClickHandler = () => {
        window.localStorage.removeItem('accessToken');
        dispatch(callLogoutAPI());
        alert('로그아웃 되었습니다.');
        navigate('/', { replace : true });
    }

    const onClickMyPageHandler = () => {
        
        const token = decodeJwt(window.localStorage.getItem('accessToken'));
        if(token.exp * 1000 < Date.now()) {
            setLoginModal(true);
            return;
        }
        navigate("/Main", { replace : true });
    }

    return (
        <>
            <div className={ HeaderCSS.HeaderDiv }>
                <ul>
                    <li><NavLink to="/" style={{ textDecoration: "none" }}>Notice</NavLink></li>
                    <li><NavLink to="/" style={{ textDecoration: "none" }}>Main board</NavLink></li>
                </ul>

            </div>

            <div className={HeaderCSS.SubmenuDiv}>
                <h2>Sub menu</h2>
                <ul>
                    <li><NavLink to="/" style={{ textDecoration: "none" }}>&#9654; Sub menu1</NavLink></li>
                    <li><NavLink to="/" style={{ textDecoration: "none" }}>&#9654; Sub menu2</NavLink></li>
                    <li><NavLink to="/" style={{ textDecoration: "none" }}>&#9654; Sub menu3</NavLink></li>
                    <li><NavLink to="/" style={{ textDecoration: "none" }}>&#9654; Sub menu4</NavLink></li>
                </ul>
            </div>
        </>
    );

}

export default Header;