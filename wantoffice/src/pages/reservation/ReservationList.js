import ReservationListCSS from "./ReservationList.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { callReservationListAPI } from '../../apis/ReservationAPICalls';
import { useNavigate, useParams } from "react-router-dom";
import RDate from "./RDate";
import LoginModal from "../../components/common/LoginModal";
// import Reservation from "../../components/room/Reservation";

function ReservationList(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reservation = useSelector(state => state.reservationReducer);
    // const reservationList = reservation.data;
    const params = useParams();
    const roomNo = params.roomNo;
    const [loginModal, setLoginModal] = useState(false);

    // const [currentPage, setCurrentPage] = useState(1);

    console.log(reservation);

    

    useEffect(
        () => {
            console.log('useEffect 동작 확인');
            dispatch(callReservationListAPI({
                roomNo : roomNo,
                Date
            }));
        },
        []
    );

    const onClickReservationInsert = () => {
        console.log('[ReservationList] onClickReservationInsert');
        navigate(`/room/rvlists`, { replace: false })
    }

    const onClickReservationDetailer = () => {
        console.log('[ReservationList] onClickReservationDetailer');
        navigate(`/room/rvlists/${ reservation.reservationNo }`, { replace: false })
    }

    return(
        <>
        { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null }
            <div className={ReservationListCSS.TimeDiv}><RDate/></div>

            <div className={ReservationListCSS.rvListDiv}>
                <h2>회의실 예약 안내</h2>
                 
                <table>
                
                    <th>예약 번호</th>
                    <th>예약 시간</th>
                    <th>예약 이용 시간</th>
                    <th>예약 날짜</th>
                    <th>예약 상태</th>
                    <th>예약 목적</th>
                    
                    <tbody>
                    {
                            Array.isArray(reservation) && reservation.map(
                                (reservation) => (
                                    <tr
                                        key={ reservation.reservationNo }
                                        onClick={ () => onClickReservationDetailer(reservation.reservationNo) }
                                    >
                                        <td>{ reservation.reservationNo }</td>
                                        <td>{ reservation.reservationTime }</td>
                                        <td>{ reservation.reservationUseTime } 시간</td>
                                        <td>{ reservation.reservationDate }</td>
                                        <td>{ reservation.reservationSetting }</td>
                                        <td>{ reservation.reservationPurpose }</td>
                                    </tr>
                                )
                            )
                        }
                        </tbody>
                  
                </table>
 
                <button 
                    className={ ReservationListCSS.InsertBtn }
                    onClick={ onClickReservationInsert }
                    >예약 신청</button>
                
                
            
            </div>
           
        </>
    );

}

export default ReservationList;