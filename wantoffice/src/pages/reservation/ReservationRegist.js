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
                                <td><label>예약 시간 목록</label></td>
                                <td>
                                    <select
                                        className={ ReservationRegistCSS.inputDiv }
                                        onChange={ onChangeHandler }
                                        name="reservationTime"
                                    >
                                        <option>09:00 ~ 10:00</option>
                                        <option>10:00 ~ 11:00</option>
                                        <option>11:00 ~ 12:00</option>
                                        <option>12:00 ~ 13:00</option>
                                        <option>13:00 ~ 14:00</option>
                                        <option>14:00 ~ 15:00</option>
                                        <option>15:00 ~ 16:00</option>
                                        <option>16:00 ~ 17:00</option>
                                        <option>17:00 ~ 18:00</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label>이용 시간</label></td>
                                <td>
                                    <input
                                        name="reservationTime"
                                        placeholder="이용시간"
                                        className={ ReservationRegistCSS.inputDiv }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>예약 상태</label></td>
                                <td>
                                    <select
                                        className={ReservationRegistCSS.selectDiv}
                                        onChange={ onChangeHandler }
                                    >
                                        <option>예약</option>
                                        <option>예약</option>
                                        <option>예약</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label>예약 목적</label></td>
                                <td>
                                    <input
                                        name="reservationPurpose"
                                        placeholder="예약목적"
                                        className={ReservationRegistCSS.inputDiv}
                                        onChange={ onChangeHandler }
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