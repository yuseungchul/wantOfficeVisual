import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callAppNameAPI } from "../../apis/OffAPICalls";


function Off() {

    function toStringByFormatting(source, delimiter = "-") {
        const year = source.getFullYear();
        const month = source.getMonth() + 1;
        const day = source.getDate();

        return [year, (month < 10 ? "0"+month : month), (day < 10 ? "0"+day : day)].join(delimiter);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        offDate : toStringByFormatting(new Date()),
        offUpdate : '',
        offStart : '',
        offEnd : '',
        offTitle : '',
        offReason : '',
        offResult : '',
        memberNo : 0,
        appAuthNo : 0
    });

    useEffect(
        () => {
            dispatch(callAppNameAPI());
         }, []
    );

    return (
        <>
            <div>
                <h3>연차 신청</h3>
            </div>
            
        </>
    );

}

export default Off;