import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusIcon } from '@heroicons/react/24/outline';
import CompanyList from './components/CompanyList';
import CompanyFilters from './components/CompanyFilters';
import AddCompanyModal from './components/AddCompanyModal';
import EditCompanyModal from './components/EditCompanyModal';
import CompanyDetailsModal from './components/CompanyDetailsModal';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState({
    industry: '',
    verificationStatus: '',
    searchQuery: '',
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/companies', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCompanies(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAddCompany = async (companyData) => {
    try {
      await axios.post(
        'http://localhost:5000/api/companies',
        companyData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      fetchCompanies();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  const handleEditCompany = async (companyId, companyData) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/companies/${companyId}`,
        companyData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      fetchCompanies();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  const handleDeleteCompany = async (companyId) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await axios.delete(`http://localhost:5000/api/companies/${companyId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        fetchCompanies();
      } catch (error) {
        console.error('Error deleting company:', error);
      }
    }
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesIndustry =
      !filters.industry || company.industry === filters.industry;
    const matchesStatus =
      !filters.verificationStatus ||
      company.verificationStatus === filters.verificationStatus;
    const matchesSearch =
      !filters.searchQuery ||
      company.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return matchesIndustry && matchesStatus && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Company
        </button>
      </div>

      <CompanyFilters filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <CompanyList
          companies={filteredCompanies}
          onEdit={(company) => {
            setSelectedCompany(company);
            setShowEditModal(true);
          }}
          onDelete={handleDeleteCompany}
          onView={(company) => {
            setSelectedCompany(company);
            setShowDetailsModal(true);
          }}
        />
      )}

      {showAddModal && (
        <AddCompanyModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddCompany}
        />
      )}

      {showEditModal && selectedCompany && (
        <EditCompanyModal
          company={selectedCompany}
          onClose={() => {
            setShowEditModal(false);
            setSelectedCompany(null);
          }}
          onSave={(data) => handleEditCompany(selectedCompany._id, data)}
        />
      )}

      {showDetailsModal && selectedCompany && (
        <CompanyDetailsModal
          company={selectedCompany}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedCompany(null);
          }}
        />
      )}
    </div>
  );
};

export default Companies;
