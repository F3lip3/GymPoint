import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class HelpOrderAnswerMail {
  get key() {
    return 'HelpOrderAnswerMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;
    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: '[GymPoint] Pedido de Auxílio',
      template: 'helpOrderAnswer',
      context: {
        student: helpOrder.student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        answerAt: format(
          parseISO(helpOrder.answer_at),
          "dd 'de' MMMM 'de' yyyy' às 'HH:mm'h'",
          {
            locale: ptBR
          }
        )
      }
    });
  }
}

export default new HelpOrderAnswerMail();
