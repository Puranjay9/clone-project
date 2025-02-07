import axios from 'axios';

const apiCall = async (url: string) => {
    const apiKey = "/zqcsI3z0SVlG0+RANY2nQ==noCDrcM6JBT1zxaW";
    
    try {
        const response = await axios.get(url, {
            headers: {
                'x-api-key': apiKey
            },
            params: {
                type: 'strength',
                muscle : 'biceps',
            }
        });
        //console.log('API call response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error making API call:', error);
        throw error;
    }
};

export default apiCall;