import ReservationCSS from "./Reservation.module.css";
import { useNavigate } from 'react-router-dom';
function Reservation({reservation}){
    
    const navigate = useNavigate();

    const onClickReservationHandler = (reservationNo) => {
        navigate(`/room/rvlist/${reservationNo}`, { replace : false });
    }

    return(
        <>
        <div
            className={ ReservationCSS.RvDiv }
            onClick={ () => onClickReservationHandler(reservation.reservationNo) }
        >
            <table className={ReservationCSS.rvtbdDiv}> 
                <td>
                    { reservation.reservationNo }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    { reservation.reservationTime } 시간 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    { reservation.reservationDate } &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    { reservation.reservationStatus } &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    { reservation.room.roomName } &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    { reservation.member.memberId } 
                </td>
            </table>
        </div>
        </>
    );

}

export default Reservation;