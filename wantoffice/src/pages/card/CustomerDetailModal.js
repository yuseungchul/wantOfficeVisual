import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callCustomerDeleteAPI, callCustomerUpdateAPI } from "../../apis/CardAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";

function CustomerDetailModal({customer, setCustomerDetailModal}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = decodeJwt(window.localStorage.getItem("accessToken"));

    const [modifyMode, setModifyMode] = useState(false);
    const [form, setForm] = useState({});

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            customerEmployee: customer.customerEmployee,
            customerName: customer.customerName,
            customerPhone: customer.customerPhone,
            customerEmail: customer.customerEmail,
            customerPosition: customer.customerPosition,
            customerShare: customer.customerShare
        });
    }

    const onClickCustomerUpdateHandler = () => {
        dispatch(callCustomerUpdateAPI({
            customerNo: customer.customerNo,
            form: form
        }));

        alert('거래처 명함 수정이 완료되었습니다.');

        navigate(`/card/customers`, { replace: true });
        window.location.reload();
    }

    const onClickCustomerDeleteHandler = () => {
        dispatch(callCustomerDeleteAPI({
            customerNo: customer.customerNo,
            form: form
        }));

        alert('거래처 명함 삭제가 완료되었습니다.');

        navigate(`/card/customers`, { replace: true });
        window.location.reload();
    }

    const onClickCloseHandler = () => {
        setCustomerDetailModal(false);
    }

    return (
        <>
            {
               customer &&
               <div>
                    <table>
                        <colgroup>
                            <col width="30%"/>
                            <col width="70%"/>
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>회사명</th>
                                <td>
                                    <input
                                        name='customerName'
                                        readOnly={true}
                                        style={ !modifyMode ? { backgroundColor: 'lightgray'} : null}
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? customer.customerName : form.customerName) || ''}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <td>
                                    <input
                                        name='customerEmployee'
                                        readOnly={modifyMode ? false : true}
                                        style={ !modifyMode ? { backgroundColor: 'lightgray'} : null}
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? customer.customerEmployee : form.customerEmployee) || ''}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>전화번호</th>
                                <td>
                                    <input
                                        name='customerPhone'
                                        readOnly={modifyMode ? false : true}
                                        style={ !modifyMode ? { backgroundColor: 'lightgray'} : null}
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? customer.customerPhone : form.customerPhone) || ''}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td>
                                    <input
                                        name='customerEmail'
                                        readOnly={modifyMode ? false : true}
                                        style={ !modifyMode ? { backgroundColor: 'lightgray'} : null}
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? customer.customerEmail : form.customerEmail) || ''}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>직책</th>
                                <td>
                                    <input
                                        name='customerPosition'
                                        readOnly={modifyMode ? false : true}
                                        style={ !modifyMode ? { backgroundColor: 'lightgray'} : null}
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? customer.customerPosition : form.customerPosition) || ''}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>부서 공유 여부</th>
                                <td>
                                <select
                                    onChange={ onChangeHandler }
                                    name='customerShare'
                                    readOnly={modifyMode ? false : true}
                                    style={ !modifyMode ? { backgroundColor: 'lightgray'} : null}
                                    value={ (!modifyMode ? customer.customerShare : form.customerShare) || ''}
                                >
                                    <option value="Y">Y</option>
                                    <option value="N">N</option>
                                </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
               </div> 
            }
            {
                customer && 
                <div>
                    <button
                        onClick={ onClickCloseHandler }
                    >
                        뒤로
                    </button>

                    { token &&
                        (token.sub === customer.member?.memberId)
                        ?
                            <div>
                            {!modifyMode &&
                                <button
                                    onClick={ onClickModifyModeHandler }
                                >
                                    수정
                                </button>
                            }
                            {!modifyMode &&
                                <button
                                    onClick={ onClickCustomerDeleteHandler }
                                >
                                    삭제
                                </button>
                            }
                            {modifyMode &&
                                <button
                                    onClick={ onClickCustomerUpdateHandler }
                                >
                                    수정
                                </button>
                            }
                            </div>
                        : null
                    }

                </div>
            }
        </>
    );

}

export default CustomerDetailModal;