import { useEffect, useState } from "react";
import "./TableList.scss";

const ClassList = () => {
    const [listClass, setListClass] = useState([]);
    const [classes, setClasses] = useState({
        id: "",
        className: "",
    })
    const [editClass, setEditClass] = useState(null);
    const [editMode, setEditMode] = useState(false);

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

    // Load dữ liệu lớp từ localStorage
    useEffect(() => {
        const stored = localStorage.getItem("classList");
        if (stored) {
            setListClass(JSON.parse(stored));
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
            return alert('Vui lòng nhập tên lớp');
        }

        const newClass = {
            id: parseInt(classes.id),
            className: classes.className,
        };
        const updatedList = [...listClass, newClass];
        setListClass(updatedList);
        alert("Thêm lớp học thành công");
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
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        const updateList = listClass.map((item) =>
            item.id === editClass
                ? {
                    id: parseInt(classes.id),
                    className: classes.className,
                } :
                item
        );
        setListClass(updateList);
        alert('Cập nhật lớp học thành công');
        resetForm();
    }
    // delete
    const handleDeleteClass = (id) => {
        if (id && id > 0) {
            const updateList = listClass.filter((item) => item.id !== id)
            setListClass(updateList);
            alert('Đã xóa lớp học thành công')
        } else {
            alert('Xóa giáo viên thất bại')
        }

    }
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
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên lớp học</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listClass && listClass.length > 0 && (
                            listClass.map((item, index) => (
                                <tr key={index}>
                                    <th>{item.id}</th>
                                    <th>{item.className}</th>
                                    <td>
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
                            ))
                        )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ClassList;