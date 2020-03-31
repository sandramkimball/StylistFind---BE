
npx heroku run knex migrate:list -a stylistfind-db

npx heroku run knex migrate:rollback -a stylistfind-db

npx heroku run knex migrate:redo --verbose -a stylistfind-db

npx heroku run knex migrate:up -a stylistfind-db

npx heroku run knex migrate:latest -a stylistfind-db

npx heroku run knex seed:run -a stylistfind-db

npx heroku logs --tail -a stylistfind-db

npx heroku run knex rm 20191120152500_locations.js -a stylistfind-db
npx heroku run knex rm 20191120145922_stylists.js -a stylistfind-db


heroku run bash -a stylistfind-db

heroku restart -a stylistfind-db  
heroku pg:reset DATABASE -a stylistfind-db 
heroku run rake db:migrate -a stylistfind-db 
