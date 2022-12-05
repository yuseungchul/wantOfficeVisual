import { NavLink } from 'react-router-dom';
import MypageHeaderCSS from "./MypageHeader.module.css";


function Header() {

    return (
        <>
            <div className={ MypageHeaderCSS.HeaderDiv }>
                <ul>
                    <li><NavLink to="/mypage">내 정보</NavLink></li>
                </ul>

            </div>
        </>
    );

}

export default Header;