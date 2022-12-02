import { useDispatch, useSelector } from "react-redux";
import { callInOutAPI, callInRegistAPI, callOutRegistAPI } from "../../apis/AttendanceAPICalls";
import Clock from "./Clock";
import AttendanceCSS from './Attendance.module.css';
import { useEffect } from "react";


function Attendance() {

    const dispatch = useDispatch();
    const attendance = useSelector(state => state.attendanceReducer);
    const attendanceDetail = attendance.data;

    const onClickInHandler = () => {
        dispatch(callInRegistAPI());
    }

    const onClickOutHandler = () => {
        dispatch(callOutRegistAPI({

        }));
    }

    useEffect(() => {
        dispatch(callInOutAPI());
    }, [attendanceDetail]);

    return (
        <>
            <div className={ AttendanceCSS.attendanceDiv }>
                <div><Clock/></div>
                <div>
                    {
                        <button className={ AttendanceCSS.InOutButton }
                            onClick={ onClickInHandler }
                            disabled={ attendance.attIn != null }
                        >
                            출근하기
                        </button>
                    }
                    {
                        <button className={ AttendanceCSS.InOutButton }
                            onClick={ onClickOutHandler }
                            disabled={ attendance.attIn == null || attendance.attOut != null }
                        >
                            퇴근하기
                        </button>
                    }
                </div>
            </div>
                <table className={ AttendanceCSS.InOutTable }>
                    <colgroup>
                        <col width="20%"/>
                        <col width="30%"/>
                        <col width="20%"/>
                        <col width="30%"/>
                    </colgroup>
                    <tr>
                        <td>출근시간</td>
                        <td>{ attendance.attIn || ''}</td>
                        <td>퇴근시간</td>
                        <td>{ attendance.attOut || '' }</td>
                    </tr>
                </table>
        </>
    );

}

export default Attendance;