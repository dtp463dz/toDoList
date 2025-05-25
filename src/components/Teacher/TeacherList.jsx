import { useEffect, useState } from "react"
import "../TableList.scss";
const TeacherList = () => {
    const [teachers, setTeachers] = useState({
        id: "",
        name: "",
        class: "",
    });
    const [listTeachers, setListTeachers] = useState([]);
    const [eidtTeacher, setEditTeacher] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const dataForm = [
        {
            type: 'text',
            placeholder: "Mã giáo viên",
            nameKey: "id"
        },
        {
            type: 'text',
            placeholder: "Tên giáo viên",
            nameKey: "name"
        },
        {
            type: 'text',
            placeholder: "Lớp",
            nameKey: "class"
        },
    ]
    // khoi tao localStorage khi chua co du lieu
    useEffect(() => {
        const stored = localStorage.getItem("listTeachers")
        if (stored) {
            setListTeachers(JSON.parse(stored));
        }
    }, [])

    // cap nhap localStorage khi list teacher thay doi
    useEffect(() => {
        if (listTeachers.length > 0) {
            localStorage.setItem("listTeachers", JSON.stringify(listTeachers));
        }
    }, [listTeachers])

    // them giao vien
    const handleAddTeacher = () => {
        if (!teachers.name || !teachers.class || !teachers.id) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        const newTeacher = {
            id: parseInt(teachers.id),
            name: teachers.name,
            class: teachers.class,
        };
        const upDateTeacher = [...listTeachers, newTeacher];
        console.log('check update teacher: ', upDateTeacher);
        setListTeachers(upDateTeacher);
        alert("Thêm học sinh thành công !");
        resetForm();
    }

    const handleChangeValueForm = (nameKey, value) => {
        setTeachers(pre => ({
            ...pre,
            [nameKey]: value

        }))
    }

    const renderFiedInput = ({ type, placeholder, nameKey }) => {
        return <input
            type={type}
            placeholder={placeholder}
            value={teachers[nameKey]}
            onChange={(e) => handleChangeValueForm(nameKey, e.target.value)}
        />
    }

    const renderForm = () => {
        return dataForm.map((e) => (renderFiedInput({
            type: e.type,
            placeholder: e.placeholder,
            nameKey: e.nameKey
        })))
    }
    // reset form
    const resetForm = () => {
        setTeachers({
            id: "",
            name: "",
            class: "",
        });
        setEditMode(false);
        setEditTeacher(null);
    }
    // edit teacher, bat dau chinh sua
    const handleEditTeacher = (teacher) => {
        setEditMode(true);
        // fill form
        setEditTeacher(teacher.id)
        setTeachers({
            id: teacher.id,
            name: teacher.name,
            class: teacher.class,
        });
    }

    // hàm cập nhật 
    const handleUpdateTeacher = () => {
        if (!teachers.id || !teachers.name || !teachers.class) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        const updateList = listTeachers.map((teacher) =>
            teacher.id === eidtTeacher
                ? {
                    id: parseInt(teachers.id),
                    name: teachers.name,
                    class: teachers.class,
                }
                : teacher
        );
        // console.log('check update list: ', updateList);
        setListTeachers(updateList);
        alert('Cập nhật giáo viên thành công !');
        resetForm();

    }

    // delete teacher
    const handleDeleteTeacher = (id) => {
        if (id && id > 0) {
            const updateList = listTeachers.filter((teachers) => teachers.id !== id);
            setListTeachers(updateList);
            alert("Đã xóa giáo viên thành công")
        } else {
            alert("Xóa giáo viên thất bại")
        }
    }

    return (
        <div className="list-container">
            <h3>Thêm mới giáo viên</h3>
            <div className="list-form">
                {renderForm()}
                {editMode ? (
                    <button onClick={handleUpdateTeacher}>Cập nhật</button>
                ) : (
                    <button onClick={handleAddTeacher}>Thêm</button>
                )}
                {editMode && <button onClick={resetForm}>Hủy</button>}
            </div>
            <h3>Danh sách giáo viên</h3>
            <div>
                <table className="table table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Mã giáo viên</th>
                            <th scope="col">Họ Và Tên</th>
                            <th scope="col">Mã Lớp</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listTeachers && listTeachers.length > 0 &&
                            listTeachers.map((item, index) => (
                                <tr key={index.id}>
                                    <th>{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.class}</td>
                                    <td>
                                        <button
                                            className="btn-edit btn-warning mx-3"
                                            onClick={() => handleEditTeacher(item)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="btn-delete btn-primary"
                                            onClick={() => handleDeleteTeacher(item.id)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default TeacherList;