import ReservationCSS from "./Reservation.module.css";
import { useNavigate } from 'react-router-dom';
function Reservation({ reservation : {reservationNo, reservationTime, reservationDate, reservationStatus, reservationPurpose, reservationRemoveStatus, roomName, memberName, roomImage}}){
    
    const navigate = useNavigate();

    const onClickReservationHandler = (reservationNo) => {
        navigate(`/room/rvlists/${reservationNo}`, { replace : false });
    }

    return(
        <div
            className={ ReservationCSS.RvDiv }
            onClick={ () => onClickReservationHandler(reservationNo) }
        >
            <h6>{ reservationTime }</h6>
            <h6>{ reservationDate }</h6>
            <h6>{ reservationStatus }</h6>
            <h6>{ roomName }</h6>
            <h6>{ memberName }</h6>
        </div>
    );

}

export default Reservation;