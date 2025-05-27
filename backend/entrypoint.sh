#!/bin/bash
set -e

echo "Applying migrations..."
python manage.py makemigrations
python manage.py migrate

echo "Creating superuser..."
python create_superuser.py

echo "Loading fixtures..."
python manage.py loaddata fixtures/users.json
python manage.py loaddata fixtures/products.json
python manage.py loaddata fixtures/audio_demos.json
python manage.py loaddata fixtures/screenshot_areas.json
python manage.py loaddata fixtures/licenses.json
python manage.py loaddata fixtures/orders.json
python manage.py loaddata fixtures/homepage.json

echo "Importing media..."
python import_media.py

echo "All done. Starting server..."
exec python manage.py runserver 0.0.0.0:8000
