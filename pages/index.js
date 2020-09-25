import Head from 'next/head';
import axios from 'axios';
import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { DataGrid } from '@material-ui/data-grid';

import { SummaryCard } from '../components/SummaryCard';

export default function Home({ cities, summary }) {
  const columns = [
    { field: 'name', headerName: 'City', width: 120 },
    {
      field: 'seriousCount',
      headerName: 'Number of serious series',
      type: 'number',
      width: 240,
    },
    {
      field: 'totalSeriousDuration',
      headerName: 'Total serious duration (hours)',
      type: 'number',
      width: 240,
    },
  ];

  return (
    <Container>
      <Head>
        <title>Friction Summary</title>
      </Head>
      <div style={{ marginTop: 56 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Friction Summary
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <SummaryCard
              subtitle='The most serious series city'
              title={summary.theMostSeriousCountCity.name}
              columns={[
                {
                  heading: summary.theMostSeriousCountCity.seriousCount,
                  overline: 'serious series',
                },
                {
                  heading: summary.theMostSeriousCountCity.totalSeriousDuration.toFixed(),
                  overline: 'serious hours',
                },
              ]}
            />
          </Grid>

          <Grid item xs={3}>
            <SummaryCard
              subtitle='The most serious duration city'
              title={summary.theMostSeriousDurationCity.name}
              columns={[
                {
                  heading: summary.theMostSeriousDurationCity.seriousCount,
                  overline: 'serious series',
                },
                {
                  heading: summary.theMostSeriousDurationCity.totalSeriousDuration.toFixed(),
                  overline: 'serious hours',
                },
              ]}
            />
          </Grid>

          <Grid item xs={3}>
            <SummaryCard
              subtitle='The most serious series station'
              title={`${summary.theMostSeriousCountStation.name} (${summary.theMostSeriousCountStation.city})`}
              columns={[
                {
                  heading: summary.theMostSeriousCountStation.seriousCount,
                  overline: 'serious series',
                },
                {
                  heading: summary.theMostSeriousCountStation.totalSeriousDuration.toFixed(),
                  overline: 'serious hours',
                },
              ]}
            />
          </Grid>
          <Grid item xs={3}>
            <SummaryCard
              subtitle='The most serious duration station'
              title={`${summary.theMostSeriousDurationStation.name} (${summary.theMostSeriousDurationStation.city})`}
              columns={[
                {
                  heading: summary.theMostSeriousDurationStation.seriousCount,
                  overline: 'serious series',
                },
                {
                  heading: summary.theMostSeriousDurationStation.totalSeriousDuration.toFixed(),
                  overline: 'serious hours',
                },
              ]}
            />
          </Grid>
        </Grid>

        <div style={{ minHeight: 400, width: '100%', marginTop: 40 }}>
          <DataGrid columns={columns} rows={cities} />
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const [cities, summary] = await Promise.all([
    axios.get('http://localhost:3000/api/cities'),
    axios.get('http://localhost:3000/api/summary'),
  ]);

  return {
    props: {
      cities: cities.data,
      summary: summary.data,
    },
  };
}
