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

    // useEffect(() => {
    //     dispatch(callReservationDetailAPI({
    //         reservationNo : params.reservationNo
    //     }));
    // }
    // ,[]);

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

        const formData = new FormData();
 
        formData.append("reservationDate", form.reservationDate);
        formData.append("reservationTimeIn", form.reservationTimeIn);
        formData.append("reservationTimeOut", form.reservationTimeOut);
        formData.append("reservationUseTime", form.reservationUseTime);
        formData.append("reservationPurpose", form.reservationPurpose);
        formData.append("reservationStatus", form.reservationStatus);

    dispatch(callReservationMUpdateAPI({
        form : formData
    }));
    navigate('/room', { replace : true });
    window.location.reload();
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