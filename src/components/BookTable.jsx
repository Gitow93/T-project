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


const ExpandedComponent = ({ data }) => (
  <div style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
    <p><strong>Synopsis:</strong> {`This is a detailed synopsis of the book ${data.title}.`}</p>
    <p><strong>Published:</strong> {data.year}</p>
    <p><strong>ISBN:</strong> {data.isbn}</p>
  </div>
);


const conditionalRowStyles = [
  {
    when: row => row.pages <= 250,
    style: {
      backgroundColor: '#c8e6c9', 
    },
  },
  {
    when: row => row.pages > 250,
    style: {
      backgroundColor: '#ffcdd2', 
    },
  },
];


const isRowEvenAndExpandable = row => row.id % 2 === 0 && ![4, 6].includes(row.id);

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
        <p>Loading table...</p>
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
        selectableRowDisabled={row => [3, 5, 9].includes(row.id)} 
        selectableRowSelected={row => [1, 7, 10].includes(row.id)} 
        conditionalRowStyles={conditionalRowStyles} 
        expandableRows 
        expandableRowDisabled={row => !isRowEvenAndExpandable(row)}
        expandableRowsComponent={({ data }) => <ExpandedComponent data={data} />} 
        onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
        fixedHeader
      />
    </div>
  );
};

export default BookTable;
