'use client';

const apiService = {
  get: async function (url: string, token: string | null): Promise<any> {
    return fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: 'GET',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '', // Include token if available
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());
  },

  post: async function (url: string, data: any, token: string | null): Promise<any> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: 'POST',
        body: data,
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.message || 'Failed to fetch');
      }

      return await response.json();
    } catch (error) {
      console.error('Error in POST request:', error);
      throw error;
    }
  },

  postWithoutToken: async function (url: string, data: any): Promise<any> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'omit',
      });

      // Check if the response status is OK (2xx)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch');
      }

      return await response.json(); // Parse and return JSON response
    } catch (error) {
      console.error('Error in POST request (without token):', error);
      throw error; // Re-throw the error for the caller to handle
    }
  },
};

export default apiService;


