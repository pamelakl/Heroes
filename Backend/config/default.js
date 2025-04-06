module.exports={
    production: process.env.NODE_ENV === 'production',
    port: process.env.PORT,
    mongoDBUrl: process.env.MONGODB_URL
}