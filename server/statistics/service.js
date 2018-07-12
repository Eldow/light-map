import StatisticsModel from './model';

const getStatistics = async () => {
  console.log('get stat')
  const statistics = await StatisticsModel.aggregate([
    {
      $project: {
        'fields.c_ens_moy': 1,
        category: {
          $switch: {
            branches: [
              { case: { $lte: ['$fields.c_ens_moy', 700] }, then: 1 },
              { case: { $and: [{ $gt: ['$fields.c_ens_moy', 700] }, { $lt: ['$fields.c_ens_moy', 800] }] }, then: 2 },
              { case: { $and: [{ $gt: ['$fields.c_ens_moy', 800] }, { $lt: ['$fields.c_ens_moy', 900] }] }, then: 3 },
              { case: { $and: [{ $gt: ['$fields.c_ens_moy', 900] }, { $lt: ['$fields.c_ens_moy', 1000] }] }, then: 4 },
              { case: { $gte: ['$fields.c_ens_moy', 1000] }, then: 5 }
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
    { $sort: { _id: 1 } }
  ]);
  return statistics;
}

export default {
  getStatistics,
}