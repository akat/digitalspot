#!/bin/sh
set -eu

runtime_dir=/var/lib/tiny-crm
database_file="${DB_DATABASE:-$runtime_dir/database.sqlite}"
mkdir -p "$runtime_dir"
touch "$database_file"
chown -R www-data:www-data "$runtime_dir"

if [ -z "${APP_KEY:-}" ]; then
  if [ -f "$runtime_dir/app.key" ]; then
    APP_KEY="$(cat "$runtime_dir/app.key")"
  else
    APP_KEY="$(php artisan key:generate --show)"
    printf '%s' "$APP_KEY" > "$runtime_dir/app.key"
    chmod 600 "$runtime_dir/app.key"
  fi
  export APP_KEY
fi

php artisan migrate --force
php artisan db:seed --class=WebsiteIntegrationAdminSeeder --force
php artisan config:cache

exec apache2-foreground
