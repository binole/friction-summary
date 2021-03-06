import _ from 'lodash';
import data from '../data/friction.json';

const defaultValues = {
  cities: { allIds: [], byId: {} },
  stations: { allIds: [], byId: {} },
  series: { allIds: [], byId: {} },
};

const serializedData = data.reduce((o, serie, id) => {
  const city = serie['Mulnicipality'];
  const station = serie['Station'];
  const status = serie['Series Status'];
  const belowStandardDuration = serie['Below Standard Duration'];

  return {
    ...o,
    cities: {
      allIds: o.cities.byId[city]
        ? o.cities.allIds
        : [...o.cities.allIds, city],
      byId: {
        ...o.cities.byId,
        [city]: {
          name: city,
          stations: [
            ...new Set([...(o.cities.byId[city]?.stations ?? []), station]),
          ],
        },
      },
    },
    stations: {
      allIds: o.stations.byId[station]
        ? o.stations.allIds
        : [...o.stations.allIds, station],
      byId: {
        ...o.stations.byId,
        [station]: {
          name: station,
          city,
          series: [
            ...new Set([...(o.stations.byId[station]?.series ?? []), id]),
          ],
        },
      },
    },
    series: {
      allIds: o.series.byId[id] ? o.series.allIds : [...o.series.allIds, id],
      byId: {
        ...o.series.byId,
        [id]: {
          id,
          status,
          belowStandardDuration,
        },
      },
    },
  };
}, defaultValues);

export default serializedData;

export function getCities({ sort = 'totalSeriousDuration' }) {
  const cities = serializedData.cities.allIds.map((city) => {
    const stations = serializedData.cities.byId[city].stations.map(
      (stationId) => {
        const station = serializedData.stations.byId[stationId];

        const series = station.series.map((serieId) => {
          return serializedData.series.byId[serieId];
        });

        const seriousSeries = series.filter(
          ({ status }) => status === 'Serious'
        );

        const totalSeriousDuration = _.sumBy(
          seriousSeries,
          'belowStandardDuration'
        );

        return {
          id: stationId,
          seriousCount: seriousSeries.length,
          totalSeriousDuration,
        };
      }
    );

    return {
      id: city,
      name: city,
      seriousCount: _.sumBy(stations, 'seriousCount'),
      totalSeriousDuration: _.sumBy(stations, 'totalSeriousDuration'),
      stationsIds: serializedData.cities.byId[city].stations,
      stations,
    };
  });

  return _.sortBy(cities, sort).reverse();
}

export function getStations({
  sort = 'totalSeriousDuration',
  limit = undefined,
} = {}) {
  const stations = serializedData.stations.allIds.map((stationId) => {
    const station = serializedData.stations.byId[stationId];
    const series = station.series.map((serieId) => {
      return serializedData.series.byId[serieId];
    });

    const seriousSeries = series.filter(({ status }) => status === 'Serious');

    return {
      id: stationId,
      name: stationId,
      city: station.city,
      seriousCount: seriousSeries.length,
      totalSeriousDuration: _.sumBy(series, 'belowStandardDuration'),
    };
  });

  return _.sortBy(stations, sort)
    .reverse()
    .slice(0, limit ?? stations.length);
}

export function getSummary() {
  const theMostSeriousCountCity = getCities({ sort: 'seriousCount' })[0];
  const theMostSeriousDurationCity = getCities({
    sort: 'totalSeriousDuration',
  })[0];

  const theMostSeriousCountStation = getStations({ sort: 'seriousCount' })[0];
  const theMostSeriousDurationStation = getStations({
    sort: 'totalSeriousDuration',
  })[0];

  const topSeriousStations = getStations({
    sort: 'seriousCount',
    limit: 10,
  });

  return {
    theMostSeriousCountCity,
    theMostSeriousDurationCity,
    theMostSeriousCountStation,
    theMostSeriousDurationStation,
    topSeriousStations,
  };
}
