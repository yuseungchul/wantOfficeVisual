import { useDispatch, useSelector } from 'react-redux';
import ApprovalMainCSS from "./ApprovalMain.module.css"



function ApprovalMain () {

    // const dispatch = useDispatch();
    // const approvals = useSelector(state => state.approvalReducer);
    // const approvalList = approvals.data;
    // const [currentPage, setCurrentPage] = useState(1);
    

    // useEffect(
    //     () => {
    //         dispatch(callApprovalListAPI({
    //             currentPage : currentPage
    //         }));
    //     }
    //     , [currentPage]
    // );





    return (
        <>


            <div>
            {/* 서브메뉴 */}
            <section className={ApprovalMainCSS.submenu}>
            <h3>DRAFTER</h3>
            
            <button >
                New Document
            </button>
            <div className={ApprovalMainCSS.submenuDiv}>
            <h6>▶ 요청 결재 목록</h6>
            <ul className={ApprovalMainCSS.submenuUl} >
                <li>ㆍ전체 결재함</li>
                <li>ㆍ대기 결재함</li>
                <li>ㆍ완료 결재함</li>
                <li>ㆍ반려 결재함</li>
            </ul>
            </div>
            </section>

            </div>

            {/* 자주쓰는결재 , 전체 결재 목록 */}
            <section  className={ApprovalMainCSS.mainCantent}>
                <div className={ApprovalMainCSS.contentForm}>
                    <p>자주쓰는 결재 </p>
                
                </div>

                <div  className={ApprovalMainCSS.contentList}> 
                <p>전체 결재 목록</p>
                <table className={ApprovalMainCSS.approvalTable }></table>
                    <thead>
                        <th> No </th>
                        <th> 구분 </th>
                        <th> 제목 </th>
                        <th> 작성자 </th>
                        <th> 작성일자 </th>
                        <th> 결재자 </th>
                        <th> 처리일자 </th>
                        <th> 상태 </th>
                    </thead>
                    <tbody>

                    </tbody>




                </div>



            </section>

            










        </>
    );

}

export default ApprovalMain;