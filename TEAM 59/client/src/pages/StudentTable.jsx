import React from 'react';
import { useParams } from 'react-router-dom';
import StudentList from './StudentList/StudentList';

const StudentTable = () => {
  const { class: studentClass } = useParams();

  return (
    <div className='bg-blue-400'>
      <div className='flex mx-10 justify-center h-screen items-center'>
        <StudentList studentClass={parseInt(studentClass, 10)} />
      </div>
    </div>
  );
};

export default StudentTable;
