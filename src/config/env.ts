export default {
  PORT: Number(process.env.PORT) || 8001,
  ENV: process.env.NODE_ENV || 'development',
  DB_CONNECTION_STRING: process.env.PG_STRING_CONNECTION || '',
  SECRET: process.env.SECRET || '' 
}