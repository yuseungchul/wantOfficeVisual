import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callDeptListAPI } from "../../../apis/DeptAPICalls";
import RegistModal from "../../../components/common/management/DeptRegistModal";

function Dept() {

    const dispatch = useDispatch();
    const depts = useSelector(state => state.deptReducer);
    const params = useParams();
    const [registModal, setRegistModal] = useState(false);
    const [detailModal, setDetailModal] = useState(false);

    const openModal = () => {
        setRegistModal(true);
    }

    const onClickDetailHandler = () => {
        setDetailModal(true);
    }

    useEffect(
        () => {
            console.log('useEffect 동작 확인')
            dispatch(callDeptListAPI({
                deptNo: params.deptNo
            }));
        },
        []
    )

    console.log(depts);

    return (
        <>
            <div>
                <table>
                    <colgroup>
                        <col width="10%" />
                        <col width="2%" />
                        <col width="10%" /> 
                    </colgroup>
                    <thead>
                        <tr>
                            <th>부서명</th>
                            <th>부서코드</th>
                            <th>생성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(depts) && depts.map(
                                (dept) => (
                                    <tr
                                        key={dept.deptNo}
                                        onClick={() => onClickDetailHandler(dept.deptNo)}
                                    >
                                        <td>{dept.deptName}</td>
                                        <td>{dept.deptNo}</td>
                                        <td>{dept.deptDate}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>

            <div>
                <button onClick={ openModal }>부서 등록</button>
                { registModal && <RegistModal setRegistModal= {setRegistModal}/> }
            </div>

        </>
    );

}

export default Dept;