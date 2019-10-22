import Sequelize, { Model } from 'sequelize';
import { addMonths } from 'date-fns';

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.FLOAT
      },
      {
        sequelize
      }
    );

    this.addHook('beforeSave', async enrollment => {
      if (enrollment.start_date || enrollment.plan_id) {
        const plan = await sequelize.models.Plan.findByPk(enrollment.plan_id);
        enrollment.end_date = addMonths(enrollment.start_date, plan.duration);
        enrollment.price = plan.duration * plan.price;
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'student'
    });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Enrollment;
