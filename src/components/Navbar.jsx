import { NavLink } from "react-router-dom";
import "../style/Navbar.scss";

const Navbar = () => {
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link">
                Dashboard
            </NavLink>
            <span className="nav-divider">|</span>
            <NavLink to="/students" className="nav-link">
                Học sinh
            </NavLink>
            <span className="nav-divider">|</span>
            <NavLink to="/teachers" className="nav-link">
                Giáo viên
            </NavLink>
            <span className="nav-divider">|</span>
            <NavLink to="/classes" className="nav-link">
                Lớp học
            </NavLink>
            <span className="nav-divider">|</span>
            <NavLink to="/transfer" className="nav-link">
                Chuyển lớp
            </NavLink>
            <span className="nav-divider">|</span>
            <NavLink to="/template" className="nav-link">
                Ví dụ
            </NavLink>
        </nav>
    );
};

export default Navbar;