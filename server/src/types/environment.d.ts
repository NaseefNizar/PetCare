export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET_KEY: string;
      DB_URL: string;
      TWILIO_ACCOUNT_SID: string;
      TWILIO_AUTH_TOKEN: string;
      TWILIO_SERVICE_SID: string;

      CLOUD_NAME: string;
      API_KEY: string;
      API_SECRET: string;

      STRIPE_SECRET_KEY: string;
    }
  }
}
