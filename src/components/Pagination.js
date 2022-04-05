import Pagination from 'react-js-pagination';



const UsePagination = ({ activePage, handlePageChange, totalCount}) => {
    return (
        <div className="pagination">
            <Pagination
className = "d-flex"
                activePage={activePage === 0 ? 1 : activePage}
                itemsCountPerPage={10}
                totalItemsCount={totalCount}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
            />
        </div>
    );
};

export default UsePagination;

