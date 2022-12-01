import { NavLink } from 'react-router-dom';
import CardHeaderCSS from "./CardHeader.module.css";
import { decodeJwt } from "../../../utils/tokenUtils";

function Header() {

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    }

    return (
        <>
            <div className={ CardHeaderCSS.HeaderDiv }>
                <ul>
                    <li><NavLink to="/">사내 명함</NavLink></li>
                    <li><NavLink to="/">거래처 명함</NavLink></li>
                </ul>

            </div>
        </>
    );

}

export default Header;