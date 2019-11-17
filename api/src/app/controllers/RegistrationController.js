import * as yup from 'yup';
import { startOfDay } from 'date-fns';
import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import RegistrationMail from '../jobs/RegistrationMail';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'age', 'weight', 'height']
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price']
        }
      ]
    });
    return res.json(registrations);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      student_id: yup
        .number()
        .integer()
        .positive()
        .required(),
      plan_id: yup
        .number()
        .integer()
        .positive()
        .required(),
      start_date: yup
        .date()
        .min(startOfDay(new Date()))
        .required()
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const { student_id, plan_id } = req.body;

    /**
     * Check if student exists
     */
    const student = await Student.findByPk(student_id, {
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height']
    });
    if (!student) {
      return res.status(401).json({ error: 'Student does not exists' });
    }

    /**
     * Check if plan exists
     */
    const plan = await Plan.findByPk(plan_id, {
      attributes: ['id', 'title', 'duration', 'price']
    });
    if (!plan) {
      return res.status(401).json({ error: 'Plan does not exists' });
    }

    /**
     * Add registration
     */
    const { id, start_date, end_date, price } = await Registration.create(
      req.body
    );

    /**
     * Send mail to student
     */
    Queue.add(RegistrationMail.key, {
      student,
      plan,
      start_date,
      end_date
    });

    return res.json({
      id,
      student,
      plan,
      start_date,
      end_date,
      price
    });
  }

  async update(req, res) {
    const schema = yup.object().shape({
      student_id: yup
        .number()
        .integer()
        .positive(),
      plan_id: yup
        .number()
        .integer()
        .positive(),
      start_date: yup.date().min(startOfDay(new Date()))
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    /**
     * Get registration by id
     */
    const { id } = req.params;
    const registration = await Registration.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'age', 'weight', 'height']
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price']
        }
      ]
    });
    if (!registration) {
      return res.status(400).json({ error: 'Registration not found' });
    }

    const { student_id: studentId, plan_id: planId } = req.body;

    /**
     * Check if student exists
     */
    let studentExists = null;
    if (studentId) {
      studentExists = await Student.findByPk(studentId, {
        attributes: ['id', 'name', 'email', 'age', 'weight', 'height']
      });
      if (!studentExists) {
        return res.status(401).json({ error: 'Student does not exists' });
      }
    }

    /**
     * Check if plan exists
     */
    let planExists = null;
    if (planId) {
      planExists = await Plan.findByPk(planId, {
        attributes: ['id', 'title', 'duration', 'price']
      });
      if (!planExists) {
        return res.status(401).json({ error: 'Plan does not exists' });
      }
    }

    /**
     * Update registration
     */
    const {
      student,
      plan,
      start_date,
      end_date,
      price
    } = await registration.update(req.body, { returning: true });

    return res.json({
      id: +id,
      student: studentExists || student,
      plan: planExists || plan,
      start_date,
      end_date,
      price
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const registration = await Registration.findByPk(id);
    if (!registration) {
      return res.status(400).json({ error: 'Registration not found' });
    }

    await registration.destroy();

    return res.status(200).send();
  }
}

export default new RegistrationController();
