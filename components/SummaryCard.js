import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export const SummaryCard = ({ title, subtitle, columns }) => {
  return (
    <Card>
      <CardContent>
        <Typography color='textSecondary' align='center' gutterBottom>
          {subtitle}
        </Typography>
        <Typography variant='h6' align='center' gutterBottom>
          {title}
        </Typography>
        <Grid container spacing={3}>
          {columns.map(({ heading, overline }) => (
            <Grid item align='center'>
              <Typography variant='h4' component='p'>
                {heading}
              </Typography>
              <Typography variant='overline' component='p'>
                {overline}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};
