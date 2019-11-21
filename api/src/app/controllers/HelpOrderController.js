import * as yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const { page } = req.query;
    const { student_id } = req.params;
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(401).json({ error: 'Aluno não encontrado!' });
    }

    const helpOrders = await HelpOrder.findAll({
      where: {
        student_id
      },
      attributes: ['id', 'question', 'answer', 'answer_at', 'created_at'],
      order: [['created_at', 'desc']],
      limit: 10,
      offset: ((page && page > 0 ? page : 1) - 1) * 10
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const { student_id } = req.params;
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(401).json({ error: 'Aluno não encontrado!' });
    }

    const schema = yup.object().shape({
      question: yup.string().required()
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    req.body.student_id = +student_id;

    const { id, question, created_at } = await HelpOrder.create(req.body);

    return res.json({
      id,
      question,
      created_at
    });
  }
}

export default new HelpOrderController();
