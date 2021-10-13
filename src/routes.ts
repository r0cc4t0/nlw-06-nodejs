import { Router } from 'express';
import CreateUserController from './controllers/CreateUserController';
import CreateTagController from './controllers/CreateTagController';
import AuthenticateUserController from './controllers/AuthenticateUserController';
import ensureAdmin from './middlewares/ensureAdmin';

const routes = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();

routes.post('/users', createUserController.handle);
routes.post('/tags', ensureAdmin, createTagController.handle);
routes.post('/login', authenticateUserController.handle);

export default routes;
