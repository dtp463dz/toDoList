import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUsers, FaChalkboardTeacher, FaClipboardList, FaExchangeAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const [totalStudents, setTotalStudents] = useState(0);
    const [totalClasses, setTotalClasses] = useState(0);
    const [totalTeacher, setTotalTeacher] = useState(0);


    useEffect(() => {
        const storedStudents = localStorage.getItem("listStudent");
        const storedClasses = localStorage.getItem("classList");
        const storedTeachers = localStorage.getItem("listTeachers");

        if (storedStudents) {
            setTotalStudents(JSON.parse(storedStudents).length);
        }
        if (storedClasses) {
            setTotalClasses(JSON.parse(storedClasses).length);
        }
        if (storedTeachers) {
            setTotalTeacher(JSON.parse(storedTeachers).length);
        }
    }, []);

    const dashboardItems = [
        { id: 1, title: `Học sinh: ${totalStudents}`, icon: <FaUsers size={40} />, color: '#ADD8E6', route: '/students' },
        { id: 2, title: `Giáo viên: ${totalTeacher}`, icon: <FaChalkboardTeacher size={40} />, color: '#98FB98', route: '/teachers' },
        { id: 3, title: `Lớp học: ${totalClasses}`, icon: <FaClipboardList size={40} />, color: '#FFC0CB', route: '/classes' },
        { id: 4, title: 'Chuyển lớp', icon: <FaExchangeAlt size={40} />, color: '#FFA07A', route: '/transfer' },
    ];

    return (
        <Container className="my-5">
            <h1 className="text-center mb-5" style={{ color: '#87CEEB', fontFamily: 'Quicksand, sans-serif', fontWeight: 700 }}>
                Chào mừng đến với Hệ thống Quản lý!
            </h1>
            <Row className="justify-content-center">
                {dashboardItems.map(item => (
                    <Col key={item.id} xs={12} md={6} lg={4} xl={3} className="mb-4">
                        <Card
                            className="h-100 text-center p-3 shadow-sm"
                            style={{
                                backgroundColor: item.color,
                                borderRadius: '20px',
                                border: 'none',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onClick={() => navigate(item.route)}
                        >
                            <Card.Body>
                                <div className="mb-3" style={{ color: '#FFFFFF' }}>{item.icon}</div>
                                <Card.Title style={{ color: '#FFFFFF', fontSize: '1.5rem', fontFamily: 'Poppins, sans-serif' }}>
                                    {item.title}
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Dashboard;
