export const handleFetch = async (credentials, endpoint, method, content_type) => {  
  return await fetch(process.env.REACT_APP_API_URL + endpoint, {
      method: method,
      headers: {
        'Content-Type': content_type,
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}
