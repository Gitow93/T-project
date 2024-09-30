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
  const [searchText, setSearchText] = useState(''); 
  const [filteredBooks, setFilteredBooks] = useState(books);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);


  useEffect(() => {
    const filtered = books.filter((book) =>
      Object.values(book).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredBooks(filtered);
  }, [searchText]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />
      <DataTable
        columns={columns}
        data={filteredBooks} 
        pagination
        paginationPerPage={7}
        selectableRows
        fixedHeader
      />
    </div>
  );
};

export default BookTable;
