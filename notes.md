Add stylist/salon phone number?
add stylist address if no salon.

npx heroku run knex migrate:up -a stylistfind-db
npx heroku run knex migrate:redo --verbose -a stylistfind-db

npx heroku run knex seed:run -a stylistfind-db


Access-Control-Allow-Origin: *?