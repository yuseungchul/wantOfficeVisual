import { Outlet } from "react-router-dom";
import CardHeader from "../../components/common/card/CardHeader";
import Navbar from "../../components/common/Navbar";
function CardLayout() {

    return (
        <>
            
            
            <Navbar />
            <CardHeader />
            <main>
                <Outlet />
             </main>
        </>
    );
}

export default CardLayout;