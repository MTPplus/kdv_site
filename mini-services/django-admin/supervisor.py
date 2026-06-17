#!/usr/bin/env python3
"""
Persistent supervisor for the Django dev server.
Restarts Django if it crashes, never exits itself.
Run with: setsid python3 supervisor.py < /dev/null > /dev/null 2>&1 &
"""
import os
import signal
import subprocess
import sys
import time

DJANGO_DIR = '/home/z/my-project/mini-services/django-admin'
LOG_FILE = os.path.join(DJANGO_DIR, 'django.log')
PORT = 8001


def is_alive(proc):
    return proc is not None and proc.poll() is None


def start_django():
    log = open(LOG_FILE, 'a')
    proc = subprocess.Popen(
        ['python3', '-u', 'manage.py', 'runserver', f'0.0.0.0:{PORT}', '--noreload'],
        cwd=DJANGO_DIR,
        stdout=log,
        stderr=subprocess.STDOUT,
        stdin=subprocess.DEVNULL,
        # Detach from process group so we survive parent exit
        start_new_session=True,
    )
    return proc


def main():
    # Ignore SIGTERM/SIGHUP so we keep running even if the parent shell exits
    signal.signal(signal.SIGTERM, signal.SIG_IGN)
    signal.signal(signal.SIGHUP, signal.SIG_IGN)

    proc = None
    while True:
        if not is_alive(proc):
            print(f'[{time.strftime("%H:%M:%S")}] Starting Django on port {PORT}...', flush=True)
            proc = start_django()
            # Give it a moment to boot
            time.sleep(4)
        else:
            time.sleep(5)


if __name__ == '__main__':
    main()
