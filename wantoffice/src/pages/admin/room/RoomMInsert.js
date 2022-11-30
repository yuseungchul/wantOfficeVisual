import RoomMInsertCSS from './RoomMInsert.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { callRoomMInsertAPI } from '../../../apis/RoomAPICalls';

function RoomMInsert(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [roomfileUrl, setRoomfileUrl] = useState('');
    const [form, setForm] = useState({
        roomName : '',
        roomLocation : '',
        roomCapacity : 0
        
    });
    console.log("form",form);
    useEffect(() =>{
        if(image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if(result) {
                    setRoomfileUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    },
    [image]);
    console.log("result");

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }
    console.log("onChangeHandler 동작확인");
    const onClickImageUpload = useCallback(() => {
        if(!imageInput.current){
            return;
        }
        imageInput.current.click();
        
    },[image]);
    console.log("onClickImageUpload 동작확인");
    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        setImage(image);

    }
    console.log("onChangeImageUpload 동작확인");
    const onClickRoomMInsertHandler = () => {

        const formData = new FormData();
        
        for (let key of formData.keys()) {
            console.log(key);
     }  
        formData.append("roomName", form.roomName);
        formData.append("roomLocation", form.roomLocation);
        formData.append("roomCapacity", form.roomCapacity);
        
        if(image) {
            formData.append("roomImage", image);
        }

        dispatch(callRoomMInsertAPI({
            form : formData
        }));
        console.log(formData);
        navigate('/room', { replace : true });
        window.location.reload();
    }

    return(
        <>
            <div>
                <button  
                    className={ RoomMInsertCSS.roomBtnDiv }     
                    onClick={ onClickRoomMInsertHandler }              
                >
                    회의실 등록
                </button>
            </div>    
            <div className={ RoomMInsertCSS.MInsertDiv }>
            <h2>회의실 시설 안내</h2>
                <div className= { RoomMInsertCSS.roomInfoDiv }>
                    <div className= { RoomMInsertCSS.roomImage }>
                        { roomfileUrl && <img
                                className={ RoomMInsertCSS.roomImage }
                                src={ roomfileUrl }
                                alt="preview"
                        />}
                        <input
                            type="file"
                            name='roomImage'
                            accept='image/jpg, image/png, image/jpeg, image/gif'
                            onChange={ onChangeImageUpload }
                            ref={ imageInput }
                        />
                        <button
                            className={ RoomMInsertCSS.roomImageBtn }
                            onClick={ onClickImageUpload }
                            name='roomFileUrl'
                        >
                            이미지 업로드
                        </button>

                    </div>

                </div>
                <div className={ RoomMInsertCSS.roomInfoToDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>회의실 명칭</label></td>
                                <td>
                                    <input
                                        name='roomName'
                                        placeholder='회의실 명칭'
                                        className={ RoomMInsertCSS.roomInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>층수 표기</label></td>
                                <td>
                                    <label><input type="radio" name="roomLocation" onChange={ onChangeHandler } value="1"/> 3층</label> &nbsp;
                                    <label><input type="radio" name="roomLocation" onChange={ onChangeHandler } value="2"/> 4층</label> &nbsp;
                                    <label><input type="radio" name="roomLocation" onChange={ onChangeHandler } value="3"/> 5층</label> &nbsp;
                                </td>
                            </tr>
                            <tr>
                                <td><label>회의실 수용 인원</label></td>
                                <td>
                                    <input
                                        placeholder='최대 수용 인원'
                                        type='number'
                                        name='roomCapacity'
                                        onChange={ onChangeHandler }
                                        className={ RoomMInsertCSS.productInfoInput }
                                    />
                                </td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div>
            </div>
              
        </>
    );

}

export default RoomMInsert;