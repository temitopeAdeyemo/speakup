#!/bin/bash

# wait for mongodb
echo "Waiting for postgres..."
while ! nc -z db 5432; do
  sleep 0.1
done

npm run dev
