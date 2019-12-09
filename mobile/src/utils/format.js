import {
  format,
  formatDistance,
  isToday,
  isYesterday,
  parseISO
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatTime = value => {
  let time = '';
  const date = parseISO(value);
  if (isToday(date)) {
    time = `hoje às ${format(date, 'HH')}h`;
  } else if (isYesterday(date)) {
    time = `ontem às ${format(date, 'HH')}h`;
  } else {
    time = formatDistance(date, new Date(), {
      addSuffix: true,
      locale: ptBR
    });
  }
  return time;
};
