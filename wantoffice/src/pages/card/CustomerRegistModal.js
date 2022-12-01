import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callCustomerRegistAPI } from "../../apis/CardAPICalls";

function CustomerRegistModal({setCustomerRegistModal}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        customerName: '',
        customerEmployee: '',
        customerPhone: '',
        customerEmail: '',
        customerPosition: '',
        customerShare: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickCustomerRegistHandler = () => {

        dispatch(callCustomerRegistAPI({
            form: form
        }));

        setCustomerRegistModal(false);

        alert('거래처 명함 등록이 완료되었습니다.');

        navigate('/main');

    }

    return (
        <div>
            <div>
                <div>
                    <h1>거래처 명함 등록</h1>
                    <div>
                        <h3>회사명</h3>
                        <input
                            type="text"
                            name='customerName'
                            autoComplete='off'
                            onChange={ onChangeHandler }
                        />
                    </div>
                    <div>
                        <h3>이름</h3>
                        <input
                            type="text"
                            name='customerEmployee'
                            autoComplete='off'
                            onChange={ onChangeHandler }
                        />
                    </div>
                    <div>
                        <h3>전화번호</h3>
                        <input
                            type="text"
                            name='customerPhone'
                            placeholder="010-0000-0000"
                            autoComplete='off'
                            onChange={ onChangeHandler }
                        />
                    </div>
                    <div>
                        <h3>이메일</h3>
                        <input
                            type="text"
                            name='customerEmail'
                            autoComplete='off'
                            onChange={ onChangeHandler }
                        />
                    </div>
                    <div>
                        <h3>직책</h3>
                        <input
                            type="text"
                            name='customerPosition'
                            autoComplete='off'
                            onChange={ onChangeHandler }
                        />
                    </div>
                    <div>
                        <h3>부서 공유 여부</h3>
                        <select onChange={ onChangeHandler } name='customerShare'>
                            <option value="Y">Y</option>
                            <option value="N">N</option>
                        </select>
                    </div>
                    <button
                        onClick={ onClickCustomerRegistHandler }
                    >
                        등록
                    </button>
                    <button
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );

}

export default CustomerRegistModal;