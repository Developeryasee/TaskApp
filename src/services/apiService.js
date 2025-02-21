import { create } from 'apisauce';

export const configs = {
  apiInstance: create(
    {

      baseURL: 'https://task-app-backend-flame.vercel.app/', 
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}