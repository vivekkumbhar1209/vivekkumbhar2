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
import api from '../../../api'
import swal from 'sweetalert2'
import Loader from '../../../components/Loader'

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    var token = localStorage.getItem('login-token');
    api
      .get('/getMedicines')
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
    setLoading(true);
    var token = localStorage.getItem('login-token');
    api
      .post(`/updateMedicine/${selectedMedicine.medicineID}`, selectedMedicine)
      .then(() => {
        setShowModal(false);
        swal.fire({
          title: "Success!",
          text: "Medicine updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        })
      })
      .catch((err) => {
        console.log(err);
        swal.fire({
          title: "Error!",
          text: "Failed to update medicine.",
          icon: "error",
          confirmButtonText: "OK",
        });
        
      }).finally(() => {
        setLoading(false);
      })
  };

  const currentData =
    searchTerm.length > 0
      ? filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
      : medicines.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <>
  {loading ? (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '50vh' }}
    >
      <Loader />
    </div>
  ) : (
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
                      <div className='d-flex justify-content-center align-items-center gap-2'>
                        <FaEdit />
                        <span>Edit</span>
                      </div>
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
  )}
</>

  );
};

export default EditMedicine;

