import { useDispatch } from "react-redux";
import { callInRegistAPI, callOutRegistAPI } from "../../apis/AttendanceAPICalls";
import Clock from "./Clock";
import AttendanceCSS from './Attendance.module.css';


function Attendance() {

    const dispatch = useDispatch();

    const onClickInHandler = () => {
        dispatch(callInRegistAPI({

        }));
    }

    const onClickOutHandler = () => {
        dispatch(callOutRegistAPI({

        }));
    }

    return (
        <>
            <div><Clock/></div>
            <div>
                {
                    <button className={ AttendanceCSS.InOutButton }
                        onClick={ onClickInHandler }
                    >
                        출근하기
                    </button>
                }
                {
                    <button className={ AttendanceCSS.InOutButton }
                        onClick={ onClickOutHandler }
                    >
                        퇴근하기
                    </button>
                }
            </div>
        </>
    );

}

export default Attendance;