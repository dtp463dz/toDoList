import { useEffect, useState } from "react";
import TransferStudent from "../components/TransferStudent/TransferStudent";

const TransferPage = () => {
    const [classList, setClassList] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("classList");
        if (stored) {
            setClassList(JSON.parse(stored));
        }
    }, []);

    return (
        <div>
            <h2 style={{ marginLeft: '350px' }}>Chuyển học sinh</h2>
            <TransferStudent classOptions={classList} />
        </div>
    );
};

export default TransferPage;
