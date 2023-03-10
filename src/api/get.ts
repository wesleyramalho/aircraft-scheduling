import { BASE_URL } from "../utils/constants";


async function get<T>({ baseUrl = BASE_URL, url }: { baseUrl?: string, url: string }): Promise<T> {
    try {
      const response = await fetch(baseUrl + url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
export default get;