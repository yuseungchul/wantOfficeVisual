import ReservationCSS from "./Reservation.module.css";
import { useNavigate } from 'react-router-dom';
function Reservation({reservation}){
    
    const navigate = useNavigate();

    const onClickReservationHandler = (reservationNo) => {
        navigate(`/room/rvlist/${reservationNo}`, { replace : false });
    }

    return(
        <table
            className={ ReservationCSS.RvDiv }
            onClick={ () => onClickReservationHandler(reservation.reservationNo) }
        >
            
            <tr>
                <th>예약 시간</th>
            
                <td>{ reservation.reservationTime }</td>
                
                
                    <th>예약 시간</th>
                    <td>{ reservation.reservationDate }</td>
             
                    <th>예약 시간</th>
                    <td>{ reservation.reservationStatus }</td>
                
                
                    <th>예약 시간</th>
                    <td>{ reservation.room.roomName }</td>
                
                
                    <th>예약 시간</th>
                    <td>{ reservation.member.memberId }</td>
                    </tr>
            
        </table>
    );

}

export default Reservation;