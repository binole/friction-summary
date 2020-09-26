import { getSummary, getCities } from '../../utils/data';

export default (req, res) => {
  const { query } = req;

  const summary = getSummary();
  const cities = getCities(query);

  res.status(200).json({ summary, cities });
};
