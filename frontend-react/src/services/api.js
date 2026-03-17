import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8083/api',
  timeout: 12000, // 12 second timeout
});

export const aiApi = {
  register: (studentData) => instance.post('/register', studentData),
  login: (credentials) => instance.post('/login', credentials),
  
  // Dashboard & Skills
  getStudentProfile: (id) => instance.get(`/student/profile/${id}`),
  predictPlacement: (studentData) => instance.post('/predict-placement', studentData),
  getSkillGap: (studentData) => instance.post('/skill-gap', studentData),
  
  // Resume & Interview
  analyzeResume: (file, studentId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('studentId', studentId);
    return instance.post('/resume-analysis', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getInterviewQuestions: (domain) => instance.get('/interview-questions', { params: { domain } })
};
