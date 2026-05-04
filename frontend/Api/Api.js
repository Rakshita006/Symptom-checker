import axios from 'axios'

const api=axios.create({
  baseURL:import.meta.env.VITE_API_URL || `http://localhost:5000/api`,
  headers:{'Content-Type':'application/json'}
})

export const getFacilities=(params)=>api.get(`/facilities`,{params})
export const getSymptoms=()=>api.get(`/symptoms`)
export const postTriage=(data)=>api.post(`/triage`, data)

export default api