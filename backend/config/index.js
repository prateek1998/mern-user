module.exports = {
  DB: {
    uri: process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 
    'mongodb://localhost:27017/merndev',
    options: {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true},
    // Enable mongoose debug mode
    debug: false
  },
  env: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,  
}