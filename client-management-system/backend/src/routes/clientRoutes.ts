import express from 'express';
import * as clientController from '../controllers/clientController';
import { getLanguages, getFundingSources } from '../controllers/referenceDataController';

const router = express.Router();

router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getClientById);
router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

router.get('/reference/languages', getLanguages);
router.get('/reference/funding-sources', getFundingSources);

export default router;