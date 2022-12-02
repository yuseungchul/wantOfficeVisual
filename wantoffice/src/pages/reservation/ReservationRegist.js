import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import getHours from "date-fns/getHours";
import getMinutes from "date-fns/getMinutes";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { callReservationRegistAPI } from "../../apis/ReservationAPICalls";
import ReservationRegistCSS from "./ReservationRegist.module.css";
import { decodeJwt } from '../../utils/tokenUtils';

function ReservationRegist(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const state = useState();
    const roomNo = params.roomNo;
    const memberNo = params.memberNo;
    const reservationNo = params.reservationNo;
    const reservation = useSelector(state => state.reservationReducer);

    const [startTime, setStartTime] = useState(null);       //시작시간
    const [endTime, setEndTime] = useState(null);           // 종료 시간
    const [isSelected, setIsSelected] = useState(false);    // 시작시간 선택시



    //시작 시간 선택시 해당 시간 적용 및 setIsSelected의 true, setEndTime의 null 값을 반환
    const onSelect = (time) => {
        setStartTime(time);
        setIsSelected(true);
        setEndTime(null);
    };

    // 종료 시간 선택 시 해당 시간 적용 및 이용 시간 계산
    const onChangeEndTime = (time) => {
        setEndTime(time);
    }


    //현재 시간 기준 지나간 시간 선택 불가
    // const filterPassedTime = () => {
    //     const currentDate = new Date();
    //     const selectedDate = new Date();
    
    //     return currentDate.getTime() < selectedDate.getTime();
    // };

    const [form, setForm] = useState({
        // reservationNo : 0,
        roomNo : roomNo,
        memberNo : memberNo,
        reservationDate : '',
        reservationUseTime: 0,
        reservationPurpose : '',
        
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
        
        if( 
            form.memberNo === 0 ||
            form.reservationDate === 'date' ||
            !startTime || 
            !endTime || 
            form.reservationPurpose === ''
            )
            {
        
                alert("정보를 모두 입력해주세요");
                return;
                
        }

        form.reservationUseTime = parseInt((endTime - startTime) / (1000 * 60 * 60));

        dispatch(callReservationRegistAPI({
            form : form ,
            startTime : startTime,
            endTime : endTime,
            memberNo : memberNo
        }));

        navigate(`/room/rvlist/${roomNo}`, { replace : false });
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
                                        onChange={onChangeHandler}
                                        className={ ReservationRegistCSS.inputDiv }
                                        style={ {border:'none'} }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>예약 날짜</label></td>
                                <td>
                                    <input
                                        name="reservationDate"
                                        type="date"
                                        onChange={onChangeHandler}
                                        className={ ReservationRegistCSS.inputDiv }
                                        style={ {border:'none'} }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>예약 희망 시간</label></td>
                                <td>
                                <DatePicker
                                    selected={startTime}
                                    onChange={onSelect}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={60}
                                    minTime={setHours(setMinutes(new Date(), 0), 9)}
                                    maxTime={setHours(setMinutes(new Date(), 0), 18)}
                                    timeCaption="Time"
                                    dateFormat="h:mm"
                                    placeholderText="시작 시간"
                                    className={ ReservationRegistCSS.inputDiv }
                                    name="reservationTimeIn"
                                    />
                                </td>
                                
                                {isSelected ? // 시작 시간을 선택해야 종료 시간 선택 가능
                
                                <td>
                                <DatePicker
                                    selected={endTime}
                                    onChange={ (time) => onChangeEndTime(time) }
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={60}
                                    minTime={startTime}
                                    maxTime={setHours(setMinutes(new Date(), getMinutes(startTime)), getHours(startTime)+2)} // 시작 시간부터 2시간
                                    excludeTimes={[
                                        // 시작 시간 제외
                                        startTime,
                                        // 5:00 선택 기준 최대 7:00까지 예외처리
                                        setHours(setMinutes(new Date(), 0), 17),
                                        setHours(setMinutes(new Date(), 0), 19)
                                    ]}
                                    timeCaption="Time"
                                    dateFormat="h:mm"
                                    placeholderText="종료 시간"
                                    className="mt-3"
                                    name="reservationTimeOut"
                                />
                                </td>
                                : null
                                }
                                {/* < DatePicker
                                    filterDate={filterPassedTime}
                                    /> */}
                            </tr>
                            
                            {/* <tr>
                                <td><label>이용 시간</label></td>
                                <td>
                                    <input
                                        name="reservationUseTime"
                                        type="number"
                                        autoComplete="off"                                
                                        className={ ReservationRegistCSS.inputDiv }
                                        disabled={true}
                                        value={ form.reservationUseTime }
                                    />
                                </td>
                            </tr> */}
                            <tr>
                                <td><label>예약목적</label></td>
                                <td>
                                    <input
                                        name="reservationPurpose"
                                        autoComplete="off"                                
                                        className={ ReservationRegistCSS.inputDiv }
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                            
                            {/* <tr>
                                <td><label>예약관리</label></td>
                                <td>
                                    <input
                                        name="reservationStatus"
                                        autoComplete="off"                                
                                        className={ ReservationRegistCSS.inputDiv }
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr> */}
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