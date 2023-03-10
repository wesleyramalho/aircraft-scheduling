import React from "react";
import A320 from "../../assets/A320.jpg";
import useAirport from "../../hooks/useAirport/useAirport";
import { AircraftType } from "../../types";
import Box from "../Box";
import { ImageContainer, OverlayContainer, AircraftCard } from "./styles";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Badge, Info, Paragraph } from "../../theme";

interface Props {
    aircraft: AircraftType;
    onSelectAircraft: (id: string) => void;
    disabled?: boolean;
}

const Aircraft = ({ aircraft, onSelectAircraft, disabled }: Props) => {

    return (
        <AircraftCard data-testid='aircraft-card' key={`aircraft-${aircraft.ident}`} onClick={() => onSelectAircraft(aircraft.ident)} disabled={disabled}>
            <ImageContainer>
                <img src={A320} alt="A320 airplane" />
                <OverlayContainer />
                <Badge>
                    <Paragraph data-testid='ident-test-container'>
                        <strong>Ident:</strong> {aircraft.ident}
                    </Paragraph>
                </Badge>
            </ImageContainer>
            <Box
                breakpoints={{
                    xs: {
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "20px",
                    },
                }}
            >
                <Paragraph>
                    <strong>Type:</strong> {aircraft.type}
                </Paragraph>
                <Paragraph>
                    <strong>Economy Seats:</strong> {aircraft.economySeats}
                </Paragraph>
                <Paragraph id={`aircraft-tooltip-${aircraft.ident}-${aircraft.base}`}>
                    <strong>Base:</strong> {aircraft.base}{" "}
                    <Info>ⓘ</Info>
                    <ReactTooltip
                        anchorId={`aircraft-tooltip-${aircraft.ident}-${aircraft.base}`}
                        place="bottom"
                        html={
                            `Airport name: ${useAirport(aircraft?.base)?.name || '-'}  <br />`}
                    />
                </Paragraph>
            </Box>
        </AircraftCard>
    );
};

export default Aircraft;
