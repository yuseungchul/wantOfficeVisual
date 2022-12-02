import { NavLink } from 'react-router-dom';
import AttendanceHeaderCSS from "./AttendanceHeader.module.css";
import { decodeJwt } from "../../../utils/tokenUtils";

function AttendanceHeader() {

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }

    return (
        <>
            <div className={ AttendanceHeaderCSS.SubmenuDiv }>
                <p>근태</p>
                <ul>
                    { decoded === "ROLE_MEMBER" && <li> <NavLink to="/attendance/my" style={{ textDecoration: "none", color: "#8D8D8D" }}>&#9654; 내 근태 월별 조회</NavLink></li> }
                    { decoded === "ROLE_ADMIN" && <li> <NavLink to="/attendance/manage-list" style={{ textDecoration: "none", color: "#8D8D8D" }}>&#9654; 날짜별 근태 조회</NavLink></li> }
                </ul>

                <p>연차</p>
                <ul>
                    <li><NavLink to="/off" style={{ textDecoration: "none", color: "#8D8D8D" }}>&#9654; 연차 신청 조회</NavLink></li>
                    <li><NavLink to="/off/regist" style={{ textDecoration: "none", color: "#8D8D8D" }}>&#9654; 연차 신청</NavLink></li>
                </ul>

                { decoded === "ROLE_APP_AUTH" && <p>연차 관리</p> }
                { decoded === "ROLE_APP_AUTH" && <ul>
                    <li><NavLink to="/off/result" style={{ textDecoration: "none", color: "#8D8D8D" }}>&#9654; 결과별 연차 신청 조회</NavLink></li>
                </ul>
                }
            </div>
        </>
    );

}

export default AttendanceHeader;