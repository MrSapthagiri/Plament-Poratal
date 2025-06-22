import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AcademicCapIcon,
  UserPlusIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import StudentList from './components/StudentList';
import StudentFilters from './components/StudentFilters';
import AddStudentModal from './components/AddStudentModal';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState({
    department: '',
    batch: '',
    placementStatus: '',
  });

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/students', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: filters,
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [filters]);

  const handleAddStudent = async (studentData) => {
    try {
      await axios.post('http://localhost:5000/api/students', studentData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchStudents();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Roll Number', 'Department', 'CGPA', 'Status'];
    const csvData = students.map((student) => [
      student.user.name,
      student.rollNumber,
      student.department,
      student.cgpa,
      student.placementStatus,
    ]);

    const csv = [headers, ...csvData].map((row) => row.join(',')).join('\\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Students</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage and track student profiles and placement status
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 text-sm text-gray-600 bg-white border rounded-md hover:bg-gray-50"
          >
            <FunnelIcon className="w-4 h-4 mr-2" />
            Filters
          </button>

          <button
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 text-sm text-gray-600 bg-white border rounded-md hover:bg-gray-50"
          >
            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
            Export
          </button>

          {/* <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 text-sm text-white bg-primary rounded-md hover:bg-primary-dark"
          >
            <UserPlusIcon className="w-4 h-4 mr-2" />
            Add Student
          </button> */}
        </div>
      </div>

      {showFilters && (
        <StudentFilters filters={filters} setFilters={setFilters} />
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Loading...</div>
        </div>
      ) : (
        <StudentList students={students} onRefresh={fetchStudents} />
      )}

      {showAddModal && (
        <AddStudentModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddStudent}
        />
      )}
    </div>
  );
};

export default Students;
