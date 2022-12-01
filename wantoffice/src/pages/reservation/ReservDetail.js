import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ReservDetailCSS from './ReservDetail.module.css';
import { callReservationDetailAPI } from '../../apis/ReservationAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import LoginModal from '../../components/common/LoginModal';

function ReservDetail(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reservation = useSelector(state => state.reservationReducer);
    const params = useParams();
    const reservationNo = params.reservationNo;
    const [loginModal, setLoginModal] = useState(false);

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }

    useEffect(
        () => {
            dispatch(callReservationDetailAPI({
                reservationNo : reservationNo
            }));
        },
        []
    );
    console.log('callReservationDetailAPI 동작');
    const onClickReservationUpdateHandler = () => {
        console.log('[ReservationDetail] onClickReservationUpdateHandler');
        navigate(`/room/rvlists-managements`, {replace: false})
    }

    return(
        <>
            {/* { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null } */}
            
            <div className={ ReservDetailCSS.DetailDiv }>
             <h2>회의실 예약 상세 보기</h2>
            <div className={ ReservDetailCSS.editDiv }>
                <table className={ ReservDetailCSS.editTable }>
                    <tbody>
                        <tr>   
                            <td><label>예약 번호</label></td>
                            <td>{ reservation.reservationNo || '' }</td>
                        </tr>
                        <tr>
                            <th>시작 시간</th>
                            <td>{ reservation.reservationTimeIn || '' }</td>
                        </tr>
                        <tr>
                            <th>종료 시간</th>
                            <td>{ reservation.reservationTimeOut || '' }</td>
                        </tr>
                        <tr>
                            <th>이용 시간</th>
                            <td>{ reservation.reservationUseTime || ''} 시간</td>
                        </tr>
                        <tr>
                            <th>예약 날짜</th>
                            <td>{ reservation.reservationDate || '' }</td>
                        </tr>
                                        
                        <tr>
                            <th>예약 상태</th>
                            <td>{ reservation.reservationSetting || ''}</td>
                        </tr>
                        <tr>
                            <th>예약 목적</th>
                            <td>{ reservation.reservationPurpose || '' }</td>
                        </tr> 
                     
                    </tbody>

                </table>
                { decoded === "ROLE_ADMIN" && 
                <button
                        onClick={ onClickReservationUpdateHandler }
                        className={ ReservDetailCSS.rmUpdateBtn }
                    >
                        수정하기</button>
                }
                { decoded === "ROLE_ADMIN" && 
                <button
                        // onClick={ onClickRoomRemoveHandler }
                        className={ ReservDetailCSS.rmRemoveBtn }
                    >
                        삭제하기</button>
                }
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
            </div>
          </div>
        </>
    );

}

export default ReservDetail;