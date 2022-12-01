import modal from './ApprovalModal.module.css'
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';


function ApprovalModal({ setModalOpen, id, title, content, writer }: PropsType) {

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
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
                        <th >기안부서</th>
                        <td>부서data</td>
                        <th rowspan="4" >결재</th>
                        <td>결재자1 data</td>
                        <td>결재자2 data</td>
                        <td>결재자3 data</td>
                        <td>결재자4 data</td>
                    </tr>
                    <tr>
                        <th className={modal.modalTh}>기안자</th>
                        <td>기안자data</td>
                        <td rowspan="2" >승인반려버튼</td>
                        
                        <td rowspan="2" >승인반려버튼</td>
                        <td rowspan="2" >승인반려버튼</td>
                        <td rowspan="2" >승인반려버튼</td>
                    </tr>
                    <tr>
                        <th className={modal.modalTh}>기안일자</th>
                        <td>기안일자data</td>
                       
                    </tr>
                    <tr>
                        <th className={modal.modalTh}>참조부서</th>
                        <td>참조부서data</td>
                        <td>지정버튼</td>
                        <td>지정버튼</td>
                        <td>지정버튼</td>
                        <td>지정버튼</td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td colspan="6"><input size="130" type="text" name="docoumtTitle"/></td>
                    </tr>
                    {/* <tr>
                        <td>코멘트</td>
                        <td colspan="6"><input size="80" type="text" name="comment"/></td>
                    </tr> */}
                </tbody>   
                    
                </table>
                <Editor
                initialValue="<h1>눅우세용?</h1>"
                previewStyle="vertical"
                height="600px"
                initialEditType="markdown" //wysiwyg
                useCommandShortcut={false}
                />
                <button>
                    제출하기
                </button>
                <button className={modal.close} onClick={closeModal}>
                    취소
                </button>
            </from>


            
          
        </div>

      

        </>
    );


}

export default ApprovalModal;