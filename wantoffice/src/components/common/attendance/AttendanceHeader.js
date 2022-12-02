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
            <div className={ AttendanceHeaderCSS.HeaderDiv }>
                <ul>
                    <li><NavLink to="/attendance/my">Attendance</NavLink></li>
                    <li><NavLink to="/off">Off</NavLink></li>
                </ul>

            </div>
        </>
    );

}

export default AttendanceHeader;