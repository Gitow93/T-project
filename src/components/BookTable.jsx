import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import books from '../assets/books.json';
import '../styles/css/bookTable.css';


const columns = [
  {
    name: 'Title',
    selector: row => row.title,
    sortable: true,
  },
  {
    name: 'Author',
    selector: row => row.author,
    sortable: true,
  },
  {
    name: 'Year',
    selector: row => row.year,
  },
  {
    name: 'Genre',
    selector: row => row.genre,
  },
  {
    name: 'Pages',
    selector: row => row.pages,
  },
  {
    name: 'ISBN',
    selector: row => row.isbn,
  },
];

const BookTable = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={books}
      pagination
      paginationPerPage={7}
      selectableRows
      fixedHeader
    />
  );
};

export default BookTable;
