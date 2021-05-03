const url = 'http://localhost:8080';

export const fetchFunction = async (credentials, endpoint) => {
    return fetch(url + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${credentials.token}` 
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
    .catch((error) => {
    console.error('Error:', error);
    });
}
