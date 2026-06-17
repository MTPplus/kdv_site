#!/bin/bash
# Watchdog: keeps the Django dev server running on port 8001.
# Restarts it if it dies. Used in the dvkran admin mini-service.
cd /home/z/my-project/mini-services/django-admin

while true; do
  if ! pgrep -f "manage.py runserver 0.0.0.0:8001" > /dev/null; then
    echo "[$(date)] Starting Django..."
    python3 -u manage.py runserver 0.0.0.0:8001 --noreload >> django.log 2>&1 &
    echo "[$(date)] Started PID $!"
  fi
  sleep 5
done
