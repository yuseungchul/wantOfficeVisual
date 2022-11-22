
import NavCSS from "./Navbar.module.css";
import { NavLink } from 'react-router-dom';


function Navbar() {

    return (
        <>
            <div className={ NavCSS.NavbarDiv }>
             <div className={ NavCSS.logoDiv }>
                <img  src= {process.env.PUBLIC_URL + '/assets/img/logo.png'} alt="로고이미지"/>
             </div>
             <div className={ NavCSS.Category }>
                <ul>
                    <li><NavLink to="/"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconHome.png'} alt="홈로고"/>Home</NavLink></li>
                    <li><NavLink to="/"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconAttendance.png'} alt="근태로고"/>Attendance</NavLink></li>
                    <li><NavLink to="/calendar"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconSchedule.png'} alt="스케줄로고"/>Schedule</NavLink></li>
                    <li><NavLink to="/"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconBoard.png'} alt="게시판로고"/>Board</NavLink></li>
                    <li><NavLink to="/"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconSurvey.png'} alt="설문로고"/>Survey</NavLink></li>
                    <li><NavLink to="/"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconEDSM.png'} alt="전자결재로고"/>EDSM</NavLink></li>
                    <li><NavLink to="/"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconLibrary.png'} alt="자료실로고"/>Library</NavLink></li>
                    <li><NavLink to="/"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconBusinesscard.png'} alt="명함로고"/>Business card</NavLink></li>
                    <li><NavLink to="/room"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconReservation.png'} alt="예약로고"/>Reservation</NavLink></li>
                    {/* { decoded === "ROLE_ADMIN" && <li><NavLink to="/rooms-management">회의실 관리</NavLink></li> } */}
                    <li><NavLink to="/"><img  src= {process.env.PUBLIC_URL + '/assets/img/iconDirectMessage.png'} alt="쪽지"/>Direct Message</NavLink></li>
                    
                    <li className={NavCSS.Log}><NavLink to="/">Login</NavLink></li>
                    <li><NavLink to="/">관리자 로그인</NavLink></li>
                </ul>
              </div>
          

            
            </div>
        </>
    );
}

export default Navbar;