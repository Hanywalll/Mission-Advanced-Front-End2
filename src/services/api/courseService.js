import apiClient from './axiosClient';

/**
 * Service pemanggilan API Course (CRUD Operations)
 * Mendukung GET, ADD (POST), UPDATE (PUT/PATCH), dan DELETE
 */
let currentEndpoint = '/course';

const normalizeCourse = (item) => {
  if (!item) return null;
  return {
    id: item.id,
    title: item.title || item.name || `Kursus Video Belajar #${item.id}`,
    category: item.category || 'Teknologi',
    description:
      item.description ||
      'Pelajari materi komprehensif bersama mentor profesional untuk meningkatkan keahlian karir Anda.',
    thumbnail:
      item.thumbnail ||
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    rating: Number(item.rating) || 4.9,
    reviewCount: Number(item.reviewCount) || 120,
    price: Number(item.price) || 250000,
    originalPrice: Number(item.originalPrice) || 500000,
    level: item.level || 'Semua Level',
    duration: item.duration || '6 Jam',
    totalLessons: Number(item.totalLessons) || 15,
    instructor: {
      name:
        typeof item.instructor === 'object' && item.instructor?.name
          ? item.instructor.name
          : typeof item.instructor === 'string'
          ? item.instructor
          : item.name || 'Instruktur Profesional',
      title: item.instructor?.title || 'Tutor Ahli & Praktisi',
      avatar:
        item.instructor?.avatar ||
        item.avatar ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    },
    createdAt: item.createdAt || new Date().toISOString(),
  };
};

export const courseService = {
  /**
   * Mengambil semua data kursus (GET)
   * Mendukung filter kategori atau pencarian query
   * @param {Object} params - Query params (category, q, sort, order)
   * @returns {Promise<Array>} List courses
   */
  async getAll(params = {}) {
    try {
      const response = await apiClient.get(currentEndpoint, { params });
      const data = Array.isArray(response.data) ? response.data : [];
      return data.map(normalizeCourse);
    } catch (err) {
      if (err.status === 404 && currentEndpoint === '/course') {
        currentEndpoint = '/courses';
        const retryResponse = await apiClient.get(currentEndpoint, { params });
        const data = Array.isArray(retryResponse.data) ? retryResponse.data : [];
        return data.map(normalizeCourse);
      }
      throw err;
    }
  },

  /**
   * Mengambil detail data kursus berdasarkan ID (GET by ID)
   * @param {string|number} id
   * @returns {Promise<Object>} Course detail
   */
  async getById(id) {
    const response = await apiClient.get(`${currentEndpoint}/${id}`);
    return response.data;
  },

  async create(courseData) {
    const payload = {
      ...courseData,
      createdAt: new Date().toISOString(),
      rating: courseData.rating || 5.0,
      reviewCount: courseData.reviewCount || 0,
      price: Number(courseData.price) || 0,
      originalPrice: Number(courseData.originalPrice) || Number(courseData.price) || 0,
    };
    const response = await apiClient.post(currentEndpoint, payload);
    return response.data;
  },

  async update(id, courseData) {
    const payload = {
      ...courseData,
      updatedAt: new Date().toISOString(),
      price: Number(courseData.price) || 0,
      originalPrice: Number(courseData.originalPrice) || Number(courseData.price) || 0,
    };
    const response = await apiClient.put(`${currentEndpoint}/${id}`, payload);
    return response.data;
  },

  async delete(id) {
    const response = await apiClient.delete(`${currentEndpoint}/${id}`);
    return response.data;
  },
};

export default courseService;
