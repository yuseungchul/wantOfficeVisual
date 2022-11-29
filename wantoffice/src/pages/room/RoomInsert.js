import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function RoomInsert(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [roomFileUrl, setRoomFileUrl] = useState('');
    const [form, setForm] = useState({

    });

    return(
        <>

        </>
    );

}

export default RoomInsert;