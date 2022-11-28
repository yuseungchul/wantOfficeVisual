import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callOffListForAppAPI } from "../../apis/OffAPICalls";
import OffForApp from "../../components/off/OffForApp";
import RoomListCSS from "../../pages/room/RoomList.module.css";

function OffListForApp() {

    const dispatch = useDispatch();
    const offs = useSelector(state => state.offReducer);
    const offList = offs.data;
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedResult, setSelectedResult] = useState("대기");
    
    const handleSelectResult = (e) => {
        console.log('e.target.value : ', e.target.value);
        setSelectedResult(e.target.value);
    };

    useEffect(
        () => {
            dispatch(callOffListForAppAPI({offResult : selectedResult, currentPage : currentPage}));
        }, [selectedResult ,currentPage]
    );

    const pageBtn = offs.pageBtn;
    const pageNumber = [];
    if(pageBtn){
        for(let i = pageBtn.startPage; i <= pageBtn.endPage; i++) {
            pageNumber.push(i);
        }
    }
    
    return (
        <>
            <div>
                <h2>연차 신청 조회</h2>
                <select value={selectedResult} onChange={handleSelectResult}>
                    <option value="대기">대기</option>
                    <option value="승인">승인</option>
                    <option value="반려">반려</option>
                </select>
            </div>
            <div>
                <h4>번호　　제목　　연차기간　　부서　　직책　　이름</h4>
                        {
                            Array.isArray(offList)
                            && offList.map((off) => (<OffForApp key={ off.offNo } off={ off }/>))
                        }
            </div>
            <div className={ RoomListCSS.roomPgs }>
                {
                    Array.isArray(offList) &&
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
                    Array.isArray(offList) &&
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

export default OffListForApp;