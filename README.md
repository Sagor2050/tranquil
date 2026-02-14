# Tranquil 🧘‍♀️

A wellness platform for students to manage mental health and well-being. Built with Next.js, TypeScript, PostgreSQL, and Docker.

## 📖 About

Tranquil helps students track their wellness journey through journaling, mood tracking, and AI-powered support. Built by students, for students.

**Tech Stack:** Next.js 14 • TypeScript • PostgreSQL • Prisma • Docker • Tailwind CSS

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/Sagor2050/tranquil.git
cd tranquil

# Copy environment variables
cp .env.example .env

# Start PostgreSQL with Docker
docker-compose up -d

# Install dependencies
npm install

# Setup database
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and create an account at `/signup`

## 💻 Daily Development

**Start working:**
```bash
docker-compose up -d
npm run dev
```

**Stop working:**
```bash
docker-compose down
```

## 🤝 Contributing

### Contribution Workflow

1. **Pull latest changes**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes and test**
   ```bash
   npm run dev    # Test locally
   npm run build  # Check for errors
   ```

4. **Commit with conventional format**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```
   
   Format: `feat:` `fix:` `docs:` `style:` `refactor:`

5. **Push and create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Docker Collaboration

**Why Docker?**
Docker ensures all 5-6 team members work with identical database environments. Everyone uses PostgreSQL 16-alpine running on port 5432 with the same credentials. No manual installation needed—just `docker-compose up -d` and you're ready to code.

**When you modify database schema:**

Someone on the team updates the database structure (adds a new table, column, etc.):

1. Update `prisma/schema.prisma` with your changes
2. Create a migration to track the change:
   ```bash
   npx prisma migrate dev --name your_change
   ```
   This generates SQL files in `prisma/migrations/` that describe the change.
3. **Commit both** `schema.prisma` and the new migration files to Git
4. Other team members sync by running:
   ```bash
   git pull                      # Get latest code including migrations
   npx prisma migrate dev        # Apply new migrations to their local DB
   ```

**Why this works:** Prisma migrations are version-controlled, so everyone's database evolves together. No manual SQL scripts to share!

**To share test data:**

Need everyone to have the same sample users, posts, or other data for testing?

1. Add INSERT statements to `docker/postgres/init.sql`:
   ```sql
   INSERT INTO "User" (id, email, password) VALUES 
     ('test-1', 'student@test.com', 'hashed_password_here');
   ```
2. Commit `init.sql` to Git
3. Team members get fresh data by rebuilding:
   ```bash
   docker-compose down -v        # Stop container and delete old data
   docker-compose up -d          # Start fresh with init.sql data
   npx prisma migrate dev        # Apply schema
   ```

**Why this works:** `init.sql` runs automatically when PostgreSQL container is created. Destroying the volume (`-v`) forces a fresh start.

### Useful Commands

```bash
npx prisma studio              # View/edit database (localhost:5555)
docker-compose ps              # Check if PostgreSQL is running
docker-compose logs -f postgres # View PostgreSQL logs
```

## 🐛 Troubleshooting

**Port 5432 in use:** `docker-compose down` or `lsof -ti:5432 | xargs kill -9`  
**Database errors:** `docker-compose down && docker-compose up -d`  
**Schema mismatch:** `npx prisma migrate dev`  
**Node issues:** `rm -rf node_modules package-lock.json && npm install`

## 👥 Team

Eileen Lojano • Faraibe Khan • Nuzat Khan • Sagor S. Dhor • Madiha

---

**Built with 💙 for student wellness**