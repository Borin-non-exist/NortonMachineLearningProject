# ============================
# Stage 1: Build frontend (React + Inertia)
# ============================
FROM node:22 AS node-builder

WORKDIR /app

# Install Node dependencies
COPY package*.json ./
RUN npm install

# Copy full project and build assets
COPY . .
RUN npm run build


# ============================
# Stage 2: Laravel (PHP + Composer + MySQL)
# ============================
FROM dunglas/frankenphp:php8.2.29-bookworm

# Install PHP extensions and MySQL client
RUN apt-get update && apt-get install -y \
    libzip-dev unzip git curl \
    default-mysql-client \
    && docker-php-ext-install pdo pdo_mysql zip \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Copy built frontend assets from Node stage
COPY --from=node-builder /app/public /app/public

# Prepare Laravel cache & storage
RUN mkdir -p storage/framework/{sessions,views,cache} bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Expose port for Railway
EXPOSE 8080

# Start Laravel server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
