import ReservListMCSS from "./ReservListM.module.css";
import Reservation from "../../components/room/Reservation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { callReservationListAPI } from '../../apis/RoomAPICalls';
import { NavLink } from "react-router-dom";


function ReservationList(){

    const dispatch = useDispatch();
    const reservations = useSelector(state => state.reservationReducer);
    const reservationList = reservations.data;
    const [currentPage, setCurrentPage] = useState(1);

    console.log(reservations, reservationList, currentPage);

    useEffect(
        () => {
            console.log('useEffect 동작 확인');
            dispatch(callReservationListAPI({
                currentPage : currentPage
            }));
        },
        []
    );
    
    /* 페이징 */
    const pageBtn = reservations.pageBtn;
    const pageNumber = [];
    console.log('pageBtn',pageBtn);
    if(pageBtn){
        for(let i = pageBtn.startPage; i <= pageBtn.endPage; i++) {
            pageNumber.push(i);
        }
    }

    

    return(
        <>
            <div className={ReservListMCSS.rvListDiv}>
                <h2>회의실 예약 안내</h2>
                <table className={ReservListMCSS.rvtblDiv}>
                    <th>순번</th>
                    <th style={{"padding-left":"8px"}}>예약 시간</th>
                    <th style={{"padding-left":"26px"}}>예약 날짜</th>
                    <th style={{"padding-left":"40px"}}>예약 상태</th>
                    <th style={{"padding-left":"28px"}}>회의실 이름</th>
                    <th style={{"padding-left":"8px"}}>사원 ID</th>
                </table>
                <NavLink to="/">예약 신청</NavLink>
                {
                    Array.isArray(reservationList)
                    && reservationList.map((reservation) => (<Reservation key={ reservation.reservationNo } reservation={ reservation }/>))
                }
                
            <div className={ ReservListMCSS.rvPgs }>
                {
                    Array.isArray(reservationList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage - 1) }
                        disabled={ currentPage === 1 }
                        className={ ReservListMCSS.pagingBtn }
                    >
                        &lt;
                    </button>
                }
                {
                    pageNumber.map((num) => (
                        <li key={num} onClick={ () => setCurrentPage(num) }>
                            <button
                                style={ currentPage === num ? { backgroundColor : 'red' } : null }
                                className= { ReservListMCSS.pagingBtn }
                            >
                                {num}
                            </button>
                        </li>
                    ))
                }
                {
                    Array.isArray(reservationList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage + 1) }
                        disabled={ currentPage === pageBtn.maxPage || pageBtn.endPage === 1 }
                        className={ ReservListMCSS.pagingBtn }
                    >
                        &gt;
                    </button>
                }
                </div>
            </div>
        </>
    );

}

export default ReservationList;