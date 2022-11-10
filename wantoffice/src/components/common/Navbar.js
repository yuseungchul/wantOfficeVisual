
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
                    <li> <img  src= {process.env.PUBLIC_URL + '/assets/img/iconHome.png'} alt="홈로고"/> Home</li>
                    <li><img  src= {process.env.PUBLIC_URL + '/assets/img/iconHome.png'} alt="홈로고"/> Attendance</li>
                    <li>Schedule</li>
                    <li>Board</li>
                    <li>Survey</li>
                    <li>EDSM</li>
                    <li>Library</li>
                    <li>Business card</li>
                    <li>Reservation</li>
                </ul>
              </div>
          

            
            </div>
        </>
    );
}

export default Navbar;