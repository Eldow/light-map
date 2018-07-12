import StatisticsModel from './model';

const getStatistics = async () => {
  const statistics = await StatisticsModel.aggregate([
    {
      $project: {
        'fields.c_ens_moy': 1,
        category: {
          $switch: {
            branches: [
              { case: { $lte: ['$fields.c_ens_moy', 700] }, then: 'Moins de 700 Kwh/m²/an' },
              { case: { $and: [{ $gt: ['$fields.c_ens_moy', 700] }, { $lt: ['$fields.c_ens_moy', 800] }] }, then: 'De 700 à 800 Kwh/m²/an' },
              { case: { $and: [{ $gt: ['$fields.c_ens_moy', 800] }, { $lt: ['$fields.c_ens_moy', 900] }] }, then: 'De 800 à 900 Kwh/m²/an' },
              { case: { $and: [{ $gt: ['$fields.c_ens_moy', 900] }, { $lt: ['$fields.c_ens_moy', 1000] }] }, then: 'De 900 à 1000 Kwh/m²/an' },
              { case: { $gte: ['$fields.c_ens_moy', 1000] }, then: 'Plus de 1000 Kwh/m²/an' }
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