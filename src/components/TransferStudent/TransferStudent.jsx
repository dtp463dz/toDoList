import { useEffect, useState } from "react";
import "./TransferStudent.scss"; // SCSS đã tạo trước đó
import { toast } from "react-toastify";

const TransferStudent = ({ classOptions = [] }) => {
    const [listStudent, setListStudent] = useState([]);
    const [studentBeingTransferred, setStudentBeingTransferred] = useState(null);
    const [newClassId, setNewClassId] = useState("");

    useEffect(() => {
        const stored = localStorage.getItem("listStudent");
        if (stored) {
            setListStudent(JSON.parse(stored));
        }
    }, []);

    const handleStartTransfer = (studentId) => {
        setStudentBeingTransferred(studentId);
        setNewClassId(""); // reset dropdown
    };

    const handleConfirmTransfer = () => {
        if (!newClassId) {
            toast.error("Vui lòng chọn lớp mới")
            return;
        }
        const updatedList = listStudent.map((student) =>
            student.idStudent === studentBeingTransferred
                ? { ...student, classId: newClassId }
                : student
        );
        setListStudent(updatedList);
        localStorage.setItem("listStudent", JSON.stringify(updatedList));
        toast.success("Chuyển lớp thành công!")
        setStudentBeingTransferred(null);
        setNewClassId("");
    };

    return (
        <div className="transfer-container">
            <h3>Danh sách học sinh</h3>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>Mã học sinh</th>
                        <th>Họ và tên</th>
                        <th>Lớp hiện tại</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {listStudent.map((student) => (
                        <tr key={student.idStudent}>
                            <td>{student.idStudent}</td>
                            <td>{student.name}</td>
                            <td>{student.classId}</td>
                            <td>
                                {studentBeingTransferred === student.idStudent ? (
                                    <>
                                        <select
                                            value={newClassId}
                                            onChange={(e) => setNewClassId(e.target.value)}
                                        >
                                            <option value="">Chọn lớp mới</option>
                                            {classOptions.map((cls) => (
                                                <option key={cls.id} value={cls.className}>
                                                    {cls.className}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            className="btn btn-success mx-2"
                                            onClick={handleConfirmTransfer}
                                        >
                                            Xác nhận
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleStartTransfer(student.idStudent)}
                                    >
                                        Chuyển lớp
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransferStudent;
