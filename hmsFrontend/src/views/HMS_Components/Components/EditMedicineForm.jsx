import React, { useEffect, useState } from 'react';
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
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter
} from '@coreui/react';
import axios from 'axios';
import { formatDate } from '../../../dateUtility';
import { FaSearch, FaEdit } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const EditMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortBy, setSortBy] = useState('medicine_name');
  const [order, setOrder] = useState('asc');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    var token = localStorage.getItem('login-token');
    axios
      .get('http://127.0.0.1:8000/api/getMedicines', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { sortBy, order },
      })
      .then((res) => setMedicines(res.data.medicines))
      .catch((err) => console.log(err));
  }, [sortBy, order]);

  const handleOrderChange = (e) => {
    setOrder(e.target.value === '1' ? 'asc' : 'desc');
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value === '1' ? 'medicine_name' : 'cost');
  };

  const handleSearch = (e) => {
    var value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = medicines.filter((medicine) =>
      medicine.medicine_name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
    setCurrentPage(0);
  };

  const handleEditClick = (medicine) => {
    setSelectedMedicine(medicine);
    setShowModal(true);
  };

  const handleUpdate = () => {
    var token = localStorage.getItem('login-token');
    axios
      .post(`http://127.0.0.1:8000/api/updateMedicine/${selectedMedicine.medicineID}`, selectedMedicine, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setShowModal(false);
        window.location.reload(); // Refresh the page to update the table
      })
      .catch((err) => console.log(err));
  };

  const currentData =
    searchTerm.length > 0
      ? filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
      : medicines.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <>
      <CCard className="mb-3">
        <CCardHeader>
          <strong>All Medicines</strong>
        </CCardHeader>
        <CCardBody>
          <CInputGroup>
            <CButton color="primary" size="sm"><FaSearch /></CButton>
            <CFormInput placeholder="Search" onChange={handleSearch} />
            <CFormSelect onChange={handleSortChange}>
              <option disabled>Sort By</option>
              <option value="1">Medicine Name</option>
              <option value="2">Cost</option>
            </CFormSelect>
            <CFormSelect onChange={handleOrderChange}>
              <option disabled>Order</option>
              <option value="1">Asc</option>
              <option value="2">Desc</option>
            </CFormSelect>
          </CInputGroup>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardBody>
          <CTable bordered responsive hover>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Medicine Name</CTableHeaderCell>
                <CTableHeaderCell>Cost</CTableHeaderCell>
                <CTableHeaderCell>Created At</CTableHeaderCell>
                <CTableHeaderCell>Modified At</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentData.map((medicine) => (
                <CTableRow key={medicine.medicineID}>
                  <CTableDataCell>{medicine.medicineID}</CTableDataCell>
                  <CTableDataCell>{medicine.medicine_name}</CTableDataCell>
                  <CTableDataCell>{medicine.cost}</CTableDataCell>
                  <CTableDataCell>{formatDate(medicine.created_at)}</CTableDataCell>
                  <CTableDataCell>{formatDate(medicine.updated_at)}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="warning" size="sm" onClick={() => handleEditClick(medicine)}>
                      <FaEdit /> Edit
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader>Edit Medicine</CModalHeader>
        <CModalBody>
          <CFormInput
            label="Medicine Name"
            value={selectedMedicine?.medicine_name || ''}
            onChange={(e) => setSelectedMedicine({ ...selectedMedicine, medicine_name: e.target.value })}
          />
          <CFormInput
            label="Cost"
            type="number"
            value={selectedMedicine?.cost || ''}
            onChange={(e) => setSelectedMedicine({ ...selectedMedicine, cost: e.target.value })}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" size="sm" onClick={() => setShowModal(false)}>Close</CButton>
          <CButton color="primary" size="sm" onClick={handleUpdate}>Update</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EditMedicine;

