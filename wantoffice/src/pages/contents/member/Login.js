import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callLoginAPI } from '../../../apis/MemberAPICalls';

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = useSelector(state => state.memberReducer);

    useEffect(() => {
            if(login && login.status === 200) {
                console.log("[Login] Login SUCCESS {}", login);
                navigate("/main", { replace: true });
            }
        }
        ,[login]
    )


    const[form, setForm] = useState({
        memberId: '',
        memberPassword: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onClickHandler = () => {
        dispatch(callLoginAPI({
            form : form
        }))
    }

    return (
        <div>
            <h3>ID</h3>
            <input
                type="text"
                name="memberId"
                autoComplete='off'
                onChange={ onChangeHandler }
            />
            <h3>PASSWORD</h3>
            <input
                type="password"
                name="memberPassword"
                autoComplete='off'
                onChange={ onChangeHandler }
            />
            <button
                onClick={ onClickHandler }
            >
                LOGIN
            </button>
            <div>
            <p>아이디 찾기</p> | <p>비밀번호 찾기</p>
            </div>
        </div>
    );
}

export default Login;