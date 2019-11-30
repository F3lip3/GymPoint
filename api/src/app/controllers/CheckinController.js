import { Op } from 'sequelize';
import { startOfDay, subDays } from 'date-fns';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const PAGE_SIZE = 30;

    let { page } = req.query;
    // eslint-disable-next-line no-restricted-globals
    if (!page || isNaN(page) || page < 0) {
      page = 0;
    } else {
      page -= 1;
    }

    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(401).json({ error: 'Aluno não encontrado!' });
    }

    const { rows, count } = await Checkin.findAndCountAll({
      where: {
        student_id
      },
      attributes: ['created_at'],
      order: [['created_at', 'desc']],
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE
    });

    return res.json(
      rows.map((x, index) => ({
        date: x.created_at,
        index: count - page * PAGE_SIZE - index
      }))
    );
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
