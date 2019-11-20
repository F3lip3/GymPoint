import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import CheckinController from './app/controllers/CheckinController';
import RegistrationController from './app/controllers/RegistrationController';
import HelpOrderController from './app/controllers/HelpOrderController';
import PlanController from './app/controllers/PlanController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import HelpOrderAnswerController from './app/controllers/HelpOrderAnswerController';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.get('/students/:student_id/checkins', CheckinController.index);
routes.post('/students/:student_id/checkins', CheckinController.store);
routes.get('/students/:student_id/help-orders', HelpOrderController.index);
routes.post('/students/:student_id/help-orders', HelpOrderController.store);

routes.use(authMiddleware);
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.udpate);
routes.delete('/students/:id', StudentController.delete);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.udpate);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/registrations', RegistrationController.index);
routes.post('/registrations', RegistrationController.store);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

routes.get('/help-orders', HelpOrderAnswerController.index);
routes.post('/help-orders/:id/answer', HelpOrderAnswerController.store);

export default routes;
