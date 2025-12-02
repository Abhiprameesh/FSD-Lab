import { useState } from 'react';
import { User, Mail, Phone, MapPin, BookOpen, Award, Calendar, Search, Filter } from 'lucide-react';

// Sample student data
const studentsData = [
  {
    id: 1,
    name: "Emma Wilson",
    email: "emma.wilson@school.edu",
    phone: "+1 234-567-8901",
    location: "New York, NY",
    course: "Computer Science",
    grade: "A",
    year: "Junior",
    gpa: 3.8,
    avatar: "EW"
  },
  {
    id: 2,
    name: "Liam Johnson",
    email: "liam.johnson@school.edu",
    phone: "+1 234-567-8902",
    location: "Los Angeles, CA",
    course: "Business Administration",
    grade: "B+",
    year: "Senior",
    gpa: 3.5,
    avatar: "LJ"
  },
  {
    id: 3,
    name: "Sophia Martinez",
    email: "sophia.martinez@school.edu",
    phone: "+1 234-567-8903",
    location: "Chicago, IL",
    course: "Electrical Engineering",
    grade: "A-",
    year: "Sophomore",
    gpa: 3.7,
    avatar: "SM"
  },
  {
    id: 4,
    name: "Noah Brown",
    email: "noah.brown@school.edu",
    phone: "+1 234-567-8904",
    location: "Houston, TX",
    course: "Mathematics",
    grade: "A+",
    year: "Freshman",
    gpa: 4.0,
    avatar: "NB"
  },
  {
    id: 5,
    name: "Olivia Davis",
    email: "olivia.davis@school.edu",
    phone: "+1 234-567-8905",
    location: "Phoenix, AZ",
    course: "Psychology",
    grade: "B",
    year: "Junior",
    gpa: 3.3,
    avatar: "OD"
  },
  {
    id: 6,
    name: "Ethan Garcia",
    email: "ethan.garcia@school.edu",
    phone: "+1 234-567-8906",
    location: "Philadelphia, PA",
    course: "Mechanical Engineering",
    grade: "A",
    year: "Senior",
    gpa: 3.9,
    avatar: "EG"
  }
];

// Student Card Component
const StudentCard = ({ student }) => {
  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getAvatarColor = (id) => {
    const colors = [
      'bg-gradient-to-br from-purple-500 to-pink-500',
      'bg-gradient-to-br from-blue-500 to-cyan-500',
      'bg-gradient-to-br from-green-500 to-teal-500',
      'bg-gradient-to-br from-orange-500 to-red-500',
      'bg-gradient-to-br from-indigo-500 to-purple-500',
      'bg-gradient-to-br from-pink-500 to-rose-500'
    ];
    return colors[(id - 1) % colors.length];
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Card Header with Avatar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-full ${getAvatarColor(student.id)} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
            {student.avatar}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{student.name}</h3>
            <p className="text-blue-100 text-sm">{student.year}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(student.grade)}`}>
            {student.grade}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-4">
        {/* Course Info */}
        <div className="flex items-center gap-3 text-gray-700">
          <BookOpen size={18} className="text-blue-600" />
          <div>
            <p className="text-xs text-gray-500">Course</p>
            <p className="font-medium">{student.course}</p>
          </div>
        </div>

        {/* GPA */}
        <div className="flex items-center gap-3 text-gray-700">
          <Award size={18} className="text-purple-600" />
          <div>
            <p className="text-xs text-gray-500">GPA</p>
            <p className="font-medium">{student.gpa.toFixed(1)}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 text-gray-700">
          <Mail size={18} className="text-green-600" />
          <div className="overflow-hidden">
            <p className="text-xs text-gray-500">Email</p>
            <p className="font-medium text-sm truncate">{student.email}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3 text-gray-700">
          <Phone size={18} className="text-orange-600" />
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="font-medium">{student.phone}</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-3 text-gray-700">
          <MapPin size={18} className="text-red-600" />
          <div>
            <p className="text-xs text-gray-500">Location</p>
            <p className="font-medium">{student.location}</p>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors duration-200">
          View Profile
        </button>
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function StudentDashboard() {
  const [students, setStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('All');

  // Filter students based on search and year
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = filterYear === 'All' || student.year === filterYear;
    return matchesSearch && matchesYear;
  });

  const years = ['All', 'Freshman', 'Sophomore', 'Junior', 'Senior'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage and view student information</p>
            </div>
            <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg">
              <User size={20} className="text-blue-600" />
              <span className="text-blue-900 font-semibold">{filteredStudents.length} Students</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Year Filter */}
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600" />
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Student Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map(student => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>

        {/* No Results */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <User size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">No students found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}