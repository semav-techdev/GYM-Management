import api from "../lib/axios";

const weightService = {
  getMemberCalendar: (memberId, year) => 
    api.get(`/weight-records/member/${memberId}/calendar`, { params: { year } }),
  
  getMemberRecords: (memberId) => 
    api.get(`/weight-records/member/${memberId}`),
  
  createRecord: (data) => 
    api.post("/weight-records/", data),
  
  updateRecord: (recordId, data) => 
    api.put(`/weight-records/${recordId}`, data),
  
  deleteRecord: (recordId) => 
    api.delete(`/weight-records/${recordId}`),
};

export default weightService;