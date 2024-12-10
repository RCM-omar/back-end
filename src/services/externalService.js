import axiosInstance from "../config/axiosInstance";


export const fetchDataFromExternalAPI = async () => {
  try {
    const response = await axiosInstance.get('/data-endpoint');
    return response.data; 
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

export const sendDataToExternalAPI = async (data) => {
  try {
    const response = await axiosInstance.post('/data-endpoint', data);
    return response.data; 
  } catch (error) {
    throw new Error(`Error sending data: ${error.message}`);
  }
};
