import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { callOffAPI } from "../../apis/OffAPICalls";
import Off from "../../components/off/Off";
import RoomListCSS from "../../pages/room/RoomList.module.css";

function MyOffList() {

    const dispatch = useDispatch();
    const offs = useSelector(state => state.offReducer);
    const offList = offs.data;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callOffAPI({currentPage : currentPage}));
        }, [currentPage]
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
            </div>
            <div>
                <h4>번호　　제목　　연차기간　　결과</h4>
                    {
                        Array.isArray(offList)
                        && offList.map((off) => (<Off key={ off.offNo } off={ off }/>))
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

export default MyOffList;