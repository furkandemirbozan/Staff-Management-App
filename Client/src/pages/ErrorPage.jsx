import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";

function ErrorPage() {
  return (
    <Container maxWidth="lg" style={{ textAlign: "center", marginTop: "50px" }}>
      <img
        src="https://www.shutterstock.com/shutterstock/photos/2461723761/display_1500/stock-vector-error-page-not-found-security-service-warning-message-tiny-people-study-question-mark-inside-2461723761.jpg"
        alt="Error Illustration"
        style={{ display: "block", margin: "0 auto", maxWidth: "600px", width: "100%" }}
      />
      <Typography variant="h1" component="h1" gutterBottom style={{ fontWeight: "bold" }}>
        Oops!
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        We can't seem to find the page you're looking for.
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Error code: 404
      </Typography>
      <Grid container spacing={2} justifyContent="center" style={{ marginTop: "20px" }}>
        <Grid item>
          <Button variant="contained" color="primary" href="/">
            Home
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" href="https://kolayik.com/?utm_source=google&utm_medium=cpc&utm_campaign=boostroas_pure_brand&utm_ad_group=exact&gad_source=1&gclid=CjwKCAjwoJa2BhBPEiwA0l0ImKefHfDWuwZWt4SsWTtalEX9ucFCyFP7izXWUsSGNju2_sUU-rgXORoCYnAQAvD_BwE">
            Search
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ErrorPage;
