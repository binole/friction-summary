import { getCities } from '../../utils/data';

export default (req, res) => {
  const { query } = req;
  const cities = getCities(query);

  res.status(200).json(cities);
};
