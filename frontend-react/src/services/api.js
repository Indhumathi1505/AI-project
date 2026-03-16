import axios from 'axios';

const API_URL = 'http://localhost:8083/api';

export const aiApi = {
  register: (studentData) => axios.post(`${API_URL}/register`, studentData),
  login: (credentials) => axios.post(`${API_URL}/login`, credentials),
  
  // Dashboard & Skills
  predictPlacement: (studentData) => axios.post(`${API_URL}/predict-placement`, studentData),
  getSkillGap: (studentData) => axios.post(`${API_URL}/skill-gap`, studentData),
  
  // Resume & Interview
  analyzeResume: (fileFormData) => axios.post(`${API_URL}/resume-analysis`, fileFormData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getInterviewQuestions: () => axios.get(`${API_URL}/interview-questions`)
};
