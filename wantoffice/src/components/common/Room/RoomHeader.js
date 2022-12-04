import { NavLink } from 'react-router-dom';
import RoomHeaderCSS from "./RoomHeader.module.css";
import { decodeJwt } from "../../../utils/tokenUtils";

function Header() {

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }

    return (
        <>
            <div className={ RoomHeaderCSS.HeaderDiv }>
                <ul>
                    { decoded === "ROLE_MEMBER" && <li><NavLink to="/attendance/my">Room</NavLink></li> }                    
                    { decoded === "ROLE_ADMIN" && <li><NavLink to="/attendance/manage-list">Room</NavLink></li> }
                    { decoded === "ROLE_MEMBER" && <li><NavLink to="/off">Reservation</NavLink></li> }
                    { decoded === "ROLE_ADMIN" && <li><NavLink to="/attendance/manage-list">Reservation</NavLink></li> }
                </ul>
            </div>
        </>
    );

}

export default Header;