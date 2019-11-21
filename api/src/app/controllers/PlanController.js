import * as yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();
    return res.json(plans);
  }

  async show(req, res) {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ error: 'Plano não encontrado!' });
    }

    return res.json(plan);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      title: yup.string().required(),
      duration: yup
        .number()
        .required()
        .positive()
        .integer(),
      price: yup
        .number()
        .required()
        .positive()
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const planExists = await Plan.findOne({
      where: { title: req.body.title }
    });

    if (planExists) {
      return res
        .status(400)
        .json({ error: 'Já existe um plano com esse título!' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price
    });
  }

  async udpate(req, res) {
    const schema = yup.object().shape({
      title: yup.string(),
      duration: yup
        .number()
        .positive()
        .integer(),
      price: yup.number().positive()
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const { id } = req.params;
    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(400).json({ error: 'Plano não encontrado!' });
    }

    if (req.body.title) {
      const planExists = await Plan.findOne({
        where: { title: req.body.title }
      });
      if (planExists && planExists.id !== +id) {
        return res.status(400).json({
          error: `Plano com o título '${req.body.title}' já existe!`
        });
      }
    }

    const { title, duration, price } = await plan.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(400).json({ error: 'Plano não encontrado!' });
    }

    await plan.destroy();

    return res.status(200).send();
  }
}

export default new PlanController();
