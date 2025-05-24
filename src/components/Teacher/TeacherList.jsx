import { useState } from "react"

const TeacherList = () => {
    // const [listTeachers, setListTeachers] = useState([]);
    const [teachers, setTeachers] = useState({
        id: "",
        name: "",
        class: "",
    })

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

    const handleAddTeacher = () => {
        alert("Thêm giáo viên")
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


    return (
        <div className="teacher-list-container">
            <h3>Thêm mới giáo viên</h3>
            <div className="form-teacher">
                {renderForm()}
                <button onClick={handleAddTeacher}>Thêm</button>
            </div>

        </div>
    )
}

export default TeacherList;