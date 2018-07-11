import StatisticsService from './service';

const getStatistics = async(req, res) => {
  try {
    const statistics = await StatisticsService.getStatistics();
    return res.status(200).json({ statistics });
  }
  catch(err) { 
    res.status(400).send(err)
  }
}

export default {
  getStatistics,
}