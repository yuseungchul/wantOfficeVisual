import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callRegisterAPI } from "../../../apis/MemberAPICalls";
import RegisterCSS from './Regist.module.css';

function RegistMember({setRegistModal}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        memberName : '',
        memberId : '',
        memberPassword : '',
        memberEmail : '',
        memberPhone : '',
    });

    const [selectValue, setSelectValue] = useState({
        positionNo : '',
        deptNo : ''
    });

    const member = useSelector(state => state.memberReducer);

    useEffect(() => {
        if(member.status === 201) {
            alert("사원등록이 완료되었습니다.");
            navigate("/member", { replace : true });
        }
    },
    [member]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        }),
        setSelectValue({
            ...selectValue,
            [e.target.name] : e.target.value
        });
    }

    const onClickBackHandler = () => {
        navigate("/member", { replace : true });
    }

    /* 사원 등록 API 호출 */
    const onClickRegisterHandler = () => {

        dispatch(callRegisterAPI({
            form : form
        }));

        setRegistModal(false);
        console.log('[RegistModal] Regist Process End');
        alert('사원 등록이 완료되었습니다.');
    }

    return (
        <div className={ RegisterCSS.backgroundDiv }>
            <div className={ RegisterCSS.registerDiv }>
                <h2>사원 등록</h2>
                <p>이름</p>
                <input
                    type="text"
                    name='memberName'
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <p>아이디</p>
                <input
                    type="text"
                    name='memberId'
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <p>비밀번호</p>
                <input
                    type="password"
                    name='memberPassword'
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <p>이메일</p>
                <input
                    type="text"
                    name='memberEmail'
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <p>전화번호</p>
                <input
                    type="text"
                    name='memberPhone'
                    autoComplete='off'
                    maxLength="13"
                    onChange={ onChangeHandler }
                />
                <p>직위</p>
                <select name='positionNo' value={ selectValue } onChange={ onChangeHandler }>
                    <option value="1">대표</option>
                    <option value="2">전무</option>
                    <option value="3">상무</option>
                    <option value="4">부장</option>
                    <option value="5">차장</option>
                    <option value="6">과장</option>
                    <option value="7">대리</option>
                    <option value="8">주임</option>
                    <option value="9">사원</option>
                </select>
                <p>부서</p>
                <select name='deptNo' value={ selectValue } onChange={ onChangeHandler }>
                    <option value="1">인사팀</option>
                    <option value="2">총무팀</option>
                    <option value="3">영업팀</option>
                    <option value="4">마케팅팀</option>
                    <option value="5">개발팀</option>
                    <option value="99">관리팀</option>
                </select>
                <button onClick={ onClickRegisterHandler }> 등록 </button>
            </div>
        </div>
    )


}

export default RegistMember;