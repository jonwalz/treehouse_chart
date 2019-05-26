import { createClient, Action, ResponseInterceptor} from 'react-fetching-library'

export const responseInterceptor = (client: any) => async (action: Action, response: any) => {
    if (response.payload.data) {
      return {
        ...response,
        payload: response.payload.data
      };
    }

    return response;
  };

export const Client = createClient({
    responseInterceptors: [responseInterceptor]
})
