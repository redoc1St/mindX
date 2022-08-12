import React from 'react';
import { Pagination as BPagination } from 'react-bootstrap';
function Pagination({
    activePage,
    maxPage=0,
    handleChangePage
}) {

    // let active = 2;
    const onChangePage = (newActivePage) => {
        handleChangePage(newActivePage)
    }

    let items = [];
    for (let number = 1; number <= maxPage; number++) {
        items.push(
            <BPagination.Item onClick={() => onChangePage(number)} key={number} active={number === activePage}>
                {number}
            </BPagination.Item>,
        );
    }

    return (
        <div className='Pagination'>
            <BPagination>{items}</BPagination>

        </div>
    )
}

export default Pagination;