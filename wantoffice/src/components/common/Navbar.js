
import NavCSS from "./Navbar.module.css";


function Navbar() {

    return (
        <>
            <div className={ NavCSS.NavbarDiv }>
             <div className={ NavCSS.logoDiv }>
                <img  src= {process.env.PUBLIC_URL + '/assets/img/logo.png'} alt="로고이미지"/>
             </div>
             <div className={ NavCSS.Category }>
                <ul>
                    <li><img  src= {process.env.PUBLIC_URL + '/assets/img/iconHome.png'} alt="홈로고"/>Home</li>
                    <li><img  src= {process.env.PUBLIC_URL + '/assets/img/iconAttendance.png'} alt="근태로고"/>Attendance</li>
                    <li><img  src= {process.env.PUBLIC_URL + '/assets/img/iconSchedule.png'} alt="스케줄로고"/>Schedule</li>
                    <li><img  src= {process.env.PUBLIC_URL + '/assets/img/iconBoard.png'} alt="게시판로고"/>Board</li>
                    <li><img  src= {process.env.PUBLIC_URL + '/assets/img/iconSurvey.png'} alt="설문로고"/>Survey</li>
                    <li><img  src= {process.env.PUBLIC_URL + '/assets/img/iconEDSM.png'} alt="전자결재로고"/>EDSM</li>
                    <li><img  src= {process.env.PUBLIC_URL + '/assets/img/iconLibrary.png'} alt="자료실로고"/>Library</li>
                    <li><img  src= {process.env.PUBLIC_URL + '/assets/img/iconBusinesscard.png'} alt="명함로고"/>Business card</li>
                    <li><img  src= {process.env.PUBLIC_URL + '/assets/img/iconReservation.png'} alt="예약로고"/>Reservation</li>
                </ul>
              </div>
          

            
            </div>
        </>
    );
}

export default Navbar;