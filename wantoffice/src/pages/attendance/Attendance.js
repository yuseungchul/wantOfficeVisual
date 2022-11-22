import { useDispatch } from "react-redux";
import { callInRegistAPI } from "../../apis/AttendanceAPICalls";


function Attendance() {

    const dispatch = useDispatch();

    const onClickInHandler = () => {
        dispatch(callInRegistAPI({

        }));
    }

    return (
        <>
            <div>
                {
                    <button
                        onClick={ onClickInHandler }
                    >
                        출근하기
                    </button>
                }
                {/* {
                    <button
                        onClick={ onClickOutHandler }
                    >
                        퇴근하기
                    </button>
                } */}
            </div>
        </>
    );

}

export default Attendance;