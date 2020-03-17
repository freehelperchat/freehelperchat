{
  "server": {
    "port":  Port that the nodejs server will be listening to
  },
  "database": {
    "name":  Name of the database schema, leave blank if using Atlas
    "driver":  'mongodb' for local databases, 'mongodb+srv' for Atlas
    "host":  Local IP of the server, or everything after '@' in Atlas connection string
    "port":  Port that the nodejs server will be listening to,
    "username": Database username
    "password":  Database password
  }
}
