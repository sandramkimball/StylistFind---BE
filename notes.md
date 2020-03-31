
npx heroku run knex migrate:rollback -a stylistfind-db

npx heroku run knex migrate:redo --verbose -a stylistfind-db

npx heroku run knex migrate:up -a stylistfind-db

npx heroku run knex seed:run -a stylistfind-db

rm ./database/migrations/20191120145922_stylists.js

npx heroku run knex rm 20191120152500_locations.js -a stylistfind-db

heroku run bash -a stylistfind-db


npx heroku logs --tail -a stylistfind-db
