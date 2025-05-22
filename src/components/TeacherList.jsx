import { useState } from "react"

const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);
    const handleAddTeacher = () => {
        alert("Thêm giáo viên")
    }
    return (
        <div>
            <button onClick={() => handleAddTeacher()}>Thêm giáo viên</button>
            <ul>
                <li>Tên giao vien</li>
            </ul>
        </div>
    )
}

export default TeacherList;