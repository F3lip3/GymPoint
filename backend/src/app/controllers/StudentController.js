import * as yup from 'yup';
import { Op } from 'sequelize';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { q } = req.query;

    const students = q
      ? await Student.findAll({
          where: {
            [Op.or]: [
              {
                name: { [Op.iLike]: `%${q}%` }
              },
              {
                email: { [Op.iLike]: `%${q}%` }
              }
            ]
          }
        })
      : await Student.findAll();

    return res.json(students);
  }

  async show(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: 'Aluno não encontrado!' });
    }

    return res.json(student);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      age: yup
        .number()
        .required()
        .positive()
        .integer(),
      weight: yup
        .number()
        .required()
        .positive()
        .integer(),
      height: yup
        .number()
        .required()
        .positive()
        .integer()
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email }
    });

    if (studentExists) {
      return res
        .status(400)
        .json({ error: 'Já existe um aluno com esse e-mail!' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height
    });
  }

  async udpate(req, res) {
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      age: yup
        .number()
        .positive()
        .integer(),
      weight: yup
        .number()
        .positive()
        .integer(),
      height: yup
        .number()
        .positive()
        .integer()
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: 'Aluno não encontrado!' });
    }

    if (req.body.email) {
      const studentExists = await Student.findOne({
        where: { email: req.body.email }
      });
      if (studentExists && studentExists.id !== +id) {
        return res.status(400).json({ error: 'E-mail indisponível' });
      }
    }

    const { name, email, age, weight, height } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: 'Aluno não encontrado!' });
    }

    await student.destroy();

    return res.status(200).send();
  }
}

export default new StudentController();
