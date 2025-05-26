import { useEffect, useState } from "react";
import StudentList from "../components/Student/StudentList";

const StudentsPage = () => {
    const [classList, setClassList] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("classList");
        if (stored) {
            setClassList(JSON.parse(stored))
        }
    }, [])
    return (
        <div>
            <h2 className="text-center mb-5" style={{ color: '#87CEEB', fontFamily: 'Quicksand, sans-serif', fontWeight: 700 }}>Quản lý học sinh</h2>
            <StudentList classOptions={classList} />
        </div>
    )
}

export default StudentsPage;