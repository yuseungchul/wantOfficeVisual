import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { callMemberListAPI } from "../../../apis/MemberAPICalls";
import RegistModal, { registModal } from "../../../components/common/management/RegistModal";

function Member() {

    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);
    const memberList = member.data;
    const [currentPage, setCurrentPage] = useState(1);
    const [registModal, setRegistModal] = useState(false);

    const openModal = () => {
        setRegistModal(true);
    }

    useEffect(
        ()=>{
                dispatch(callMemberListAPI({
                    currentPage : currentPage
                }));
            }
        ,[currentPage]
    );

    const pageBtn = member.pageBtn;
    const pageNumber = [];
    if(pageBtn){
        for(let i = pageBtn.startPage; i<=pageBtn.endPage; i++){
            pageNumber.push(i);
        }
    }

    const onClickRegisterHandler = () => {
        setRegistModal(true);
    }
    

    return (
    
                <div>
                    <button onClick={ openModal }>사원 등록</button>
                    { registModal && <RegistModal setRegistModal= {setRegistModal}/> }
                </div>



    );


}

export default Member;