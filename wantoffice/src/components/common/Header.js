import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import HeaderCSS from "./Header.module.css";
import { decodeJwt } from "../../utils/tokenUtils";


function Header() {

    const isLogin = window.localStorage.getItem('accessToken');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginModal, setLoginModal] = useState(false);

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
                    <li><NavLink to="/">홈</NavLink></li>
                    <li><NavLink to="/">마이페이지</NavLink></li>
                </ul>

            </div>

            <div className={HeaderCSS.SubmenuDiv}>
                <h2>내 정보</h2>
                <ul>
                    <li><NavLink to="/">&#9654; 내 정보</NavLink></li>
                </ul>
            </div>
        </>
    );

}

export default Header;