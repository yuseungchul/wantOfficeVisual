import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { callReservationRegistAPI } from "../../apis/ReservationAPICalls";
import ReservationRegistCSS from "./ReservationRegist.module.css";
import { decodeJwt } from '../../utils/tokenUtils';
function ReservationRegist(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

        
        navigate(`/room/rvlist`, { replace : true });
        
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
                                        className={ReservationRegistCSS.inputDiv}
                                        
                                    />
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
                            <tr>
                                <td><label>예약할 회의실</label></td>
                                <td>
                                    <label><input type="radio" name="roomNo" onChange={ onChangeHandler } value="1"/> 3층 회의실A</label> &nbsp;
                                    <label><input type="radio" name="roomNo" onChange={ onChangeHandler } value="2"/> 3층 회의실B</label> &nbsp;
                                    <label><input type="radio" name="roomNo" onChange={ onChangeHandler } value="3"/> 3층 회의실C</label> <br/>
                                    <label><input type="radio" name="roomNo" onChange={ onChangeHandler } value="4"/> 4층 회의실A</label> &nbsp;
                                    <label><input type="radio" name="roomNo" onChange={ onChangeHandler } value="5"/> 4층 회의실B</label> &nbsp;
                                    <label><input type="radio" name="roomNo" onChange={ onChangeHandler } value="6"/> 4층 회의실C</label> &nbsp;
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