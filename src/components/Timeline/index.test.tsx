import { FlightType } from "../../types";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Timeline from './index';

export const FLIGHTS_MOCK: FlightType[] = [
    {
      ident: 'AAL1058',
      origin: 'KDFW',
      destination: 'KPHL',
      departuretime: 1615156320,
      arrivaltime: 1615169400,
      readable_departure: '11:52 CST',
      readable_arrival: '16:10 EST',
    },
    {
      ident: 'FFT1810',
      origin: 'KBOS',
      destination: 'KLAS',
      departuretime: 1615164900,
      arrivaltime: 1615185900,
      readable_departure: '14:15 EST',
      readable_arrival: '19:05 PST',
    },
    {
      ident: 'AAL2753',
      origin: 'KLAX',
      destination: 'KJFK',
      departuretime: 1615182300,
      arrivaltime: 1615221480,
      readable_departure: '19:25 PST',
      readable_arrival: '04:18 EST (next day)',
    },
    {
      ident: 'JBU799',
      origin: 'KLGA',
      destination: 'KMCO',
      departuretime: 1615148400,
      arrivaltime: 1615165500,
      readable_departure: '11:00 EST',
      readable_arrival: '15:05 EST',
    },
    {
      ident: 'DAL1023',
      origin: 'KATL',
      destination: 'KSLC',
      departuretime: 1615138500,
      arrivaltime: 1615156020,
      readable_departure: '08:15 EST',
      readable_arrival: '11:07 MST',
    },
    {
      ident: 'NKS737',
      origin: 'KMSP',
      destination: 'KLAX',
      departuretime: 1615158300,
      arrivaltime: 1615177200,
      readable_departure: '13:05 CST',
      readable_arrival: '17:20 PST',
    },
    {
      ident: 'NKS876',
      origin: 'KPHL',
      destination: 'KLAS',
      departuretime: 1615171140,
      arrivaltime: 1615188600,
      readable_departure: '17:19 EST',
      readable_arrival: '21:30 PST',
    },
    {
      ident: 'AAL2333',
      origin: 'KORD',
      destination: 'KLGA',
      departuretime: 1615150680,
      arrivaltime: 1615164660,
      readable_departure: '09:38 CST',
      readable_arrival: '13:11 EST',
    },
    {
      ident: 'NKS347',
      origin: 'KDEN',
      destination: 'KIND',
      departuretime: 1615148400,
      arrivaltime: 1615163220,
      readable_departure: '11:00 MST',
      readable_arrival: '14:07 EST',
    },
    {
      ident: 'AAL1659',
      origin: 'KJFK',
      destination: 'KMCO',
      departuretime: 1615148400,
      arrivaltime: 1615163580,
      readable_departure: '11:00 EST',
      readable_arrival: '15:13 EST',
    },
  ];
  


describe('Timeline', () => {
  it('should display the timeline items', () => {
    const items = FLIGHTS_MOCK;
    render(<Timeline renderedFromKey='test' items={items} />);
    const timelineItems = screen.getAllByRole('slider');
    expect(timelineItems.length).toBe(30);
  });
});
