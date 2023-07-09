export default () => ({
  currencyLayerConfig:{
    baseUrlHttps: process.env.BASE_URL_HTTPS,
    historicalEndpoint: process.env.HISTORICAL_ENDPOINT,
    apiKey: process.env.API_KEY,
  },
});
