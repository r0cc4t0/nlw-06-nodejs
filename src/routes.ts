import { Router } from 'express';
import CreateUserController from './controllers/CreateUserController';
import CreateTagController from './controllers/CreateTagController';

const routes = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

routes.post('/users', createUserController.handle);
routes.post('/tags', createTagController.handle);

export default routes;
