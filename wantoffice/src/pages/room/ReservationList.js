import ReservationListCSS from "./ReservationList.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { callReservationListAPI } from '../../apis/RoomAPICalls';
import { NavLink, useParams } from "react-router-dom";
import RDate from "./RDate";
import LoginModal from "../../components/common/LoginModal";

function ReservationList(){

    const dispatch = useDispatch();
    const reservation = useSelector(state => state.reservationReducer);
    const reservationList = reservation.data;
    const params = useParams();
    const roomNo = params.roomNo;
    const [loginModal, setLoginModal] = useState(false);

    // const [currentPage, setCurrentPage] = useState(1);

    console.log(reservation, reservationList);

    

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

    // if(Date){
    //     for();
    // };

    return(
        <>
        { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null }
            <p><RDate/></p>

            <div className={ReservationListCSS.rvListDiv}>
                <h2>회의실 예약 안내</h2>
                
                <table className={ReservationListCSS.rvtblDiv}>
                    <th>순번</th>
                    <th>예약 시간</th>
                    <th>예약 상태</th>
                    <th> 비고 </th>
                    <tr>
                        <input type="checkbox"/>
                        {/* <td>{reservation.reservationNo}</td>
                        <td>{reservation.reservationTime}</td>
                        <td>{reservation.reservationDate}</td>
                        <td>{reservation.reservationStatus}</td>
                        <td>{reservation.room.roomNo}</td>
                        <td>{reservation.member.memberNo}</td> */}
                    </tr>
                    
                </table>

                <NavLink to="/">예약 신청</NavLink>
                
                
            
            </div>
           
        </>
    );

}

export default ReservationList;