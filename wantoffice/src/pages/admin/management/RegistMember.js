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
                <select name="직위" id="">
                    <option value=""></option>
                </select>
            </div>
        </div>
    )


}

export default RegistMember;