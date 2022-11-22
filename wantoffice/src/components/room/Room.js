import RoomCSS from "./Room.module.css";
import { useNavigate } from 'react-router-dom';


function Room({ room : {roomNo, roomName, roomLocation, roomCapacity, roomFileName, roomImage} }){

    const navigate = useNavigate();

    const onClickRoomHandler = (roomNo) => {
        navigate(`/api/room/rooms${roomNo}`, { replace : true });
    }

    return(
        <div
            className={ RoomCSS.roomDiv }
            onClick={ () => onClickRoomHandler(roomNo) }
        >
            <img src={ roomImage } alt="예시"/>
            <h6>{ roomName }</h6>
            <h6>{ roomLocation }</h6>
        </div>
    );

} 

export default Room;