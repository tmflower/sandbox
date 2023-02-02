import { NavLink } from "react-router-dom"

export function Navbar() {
    return (
        <nav>
            <NavLink exact="true" to="/signup">Sign up</NavLink>
            <NavLink exact="true" to="/login">Log in</NavLink>            
            <NavLink exact="true" to="/todos">Todos</NavLink>
        </nav>
    )
}