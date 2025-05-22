import { NavLink } from "react-router";

const Navbar = () => {
    return (
        <nav style={{ padding: "10px", background: "white" }}>
            <NavLink to="/">Dashboard</NavLink> |{" "}
            <NavLink to="/students">Học sinh</NavLink> |{" "}
            <NavLink to="/teachers">Giáo viên</NavLink> |{" "}
            <NavLink to="/classes">Lớp học</NavLink> |{" "}
            <NavLink to="/transfer">Chuyển lớp</NavLink> |{" "}
            <NavLink to="/template">Vi du</NavLink> |{" "}

        </nav>
    );
}
export default Navbar;