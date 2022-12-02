import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callCardsAPI } from "../../apis/CardAPICalls";
import RoomListCSS from "../../pages/room/RoomList.module.css";

function OfficeCardList () {

    const dispatch = useDispatch();
    const members = useSelector(state => state.cardReducer);
    const memberList = members.data;
    const [currentPage, setCurrentPage] = useState();

    useEffect(
        () => {
            dispatch(callCardsAPI({currentPage : currentPage}));
        }, [currentPage]
    );

    const pageBtn = members.pageBtn;
    const pageNumber = [];
    if(pageBtn){
        for(let i = pageBtn.startPage; i <= pageBtn.endPage; i++) {
            pageNumber.push(i);
        }
    }

    return (
        <>
            <div>
                <h2>사내 명함</h2>
            </div>
            <div>
                {
                    Array.isArray(memberList) && memberList.map(
                        (member) => (
                            <div key={ member.memberNo }>
                                <h5>{ member.memberName }</h5>
                                <h5>부서{ member.dept.deptName }</h5>
                                <h5>직책{ member.position.positionName }</h5>
                                <h5>전화번호{ member.memberPhone }</h5>
                                <h5>이메일{ member.memberEmail }</h5>
                            </div>
                        )
                    )
                }
            </div>
            <div>
                {
                    Array.isArray(memberList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage - 1) }
                        disabled={ currentPage === 1 }
                        className={ RoomListCSS.pagingBtn }
                    >
                        &lt;
                    </button>
                }
                {
                    pageNumber.map((num) => (
                        <li key={num} onClick={ () => setCurrentPage(num) }>
                            <button
                                style={ currentPage === num ? { backgroundColor : 'red' } : null }
                                className= { RoomListCSS.pagingBtn }
                            >
                                {num}
                            </button>
                        </li>
                    ))
                }
                {
                    Array.isArray(memberList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage + 1) }
                        disabled={ currentPage === pageBtn.maxPage || pageBtn.endPage === 1 }
                        className={ RoomListCSS.pagingBtn }
                    >
                        &gt;
                    </button>
                }
            </div>
        </>
    );

}

export default OfficeCardList;