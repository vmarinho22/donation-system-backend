export default {
  PORT: Number(process.env.PORT) || 8001,
  URL: process.env.URL || 'http://localhost:8001',
  ENV: process.env.NODE_ENV || 'development',
  DB_CONNECTION_STRING: process.env.PG_STRING_CONNECTION || '',
  SECRET: process.env.SECRET || '',
  SMS: {
    KEY: process.env.VONAGE_API_KEY || '',
    SECRET: process.env.VONAGE_API_SECRET || '',
    FROM: process.env.VONAGE_API_SMS_FROM || 'Sistema de doação'
  }
}