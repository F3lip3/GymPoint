import Sequelize, { Model } from 'sequelize';
import { addMonths, isBefore, isAfter } from 'date-fns';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.FLOAT,
        active: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, [
            'start_date',
            'end_date'
          ]),
          get() {
            return (
              isBefore(this.get('start_date'), new Date()) &&
              isAfter(this.get('end_date'), new Date())
            );
          }
        }
      },
      {
        sequelize
      }
    );

    this.addHook('beforeSave', async registration => {
      if (registration.start_date || registration.plan_id) {
        const plan = await sequelize.models.Plan.findByPk(registration.plan_id);
        registration.end_date = addMonths(
          registration.start_date,
          plan.duration
        );
        registration.price = plan.duration * plan.price;
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

export default Registration;
