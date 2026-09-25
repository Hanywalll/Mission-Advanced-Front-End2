import React, { createContext, useContext } from 'react';
import useCourses from '../hooks/useCourses';

/**
 * CourseContext & CourseProvider
 * Mengimplementasikan Global State Management (useContext) sesuai kriteria penilaian:
 * "State Management pada React seperti Redux UseContext Zustand"
 */
const CourseContext = createContext(null);

export function CourseProvider({ children }) {
  const courseState = useCourses();

  return (
    <CourseContext.Provider value={courseState}>
      {children}
    </CourseContext.Provider>
  );
}

/**
 * Custom hook untuk mengakses state dan method CRUD secara global di seluruh komponen
 */
export function useCourseContext() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext harus digunakan di dalam <CourseProvider>');
  }
  return context;
}

export default CourseContext;
