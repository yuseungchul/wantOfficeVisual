import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/esm/locale";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callOffDetailAPI, callOffUpdateAPI } from "../../apis/OffAPICalls";

function OffUpdate() {

    const params = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const offs = useSelector(state => state.offReducer);

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    useEffect(
        () => {
            dispatch(callOffDetailAPI({
                offNo : params.offNo
            }));
         }, []
    );

    const [form, setForm] = useState({
        offStart : offs.offStart,
        offEnd : offs.offEnd,
        offTitle : offs.offTitle,
        offReason : offs.offReason
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

    const onClickOffUpdateHandler = () => {

        dispatch(callOffUpdateAPI({
            offNo : params.offNo,
            form : form
        }));

        alert('연차 수정이 완료되었습니다.');

        navigate(`/off`);

    } 

    return (
        <>
            <div>
                <h3>연차 신청 수정</h3>
            </div>
            { offs.approval &&
                <div>
                    <h4>제목</h4>
                    <input
                        type="text"
                        name='offTitle'
                        autoComplete='off'
                        onChange={ onChangeHandler }
                        value={form.offTitle}
                    />
                    <h4>연차 기간</h4>
                    <DatePicker
                        locale={ko}
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                        selected={startDate}
                        onChange={handleSelectStartDate}
                        popperPlacement="auto"
                        name='offStart'
                        value={form.offStart}
                    />
                    <h4>~</h4>
                    <DatePicker
                        locale={ko}
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date(startDate)}
                        selected={endDate}
                        onChange={handleSelectEndDate}
                        popperPlacement="auto"
                        name='offEnd'
                        value={form.offEnd}
                    />
                    <h4>연차 사유</h4>
                    <textarea
                        name='offReason'
                        autoComplete='off'
                        onChange={ onChangeHandler }
                        value={form.offReason}
                    >
                    </textarea>
                    <h4>결재권자</h4>
                    <h4>{ offs.approval.memberName }</h4>
                    <h5>상기 이유로 연차를 신청합니다.</h5>
                    <button
                        onClick={ onClickOffUpdateHandler }
                    >
                        수정
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

export default OffUpdate;