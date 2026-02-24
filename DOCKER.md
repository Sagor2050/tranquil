# Docker Setup Guide for Tranquil

This guide will help you set up and run Tranquil using Docker and Docker Compose.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed
- Git installed

## Quick Start

### 1. Clone and Navigate to Project

```bash
git clone https://github.com/Sagor2050/tranquil.git
cd tranquil
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and update:

```env
# PostgreSQL Configuration
DB_PASSWORD=your_secure_password_here

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Firebase Configuration (optional for Docker)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
# ... other Firebase variables

# OpenAI Configuration (optional for Docker)
OPENAI_API_KEY=your_openai_api_key
```

### 3. Start the Application

```bash
docker-compose up --build
```

This command will:
- Build the Next.js application image
- Start a PostgreSQL 14 database container
- Create a network for the containers
- Initialize the database with migrations
- Start the web server

**First time setup may take 2-3 minutes.**

### 4. Access the Application

- **Web Application:** http://localhost:3000
- **PostgreSQL Database:** localhost:5432

### 5. Test Authentication

1. Go to http://localhost:3000/signup
2. Create a new account
3. You'll be redirected to the dashboard
4. Click logout to test the login page

## Common Docker Commands

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f postgres
```

### Stop Services

```bash
# Stop without removing
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove everything (including data!)
docker-compose down -v
```

### Restart Services

```bash
docker-compose restart

# Specific service
docker-compose restart app
docker-compose restart postgres
```

### Rebuild Images

```bash
# Rebuild and restart
docker-compose up --build

# Force rebuild
docker-compose build --no-cache
```

### Access Database

```bash
# Connect to PostgreSQL container
docker-compose exec postgres psql -U postgres -d tranquil_db

# Common psql commands:
# \dt              - List all tables
# \q               - Exit psql
# SELECT * FROM users;  - View users
```

### View Running Containers

```bash
docker-compose ps
```

### Clean Up Everything

```bash
# Remove containers, networks, and volumes
docker-compose down -v

# Remove unused images
docker image prune

# Remove all dangling volumes
docker volume prune
```

## Troubleshooting

### Database Connection Error

**Problem:** "Connection refused" error

**Solution:**
1. Make sure PostgreSQL container is running: `docker-compose ps`
2. Wait 10-15 seconds for PostgreSQL to initialize
3. Check environment variables in `.env.local`
4. Rebuild: `docker-compose down -v && docker-compose up --build`

### Port Already in Use

**Problem:** "Ports are not available" error

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Find process using port 5432
lsof -i :5432

# Kill the process or change ports in docker-compose.yml
```

### Out of Disk Space

**Problem:** Docker build fails due to disk space

**Solution:**
```bash
# Clean up unused containers, images, networks, and volumes
docker system prune -a --volumes
```

### Application Won't Start

**Problem:** Container keeps restarting or exiting

**Solution:**
```bash
# Check logs for errors
docker-compose logs -f app

# Verify Node modules installed correctly
docker-compose exec app npm install

# Rebuild from scratch
docker-compose down -v
docker-compose up --build
```

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `DB_USER` | PostgreSQL username | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | `securepassword123` |
| `DB_HOST` | Database hostname | `postgres` (docker service name) |
| `DB_PORT` | Database port | `5432` |
| `DB_NAME` | Database name | `tranquil_db` |
| `JWT_SECRET` | Secret for signing JWT tokens | `your-secret-key` |

## Production Deployment

For production deployments:

1. **Update `.env.local`** with production values
2. **Use a production database** (managed service like AWS RDS)
3. **Set strong JWT_SECRET** and other secrets
4. **Use Docker registry** (Docker Hub, ECR, etc.)
5. **Set resource limits** in docker-compose.yml

Example production settings:

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Guide](https://nextjs.org/docs/deployment/docker)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)

## Need Help?

If you encounter issues:

1. Check the logs: `docker-compose logs -f`
2. Review the troubleshooting section above
3. Check environment variables: `cat .env.local`
4. Try rebuilding: `docker-compose down -v && docker-compose up --build`
5. Ask in the team chat or create an issue on GitHub
