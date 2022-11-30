import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callRegisterAPI } from "../../../apis/MemberAPICalls";
import RegisteModalCSS from './RegistModal.module.css';

function RegistModal({setRegistModal}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const [form, setForm] = useState({
        memberName : '',
        memberId : '',
        memberPassword : '',
        memberEmail : '',
        memberPhone : '',
        positionNo : '',
        deptNo : '',
        authNo : '',
        memberJoinDate : '',
    });

    useEffect(() => {
        if(image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if(result) {
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    },
    [image]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    const onChangeImageUpload = (e) => {
        const image = e.target.files[0];

        setImage(image);
    }

    const onClickCloseHandler = () => {
        navigate("/member", { replace : true });
    }

    /* 사원 등록 API 호출 */
    const onClickRegisterHandler = () => {

        const formData = new FormData();

        formData.append("memberName", form.memberName);
        formData.append("memberId", form.memberId);
        formData.append("memberPassword", form.memberPassword);
        formData.append("memberPhone", form.memberPhone);
        formData.append("memberEmail", form.memberEmail);
        formData.append("position.positionNo", form.positionNo);
        formData.append("dept.deptNo", form.deptNo);
        formData.append("auth.authNo", form.authNo);
        
        if(image) {
            formData.append("memberImage", image);
        }

        console.log("formData : ", formData);

        dispatch(callRegisterAPI({
            form : formData
        }));
        
        //setRegistModal(false);
        console.log('[RegistModal] Regist Process End', formData);
        console.log('[RegistModal] Regist Process End');
        alert('사원 등록이 완료되었습니다.');
    }

    console.log("form :", form);

    return (
        <div className={ RegisteModalCSS.backgroundDiv }>
            <div className={ RegisteModalCSS.registerDiv }>
                <h2>사원 등록</h2>
                <div className={ RegisteModalCSS.ImageDiv }>
                    { imageUrl && <img
                        className = { RegisteModalCSS.memberImageDiv }
                        src={ imageUrl }
                        alt="preview"
                    /> }
                    <input
                        style={ { display: 'none' }}
                        type="file"
                        name='memberImage'
                        accept='image/jpg,image/png,image/jpeg,image/gif'
                        onChange={ onChangeImageUpload }
                        ref={ imageInput }
                    />
                    <button
                        className={ RegisteModalCSS.memberImageButton }
                        onClick={ onClickImageUpload }
                    >
                        이미지 파일
                    </button>
                </div>
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
                <p>직책</p>
                <select name='positionNo' value={ form.positionNo } onChange={ onChangeHandler }>
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
                <select name='deptNo' value={ form.deptNo } onChange={ onChangeHandler }>
                    <option value="1">인사팀</option>
                    <option value="2">총무팀</option>
                    <option value="3">영업팀</option>
                    <option value="4">마케팅팀</option>
                    <option value="5">개발팀</option>
                    <option value="99">관리팀</option>
                </select>
                <p>권한</p>
                <select name='authNo' value={ form.authNo } onChange={ onChangeHandler }>
                    <option value="3">일반사원</option>
                    <option value="2">결재권자</option>
                </select>
                <button onClick={ onClickRegisterHandler }> 등록 </button>
            </div>
        </div>
    )

}

export default RegistModal;