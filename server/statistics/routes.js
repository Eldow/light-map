import express from 'express';
import StatisticsController from './controller';
const router = express.Router();

router.get('/', StatisticsController.getStatistics);

export default router;