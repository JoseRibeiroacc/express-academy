Install 

npm install

Create .env file

Port - 3001
DATABASE_URL = your_pg_connection_key
JWT_SECRET = your_jtw_key

Run Migrations

npx prisma migrate dev

Run Server

npm run dev

For Dev

node --watch index.js


