import RoomMInsertCSS from './RoomMInsert.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { callRoomMInsertAPI } from '../../../apis/RoomAPICalls';

function RoomMInsert(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [roomFileUrl, setRoomFileUrl] = useState('');
    const [form, setForm] = useState({
        roomName : '',
        roomLocation : '',
        roomCapacity : 0,
        roomFileUrl : '',
        reservationStatus : ''
    });

    useEffect(() =>{
        if(image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if(result) {
                    setRoomFileUrl(result);
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
        });
    }

    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        setImage(image);

    }

    const onClickRoomMInsertHandler = () => {

        const formData = new FormData();
    
        formData.append("roomName", form.roomName);
        formData.append("roomLocation", form.roomLocation);
        formData.append("roomCapacity", form.roomCapacity);
        formData.append("roomFileUrl", form.roomFileUrl);
        formData.append("reservation.reservationStatus", form.reservationStatus)

        if(image) {
            formData.append("roomImage", image);
        }

        dispatch(callRoomMInsertAPI({
            form : formData
        }));

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
                        { roomFileUrl && <img
                                className={ RoomMInsertCSS.roomImage }
                                src={ roomFileUrl }
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
                            <tr>
                                <td><label>예약 가능 여부</label></td>
                                <td>
                                    <select>
                                        <option>예약가능</option>
                                        <option>예약불가</option>
                                    </select>
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