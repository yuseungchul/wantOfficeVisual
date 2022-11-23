import ReservationListCSS from "./ReservationList.module.css";
import Reservation from "../../components/room/Reservation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { callReservationListAPI } from '../../apis/RoomAPICalls';


function ReservationList(){

    const dispatch = useDispatch();
    const reservations = useSelector(state => state.reservationReducer);
    const reservationList = reservations.data;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callReservationListAPI({
                currentPage : currentPage
            }));
        },
        [currentPage]
    );
    
    /* 페이징 */
    const pageBtn = reservations.pageBtn;
    const pageNumber = [];
    if(pageBtn){
        for(let i = pageBtn.startPage; i <= pageBtn.endPage; i++) {
            pageNumber.push(i);
        }
    }

    return(
        <>
            <div className={ReservationListCSS.rvListDiv}>
                <h2>회의실 예약 안내</h2>
                {
                    Array.isArray(reservationList)
                    && reservationList.map((reservation) => (<ReservationList key={ reservation.reservationNo } reservation={ reservation }/>))
                }
                
            <div className={ ReservationListCSS.rvPgs }>
                {
                    Array.isArray(reservationList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage - 1) }
                        disabled={ currentPage === 1 }
                        className={ ReservationListCSS.pagingBtn }
                    >
                        &lt;
                    </button>
                }
                {
                    pageNumber.map((num) => (
                        <li key={num} onClick={ () => setCurrentPage(num) }>
                            <button
                                style={ currentPage === num ? { backgroundColor : 'red' } : null }
                                className= { ReservationListCSS.pagingBtn }
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
                        className={ ReservationListCSS.pagingBtn }
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