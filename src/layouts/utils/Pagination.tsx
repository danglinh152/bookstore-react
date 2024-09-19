import React from "react"

interface Pagination {
    totalBooks: number;
    currentPage: number;
    totalPages: number;
    pagination: any;
}

export const Pagination: React.FC<Pagination> = (props) => {
    const pageList: number[] = [];
    if (props.currentPage === 1) {
        pageList.push(props.currentPage);
        if (props.totalPages > props.currentPage + 1) {
            pageList.push(props.currentPage + 1);
            pageList.push(props.currentPage + 2);
        }
        else if (props.totalPages === props.currentPage + 1) {
            pageList.push(props.currentPage + 1);
        }
    }
    else if (props.currentPage === 2) {
        if (props.totalPages === 2) {
            pageList.push(props.currentPage - 1);
            pageList.push(props.currentPage);
        }
        else if (props.totalPages > props.currentPage + 1) {
            pageList.push(props.currentPage - 1);
            pageList.push(props.currentPage);
            pageList.push(props.currentPage + 1);
            pageList.push(props.currentPage + 2);
        }
        else if (props.totalPages === props.currentPage + 1) {
            pageList.push(props.currentPage - 1);
            pageList.push(props.currentPage);
            pageList.push(props.currentPage + 1);
        }
    }
    else {
        if (props.totalPages > props.currentPage + 1) {
            pageList.push(props.currentPage - 2);
            pageList.push(props.currentPage - 1);
            pageList.push(props.currentPage);
            pageList.push(props.currentPage + 1);
            pageList.push(props.currentPage + 2);
        }
        else if (props.totalPages === props.currentPage + 1) {
            pageList.push(props.currentPage - 2);
            pageList.push(props.currentPage - 1);
            pageList.push(props.currentPage);
            pageList.push(props.currentPage + 1);
        }
        else if (props.currentPage === props.totalPages) {
            pageList.push(props.currentPage - 2);
            pageList.push(props.currentPage - 1);
            pageList.push(props.currentPage);
        }
    }

    return (


        (props.totalBooks === 0) ? (<nav aria-label="Page navigation example">
            <h1> Không tìm thấy sản phẩm nào </h1>
        </nav >) : (
            <nav aria-label="Page navigation example">

                <ul className="pagination justify-content-center">
                    <li className="page-item" onClick={(e) => { props.pagination(1); e.preventDefault(); }}><a className="page-link" href="">First Page</a></li>


                    {
                        pageList.map((page) => (
                            <li className={"page-item " + ((props.currentPage === page) ? "active" : "")} onClick={(e) => { props.pagination(page); e.preventDefault(); }}><a className="page-link" href="">{page}</a></li>
                        ))

                    }

                    <li className="page-item" onClick={(e) => { props.pagination(props.totalPages); e.preventDefault(); }}><a className="page-link" href="">Last Page</a></li>
                </ul>
            </nav >
        )

    );
}


