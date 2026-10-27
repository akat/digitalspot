FROM node:22-bookworm-slim AS source

ARG TINY_CRM_REF
WORKDIR /source
RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates git \
    && git init \
    && git remote add origin https://github.com/frikishaan/tiny-crm.git \
    && git fetch --depth 1 origin "${TINY_CRM_REF}" \
    && git checkout FETCH_HEAD \
    && rm -rf /var/lib/apt/lists/*

FROM source AS assets
RUN npm install && npm run build && rm -rf node_modules

FROM php:8.3-apache

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates unzip libicu-dev libzip-dev libpng-dev libjpeg62-turbo-dev libfreetype6-dev libonig-dev libcurl4-openssl-dev libxml2-dev libsqlite3-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" bcmath curl dom gd intl mbstring pdo_sqlite xml zip \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer
COPY --from=assets /source /var/www/html
WORKDIR /var/www/html
COPY integration/website-leads.php /var/www/html/routes/website-leads.php
COPY integration/website-leads-config.php /var/www/html/config/website-leads.php
COPY integration/WebsiteIntegrationAdminSeeder.php /var/www/html/database/seeders/WebsiteIntegrationAdminSeeder.php
COPY integration/apache-vhost.conf /etc/apache2/sites-available/000-default.conf
COPY integration/entrypoint.sh /usr/local/bin/tiny-crm-entrypoint

RUN printf "\nrequire __DIR__.'/website-leads.php';\n" >> routes/api.php \
    && composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader \
    && chmod +x /usr/local/bin/tiny-crm-entrypoint \
    && chown -R www-data:www-data /var/www/html

VOLUME ["/var/lib/tiny-crm"]
EXPOSE 80
ENTRYPOINT ["tiny-crm-entrypoint"]
