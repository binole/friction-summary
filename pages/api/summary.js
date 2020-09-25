import { getSummary } from '../../utils/data';

export default (req, res) => {
  const summary = getSummary();

  res.status(200).json(summary);
};
