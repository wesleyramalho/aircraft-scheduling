import React, { useMemo } from 'react';
import { Dates, Label } from './styles';

interface Props {
  hoursBetween?: number;
  transparentLabel?: boolean
}

export const DatesList = ({ hoursBetween = 2, transparentLabel = false }: Props) => {
  const hours = useMemo(() => {
    const start = new Date(0, 0, 0, 0, 0, 0);
    const end = new Date(0, 0, 1, 0, 0, 0);
    const hoursArr = [];

    for (let i = start; i < end; i.setHours(i.getHours() + hoursBetween)) {
      const time = i.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      hoursArr.push(time);
    }

    hoursArr.push('23:59');
    return hoursArr;
  }, [hoursBetween]);

  return (
    <Dates>
      {hours.map((hour, index) => (
        <Label transparentLabel={transparentLabel} role="hour" key={index}>{hour}</Label>
      ))}
    </Dates>
  );
};

export default DatesList;
