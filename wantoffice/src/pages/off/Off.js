import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/esm/locale";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callAppNameAPI, callOffRegistAPI } from "../../apis/OffAPICalls";


function Off() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const offs = useSelector(state => state.offReducer);

    const now = new Date();

    const [startDate, setStartDate] = useState(now);
    const [endDate, setEndDate] = useState(now);

    useEffect(
        () => {
            dispatch(callAppNameAPI());
         }, []
    );

    const [form, setForm] = useState({
        offDate : toStringByFormatting(new Date()),
        offUpdate : '',
        offStart : '',
        offEnd : '',
        offTitle : '',
        offReason : '',
        offResult : '',
        memberNo : 0,
        appAuthNo : 0
    });

    const handleSelectStartDate = (selectedStartDate) => {
        setStartDate(new Date(selectedStartDate));
        setForm({
            ...form,
            offStart : toStringByFormatting(new Date(selectedStartDate))
        });
    };

    const handleSelectEndDate = (selectedEndDate) => {
        setEndDate(new Date(selectedEndDate));
        setForm({
            ...form,
            offEnd : toStringByFormatting(new Date(selectedEndDate))
        });
    };

    function toStringByFormatting(source, delimiter = "-") {
        const year = source.getFullYear();
        const month = source.getMonth() + 1;
        const day = source.getDate();

        return [year, (month < 10 ? "0"+month : month), (day < 10 ? "0"+day : day)].join(delimiter);
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    const onClickOffRegistHandler = () => {

        dispatch(callOffRegistAPI({
            form : form
        }));

        alert('연차 신청이 완료되었습니다.');

        navigate(`/off`);

    } 

    return (
        <>
            <div>
                <h3>연차 신청</h3>
            </div>
            { offs.app &&
                <div>
                    <h4>제목</h4>
                    <input
                        type="text"
                        name='offTitle'
                        autoComplete='off'
                        onChange={ onChangeHandler }
                    />
                    <h4>연차 기간</h4>
                    <DatePicker
                        locale={ko}
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                        selected={startDate}
                        onChange={handleSelectStartDate}
                        popperPlacement="auto"
                    />
                    <h4>~</h4>
                    <DatePicker
                        locale={ko}
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date(startDate)}
                        selected={endDate}
                        onChange={handleSelectEndDate}
                        popperPlacement="auto"
                    />
                    <h4>연차 사유</h4>
                    <textarea
                        name='offReason'
                        autoComplete='off'
                        onChange={ onChangeHandler }
                    >
                    </textarea>
                    <h4>결재권자</h4>
                    <h4>{ offs.app.memberName }</h4>
                    <h5>상기 이유로 연차를 신청합니다.</h5>
                    <button
                        onClick={ onClickOffRegistHandler }
                    >
                        등록
                    </button>
                    <button
                    >
                        뒤로
                    </button>
                </div>
            }
        </>
    );

}

export default Off;