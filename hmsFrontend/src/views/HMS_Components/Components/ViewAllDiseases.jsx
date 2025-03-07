import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardHeader,
  CInputGroup,
  CFormInput,
  CCardBody,
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormSelect,
} from '@coreui/react';
import { FaSearch } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const ViewAllDiseases = () => {
  const [disease, setDisease] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  useEffect(() => {
    var token = localStorage.getItem('login-token');
    axios
      .get('http://127.0.0.1:8000/api/getdiseases', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setDisease(res.data.diseases);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(0);
  };

  // Handle sorting selection
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(0);
  };

  // Handle order selection
  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(0);
  };

  // Filtering and sorting data dynamically
  const getProcessedData = () => {
    let filteredData = disease;

    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter((dis) =>{
        const namematch=dis.diseaseName.toLowerCase().includes(searchTerm);
        const status=dis.isActive.toLowerCase();
        let statusMatch=false;
        if (searchTerm === 'active' || searchTerm === 'inactive') {
          statusMatch = status === searchTerm;
        }
        return namematch || statusMatch;
      });
    }

    // Apply sorting
    if (sortBy) {
      filteredData = [...filteredData].sort((a, b) => {
        let fieldA = a[sortBy]?.toString().toLowerCase() || '';
        let fieldB = b[sortBy]?.toString().toLowerCase() || '';

        return sortOrder === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
      });
    }

    return filteredData;
  };

  const processedData = getProcessedData();
  const pageCount = Math.ceil(processedData.length / itemsPerPage);
  const currentData = processedData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <>
      <CCard className="mb-3">
        <CCardHeader>
          <strong>Search & Sort Diseases</strong>
        </CCardHeader>
        <CCardBody>
          <CInputGroup className="flex-nowrap">
            <CButton style={{ borderRadius: '3px' }} color="primary">
              <FaSearch />
            </CButton>
            <div style={{ width: '50%', margin: '0px 5px' }}>
              <CFormInput
                placeholder="Search by Name or status"
                aria-label="Search"
                onChange={handleSearch}
              />
            </div>
            <div style={{ width: '20%', margin: '0px 5px' }}>
              <CFormSelect className="text-start" onChange={handleSortChange}>
                <option value="">Sort By</option>
                <option value="diseaseName">Name</option>
                <option value="diseaseDescription">Description</option>
              </CFormSelect>
            </div>
            <div style={{ width: '20%', margin: '0px 5px' }}>
              <CFormSelect className="text-start" onChange={handleOrderChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </CFormSelect>
            </div>
          </CInputGroup>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardBody>
          <CTable bordered responsive hover>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Disease ID</CTableHeaderCell>
                <CTableHeaderCell>Disease Name</CTableHeaderCell>
                <CTableHeaderCell>Description</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Created At</CTableHeaderCell>
                <CTableHeaderCell>Modified At</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentData.length > 0 ? (
                currentData.map((elem, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{elem.diseaseID}</CTableDataCell>
                    <CTableDataCell>{elem.diseaseName}</CTableDataCell>
                    <CTableDataCell>{elem.diseaseDescription}</CTableDataCell>
                    <CTableDataCell>{elem.isActive}</CTableDataCell>
                    <CTableDataCell>{formatDate(elem.created_at)}</CTableDataCell>
                    <CTableDataCell>{formatDate(elem.updated_at)}</CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan="6" className="text-center">
                    No diseases found
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CCard className="mt-2">
        <CCardBody className="pb-0">
          <div className="d-flex justify-content-center">
            <ReactPaginate
              previousLabel={'<<'}
              nextLabel={'>>'}
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={(e) => setCurrentPage(e.selected)}
              containerClassName="pagination justify-content-center"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item disabled"
              breakLinkClassName="page-link"
              activeClassName="active"
            />
          </div>
        </CCardBody>
      </CCard>
    </>
  );
};

export default ViewAllDiseases;
