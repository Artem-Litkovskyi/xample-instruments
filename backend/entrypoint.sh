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

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "All done. Starting server..."
if [ "$DJANGO_DEV" = "1" ]; then
    echo "Running in Development Mode (runserver)"
    exec python manage.py runserver 0.0.0.0:${PORT:-8000}
else
    echo "Running in Production Mode (gunicorn)"
    exec gunicorn backend.wsgi:application --bind 0.0.0.0:${PORT:-8000}
fi

exec "$@"