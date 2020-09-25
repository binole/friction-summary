import { getStations } from '../../utils/data';

export default (req, res) => {
  const { query } = req;
  const stations = getStations(query);

  res.status(200).json(stations);
};
