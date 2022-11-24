import { NavLink } from 'react-router-dom';
import RoomHeaderCSS from "./RoomHeader.module.css";


function Header() {

    return (
        <>
            <div className={ RoomHeaderCSS.HeaderDiv }>
                <ul>
                    <li><NavLink to="/room">회의실 조회</NavLink></li>
                    <li><NavLink to="/">회의실 예약 조회</NavLink></li>
                </ul>

            </div>

            <div className={RoomHeaderCSS.SubmenuDiv}>
                <p>회의실 조회</p>
                <ul>
                    <li><NavLink to="/room">&#9654; 회의실 조회</NavLink></li>
                </ul>

                <p>회의실 예약 조회</p>
                <ul>
                    <li><NavLink to="/">&#9654; 회의실 예약 조회</NavLink></li>
                    <li><NavLink to="/">&#9654; 회의실 예약 등록</NavLink></li>
                    <li><NavLink to="/">&#9654; 회의실 예약 수정</NavLink></li>
                </ul>
            </div>
        </>
    );

}

export default Header;