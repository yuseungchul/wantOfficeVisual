import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callReservationDetailAPI, callReservationMUpdateAPI } from '../../../apis/ReservationAPICalls';
import ReservationMUpdateCSS from '../reservation/ReservationMUpdate.module.css';

function ReservationMUpdate(){

    const params = useParams();
    const reservDetail = useSelector(state => state.reservationReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({});

    const [modifyMode, setModifyMode] = useState(false);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            reservationDate : reservDetail.reservationDate,
            reservationTimeIn : reservDetail.reservationTimeIn,
            reservationTimeOut : reservDetail.reservationTimeOut,
            reservationUseTime : reservDetail.reservationUseTime,
            reservationPurpose : reservDetail.reservationPurpose,
            reservationStatus : reservDetail.reservationStatus,
            
        });
    }

    const onClickReservationUpdateHandler = () => {
        dispatch(callReservationMUpdateAPI({
            form : form, 
            reservationDate : params.reservationDate,
            reservationTimeIn : params.reservationTimeIn,
            reservationTimeOut : params.reservationTimeOut,
            reservationUseTime : params.reservationUseTime,
            reservationPurpose : params.reservationPurpose,
            reservationStatus : params.reservationStatus,
    }));
    alert('예약 수정이 완료되었습니다.');
    navigate('/room');
}
    return(
        <>
            <div className={ ReservationMUpdateCSS.reservedSection }>
                <div className={ ReservationMUpdateCSS.reservedInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>시작 시간</label></td>
                                <td>
                                    <input
                                        name='reservationTimeIn'
                                        placeholder='예약 시작 시간'
                                        text='text'
                                        disabled={!modifyMode}
                                        className={ ReservationMUpdateCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? reservDetail.reservationTimeIn : form.reservationTimeIn) || 0 }
                                        readOnly={ !modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>종료 시간</label></td>
                                <td>
                                <input
                                        name='reservationTimeOut'
                                        placeholder='예약 종료 시간'
                                        text='text'
                                        disabled={!modifyMode}
                                        className={ ReservationMUpdateCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? reservDetail.reservationTimeOut : form.reservationTimeOut) || 0 }
                                        readOnly={ !modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>이용 시간</label></td>
                                <td>
                                    <input
                                        name='reservationUseTime'
                                        disabled={!modifyMode}
                                        value={ (!modifyMode ? reservDetail.reservationUseTime : form.reservationUseTime) || 0 }
                                        className={ ReservationMUpdateCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        readOnly={ !modifyMode ? true : false }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>예약목적</label></td>
                                <td>
                                    <input
                                        name='reservationPurpose'
                                        disabled={!modifyMode}
                                        className={ ReservationMUpdateCSS.productInfoInput }
                                        value={ (!modifyMode ? reservDetail.reservationPurpose : form.reservationPurpose) || 0 }
                                        onChange={ onChangeHandler }
                                        readOnly={ !modifyMode ? true : false }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>예약 여부</label></td>
                                <td>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="reservationStatus"  
                                            onChange={ onChangeHandler } 
                                            value="Y"
                                            readOnly={ modifyMode ? false : true }
                                            checked={ (!modifyMode ? reservDetail.reservationStatus : form.reservationStatus) === 'Y' ? true : false }
                                        /> 
                                            Y
                                    </label> &nbsp;
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="reservationStatus"  
                                            onChange={ onChangeHandler } 
                                            value="N"
                                            readOnly={ modifyMode ? false : true }
                                            checked={ (!modifyMode ? reservDetail.reservationStatus : form.reservationStatus) === 'N' ? true : false }
                                        /> N</label>
                                </td>
                            </tr>    
                        </tbody>
                    </table>
                    
                </div>
            </div>
            <div className={ ReservationMUpdateCSS.ReservedBtnDiv }>
                <button
                    onClick={ () => navigate(-1) }
                >
                    뒤로가기
                </button>
            {!modifyMode && 
                <button
                    onClick={ onClickModifyModeHandler }
                >
                    수정 모드
                </button>
            }
            {modifyMode &&
                <button
                    onClick={ onClickReservationUpdateHandler }
                >
                    수정 하기
                </button>
            }
            </div>
        </>
    );

}

export default ReservationMUpdate;