import React from "react";
import { Pagination } from "@mui/material";

const PaginationComponent = ({ total, limit, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(total / limit);

  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Pagination
      count={pageCount}
      page={currentPage}
      onChange={handleChange}
      color="primary"
    />
  );
};

export default PaginationComponent;
