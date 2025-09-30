# ===========================
#  Node Builder (React/Inertia)
# ===========================
FROM node:18 AS node-builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy and build React/Inertia assets
COPY . .
RUN npm run build


# ===========================
#  PHP Builder (Composer)
# ===========================
FROM composer:2 AS composer-builder
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction


# ===========================
#  Final PHP Runtime
# ===========================
FROM php:8.2-fpm AS app

# Install system dependencies & PHP extensions
RUN apt-get update && apt-get install -y \
    libzip-dev unzip git curl default-mysql-client \
    && docker-php-ext-install pdo pdo_mysql zip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy app code
COPY . .

# Copy built assets from Node
COPY --from=node-builder /app/public /app/public

# Copy vendor from Composer
COPY --from=composer-builder /app/vendor /app/vendor

# Prepare Laravel storage & cache
RUN mkdir -p storage/framework/{sessions,views,cache} bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Clear & rebuild Laravel caches (don’t fail build if package missing)
RUN php artisan config:clear || true \
    && php artisan config:cache || true \
    && php artisan route:cache || true \
    && php artisan view:cache || true

# Expose port for Laravel (you’ll run php-fpm behind nginx usually)
EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
