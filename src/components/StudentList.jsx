import { useState } from "react";

const StudentList = () => {
    const [listUsers, setListUsers] = useState(
        {
            id: 1,
            name: 'dean',
            class: 'CNTT3',
        }
    );
    console.log(listUsers);

    return (
        <>
            <div className="Logo">
                <span>To Do List Student</span>
            </div>
            <div className="search">
                <input type="text" />
                <button>Add</button>
            </div>
            <div className="list">
                <div className="list-infor" key={listUsers.id}>
                    msv: {listUsers.id}
                    name: {listUsers.name}
                    class: {listUsers.class}
                </div>
                <div className="action">
                    <button>Sửa</button>
                    <button>Xóa</button>
                </div>
            </div>
        </>
    )
}

export default StudentList;