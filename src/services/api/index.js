import { courseService } from './courseService';

export { apiClient } from './axiosClient';
export { courseService } from './courseService';

/**
 * Fungsi Get API dari folder services/api
 * Sesuai instruksi STEP 4:
 * import { getData } from './services/api';
 */
export const getData = async (params = {}) => {
  return await courseService.getAll(params);
};

export const getCourseById = async (id) => {
  return await courseService.getById(id);
};

/**
 * Fungsi Add API dari folder services/api
 */
export const addData = async (data) => {
  return await courseService.create(data);
};

/**
 * Fungsi Edit API dari folder services/api
 */
export const editData = async (id, data) => {
  return await courseService.update(id, data);
};

export const updateData = async (id, data) => {
  return await courseService.update(id, data);
};

/**
 * Fungsi Delete API dari folder services/api
 */
export const deleteData = async (id) => {
  return await courseService.delete(id);
};

export default {
  getData,
  getCourseById,
  addData,
  editData,
  updateData,
  deleteData,
};
