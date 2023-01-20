import * as React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';



export default function Home() {
  return (
    <>
      <nav>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={6}>
            <NavLink to={'/users'}> Users </NavLink>
          </Grid>
          <Grid item xs={6}>
            <NavLink to={'/map'}> Map </NavLink>
          </Grid>
        </Grid>

      </nav>
      <Outlet />
    </>
  );
}
