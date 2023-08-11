import { useDispatch } from "react-redux"
import "./Header.css"
import { Link } from "react-router-dom"

function Header () {
    const dispatch =useDispatch()
    return (
        <div className="header">
            <Link to="/" className="logo">Realworld Blog</Link>
            <div className="header_buttons">
            <button className="header_button">Sign in</button>
            <button className="header_button">Sign up</button>
            </div>
        </div>
    )
}

export default Header