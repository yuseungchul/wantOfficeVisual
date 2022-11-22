import { NavLink } from 'react-router-dom';
import MainCSS from './Main.module.css';


function Main() {

    return(
        <>
            <div className={ MainCSS.HeaderDiv }>
                <ul>
                    <li><NavLink to="/" style={{ textDecoration: "none" }}>Notice</NavLink></li>
                    <li><NavLink to="/" style={{ textDecoration: "none" }}>Main board</NavLink></li>
                </ul>

            </div>

            <div className={MainCSS.SubmenuDiv}>
                <h2>Sub menu</h2>
                <ul>
                    <li><NavLink to="/" style={{ textDecoration: "none" }}>&#9654; Sub menu1</NavLink></li>
                    <li><NavLink to="/" style={{ textDecoration: "none" }}>&#9654; Sub menu2</NavLink></li>
                    <li><NavLink to="/" style={{ textDecoration: "none" }}>&#9654; Sub menu3</NavLink></li>
                    <li><NavLink to="/" style={{ textDecoration: "none" }}>&#9654; Sub menu4</NavLink></li>
                </ul>
            </div>

            <div className={MainCSS.ContentDiv}></div>

        </>


    );

}




export default Main;