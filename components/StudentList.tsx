import React from 'react';
import { Student } from '../types';
import { UserIcon, TrashIcon } from './icons';

interface StudentListProps {
    students: Student[];
    selectedStudentId: string | null;
    onSelectStudent: (id: string) => void;
    onDeleteStudent: (id: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, selectedStudentId, onSelectStudent, onDeleteStudent }) => {
    
    const handleDelete = (e: React.MouseEvent, studentId: string) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this student?")) {
            onDeleteStudent(studentId);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-4 sticky top-24">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Students ({students.length})</h2>
            <ul className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                {students.map(student => (
                    <li
                        key={student.id}
                        onClick={() => onSelectStudent(student.id)}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedStudentId === student.id
                                ? 'bg-primary text-white shadow-lg'
                                : 'hover:bg-slate-100 hover:shadow-sm'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className={`p-2 rounded-full ${selectedStudentId === student.id ? 'bg-white text-primary' : 'bg-slate-100 text-slate-500'}`}>
                                <UserIcon />
                            </span>
                            <span className="font-medium">{student.name}</span>
                        </div>
                        <button
                            onClick={(e) => handleDelete(e, student.id)}
                            className={`p-1 rounded-full transition-colors duration-200 ${selectedStudentId === student.id ? 'text-white/70 hover:bg-white/20 hover:text-white' : 'text-slate-400 hover:bg-red-100 hover:text-red-500'}`}
                        >
                            <TrashIcon />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;
