import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { callReservationRegistAPI } from "../../apis/ReservationAPICalls";
import ReservationRegistCSS from "./ReservationRegist.module.css";
import { decodeJwt } from '../../utils/tokenUtils';
function ReservationRegist(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    // const roomNo = params.roomNo;
    const reservationNo = params.reservationNo;
    const reservation = useSelector(state => state.reservationReducer);

    const [form, setForm] = useState({
        reservationNo : reservation.reservationNo,
        reservationTime : 0,
        reservationStatus : '',
        reservationPurpose : '',
        roomNo: 0,
        memberNo: 0,
    });

    /* 입력값 변경시 클릭 이벤트 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const token = decodeJwt(window.localStorage.getItem('accessToken'));

    const onClickReservationRegistHandler = () => {
        
        if(form.reservationTime === '' || reservation.reservationStatus === '' ||
            form.reservationPurpose === '' || reservation.roomNo === '' || reservation.memberNo === ''){
                // alert("정보를 모두 입력해주세요");
                return;
        }

        dispatch(callReservationRegistAPI({
            form : form
        }));

        
        navigate(`/room/rvlist/${reservationNo}`, { replace : true });
        
    }

    return(

        <>
            
            <div className={ ReservationRegistCSS.reservationDiv }>
            <h2>회의실 예약 신청</h2>
                <div className={ ReservationRegistCSS.reservationInfo }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>예약자ID</label></td>
                                <td>
                                    <input
                                        name="memberNo"
                                        autoComplete="off"
                                        defaultValue={token.sub || ''}
                                        className={ ReservationRegistCSS.inputDiv }
                                        style={ {border:'none'} }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>예약 희망 시간</label></td>
                                <td>
                                    <input
                                        name="reservationTime"
                                        autoComplete="off"                                
                                        className={ ReservationRegistCSS.inputDiv }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>이용 시간</label></td>
                                <td>
                                    <input
                                        name="reservationUseTime"
                                        autoComplete="off"                                
                                        className={ ReservationRegistCSS.inputDiv }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>예약목적</label></td>
                                <td>
                                    <input
                                        name="reservationUseTime"
                                        autoComplete="off"                                
                                        className={ ReservationRegistCSS.inputDiv }
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={ ReservationRegistCSS.reservationBtnDiv }>
                <button
                    className={ ReservationRegistCSS.InserBtn }
                    onClick={ onClickReservationRegistHandler }
                >예약 신청</button>
                <button
                    className={ ReservationRegistCSS.BackBtn }
                    onClick={ () => navigate(-1) }
                >돌아가기</button>
            </div>
         </div>
            
        </>

    );

}

export default ReservationRegist;