import React, { Component } from "react";

const TableHeader = (props) => {
  const { columns, onSort, sortColumn } = props;
  const raiseSort = (column) => {
    let newSortColumn = { ...sortColumn };

    if (sortColumn.path === column.path) {
      if (sortColumn.order === 1) {
        newSortColumn.order = -1;
      } else {
        newSortColumn.order = 1;
      }
    } else {
      newSortColumn.path = column.path;
      newSortColumn.order = 1;
    }
    onSort(newSortColumn);
  };
  const displaySortIcon = (column) => {
    if (sortColumn.path !== column.path) return null;
    return sortColumn.order == 1 ? (
      <i className="fa fa-sort-asc"></i>
    ) : (
      <i className="fa fa-sort-desc"></i>
    );
  };

  return (
    <thead>
      <tr>
        {/* <th>TITLE</th>
        <th>GENRE NAME</th>
        <th>NUMBER IN STOCK</th>
        <th>DAILY RENTAL RATE</th>
        <th>LIKED</th> */}
        {columns.map((c) => (
          <th
            key={c.path || c.key}
            onClick={() => raiseSort(c)}
            style={{ cursor: "pointer" }}
          >
            {c.header}
            {displaySortIcon(c)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
