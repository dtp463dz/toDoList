import { useEffect, useState } from "react";
import "./StudentList.scss";

const Data = [
    { idStudent: 1, name: "Nguyễn Văn A", classId: "10A2" },
    { idStudent: 2, name: "Phạm Văn B", classId: "10A2" },
    { idStudent: 3, name: "Đinh Văn C", classId: "10A2" }

]
const StudentList = () => {
    const [listStudent, setListStudent] = useState([]);
    const [idStudent, setIdStudent] = useState("");
    const [name, setName] = useState("");
    const [classId, setClassId] = useState("");

    // khởi tạo localStorage nếu chưa có dữ liệu
    useEffect(() => {
        const stored = localStorage.getItem("listStudent");
        if (!stored) {
            localStorage.setItem("listStudent", JSON.stringify(Data));
            setListStudent(Data)
        } else {
            setListStudent(JSON.parse(stored))
        }
    }, []);
    // cap nhat localStorage khi list students thay doi
    useEffect(() => {
        localStorage.setItem("listStudent", JSON.stringify(listStudent));
    }, [listStudent])

    const reSetForm = () => {
        setIdStudent("");
        setName("");
        setClassId("");
    }
    // them student
    const handleAddStudent = () => {
        if (!name || !classId) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        const newStudent = {
            idStudent: parseInt(idStudent), // covert sang number
            name,
            classId,
        };
        const updateStudent = [...listStudent, newStudent];
        setListStudent(updateStudent);
        localStorage.setItem("listStudent", JSON.stringify(updateStudent));
        alert("Thêm học sinh thành công !")
        reSetForm();
    }
    const handleDeleteStudent = (id) => {
        if (id && id > 0) {
            const updatedList = listStudent.filter((student) => student.idStudent !== id);
            setListStudent(updatedList);
            localStorage.setItem("listStudent", JSON.stringify(updatedList))
            alert("Đã xóa học sinh thành công")
        } else {
            alert("Xóa học sinh thất bại")
        }
    }
    return (
        <>
            <h3>Thêm mới học sinh</h3>
            <div className="form-student">
                <input
                    type="text"
                    placeholder="Mã học sinh"
                    value={idStudent}
                    onChange={(e) => setIdStudent(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Tên học sinh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Tên lớp"
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                />
                <button onClick={handleAddStudent}>Thêm</button>
            </div>

            <h3>Danh sách học sinh</h3>
            <div>
                {listStudent.map((item, index) => {
                    return (
                        <li key={item.idStudent}>
                            <span className="content">{item.idStudent} - {item.name} - {item.classId}</span>
                            <button
                                className="btn-delete"
                                onClick={() => handleDeleteStudent(item.idStudent)}
                            >
                                Xóa
                            </button>
                        </li>
                    )
                })}
            </div>
        </>
    )
}

export default StudentList;