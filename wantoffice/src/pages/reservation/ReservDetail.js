import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ReservDetailCSS from './ReservDetail.module.css';
import { callRoomDetailAPI } from '../../apis/RoomAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import LoginModal from '../../components/common/LoginModal';

function RoomDetail(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const room = useSelector(state => state.roomReducer);
    const params = useParams();
    const roomNo = params.roomNo;
    const [loginModal, setLoginModal] = useState(false);

    useEffect(
        () => {
            dispatch(callRoomDetailAPI({
                roomNo : roomNo
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

       navigate(`/room/rvlist/${roomNo}`, { replace : true });
    }




    return(
        <>
            { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null }
            
            <div className={ ReservDetailCSS.DetailDiv }>
            <h2>회의실 상세 보기</h2>
                <div className={ ReservDetailCSS.imgsDiv }>
                    <img src={ room.roomFileUrl } alt="테스트"/>
                    <p className={ ReservDetailCSS.imgName }
                    >
                        { room.roomName }
                    </p>
                </div>
            
            <div className={ ReservDetailCSS.editDiv }>
                <table className={ ReservDetailCSS.editTable }>
                    <tbody>
                        <tr>
                            <th>회의실 명칭</th>
                            <td>{ room.roomName || '' }</td>
                        </tr>
                        <tr>
                            <th>회의실 위치</th>
                            <td>{ room.roomLocation || '' }</td>
                        </tr>
                        <tr>
                            <th>회의실 수용 인원</th>
                            <td>최대 { room.roomCapacity || '' } 인</td>
                        </tr>
                    </tbody>
                </table>
                <button
                    className={ ReservDetailCSS.roomResBtn }
                    onClick={ onClickReservationHandler }
                >
                    예약 조회
                </button>
                <button
                        // onClick={ onClickRoomPostHandler }
                        className={ ReservDetailCSS.rmUpdateBtn }
                    >
                        등록하기</button>
                <button
                        // onClick={ onClickRoomPutHandler }
                        className={ ReservDetailCSS.rmUpdateBtn }
                    >
                        수정하기</button>
                <button
                        // onClick={ onClickRoomRemoveHandler }
                        className={ ReservDetailCSS.rmRemoveBtn }
                    >
                        삭제하기</button>
            </div>
          </div>
        </>
    );

}

export default RoomDetail;