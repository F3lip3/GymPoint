import { parseISO, format, isDate } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

export const formatDate = (date, mask = "dd 'de' MMMM 'de' yyyy") => {
  const validDate = isDate(date) ? date : parseISO(date);
  return format(validDate, mask, {
    locale: ptBR
  });
};
