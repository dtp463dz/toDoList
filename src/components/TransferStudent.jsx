import { useEffect, useState } from "react";

const TransferStudent = ({ classOptions }) => {
    const [listStudent, setListStudent] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [newClassId, setNewClassId] = useState("");

    // Load danh sách học sinh từ localStorage
    useEffect(() => {
        const stored = localStorage.getItem("listStudent");
        if (stored) {
            setListStudent(JSON.parse(stored));
        }
    }, []);

    // Chuyển lớp
    const handleTransfer = () => {
        if (!selectedStudentId || !newClassId) {
            alert("Vui lòng chọn học sinh và lớp học mới");
            return;
        }

        const updatedList = listStudent.map((student) =>
            student.idStudent === parseInt(selectedStudentId)
                ? { ...student, classId: newClassId }
                : student
        );

        setListStudent(updatedList);
        localStorage.setItem("listStudent", JSON.stringify(updatedList));
        alert("Chuyển lớp thành công");
        setSelectedStudentId("");
        setNewClassId("");
    };

    return (
        <div className="list-container">
            <h3>Chuyển lớp học sinh</h3>
            <div className="list-form">
                <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                >
                    <option value="">Chọn học sinh</option>
                    {listStudent.map((item) => (
                        <option key={item.idStudent} value={item.idStudent}>
                            {item.name} (Lớp {item.classId})
                        </option>
                    ))}
                </select>

                <select
                    value={newClassId}
                    onChange={(e) => setNewClassId(e.target.value)}
                >
                    <option value="">Chọn lớp mới</option>
                    {classOptions.map((classes) => (
                        <option key={classes.id} value={classes.className}>
                            {classes.className}
                        </option>
                    ))}
                </select>

                <button onClick={handleTransfer}>Chuyển lớp</button>
            </div>
        </div>
    );
};

export default TransferStudent;
