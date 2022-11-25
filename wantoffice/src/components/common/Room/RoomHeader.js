import { NavLink } from 'react-router-dom';
import RoomHeaderCSS from "./RoomHeader.module.css";


function Header() {

    return (
        <>
            <div className={ RoomHeaderCSS.HeaderDiv }>
                <ul>
                    <li><NavLink to="/room">회의실 조회</NavLink></li>
                    <li><NavLink to="room/rvlist">회의실 예약</NavLink></li>
                </ul>

            </div>
        </>
    );

}

export default Header;