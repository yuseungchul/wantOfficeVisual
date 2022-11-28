import { useNavigate } from "react-router-dom";

function OffForApp({off}) {

    const navigate = useNavigate();

    const onClickOffHandler = (offNo) => {
        navigate(`/off/add/${offNo}`);
    }

    return (
        <>
            <div
                onClick={ () => onClickOffHandler(off.offNo) }
            >
                <div>
                    { off.offNo }{ off.offTitle }{ off.offStart }~{off.offEnd}{ off.member.dept.deptName }{ off.member.position.positionName }{ off.member.memberName }
                </div>
            </div>
        </>
    );

}

export default OffForApp;