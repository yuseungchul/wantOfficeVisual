import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callPositionRegistAPI } from "../../../apis/PositionAPICalls";

function PositionRegistModal({setRegistModal}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        positionName : ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickRegisterHandler = () => {
        console.log('[PositionRegistModal] Regist Process Start');
        dispatch(callPositionRegistAPI({
            form : form
        }));

        setRegistModal(false);
        alert("직책 등록이 완료되었습니다.");

        navigate("/position", { replace : true });
        window.location.reload();

        console.log('[PositionRegistModal] Regist Process End');
    }

    const onClickBackHandler = () => {
        setRegistModal(false);
        navigate("/dept", { replace : true });
    }

    return (
        <div>
            <div>
                <h2>직책 등록</h2>
                <p>*</p>
                <input
                    type="text"
                    name='positionName'
                    placeholder="직책명을 입력하세요"
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <button
                    onClick={ onClickRegisterHandler }
                >
                    등록
                </button>
                <button
                    onClick={ onClickBackHandler }
                >
                    취소
                </button>
            </div>
        </div>
    );
}

export default PositionRegistModal;