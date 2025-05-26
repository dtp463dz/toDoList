import StudentsPage from "../Pages/StudentsPage.jsx";
import TeachersPage from "../Pages/TeachersPage.jsx";
import ClassesPage from "../Pages/ClassesPage.jsx";
import TransferPage from "../Pages/TransferPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";

const Home = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="classes" element={<ClassesPage />} />
            <Route path="transfer" element={<TransferPage />} />

        </Routes>
    )
}
export default Home;