import { BASE_URL } from '../utils/constants';
import get from './get';

describe('get', () => {
    it('should make a GET request and return the data', async () => {
        const data = { message: 'Hello, world!' };
        const url = 'https://example.com/api/data';
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(data),
        })) as jest.MockedFunction<typeof fetch>;

        const result = await get<{ message: string }>({ url });

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${url}`);
        expect(result).toEqual(data);
    });

    it('should throw an error if the response is not ok', async () => {
        const url = 'https://example.com/api/data';
        global.fetch = jest.fn(() => Promise.resolve({
            ok: false,
            status: 404,
            statusText: 'Not Found',
        })) as jest.MockedFunction<typeof fetch>;

        await expect(get({ url })).rejects.toThrow('HTTP error! status: 404');
    });

    it('should throw an error if an exception occurs', async () => {
        const url = 'https://example.com/api/data';
        global.fetch = jest.fn(() => { throw new Error('Network error'); }) as jest.MockedFunction<typeof fetch>;

        await expect(get({ url })).rejects.toThrow('Network error');
    });
});
