# Configuration

## Server
   - `port`:  Port that the nodejs server will be listening to.
   - `installed`: Changes to true once you open the website for the first time. Do not change it manually unless you really know what you are doing.

## Database
  - `name`:  Name of the database schema, leave blank if using Atlas.
  - `driver`:  `mongodb` for local databases, `mongodb+srv` for Atlas.
  - `host`:  Local IP of the server, or everything after `@` in Atlas connection string.
  - `port`:  Port that the database is running in, leave blank if using Atlas.
  - `username`: Database username.
  - `password`:  Database password.
