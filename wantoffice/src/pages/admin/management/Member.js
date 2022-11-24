import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { decodeJwt } from "../../../utils/tokenUtils";
import { callMemberListAPI } from "../../../apis/MemberAPICalls";

function Member() {

    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);
    const memberList = member.data;

    const [registModal, setRegistModal] = useState(false);
    const [memberNo, setMemberNo] = useState(0);

    useEffect(
        ()=>{
            if(token) {
                dispatch(callMemberListAPI({
                    memberId : token.sub
                }));
            }
        }
        ,[]
    );

    const onClickRegisterHandler = () => {
        setRegistModal(true);
    }
    <div><button><NavLink to="/register">사원 등록</NavLink></button></div>

    return (
        <>
            {

            }
        </>
    )


}

export default Member;