import { NavLink } from "react-router";

const Navbar = () => {
    return (
        <nav style={{ padding: "10px", background: "#eee" }}>
            <NavLink to="/">Dashboard</NavLink> |{" "}
            <NavLink to="/students">Học sinh</NavLink> |{" "}
        </nav>
    );
}
export default Navbar;