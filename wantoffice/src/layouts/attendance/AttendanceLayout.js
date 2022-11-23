import { Outlet } from "react-router-dom";
import AttendanceHeader from "../../components/common/attendance/AttendanceHeader";
import Navbar from "../../components/common/Navbar";
function AttendanceLayout() {

    return (
        <>
            
            
            <Navbar />
            <AttendanceHeader />
            <main>
                <Outlet />
             </main>
        </>
    );
}

export default AttendanceLayout;