import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./Template.css";
const Template = () => {
    return (
        <div className="todo-app">
            <div className="todo-box">
                <h1 className="title">Todo List</h1>
                <div className="create-box">
                    <input type="text" name="name" placeholder="Add your task" />
                    <button className="btn-add-task">+</button>
                </div>
                <div className="todo-list">
                    <div className="todo-item">
                        <div className="todo-name">
                            <input type="checkbox" className="todo-check" />
                            <span>Todo Item</span>
                        </div>
                        <div className="todo-actions">
                            <div className="icon edit-icon"><FaEdit /></div>
                            <div className="icon trash-icon"><MdDelete /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Template;