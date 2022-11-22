import { NavLink } from 'react-router-dom';
import HeaderCSS from "./Header.module.css";


function Header() {

    return (
        <>
            <div className={ HeaderCSS.HeaderDiv }>
                <ul>
                    <li><NavLink to="/" style={{ textDecoration: "none" }}>Notice</NavLink></li>
                    <li><NavLink to="/" style={{ textDecoration: "none" }}>Main board</NavLink></li>
                </ul>

            </div>

            <div className={HeaderCSS.SubmenuDiv}>
                <h2>Sub menu</h2>
                <ul>
                    <li><NavLink to="/" style={{ textDecoration: "none" }}>&#9654; Sub menu1</NavLink></li>
                    <li><NavLink to="/" style={{ textDecoration: "none" }}>&#9654; Sub menu2</NavLink></li>
                    <li><NavLink to="/" style={{ textDecoration: "none" }}>&#9654; Sub menu3</NavLink></li>
                    <li><NavLink to="/" style={{ textDecoration: "none" }}>&#9654; Sub menu4</NavLink></li>
                </ul>
            </div>
        </>
    );

}

export default Header;