import React, { useState, useEffect } from 'react';
import { Student, Subject, AttendanceRecord, AttendanceStatus } from '../types';
import AttendanceChart from './AttendanceChart';
import MarksChart from './MarksChart';
import { EditIcon, CheckIcon, XIcon, PlusIcon, TrashIcon } from './icons';

interface StudentDetailProps {
    student: Student | null;
    onUpdateStudent: (student: Student) => void;
}

const StudentDetail: React.FC<StudentDetailProps> = ({ student, onUpdateStudent }) => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [name, setName] = useState(student?.name || '');
    const [newSubjectName, setNewSubjectName] = useState('');
    const [newSubjectMarks, setNewSubjectMarks] = useState<number | string>('');

    useEffect(() => {
        if (student) {
            setName(student.name);
        }
        setIsEditingName(false);
    }, [student]);

    if (!student) {
        return (
            <div className="flex items-center justify-center h-full bg-white rounded-xl shadow-md p-8">
                <p className="text-slate-500 text-lg">Select a student to see their details.</p>
            </div>
        );
    }
    
    const handleNameUpdate = () => {
        if (name.trim() && student) {
            onUpdateStudent({ ...student, name: name.trim() });
            setIsEditingName(false);
        }
    };

    const handleAddSubject = (e: React.FormEvent) => {
        e.preventDefault();
        if (newSubjectName.trim() && newSubjectMarks !== '' && student) {
            const newSubject: Subject = {
                id: `sub${Date.now()}`,
                name: newSubjectName.trim(),
                marks: Number(newSubjectMarks),
            };
            onUpdateStudent({ ...student, subjects: [...student.subjects, newSubject] });
            setNewSubjectName('');
            setNewSubjectMarks('');
        }
    };
    
    const handleDeleteSubject = (subjectId: string) => {
        if (student) {
            const updatedSubjects = student.subjects.filter(sub => sub.id !== subjectId);
            onUpdateStudent({ ...student, subjects: updatedSubjects });
        }
    }

    const handleMarkAttendance = (status: AttendanceStatus) => {
        const today = new Date().toISOString().split('T')[0];
        if (student && !student.attendance.some(att => att.date === today)) {
            const newAttendanceRecord: AttendanceRecord = { date: today, status };
            onUpdateStudent({ ...student, attendance: [...student.attendance, newAttendanceRecord] });
        }
    };
    
    const todayAttendance = student.attendance.find(att => att.date === new Date().toISOString().split('T')[0]);

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    {!isEditingName ? (
                        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                            {student.name}
                            <button onClick={() => setIsEditingName(true)} className="text-slate-400 hover:text-primary transition-colors">
                                <EditIcon />
                            </button>
                        </h2>
                    ) : (
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="text-3xl font-bold border-b-2 border-primary focus:outline-none"
                                autoFocus
                            />
                            <button onClick={handleNameUpdate} className="text-green-500 hover:text-green-700"><CheckIcon /></button>
                            <button onClick={() => { setIsEditingName(false); setName(student.name); }} className="text-red-500 hover:text-red-700"><XIcon /></button>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">Attendance</h3>
                    <div className="mb-4">
                        <p className="font-medium mb-2">Today's Status:</p>
                        {todayAttendance ? (
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                todayAttendance.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {todayAttendance.status.charAt(0).toUpperCase() + todayAttendance.status.slice(1)}
                            </span>
                        ) : (
                            <div className="flex gap-2">
                                <button onClick={() => handleMarkAttendance('present')} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition">Mark Present</button>
                                <button onClick={() => handleMarkAttendance('absent')} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">Mark Absent</button>
                            </div>
                        )}
                    </div>
                    <div className="h-64">
                       <AttendanceChart attendance={student.attendance} />
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">Marks Overview</h3>
                    <div className="h-72">
                        <MarksChart subjects={student.subjects} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                 <h3 className="text-xl font-semibold mb-4">Subjects & Marks</h3>
                 <form onSubmit={handleAddSubject} className="flex flex-col sm:flex-row items-center gap-2 mb-4 p-4 bg-slate-50 rounded-lg">
                    <input
                        type="text"
                        placeholder="Subject Name"
                        value={newSubjectName}
                        onChange={(e) => setNewSubjectName(e.target.value)}
                        className="w-full sm:w-1/2 p-2 border rounded-md focus:ring-primary focus:border-primary"
                        required
                    />
                     <input
                        type="number"
                        placeholder="Marks (0-100)"
                        value={newSubjectMarks}
                        min="0"
                        max="100"
                        onChange={(e) => setNewSubjectMarks(e.target.value)}
                        className="w-full sm:w-1/4 p-2 border rounded-md focus:ring-primary focus:border-primary"
                        required
                    />
                    <button type="submit" className="w-full sm:w-auto flex justify-center items-center gap-2 bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-primary-700 transition">
                       <PlusIcon /> Add
                    </button>
                 </form>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b">
                            <tr>
                                <th className="p-2">Subject</th>
                                <th className="p-2">Marks</th>
                                <th className="p-2 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student.subjects.length > 0 ? student.subjects.map(subject => (
                                <tr key={subject.id} className="border-b hover:bg-slate-50">
                                    <td className="p-2 font-medium">{subject.name}</td>
                                    <td className="p-2">{subject.marks}</td>
                                    <td className="p-2 text-right">
                                        <button onClick={() => handleDeleteSubject(subject.id)} className="text-slate-400 hover:text-red-500 transition"><TrashIcon /></button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={3} className="text-center p-4 text-slate-500">No subjects added yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentDetail;
