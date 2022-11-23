import { NavLink } from 'react-router-dom';
import AttendanceHeaderCSS from "./AttendanceHeader.module.css";

function Header() {

    return (
        <>
            <div className={ AttendanceHeaderCSS.HeaderDiv }>
                <ul>
                    <li><NavLink to="/attendance" style={{ textDecoration: "none", color: "#8D8D8D" }}>근태</NavLink></li>
                    <li><NavLink to="/" style={{ textDecoration: "none", color: "#8D8D8D" }}>연차</NavLink></li>
                </ul>

            </div>

            <div className={ AttendanceHeaderCSS.SubmenuDiv }>
                <p>근태</p>
                <ul>
                    <li><NavLink to="/" style={{ textDecoration: "none", color: "#8D8D8D" }}>&#9654; 내 근태 월별 조회</NavLink></li>
                </ul>

                <p>연차</p>
                <ul>
                    <li><NavLink to="/" style={{ textDecoration: "none", color: "#8D8D8D" }}>&#9654; 연차 신청</NavLink></li>
                    <li><NavLink to="/" style={{ textDecoration: "none", color: "#8D8D8D" }}>&#9654; 연차 신청 조회</NavLink></li>
                </ul>
            </div>
        </>
    );

}

export default Header;