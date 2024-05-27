#!/bin/sh
until nc -z db 5432; do
  echo $DB_HOST-$DB_PORT
  echo "$(date) - waiting for postgres..."
  sleep 1
done

npm run typeorm migration:run
npm start