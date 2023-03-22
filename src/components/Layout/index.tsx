import React, { useState, useEffect, useMemo } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { get } from '../../api';
import { AircraftType, FlightType } from '../../types';
import {
  LoaderWrapper, Dot1, Dot2, Dot3, ColumnsContainer,
  Column, Heading, LayoutTimelineContainer, FlightCard
} from './styles';
import { getRecommendedRotations } from '../../utils/getRecommendedRotations';
import { getPositionForFlight } from '../../utils/getPositionForFlight';
import Timeline from '../Timeline';
import getTimeline from '../../utils/getTimeline';
import { SCHEDULED_STATUS } from '../../utils/constants';
import Recommendations from '../Recommendations';
import Aircraft from '../Aircraft';
import Box from '../Box';
import { Paragraph } from '../../theme';
import { Card } from '../../theme/index';
import RotationResume from '../RotationResume';
import Rotation from '../Rotation';
import Button from '../Button';

type LoaderProps = {
  testId?: string;
}

const Loader = ({ testId }: LoaderProps) => {
  return (<LoaderWrapper data-testid={testId || ''} >
    <Dot1 />
    <Dot2 />
    <Dot3 />
  </LoaderWrapper>);
}


function SiteLayout() {

  const [isLoadingAircrafts, setIsLoadingAircrafts] = useState(true);
  const [isLoadingFlights, setIsLoadingFlights] = useState(true);
  const [selectedAircraft, setSelectedAircraft] = useState('');
  const [airCraftsList, setAirCraftsList] = useState<AircraftType[]>([]);
  const [flightsList, setFlightsList] = useState<FlightType[]>([]);
  const [rotationList, setRotationList] = useState<FlightType[]>([]);

  // With this implementation, the rotationContentList array will only be recalculated when either flightsList or rotationList changes, instead of on every re-render.
  const rotationContentList = useMemo(() => {
    return flightsList.filter(
      (item: FlightType) =>
        rotationList.every((rotationItem) => rotationItem.ident !== item.ident)
    );
  }, [flightsList, rotationList]);

  const countDisabledFlights = () => {
    let disabledNumber = 0;
    for(let i = 0; i < rotationContentList.length; i++) {
      const flight = rotationContentList[i];
      const isDisabled = getPositionForFlight(rotationList, flight) === null
      if(isDisabled) {
        disabledNumber++;
      }
    }
    return disabledNumber;
  }
  
  const shouldShowAllSelectedMessage = rotationList?.length === (flightsList?.length - countDisabledFlights());

  useEffect(() => {
    const getAircraftsData = async () => {
      try {
        const airCraftsData = await get({ url: '/aircrafts' }) as AircraftType[];
        setSelectedAircraft(airCraftsData[0]?.ident);
        setAirCraftsList(airCraftsData);
      } catch (error) {
        console.error('Error fetching aircraft data:', error);
      } finally {
        setIsLoadingAircrafts(false);
      }
    };

    getAircraftsData();
  }, []);

  useEffect(() => {
    const getFlightsData = async () => {
      try {
        const flightsData = await get({ url: '/flights' }) as FlightType[];
        setFlightsList(flightsData);
      } catch (error) {
        console.error('Error fetching flight data:', error);
      } finally {
        setIsLoadingFlights(false);
      }
    };

    getFlightsData();
  }, []);

  const onSelectAircraft = (id: string) => {
    setSelectedAircraft(id);
  };

  const processFlights = (selectedFlight: FlightType) => {
    if (flightsList.length === 0) {
      return [selectedFlight];
    }

    const position = getPositionForFlight(rotationList, selectedFlight);

    if (position === null) {
      return [];
    }

    const newFlights = [...rotationList];
    newFlights.splice(position, 0, selectedFlight);

    return newFlights;
  };

  const onRemoveRotationItem = (item: FlightType) => {
    const newRotationList = rotationList.filter((rotation) => rotation.ident !== item.ident);
    setRotationList(newRotationList);
  }

  const onSelectFlight = (selectedFlight: FlightType) => {
    const rotationData = processFlights(selectedFlight);
    if (rotationData?.length > 0) {
      setRotationList(rotationData)
    }
  }

  const recommendedRotations = useMemo(() => {
    const allRotations = getRecommendedRotations(flightsList);
    const rotationsWithTimeline = allRotations.map((rotation) => {
      const timeline = getTimeline(rotation);
      let totalScheduled = 0;
      for (let i = 0; i < timeline.length; i++) {
        const [status, percent] = timeline[i];
        if (status === SCHEDULED_STATUS) {
          totalScheduled += percent;
        }
      }
      return {
        rotation,
        timeline,
        totalScheduled,
      };
    });
    return rotationsWithTimeline.sort(
      (a, b) => b.totalScheduled - a.totalScheduled
    );
  }, [flightsList]);

  const shouldBeAbleToRemoveFlightFromRotation = (rotationList: FlightType[], index: number) => {
    // if it is the last item on the list, the remove button should appear on the ui
    const isLastFlight = rotationList?.length === index + 1;
    const isFirstFLight = index === 0;
    if (isLastFlight || isFirstFLight) {
      return true
    }
    return false;
  }
  return (
    <>
      {/* there was something about not usage of local time, so I'm not going to get the next day using JS right here */}
      <Heading>Tomorrow's rotation:</Heading>
      <ColumnsContainer>
        <Column>
          <Heading>Aircrafts</Heading>
          {isLoadingAircrafts && airCraftsList?.length === 0 &&
            <Loader testId="aircrafts-loader" />
          }
          {!isLoadingAircrafts && airCraftsList?.length === 0 &&
            <Box
              breakpoints={{
                xs: {
                  padding: '40px'
                }
              }}
            >
              <Paragraph>Sorry! No aircrafts available :/ </Paragraph>
            </Box>
          }
          {!isLoadingAircrafts && airCraftsList?.length > 0 && airCraftsList.map((aircraft) => (
            <Aircraft
              disabled={aircraft.ident !== selectedAircraft}
              onSelectAircraft={(id: string) => onSelectAircraft(id)}
              key={`aircraft-${aircraft.ident}`} aircraft={aircraft} />
          ))}
        </Column>
        <Column>
          <Heading>Rotation</Heading>
          <RotationResume
            selectedAircraft={selectedAircraft}
            rotationList={rotationList}
          />
          {rotationList.map((flight, index) => (
            <Card key={`rotation-${flight.ident}`}>
              {
                shouldBeAbleToRemoveFlightFromRotation(rotationList, index) &&
                <Button
                  variant='danger'
                  onClick={() => onRemoveRotationItem(flight)}
                >
                  remove
                </Button>
              }
              <Rotation
                flight={flight}
              />
            </Card>
          ))}
        </Column>
        <Column>
          <Heading>Flights</Heading>

          {isLoadingFlights && flightsList?.length === 0 &&
            <Loader />
          }
          {!isLoadingFlights && flightsList?.length === 0 &&
            <Box
              breakpoints={{
                xs: {
                  padding: '40px'
                }
              }}
            >
              <Paragraph>Sorry! No flights available :/ </Paragraph>
            </Box>
          }
          {!isLoadingFlights && flightsList?.length > 0 &&
            <Tabs>
              <TabList
                style={{
                  position: 'sticky',
                  top: '50px',
                  background: '#fff',
                  zIndex: 9,
                }}
              >
                <Tab>Choose manually:</Tab>
                <Tab>Rotation recommendations: </Tab>
              </TabList>
              <TabPanel data-testid="flights-list">
                {shouldShowAllSelectedMessage &&
                  <Box
                    breakpoints={{
                      xs: {
                        padding: '40px'
                      }
                    }}
                  >
                    <Paragraph>You've selected all flights. No more flights available :/ </Paragraph>
                  </Box>
                }
                {rotationContentList.map((flight: FlightType) => {
                  const isDisabled = getPositionForFlight(rotationList, flight) === null
                  if (isDisabled) {
                    return null;
                  }
                  return (
                    <FlightCard
                      disabled={isDisabled}
                      key={`rotation-${flight.ident}`}
                      data-testid={`rotation-${flight.ident}`}
                    >
                      <Button
                        onClick={() => onSelectFlight(flight)}
                        disabled={isDisabled}
                      >
                        add
                      </Button>
                      <Rotation
                        flight={flight}
                      />
                    </FlightCard>
                  )
                }
                )}
              </TabPanel>
              <TabPanel>
                <Recommendations
                  recommendedRotations={recommendedRotations}
                  onSelectRotationRecommendation={(rotation: FlightType[]) => {
                    setRotationList(rotation)
                  }}
                />
              </TabPanel>
            </Tabs>
          }
        </Column>
        <LayoutTimelineContainer>
          <Timeline
            renderedFromKey='bottom'
            items={rotationList} />
        </LayoutTimelineContainer>
      </ColumnsContainer>
    </>

  );
}

export default SiteLayout;
