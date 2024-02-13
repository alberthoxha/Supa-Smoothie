import axios from 'axios';

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16amVlbXB0dWtjYXd5dXpsd2drIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcyODY1NTMsImV4cCI6MjAwMjg2MjU1M30.lUPx8dWSUWp3E-a_ep8gwwxRKeAayK1EGnDNuGyBRK4';
const projectID = 'mzjeemptukcawyuzlwgk';
const tableName = 'smoothies';

const apiUrl = `https://${projectID}.supabase.co/rest/v1/${tableName}`;

export function logSmoothies() {
    axios.get(apiUrl, {
        headers: {
            'apikey': apiKey,
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            console.log('Data from Supabase:', response.data);
            // Handle the data as needed
        })
        .catch(error => console.error('Error fetching data from Supabase:', error));
}
