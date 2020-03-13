module.exports = {
  server: {
    port: 3001, // Port that the nodejs server will be listening to
  },
  database: {
    name: 'freehelperchat', // Name of the database schema, leave blank if using Atlas
    driver: 'mongodb', // 'mongodb' for local databases, 'mongodb+srv' for Atlas
    host: '127.0.0.1', // Local IP of the server, or everything after '@' in Atlas connection string
    port: '27017', // Local port of the database, leave blank if using Atlas
    username: '', // Database username
    password: '', // Database password
  },
};
