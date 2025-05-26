import './TableList.scss';
const FilterClass = (props) => {
    const { classOptions, filterClassId, setFilterClassId } = props;
    return (
        <div className="filter-container">
            <select
                value={filterClassId}
                onChange={(e) => setFilterClassId(e.target.value)}
            >
                <option value="">Tất cả lớp</option>
                {classOptions.map((item) => (
                    <option key={item.id} value={item.className}>
                        {item.className}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default FilterClass;