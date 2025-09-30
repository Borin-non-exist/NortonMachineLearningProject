# Use PHP base image with FPM + Composer
FROM dunglas/frankenphp:php8.2.29-bookworm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev unzip git \
    default-mysql-client \
    && docker-php-ext-install pdo pdo_mysql zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Install Node dependencies and build assets
RUN npm install && npm run build

# Cache Laravel config, routes, views
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Expose Laravel port
EXPOSE 8080

# Run Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
