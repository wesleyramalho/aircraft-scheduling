import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Aircraft from "./index";

const aircraft = {
    ident: "ABC123",
    type: "A320",
    economySeats: 180,
    base: "LAX"
};


describe('Aircraft component', () => {

    test("renders aircraft ident", () => {
        render(<Aircraft aircraft={aircraft} onSelectAircraft={() => { }} />);
        const identElement = screen.getByTestId('ident-test-container');
        expect(identElement).toBeInTheDocument();
        expect(identElement).toHaveTextContent("Ident: ABC123");
    });

    test("calls onSelectAircraft when clicked", () => {
        const onSelectAircraft = jest.fn();
        render(
            <Aircraft aircraft={aircraft} onSelectAircraft={onSelectAircraft} />
        );
        fireEvent.click(screen.getByTestId("aircraft-card"));
        expect(onSelectAircraft).toHaveBeenCalledTimes(1);
        expect(onSelectAircraft).toHaveBeenCalledWith("ABC123");
    });

    test("disables aircraft card when disabled prop is true", () => {
        render(
            <Aircraft aircraft={aircraft} onSelectAircraft={() => { }} disabled={true} />
        );
        const aircraftCard = screen.getByTestId("aircraft-card");
        expect(aircraftCard).toHaveAttribute('disabled');
    });
});
