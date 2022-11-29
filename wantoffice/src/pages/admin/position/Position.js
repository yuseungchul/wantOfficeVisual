import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Position() {

    const dispatch = useDispatch();
    const params = useParams();
    const position = useSelector(state => state.positionReducer);
    const positionList = position.data;

    console.log(positionList);

    return (
        <>
            <div>
                <table>
                    <colgroup>
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>명칭</th>
                            <th>직위코드</th>
                            <th>생성일</th>
                            <th>지급연차일수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(positionList) && positionList.map(
                                (position) => (
                                    <tr>
                                        <td>{position.positionName}</td>
                                        <td>{position.positionNo}</td>
                                        <td>{position.positionDate}</td>
                                        <td>{position.positionRest}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default Position;