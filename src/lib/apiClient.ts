export interface ApiResponse<T> {
    data: T;
    error?: string;
  }
  
  export const apiClient = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      });
  
      const isJson = response.headers
        .get('content-type')
        ?.includes('application/json');
  
      const data = isJson ? await response.json() : null;
  
      if (!response.ok) {
        // Handle HTTP errors
        return {
          data: data as T,
          error: data?.message || 'An unexpected error occurred',
        };
      }
  
      return { data: data as T };
    } catch (error) {
      // Handle network or parsing errors
      console.log(error)
      return {
        data: {} as T,
        error: (error as Error).message || 'An unexpected error occurred',
      };
    }
  };
  