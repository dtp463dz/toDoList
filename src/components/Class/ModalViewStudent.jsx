import { Modal, Button } from "react-bootstrap";

const ModalViewStudent = (props) => {
    const { show, handleClose, className, students } = props;
    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title style={{ color: 'black' }}>Danh sách học sinh lớp {className}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {students.length > 0 ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Mã học sinh</th>
                                <th>Tên học sinh</th>
                                <th>Lớp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.idStudent}>
                                    <td>{student.idStudent}</td>
                                    <td>{student.name}</td>
                                    <td>{student.classId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{ color: 'black' }}>Không có học sinh nào trong lớp này.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalViewStudent;
