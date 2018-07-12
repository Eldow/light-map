import StatisticsModel from './model';
import axios from 'axios';

const fetchAndInsertStats = async() => {
  const req = await axios.get('https://public.opendatasoft.com/api/records/1.0/search/?dataset=potentiel-gisement-solaire-brut-au-bati');
  
  return StatisticsModel.insertMany(req.data.records, { ordered: false });
};

export default fetchAndInsertStats;

