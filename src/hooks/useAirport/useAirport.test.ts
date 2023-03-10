import { renderHook } from '@testing-library/react-hooks';
import useAirport from './useAirport';

describe('useAirport', () => {
  test('returns null when no airport is found', () => {
    const { result } = renderHook(() => useAirport('INVALID'));

    expect(result.current).toBeUndefined();
  });

  test('returns airport information when valid airport code is provided', () => {
    const { result } = renderHook(() => useAirport('EGKK'));

    expect(result.current).toEqual({
      "code": "EGKK",
      "lat": "51.1568",
      "lon": "-0.16988",
      "name": "London Gatwick Airport",
      "city": "Horley",
      "state": "England",
      "country": "United Kingdom",
      "woeid": "23387567",
      "tz": "Europe London",
      "phone": "0870 000 2468",
      "type": "Airports",
      "email": "",
      "url": "http://www.gatwickairport.com/",
      "runway_length": "10364",
      "elev": "202",
      "icao": "",
      "direct_flights": "227",
      "carriers": "71"
    });
  });

  test('memoizes the result', () => {
    const { result, rerender } = renderHook(
      ({ code }) => useAirport(code),
      { initialProps: { code: 'EGKK' } }
    );

    const initialResult = result.current;

    rerender({ code: 'EGKK' });

    expect(result.current).toBe(initialResult);
  });
});
