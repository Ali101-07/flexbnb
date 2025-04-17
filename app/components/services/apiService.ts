'use client';

import { useAuth } from '@clerk/nextjs';

// Helper function to get token from useAuth()
const getToken = async (): Promise<string | null> => {
  const { getToken } = useAuth();
  return await getToken({ template: 'Integration_flexbnb' }); // Make sure this template exists in Clerk
};

const apiService = {
    get: async function (url: string, token: string): Promise<any> {
      return fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: 'GET',
        headers: {
        //   'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(res => res.json());
    },
  
    post: async function (url: string, data: any, token: string): Promise<any> {
        return fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
          method: 'POST',
          body: data,
          headers: {
            'Accept': 'application/json',
          'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`,
          },
        }).then(res => res.json());
      },
      
  
    postWithoutToken: async function (url: string, data: any): Promise<any> {
      return fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(res => res.json());
    },
  };
  
  export default apiService;
  

