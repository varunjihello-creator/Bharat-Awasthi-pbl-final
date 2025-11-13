import React, { useState, useCallback } from 'react';
import { Student } from './types';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';
import AddStudentModal from './components/AddStudentModal';
import { PlusIcon } from './components/icons';

const getInitialStudents = (): Student[] => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    return [
        {
            id: 's1',
            name: 'John Doe',
            subjects: [
                { id: 'sub1', name: 'Math', marks: 85 },
                { id: 'sub2', name: 'Science', marks: 92 },
                { id: 'sub3', name: 'History', marks: 78 },
            ],
            attendance: [
                { date: yesterday, status: 'present' },
                { date: today, status: 'present' },
            ],
        },
        {
            id: 's2',
            name: 'Jane Smith',
            subjects: [
                { id: 'sub4', name: 'Math', marks: 95 },
                { id: 'sub5', name: 'English', marks: 88 },
                { id: 'sub6', name: 'Art', marks: 95 },
            ],
            attendance: [
                { date: yesterday, status: 'present' },
                { date: today, status: 'absent' },
            ],
        },
        {
            id: 's3',
            name: 'Peter Jones',
            subjects: [
                { id: 'sub7', name: 'Physics', marks: 75 },
                { id: 'sub8', name: 'Chemistry', marks: 82 },
            ],
            attendance: [
                 { date: yesterday, status: 'absent' },
            ],
        }
    ];
};


const App: React.FC = () => {
    const [students, setStudents] = useState<Student[]>(getInitialStudents());
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>('s1');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectStudent = (id: string) => {
        setSelectedStudentId(id);
    };

    const handleAddStudent = (name: string) => {
        const newStudent: Student = {
            id: `s${Date.now()}`,
            name,
            subjects: [],
            attendance: [],
        };
        setStudents([...students, newStudent]);
        setSelectedStudentId(newStudent.id);
        setIsModalOpen(false);
    };

    const handleUpdateStudent = useCallback((updatedStudent: Student) => {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.id === updatedStudent.id ? updatedStudent : student
            )
        );
    }, []);
    
    const handleDeleteStudent = (studentId: string) => {
      setStudents(prevStudents => prevStudents.filter(s => s.id !== studentId));
      if (selectedStudentId === studentId) {
        setSelectedStudentId(students.length > 1 ? students[0].id : null);
      }
    };

    const selectedStudent = students.find(s => s.id === selectedStudentId) || null;

    return (
        <div className="min-h-screen font-sans text-slate-800 bg-slate-100">
            <header className="bg-white shadow-sm sticky top-0 z-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold text-primary">Student Records</h1>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300"
                        >
                            <PlusIcon />
                            Add Student
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <StudentList
                            students={students}
                            selectedStudentId={selectedStudentId}
                            onSelectStudent={handleSelectStudent}
                            onDeleteStudent={handleDeleteStudent}
                        />
                    </div>
                    <div className="lg:col-span-3">
                        <StudentDetail
                            student={selectedStudent}
                            onUpdateStudent={handleUpdateStudent}
                        />
                    </div>
                </div>
            </main>

            <AddStudentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddStudent={handleAddStudent}
            />
        </div>
    );
};

export default App;
