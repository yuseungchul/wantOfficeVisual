
import ApprovalMainCSS from "./ApprovalMain.module.css"



function ApprovalMain () {





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
                <th>
                    
                </th>


                </div>



            </section>

            










        </>
    );

}

export default ApprovalMain;