import { NavLink } from 'react-router-dom';
import ApprovalHeaderCSS from "./ApprovalHeader.module.css";


function Header() {

    return (
        <>
            <div className={ ApprovalHeaderCSS.HeaderDiv }>
                <ul>
                    <li><NavLink to="/approver">DRAFTER</NavLink></li>
                    <li><NavLink to="/approver">APPROVER</NavLink></li>
                </ul>

            </div>
        </>
    );

}

export default Header;