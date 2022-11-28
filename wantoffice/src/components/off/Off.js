import { useNavigate } from "react-router-dom";

function Off({off}) {

    const navigate = useNavigate();

    const onClickOffHandler = (offNo) => {
        navigate(`/off/${offNo}`);
    }

    return (
        <>
            <div
                onClick={ () => onClickOffHandler(off.offNo) }
            >
                <div>
                    { off.offNo }{ off.offTitle }{ off.offStart }~{ off.offEnd }{ off.offResult }
                </div>
            </div>
        </>
    );

}

export default Off;