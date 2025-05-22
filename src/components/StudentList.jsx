import { useEffect, useState } from "react";
import "./StudentList.scss";


const StudentList = () => {
    const [listStudent, setListStudent] = useState([]);
    const [idStudent, setIdStudent] = useState("");
    const [name, setName] = useState("");
    const [classId, setClassId] = useState("");

    // khởi tạo localStorage nếu chưa có dữ liệu
    useEffect(() => {
        const stored = localStorage.getItem("listStudent");
        if (stored) {
            setListStudent(JSON.parse(stored))
        }
    }, []);
    // cap nhat localStorage khi list students thay doi
    useEffect(() => {
        if (listStudent.length > 0) {
            localStorage.setItem("listStudent", JSON.stringify(listStudent));
        }
    }, [listStudent])

    const reSetForm = () => {
        setIdStudent("");
        setName("");
        setClassId("");
    }
    // them student
    const handleAddStudent = () => {
        if (!name || !classId || !idStudent) {
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
        alert("Thêm học sinh thành công !")
        reSetForm();
    }
    const handleDeleteStudent = (id) => {
        if (id && id > 0) {
            const updatedList = listStudent.filter((student) => student.idStudent !== id);
            setListStudent(updatedList);
            alert("Đã xóa học sinh thành công")
        } else {
            alert("Xóa học sinh thất bại")
        }
    }
    console.log('check listStudent: ', listStudent)
    return (
        <div className="student-list-container mx-2">
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

            <h3 >Danh sách học sinh</h3>
            <div>
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Mã học sinh</th>
                                <th scope="col">Họ Và Tên</th>
                                <th scope="col">Mã Lớp</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listStudent && listStudent.length > 0 && listStudent.map((item, index) => {
                                return (
                                    <tr key={item.idStudent}>
                                        <th>{item.idStudent}</th>
                                        <td>{item.name}</td>
                                        <td>{item.classId}</td>
                                        <td>
                                            <button
                                                className="btn-delete btn-primary"
                                                onClick={() => handleDeleteStudent(item.idStudent)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </>
            </div>
        </div>
    )
}

export default StudentList;