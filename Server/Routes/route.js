import express from 'express';
import { imageController } from '../controller/image-controller.js';


const routes = express.Router();

routes.get('/addEmployee', imageController);


export default routes;