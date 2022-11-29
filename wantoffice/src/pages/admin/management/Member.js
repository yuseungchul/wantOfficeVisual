import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callMemberListAPI } from "../../../apis/MemberAPICalls";
import RegistModal from "../../../components/common/management/RegistModal";
import MemberCSS from './Member.module.css';

function Member() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const members = useSelector(state => state.memberReducer);
    const memberList = members.data;
    const pageInfo = members.pageBtn;
    const [currentPage, setCurrentPage] = useState(1);
    const [registModal, setRegistModal] = useState(false);

    const openModal = () => {
        setRegistModal(true);
    }

    const pageNumber = [];
    if (pageInfo) {
        for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callMemberListAPI({
                memberNo: params.memberNo,
                currentPage: currentPage
            }));
        }
        , [currentPage]
    )

    const onClickRegisterHandler = () => {
        setRegistModal(true);
    }

    const onClickTableTr = (memberNo) => {
        navigate(`/memberDetail/${memberNo}`, { replace: true });
    }

    console.log(members);

    return (
        <>
            

            <div className={MemberCSS.memberTableDiv}>
                <table className={MemberCSS.memberTableCss}>
                    <colgroup>
                        <col width="2%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="5%" />
                        <col width="15%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="5%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>이름</th>
                            <th>아이디</th>
                            <th>부서</th>
                            <th>직위</th>
                            <th>이메일</th>
                            <th>연락처</th>
                            <th>입사일</th>
                            <th>재직여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(memberList) && memberList.map(
                                (member) => (    
                                    <tr
                                        key={member.memberNo}
                                        onClick={() => onClickTableTr(member.memberNo)}
                                    >
                                        <td>{member.memberNo}</td>
                                        <td>{member.memberName}</td>
                                        <td>{member.memberId}</td>
                                        <td>{member.dept.deptName}</td>
                                        <td>{member.position.positionName}</td>
                                        <td>{member.memberEmail}</td>
                                        <td>{member.memberPhone}</td>
                                        <td>{member.memberJoinDate}</td>
                                        <td>{member.memberStatus}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            <br/>
            <div 
                className={ MemberCSS.PagenDiv }>
                {
                    Array.isArray(memberList) &&
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={MemberCSS.pagingBtn}
                    >
                        &lt;
                    </button>
                }
                {
                    pageNumber.map((num) => (
                        <li key={num} onClick={() => setCurrentPage(num)}>
                            <button
                                style={currentPage === num ? { backgroundColor: 'skyblue' } : null}
                                className={MemberCSS.pagingBtn}
                            >
                                {num}
                            </button>
                        </li>
                    ))
                }
                {
                    Array.isArray(memberList) &&
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}
                        className={MemberCSS.pagingBtn}
                    >
                        &gt;
                    </button>
                }
            </div>

            <div>
                <button 
                    className={ MemberCSS.memBtn }
                    onClick={ openModal }>사원 등록</button>
                { registModal && <RegistModal setRegistModal= {setRegistModal}/> }
            </div>
        </>
    );
}

export default Member;