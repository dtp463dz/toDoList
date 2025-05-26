import { useEffect, useState } from "react";
import "../TableList.scss";
import ModalViewStudent from "./ModalViewStudent";
import { toast } from 'react-toastify';

const ClassList = () => {
    const [listClass, setListClass] = useState([]);
    const [classes, setClasses] = useState({
        id: "",
        className: "",
    })
    const [teacherList, setTeacherList] = useState([]);
    const [editClass, setEditClass] = useState(null);
    const [editMode, setEditMode] = useState(false);

    // modal state
    const [selectedClass, setSelectedClass] = useState(null);
    const [studentsInClass, setStudentsInClass] = useState([]);
    const [showModal, setShowModal] = useState(false);


    const dataForm = [
        {
            type: 'text',
            placeholder: "Mã lớp học",
            nameKey: "id"
        },
        {
            type: 'text',
            placeholder: "Tên lớp học",
            nameKey: "className"
        },

    ]

    const handleChangeValueForm = (nameKey, value) => {
        setClasses(pre => ({
            ...pre,
            [nameKey]: value
        }))
    }

    const renderFiedInput = ({ type, placeholder, nameKey }) => {
        return <input
            key={nameKey}
            type={type}
            placeholder={placeholder}
            value={classes[nameKey]}
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

    // Load dữ liệu lớp và giáo viên từ localStorage
    useEffect(() => {
        const storedClasses = localStorage.getItem("classList");
        const storedTeachers = localStorage.getItem("listTeachers");
        if (storedClasses) {
            setListClass(JSON.parse(storedClasses));
        }
        if (storedTeachers) {
            setTeacherList(JSON.parse(storedTeachers));
        }
    }, [])
    // Cập nhật localStorage mỗi khi thay đổi danh sách lớp
    useEffect(() => {
        if (listClass.length > 0) {
            localStorage.setItem("classList", JSON.stringify(listClass));
        }
    }, [listClass]);

    // Reset form
    const resetForm = () => {
        setClasses({ id: "", className: "" });
        setEditMode(false);
        setEditClass(null);
    };
    // add 
    const handleAddClass = () => {
        if (!classes.id || !classes.className) {
            toast.error('Vui lòng nhập tên lớp');
            return;
        }

        const newClass = {
            id: parseInt(classes.id),
            className: classes.className,
        };
        const updatedList = [...listClass, newClass];
        setListClass(updatedList);
        toast.success("Thêm lớp học thành công");
        resetForm();
    }
    // 
    const handleEditClass = (classes) => {
        setEditMode(true);
        // fill form
        setEditClass(classes.id);
        setClasses({
            id: classes.id,
            className: classes.className,
        })
    }
    // cập nhật
    const handleUpdateClass = () => {
        if (!classes.id || !classes.className) {
            toast.error('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        const updateList = listClass.map((item) =>
            item.id === editClass
                ? {
                    id: parseInt(classes.id),
                    className: classes.className,
                    teacherName: classes.teacherName,
                } :
                item
        );
        setListClass(updateList);
        toast.success('Cập nhật lớp học thành công');
        resetForm();
    }
    // delete
    const handleDeleteClass = (id) => {
        if (id && id > 0) {
            const updateList = listClass.filter((item) => item.id !== id)
            setListClass(updateList);
            toast.success('Đã xóa lớp học thành công');
        } else {
            toast.error('Xóa giáo viên thất bại');
        }

    }
    // view
    const handleViewStudents = (className) => {
        const storedStudents = localStorage.getItem("listStudent");
        if (storedStudents) {
            const allStudents = JSON.parse(storedStudents);
            const filtered = allStudents.filter(student => student.classId === className);
            setStudentsInClass(filtered);
            setSelectedClass(className);
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedClass(null);
        setStudentsInClass([]);
    };
    return (
        <div className="list-container">
            <h3>Danh sách lớp học</h3>
            <div className="list-form">
                {renderForm()}
                {editMode ? (
                    <button onClick={handleUpdateClass}>Cập nhật</button>
                ) : (
                    <button onClick={handleAddClass}>Thêm</button>
                )}
                {editMode && <button onClick={resetForm}>Hủy</button>}
            </div>
            <h3>Danh sách lớp học</h3>
            <div>
                <table className="table table-dark">
                    <thead className="thead-dark">
                        <tr className="text-center">
                            <th scope="col">STT</th>
                            <th scope="col">Tên lớp học</th>
                            <th scope="col">GVCN</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listClass && listClass.length > 0 && (
                            listClass.map((item, index) => {
                                const nameTeacher = teacherList.find(teacher => teacher.class === item.className);
                                return (
                                    <tr key={index}>
                                        <th>{item.id}</th>
                                        <th>{item.className}</th>
                                        <td>{nameTeacher ? nameTeacher.name : "Chưa có"}</td>
                                        <td>
                                            <button
                                                className="btn-edit btn-warning"
                                                onClick={() => handleViewStudents(item.className)}
                                            >
                                                Xem
                                            </button>
                                            <button
                                                className="btn-edit btn-warning mx-3"
                                                onClick={() => handleEditClass(item)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="btn-delete btn-primary"
                                                onClick={() => handleDeleteClass(item.id)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }

                            ))
                        }
                    </tbody>
                </table>
                <ModalViewStudent
                    show={showModal}
                    handleClose={handleCloseModal}
                    className={selectedClass}
                    students={studentsInClass}
                />
            </div>

        </div>
    )
}

export default ClassList;