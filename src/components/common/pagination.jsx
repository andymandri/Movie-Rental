const _ = require("underscore");
const Pagination = (props) => {
  const { itemsCount, currentPage, pageSize, onPageChange } = props;
  const numberOfPages = Math.ceil(itemsCount / pageSize);
  if (numberOfPages === 1) return;
  const pages = _.range(1, numberOfPages + 1);
  console.log(pages);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
          // <li className="page-item">
          //   <a className="page-link" href="#">
          //     2
          //   </a>
          // </li>
          // <li className="page-item">
          //   <a className="page-link" href="#">
          //     3
          //   </a>
          // </li>
        ))}
      </ul>
    </nav>
  );
};
export default Pagination;
