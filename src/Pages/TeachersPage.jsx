import { useEffect, useState } from "react";
import TeacherList from "../components/Teacher/TeacherList";

const TeachersPage = () => {
    const [classList, setClassList] = useState([]);

    // localStorage
    useEffect(() => {
        const stored = localStorage.getItem("classList");
        if (stored) {
            setClassList(JSON.parse(stored));
        }
    }, [])
    return (
        <div>
            <h2>Quản lý giáo viên</h2>
            <TeacherList classOptions={classList} />
        </div>
    )
}

export default TeachersPage;