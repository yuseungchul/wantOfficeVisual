import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ReservationDetailCSS from './ReservDetail.module.css';
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

    useEffect(
        () => {
            dispatch(callReservationDetailAPI({
                reservationNo : reservationNo
            }));
        },
        []
    );

    /* 예약신청 버튼 이벤트 */    
    const onClickReservationHandler = () => {

        // 로그인 상태 확인
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log('[onClickReservationHandler] token : ', token);

        if(!token) {
            alert("신청 전 로그인 확인이 필요합니다.");
            setLoginModal(true);
            return;
        }

        // 토큰 만료시 재 로그인
        if(token.exp * 1000 < Date.now()) {
            setLoginModal(true);
            return;
        }

       navigate(`/room/rvlist/${reservationNo}`, { replace : true });
    }




    return(
        <>
            { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null }
            
            <div className={ ReservationDetailCSS.DetailDiv }>
            <h2>회의실 상세 보기</h2>
            
            <div className={ ReservationDetailCSS.editDiv }>
                <table className={ ReservationDetailCSS.editTable }>
                    <tbody>
                        <tr>
                            <th>회의실 명칭</th>
                            <td>{ reservation.memberNo || '' }</td>
                        </tr>
                        <tr>
                            <th>회의실 위치</th>
                            <td>{ reservation.reservationtime || '' }</td>
                        </tr>
                        <tr>
                            <th>회의실 수용 인원</th>
                            <td>최대 { reservation.reservationPurpose || '' } 인</td>
                        </tr>
                    </tbody>
                </table>
                <button
                    className={ ReservationDetailCSS.roomResBtn }
                    onClick={ onClickReservationHandler }
                >
                    예약 조회
                </button>
                <button
                        // onClick={ onClickRoomPutHandler }
                        className={ ReservationDetailCSS.rmUpdateBtn }
                    >
                        수정하기</button>
                <button
                        // onClick={ onClickRoomPutHandler }
                        className={ ReservationDetailCSS.rmRemoveBtn }
                    >
                        삭제하기</button>
            </div>
          </div>
        </>
    );

}

export default ReservDetail;