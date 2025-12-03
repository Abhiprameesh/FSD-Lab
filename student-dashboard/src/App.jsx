import { useState } from 'react';

export default function StudentDashboard() {
  const [students] = useState([
    { id: 1, name: 'Emma Wilson', grade: 'A', course: 'Computer Science' },
    { id: 2, name: 'James Chen', grade: 'B+', course: 'Mathematics' },
    { id: 3, name: 'Sofia Rodriguez', grade: 'A-', course: 'Physics' },
    { id: 4, name: 'Marcus Johnson', grade: 'B', course: 'Engineering' },
    { id: 5, name: 'Aisha Patel', grade: 'A+', course: 'Biology' },
    { id: 6, name: 'David Kim', grade: 'B+', course: 'Chemistry' }
  ]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student) => (
          <div key={student.id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{student.name}</h3>
            <p className="text-gray-600">{student.course}</p>
            <p className="text-lg font-bold mt-2">Grade: {student.grade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}