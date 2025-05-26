import { useEffect, useState } from "react";
import "../TableList.scss";
const StudentList = (props) => {
    const classOptions = props.classOptions;
    const [listStudent, setListStudent] = useState([]);
    const [idStudent, setIdStudent] = useState("");
    const [name, setName] = useState("");
    const [classId, setClassId] = useState("");
    const [editStudent, setEditStudent] = useState(null);
    const [editMode, setEditMode] = useState(false);
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
        setEditMode(false);
        setEditStudent(null);
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
    // xoa hoc sinh
    const handleDeleteStudent = (id) => {
        if (id && id > 0) {
            const updatedList = listStudent.filter((student) => student.idStudent !== id);
            setListStudent(updatedList);
            alert("Đã xóa học sinh thành công")
        } else {
            alert("Xóa học sinh thất bại")
        }
    }
    // bắt đầu chỉnh sửa
    const handleEditStudent = (student) => {
        setEditMode(true);
        // fill len input data da tao
        setEditStudent(student.idStudent);
        setIdStudent(student.idStudent);
        setName(student.name)
        setClassId(student.classId)
    }
    // cập nhật
    const handleUpDateStudent = () => {
        if (!name || !classId || !idStudent) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        const updatedList = listStudent.map((student) =>
            student.idStudent === editStudent
                ? {
                    idStudent: parseInt(idStudent),
                    name,
                    classId,
                }
                : student
        );
        setListStudent(updatedList);
        alert('Cập nhật học sinh thành công!');
        reSetForm();
    }

    console.log('check listStudent: ', listStudent)
    return (
        <div className="list-container">
            <h3>Thêm mới học sinh</h3>
            <div className="list-form">
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
                {/* <input
                    type="text"
                    placeholder="Tên lớp"
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                /> */}
                <select
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                >
                    <option value="">Chọn lớp</option>
                    {classOptions.map((item) => (
                        <option key={item.id} value={item.className}>
                            {item.className}
                        </option>
                    ))}
                </select>
                {editMode ? (
                    <button onClick={handleUpDateStudent}>Cập nhật</button>
                ) : (
                    <button onClick={handleAddStudent}>Thêm</button>
                )}
                {editMode && <button onClick={reSetForm}>Hủy</button>}
            </div>

            <h3 >Danh sách học sinh</h3>
            <div>
                <>
                    <table className="table table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Mã học sinh</th>
                                <th scope="col">Họ Và Tên</th>
                                <th scope="col">Mã Lớp</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listStudent && listStudent.length > 0 && listStudent.map((item) => {
                                return (
                                    <tr key={item.idStudent}>
                                        <th>{item.idStudent}</th>
                                        <td>{item.name}</td>
                                        <td>{item.classId}</td>
                                        <td>
                                            <button
                                                className="btn-edit btn-warning mx-3"
                                                onClick={() => handleEditStudent(item)}
                                            >
                                                Sửa
                                            </button>
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