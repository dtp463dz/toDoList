import ClassList from "../components/Class/ClassList";
import "./Style.scss";

const ClassesPage = () => {
    return (
        <div>
            <h2 className="text-center ">Quản lý lớp học</h2>
            <ClassList />
        </div>
    )
}

export default ClassesPage;