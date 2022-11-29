import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callReservationDetailAPI } from "../../apis/RoomAPICalls";
import LoginModal from "../../components/common/LoginModal";
import { decodeJwt } from "../../utils/tokenUtils";
import ReservDetailCSS from "./ReservDetail.module.css";

function ReservDetail(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reservation = useSelector(state => state.reservationReducer);
    const params = useParams();
    const reservationNo = params.reservationNo;
    const [loginModal, setLoginModal] = useState(false);

    console.log(reservation);
    console.log('reservationNo',reservationNo);

    useEffect(
        () => {
            dispatch(callReservationDetailAPI({
                reservationNo : reservationNo
            }));
            console.log('callReservationDetailAPI');
        },
        []
    );

    const onClickReservationDetailHandler = () => {

        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log('[onClickReservationDetailHandler] token : ', token);

        if(!token) {
            alert("신청 전 로그인 확인이 필요합니다.");
            setLoginModal(true);
            return;
        }

        if(token.exp * 1000 < Date.now()) {
            setLoginModal(true);
            return;
        }
        navigate(`/rvlists${reservation.reservationNo}`,{ replace : true });
    }

    return(
        <>
            { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null }

            { reservation.room && 
                <div className={ ReservDetailCSS.DetailsDiv }>
                    <h2>예약 정보 상세 보기</h2>
                    <div className={ ReservDetailCSS.tblDiv }>
                        <table className={ ReservDetailCSS.tblTable }>
                            <tbody>
                                <tr>
                                    <th>회의실 명칭</th>
                                    <td>{ reservation.room.roomName || '' }</td>
                                </tr>
                                <tr>
                                    <th>예약자</th>
                                    <td>{ reservation.member.memberId || ''  }</td>
                                </tr>
                                <tr>
                                    <th>예약 상태</th>
                                    <td>{ reservation.reservationStatus || ''  }</td>
                                </tr>
                                <tr>
                                    <th>예약 목적</th>
                                    <td>{ reservation.reservationPurpose || ''  }</td>
                                </tr>
                                <tr>
                                    <th>예약 신청일</th>
                                    <td>{ reservation.reservationDate || ''  }</td>
                                </tr>
                                <tr>
                                    <th>이용시간</th>
                                    <td>{ reservation.reservationTime || ''  } 시간</td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            className={ReservDetailCSS.resBtn}
                            onClick={ onClickReservationDetailHandler }
                        >
                            예약 신청
                        </button>
                    </div>
                </div>
            }
        </>
    );


}

export default ReservDetail;