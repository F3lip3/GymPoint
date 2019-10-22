import * as yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import HelpOrderAnswerMail from '../jobs/HelpOrderAnswerMail';

class HelpOrderAnswerController {
  async index(req, res) {
    const { page } = req.query;
    const helpOrders = await HelpOrder.findAll({
      where: {
        answer: null
      },
      attributes: ['id', 'question', 'created_at'],
      order: ['created_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'age', 'weight', 'height']
        }
      ],
      limit: 10,
      offset: ((page || 1) - 1) * 10
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const { id } = req.params;
    const helpOrder = await HelpOrder.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'age', 'weight', 'height']
        }
      ]
    });
    if (!helpOrder) {
      return res.status(404).json({ error: 'Help order not found' });
    }
    if (helpOrder.answer) {
      return res.status(401).json({ error: 'Help order already answered' });
    }

    const schema = yup.object().shape({
      answer: yup.string().required()
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    req.body.answer_at = new Date();

    const {
      student,
      question,
      answer,
      answer_at,
      created_at
    } = await helpOrder.update(req.body);

    /**
     * Send mail to student
     */
    Queue.add(HelpOrderAnswerMail.key, {
      helpOrder
    });

    return res.json({
      id,
      student,
      question,
      answer,
      answer_at,
      created_at
    });
  }
}

export default new HelpOrderAnswerController();
