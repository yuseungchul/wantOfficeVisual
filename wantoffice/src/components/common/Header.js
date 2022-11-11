
import HeaderCSS from "./Header.module.css";


function Header() {

    return (
        <>
            <div className={ HeaderCSS.HeaderDiv }>
            <ul>
                <li>Notice</li>
                <li>Company board</li>
            </ul>

            </div>
        </>
    );

}

export default Header;