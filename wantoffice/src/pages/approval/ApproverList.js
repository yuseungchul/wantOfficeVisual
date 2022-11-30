import ApprovalMainCSS from "./ApprovalMain.module.css"
import { Navigate, useNavigate } from "react-router-dom";



function ApproverList() {

    const navigate = useNavigate();
    const ApprovalInsert = () =>{
        console.log('결재 등록 페이지');
        navigate(`/approval/approval-management`, { replace : false })
    }

    return(

        <>
                <div>
                    {/* 서브메뉴 */}
                    <section className={ApprovalMainCSS.submenu}>
                    <h3>APPROVER</h3>
                    <button 
                     onClick={ ApprovalInsert }> 
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
        </>
        
        )
    
    
    
    
    
    
    
    
    
    
    
}
    
export default ApproverList;