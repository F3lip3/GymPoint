import { Op } from 'sequelize';
import { startOfDay, subDays } from 'date-fns';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { page } = req.query;
    const { student_id } = req.params;
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(401).json({ error: 'Aluno não encontrado!' });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id
      },
      attributes: ['created_at'],
      order: [['created_at', 'desc']],
      limit: 10,
      offset: ((page && page > 0 ? page : 1) - 1) * 10
    });

    return res.json(checkins.map(x => x.created_at));
  }

  async store(req, res) {
    const { student_id } = req.params;
    const student = await Student.findByPk(student_id, {
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height']
    });
    if (!student) {
      return res.status(401).json({ error: 'Aluno não encontrado!' });
    }

    /**
     * Check the number of checkins in the last 7 days
     * is lower than 5 checkins
     */
    const numberOfCheckins = await Checkin.count({
      distinct: false,
      where: {
        student_id,
        created_at: {
          [Op.gte]: subDays(startOfDay(new Date()), 7)
        }
      }
    });
    if (numberOfCheckins >= 15) {
      return res.status(401).json({
        error: 'Número máximo de 5 checkins nos últimos 7 dias atingido!'
      });
    }

    const { id, created_at } = await Checkin.create(req.params);

    return res.json({
      id,
      student,
      created_at
    });
  }
}

export default new CheckinController();
