import { Router } from 'express';
import AuthenticateUserController from './controllers/AuthenticateUserController';
import CreateUserController from './controllers/CreateUserController';
import CreateTagController from './controllers/CreateTagController';
import CreateComplimentController from './controllers/CreateComplimentController';
import ensureAdmin from './middlewares/ensureAdmin';

const routes = Router();

const authenticateUserController = new AuthenticateUserController();
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();

routes.post('/users', createUserController.handle);
routes.post('/tags', ensureAdmin, createTagController.handle);
routes.post('/login', authenticateUserController.handle);
routes.post('/compliments', createComplimentController.handle);

export default routes;
