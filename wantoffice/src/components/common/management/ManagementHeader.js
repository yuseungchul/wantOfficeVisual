import { NavLink } from 'react-router-dom';
import ManageHeaderCSS from "./ManagementHeader.module.css";


function Header() {

    return (
        <>
            <div className={ ManageHeaderCSS.HeaderDiv }>
                <ul>
                    <li><NavLink to="/member">사원 관리</NavLink></li>
                    <li><NavLink to="/dept">부서 관리</NavLink></li>
                    <li><NavLink to ="/position">직위 관리</NavLink></li>
                </ul>

            </div>
        </>
    );

}

export default Header;