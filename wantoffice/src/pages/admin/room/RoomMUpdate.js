import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function RoomMUpdate(){

    const params = useParams();
    const roomDetail = useSelector(state => state.roomReduce);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [form, setForm] = useState({});

    return(
       <>

       </>
    );

}

export default RoomMUpdate;