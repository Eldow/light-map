import StatisticsModel from './model';
import { CATEGORIES } from './constants';

const getStatistics = async () => {
  return await StatisticsModel.aggregate([
    {
      $project: {
        'fields.c_ens_moy': 1,
        category: {
          $switch: {
            branches: [
              { case: { $lte: ['$fields.c_ens_moy', 700] }, then: { key: CATEGORIES.LT_700, index: 1 }},
              { case: { $and: [{ $gt: ['$fields.c_ens_moy', 700] }, { $lt: ['$fields.c_ens_moy', 800] }] }, then: { key: CATEGORIES.BT_700_800, index: 2 }},
              { case: { $and: [{ $gt: ['$fields.c_ens_moy', 800] }, { $lt: ['$fields.c_ens_moy', 900] }] }, then: { key: CATEGORIES.BT_800_900, index: 3 }},
              { case: { $and: [{ $gt: ['$fields.c_ens_moy', 900] }, { $lt: ['$fields.c_ens_moy', 1000] }] }, then: { key: CATEGORIES.BT_900_1000, index: 4 }},
              { case: { $gte: ['$fields.c_ens_moy', 1000] }, then: { key: CATEGORIES.GT_1000, index: 5 }}
            ],
            default: 'No match'
          }
        }
      }
    },
    {
      $group: {
        _id: '$category',
        sum: { $sum: '$fields.c_ens_moy' },
        avg: { $avg: '$fields.c_ens_moy' },
        count: { $sum: 1 }
      }
    },
    {
      $sort : {
        '_id.index': -1,
      }
    }
  ]);
};

export default {
  getStatistics,
}