# 📖 Setup Guide

Complete step-by-step instructions for setting up and running the Task Manager application.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Option 1: Docker Compose (Recommended)](#option-1-docker-compose-recommended)
- [Option 2: Local Development](#option-2-local-development)
- [GitHub Repository Setup](#github-repository-setup)
- [Docker Hub Setup (Optional)](#docker-hub-setup-optional)
- [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

### Required Software

1. **Git** - Version control
   - Download: https://git-scm.com/downloads
   - Verify: `git --version`

2. **Docker Desktop** - Container runtime
   - Download: https://www.docker.com/products/docker-desktop
   - Verify: `docker --version` and `docker-compose --version`
   - **Note**: Make sure Docker Desktop is running before proceeding

### Optional (for local development)

3. **Python 3.11+** - Backend development
   - Download: https://www.python.org/downloads/
   - Verify: `python --version`

4. **Node.js 18+** - Frontend development
   - Download: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

## 🚀 Option 1: Docker Compose (Recommended)

This is the fastest way to get the application running.

### Step 1: Clone the Repository

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Or if you haven't pushed to GitHub yet, you're already in the directory
```

### Step 2: Create Environment File

```bash
# On Windows
copy .env.example .env

# On Mac/Linux
cp .env.example .env
```

The default values in `.env.example` work fine for local development. You can leave them as is for now.

### Step 3: Build and Run

```bash
# Build and start all containers
docker-compose up --build

# Or run in detached mode (background)
docker-compose up -d --build
```

**What happens**:
- Downloads base images (first time only: ~5-10 minutes)
- Builds backend and frontend Docker images
- Starts both services
- Backend runs on http://localhost:8000
- Frontend runs on http://localhost

### Step 4: Access the Application

Open your browser and navigate to:

- **Frontend Application**: http://localhost
- **Backend API**: http://localhost:8000/api/tasks/
- **Admin Panel**: http://localhost:8000/admin/

### Step 5: Create Admin User (Optional)

To access the Django admin panel:

```bash
# Get into the backend container
docker-compose exec backend python manage.py createsuperuser

# Follow the prompts to create username/password
```

Then visit http://localhost:8000/admin/ and login.

### Step 6: Stop the Application

```bash
# Stop containers (keeps data)
docker-compose stop

# Stop and remove containers (clean slate)
docker-compose down

# Stop and remove everything including volumes
docker-compose down -v
```

## 💻 Option 2: Local Development

For active development without Docker overhead.

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd django-backend
   ```

2. **Create virtual environment**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Mac/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run development server**
   ```bash
   python manage.py runserver
   ```

   Backend now running at http://localhost:8000

### Frontend Setup

**In a new terminal:**

1. **Navigate to frontend directory**
   ```bash
   cd react-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   Frontend now running at http://localhost:3000

### Running Tests Locally

**Backend tests:**
```bash
cd django-backend
pytest --cov
```

**Frontend tests:**
```bash
cd react-frontend
npm test
```

## 📦 GitHub Repository Setup

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `task-manager-cicd`)
3. Choose **Public** (for free GitHub Actions minutes)
4. Don't initialize with README (we already have one)
5. Click "Create repository"

### Step 2: Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Full-stack CI/CD application"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Update README Badges

Edit `README.md` and replace:
```markdown
![Backend CI](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/Backend%20CI/CD/badge.svg)
```

With your actual username and repo name.

### Step 4: Watch CI/CD in Action

1. Go to your GitHub repository
2. Click on the **Actions** tab
3. You should see three workflows running:
   - Backend CI/CD
   - Frontend CI/CD
   - Docker Compose Integration Test

First run takes longer as it sets up caches.

## 🐳 Docker Hub Setup (Optional)

To enable automatic Docker image publishing:

### Step 1: Create Docker Hub Account

1. Go to https://hub.docker.com/signup
2. Create a free account
3. Verify your email

### Step 2: Create Access Token

1. Login to Docker Hub
2. Go to **Account Settings** → **Security**
3. Click **New Access Token**
4. Name it "GitHub Actions" and copy the token
5. **Save this token** - you can't see it again!

### Step 3: Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add two secrets:
   - Name: `DOCKER_USERNAME`, Value: your Docker Hub username
   - Name: `DOCKER_PASSWORD`, Value: your access token from Step 2

### Step 4: Test the Pipeline

Push a change to the main branch:

```bash
# Make a small change
echo "# Updated" >> README.md

# Commit and push
git add .
git commit -m "Test Docker Hub publishing"
git push origin main
```

Check the Actions tab - if successful, you'll see your images at:
- https://hub.docker.com/r/YOUR_USERNAME/task-manager-backend
- https://hub.docker.com/r/YOUR_USERNAME/task-manager-frontend

## 🔍 Troubleshooting

### Docker Issues

**Problem**: "Cannot connect to Docker daemon"
```bash
# Solution: Make sure Docker Desktop is running
# On Windows, check system tray
# On Mac, check menu bar
```

**Problem**: Port already in use
```bash
# Find and stop process using port 8000 or 80
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:8000 | xargs kill -9
```

**Problem**: "permission denied" on Linux
```bash
# Add your user to docker group
sudo usermod -aG docker $USER
# Then logout and login again
```

### Backend Issues

**Problem**: ModuleNotFoundError
```bash
# Make sure virtual environment is activated
# Make sure you ran: pip install -r requirements.txt
```

**Problem**: Database is locked
```bash
# Stop the Django server
# Delete db.sqlite3
# Run migrations again: python manage.py migrate
```

### Frontend Issues

**Problem**: npm install fails
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
# Install again
npm install
```

**Problem**: Can't connect to backend
```bash
# Check backend is running on port 8000
# Check CORS settings in django-backend/core/settings.py
# Verify CORS_ALLOWED_ORIGINS includes your frontend URL
```

### CI/CD Issues

**Problem**: GitHub Actions failing
```bash
# Check the Actions tab for specific error
# Common issues:
# - Missing Docker Hub secrets (if pushing images)
# - Test failures (fix tests first)
# - Syntax errors in workflow YAML
```

**Problem**: Docker Hub push fails
```bash
# Verify secrets are set correctly:
# Settings → Secrets and variables → Actions
# Should have DOCKER_USERNAME and DOCKER_PASSWORD
# Make sure access token has write permissions
```

## 📞 Need Help?

If you encounter issues:

1. Check existing GitHub Issues
2. Review the error logs carefully
3. Search Stack Overflow
4. Check Docker/Django/React documentation

## 🎉 Success!

If you've completed all steps:

✅ Application running locally
✅ Code pushed to GitHub
✅ CI/CD pipelines passing
✅ (Optional) Docker images published

**You now have a production-ready portfolio project to showcase in interviews!**

## 📚 Next Steps

1. Customize the application with your own features
2. Add more tests to improve coverage
3. Experiment with the CI/CD workflows
4. Practice explaining the architecture
5. Review the [CICD_GUIDE.md](CICD_GUIDE.md) for interview prep

---

**Happy coding! 🚀**
