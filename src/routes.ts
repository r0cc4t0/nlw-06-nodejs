import { Router } from 'express';
import AuthenticateUserController from './controllers/AuthenticateUserController';
import CreateUserController from './controllers/CreateUserController';
import CreateTagController from './controllers/CreateTagController';
import CreateComplimentController from './controllers/CreateComplimentController';
import ListComplimentsByUserSenderController from './controllers/ListComplimentsByUserSenderController';
import ListComplimentsByUserReceiverController from './controllers/ListComplimentsByUserReceiverController';
import ListTagsController from './controllers/ListTagsController';
import ensureAuthenticated from './middlewares/ensureAuthenticated';
import ensureAdmin from './middlewares/ensureAdmin';

const routes = Router();

const authenticateUserController = new AuthenticateUserController();
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const listComplimentsByUserSenderController = new ListComplimentsByUserSenderController();
const listComplimentsByUserReceiverController = new ListComplimentsByUserReceiverController();
const listTagsController = new ListTagsController();

routes.post('/users', createUserController.handle);
routes.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle);
routes.post('/login', authenticateUserController.handle);
routes.post('/compliments', ensureAuthenticated, createComplimentController.handle);

routes.get('/compliments/user_sender', ensureAuthenticated, listComplimentsByUserSenderController.handle);
routes.get('/compliments/user_receiver', ensureAuthenticated, listComplimentsByUserReceiverController.handle);
routes.get('/tags', ensureAuthenticated, listTagsController.handle);

export default routes;
