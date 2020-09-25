import Head from 'next/head';
import axios from 'axios';
import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';

export default function Home({ cities }) {
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
        <div style={{ minHeight: 400, width: '100%' }}>
          <DataGrid columns={columns} rows={cities} />
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const res = await axios.get('http://localhost:3000/api/cities');

  const cities = res.data;

  return {
    props: {
      cities,
    },
  };
}
