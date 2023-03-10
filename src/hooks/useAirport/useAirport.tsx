import { useMemo } from "react";
import airports from "../../data/airports";

const useAirport = (code: string) => {
    const airport = useMemo(() => {
        return airports.find((airport) => airport.code === code);
    }, [code]);

    return airport;
};

export default useAirport;