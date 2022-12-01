import { Outlet } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
function CardLayout() {

    return (
        <>
            
            
            <Navbar />
            <main>
                <Outlet />
             </main>
        </>
    );
}

export default CardLayout;