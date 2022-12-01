import modal from './ApprovalModal.module.css'



function ApprovalModal({ setModalOpen, id, title, content, writer }: PropsType) {

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className={modal.container}>
            <from >
                <table className={modal.modalTable}  >
                <thead>
                    <tr>
                        <th colspan="5" >*구매요청서</th>
                        <th>문서번호</th>
                        <td>문서번호data</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>기안부서</th>
                        <td>부서data</td>
                        <th rowspan="3" >결재</th>
                        <td>결재자1 data</td>
                        <td>결재자2 data</td>
                        <td>결재자3 data</td>
                        <td>결재자4 data</td>

                    </tr>
                    <tr>
                        <th>기안자</th>
                        <td>기안자data</td>
                        <td>승인반려버튼</td>
                        <td>승인반려버튼</td>
                        <td>승인반려버튼</td>
                        <td>승인반려버튼</td>
                    </tr>
                    <tr>
                        <th>기안일자</th>
                        <td>기안일자data</td>
                        <td>지정버튼</td>
                        <td>지정버튼</td>
                        <td>지정버튼</td>
                        <td>지정버튼</td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td colspan="6"><input size="80" type="text" name="docoumtTitle"/></td>
                    </tr>
                    <tr>
                        <td>코멘트</td>
                        <td colspan="6"><input size="80" type="text" name="comment"/></td>
                    </tr>
                </tbody>   
                    
                </table>
            <button className={modal.close} onClick={closeModal}>
                취소
            </button>
            </from>
            
          
        </div>
    );


}

export default ApprovalModal;