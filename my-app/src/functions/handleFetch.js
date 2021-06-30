const url = 'http://localhost:8080';

export const handleFetch = async (credentials, endpoint, method, content_type) => {  
  return await fetch(url + endpoint, {
      method: method,
      headers: {
        'Content-Type': content_type,
        'Authorization': `Bearer ${credentials.token}` 
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}
