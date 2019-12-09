import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { student, plan, start_date, end_date } = data;
    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: '[GymPoint] Matrícula',
      template: 'registration',
      context: {
        student: student.name,
        plan: plan.title,
        duration: plan.duration,
        price: plan.price,
        startDate: format(parseISO(start_date), "dd 'de' MMMM 'de' yyyy", {
          locale: ptBR
        }),
        endDate: format(parseISO(end_date), "dd 'de' MMMM 'de' yyyy", {
          locale: ptBR
        })
      }
    });
  }
}

export default new RegistrationMail();
