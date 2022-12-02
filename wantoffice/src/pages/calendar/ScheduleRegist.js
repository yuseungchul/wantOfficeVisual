import { useNavigate, useLocation } from 'react-router-dom';
import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { callScheduleInsertAPI } from '../../apis/CalendarAPICalls';

function ScheduleRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const schedules = useSelector(state => state.calendarReducer);

    const [form, setForm] = useState({
        scheduleTitle : '',
        scheduleStart : location.state.start,
        scheduleEnd : location.state.end,
        scheduleContent: '',
        schedulePlace : '',
        scheduleSort : '개인',
        scheduleColor : '#D9D9D9'
    });

    console.log(schedules);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    console.log(token.sub);

    const onClickScheduleInsertHandler = () => {

        const formData = new FormData();

        formData.append("scheduleTitle", form.scheduleTitle);
        formData.append("scheduleStart", form.scheduleStart);
        formData.append("scheduleEnd", form.scheduleEnd);
        formData.append("scheduleContent", form.scheduleContent);
        formData.append("schedulePlace", form.schedulePlace);
        formData.append("scheduleSort", form.scheduleSort);
        formData.append("scheduleColor", form.scheduleColor);

        dispatch(callScheduleInsertAPI({
            form : formData
        }));
        console.log(formData);
        // navigate('/calendar/regist', { replace : false });
        // window.location.reload();
    }

    return(
        <div>
            <div >
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
                <button       
                    onClick={ onClickScheduleInsertHandler }             
                >
                    상품 등록
                </button>
            </div>        
            <div >
                <div >
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <input 
                                        name='memberNo'
                                        //onChange={ onChangeHandler }
                                        defaultValue= { token.sub || '' }
                                        style= { {display:'none'} }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>일정 제목</label></td>
                                <td>
                                    <input 
                                        name='scheduleTitle'
                                        placeholder='일정 제목'
                                        required
                                        // className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>일정 시작일</label></td>
                                <td>
                                    <input 
                                        type='date'
                                        name='scheduleStart'
                                        defaultValue = { location.state.start }
                                        // className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>일정 종료일</label></td>
                                <td>
                                    <input 
                                        type='date'
                                        name='scheduleEnd'
                                        defaultValue = { location.state.end }
                                        // className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>일정 내용</label></td>
                                 <td>
                                    <input 
                                       type='text'
                                        name='scheduleContent'
                                        placeholder='일정 내용'
                                        required
                                        // className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr> 
                            <tr>
                                <td><label>일정 장소</label></td>
                                <td>
                                <input 
                                        placeholder='장소'
                                        type='text'
                                        name='schedulePlace'
                                        onChange={ onChangeHandler }
                                        // className={ ProductRegistrationCSS.productInfoInput }
                                    />
                                </td>
                            </tr> 
                            <tr>
                                <th>구분</th>
                                    <td>
                                    <select                                        
                                        name='scheduleSort'
                                        // className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        defaultValue ='구분'
                                        >
                                            <option value='개인'>개인</option>
                                            <option value='회사'>회사</option>
                                            <option value='부서'>부서</option>
                                    </select>
                                    </td>
                            </tr>
                            <tr>
                                <td><label>색상</label></td>
                                <td>
                                <input 
                                        placeholder='색상'
                                        type='text'
                                        name='scheduleColor'
                                        onChange={ onChangeHandler }
                                        // className={ ProductRegistrationCSS.productInfoInput }
                                    />
                                </td>
                            </tr> 
                        </tbody>                        
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ScheduleRegist;