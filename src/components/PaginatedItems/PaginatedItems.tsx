import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { LOG } from "../../@types/types";
import Log from "../Admin/Logs/Log";

function Items({ currentItems, Component, timeFormat }: any) {


  return (
    <>
      {currentItems &&
        currentItems.map((item: any) => (
          <Component key={item._id} item={item} timeFormat={timeFormat} />
        ))}
    </>
  );
}

function PaginatedItems({ itemsPerPage, items, Component,timeFormat }: any) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset) as any);
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (
    event: React.SyntheticEvent & { selected: number }
  ) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} Component={Component} timeFormat={timeFormat} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
      />
    </>
  );
}

// Add a <div id="container"> to your HTML to see the componend rendered.

export default PaginatedItems;
