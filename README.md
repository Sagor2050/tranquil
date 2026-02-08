# Tranquil - Wellness Platform for Students

**Tranquil** is a type-safe, full-stack wellness platform designed specifically for students. By leveraging TypeScript throughout our codebase, we ensure our application is scalable, bug-resistant, and easy for every team member to contribute to without breaking existing features.

##  Mission

Tranquil aims to provide a comprehensive wellness platform that helps students manage their mental health, stress, and overall well-being. Our commitment to type safety through TypeScript ensures that:

- **Code Quality**: Catch errors at compile-time, not runtime
- **Scalability**: Build features confidently knowing the type system has your back
- **Collaboration**: Team members can contribute safely without fear of breaking existing functionality
- **Maintainability**: Self-documenting code through type definitions

##  Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Firebase](https://firebase.google.com/) (Authentication, Firestore, Storage)
- **AI Integration**: [OpenAI GPT-4o](https://openai.com/)
- **Package Manager**: npm

##  Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A Firebase project (for backend services)
- An OpenAI API key (for AI features)

##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Sagor2050/tranquil.git
cd tranquil
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Then fill in your Firebase and OpenAI credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
```

**How to get Firebase credentials:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Go to Project Settings > General
4. Scroll down to "Your apps" and add a web app
5. Copy the configuration values

**How to get OpenAI API key:**
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign in or create an account
3. Navigate to API Keys section
4. Create a new secret key

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.




##  Beginner's Guide: From Clone to Pull Request

This guide will walk you through the complete process of contributing to Tranquil, from cloning the repository to creating your first pull request.

### Step 1: Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Sagor2050/tranquil.git
cd tranquil
```

### Step 2: Install Dependencies

Install all required packages:

```bash
npm install
```

This will install all dependencies listed in `package.json`. Wait for it to complete before proceeding.

### Step 3: Set Up Environment Variables (Optional for Development)

For basic development and testing, you can skip this step initially. However, if you need Firebase or OpenAI features:

1. Create a `.env.local` file in the root directory:
   ```bash
   touch .env.local
   ```

2. Add your environment variables (see "Getting Started" section above for details)

**Note**: You can still run the app without these credentials for UI development.

### Step 4: Verify the Setup

Make sure everything works:

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the Tranquil homepage.

**Troubleshooting**: If you see errors, try:
- Delete `node_modules` and `.next` folders, then run `npm install` again
- Make sure you have Node.js v18 or higher: `node --version`

### Step 5: Create a New Branch

**Never work directly on the `main` branch!** Always create a new branch for your changes:

```bash
# Make sure you're on the main branch and it's up to date
git checkout main
git pull origin main

# Create and switch to a new branch
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**
- `feature/` - For new features (e.g., `feature/user-profile`)
- `fix/` - For bug fixes (e.g., `fix/navbar-mobile`)
- `docs/` - For documentation (e.g., `docs/update-readme`)
- `style/` - For styling changes (e.g., `style/button-colors`)

### Step 6: Make Your Changes

Now you can start coding! Here are some tips:

1. **Open your code editor** (VS Code, WebStorm, etc.)
2. **Make your changes** to the relevant files
3. **Test locally** by running `npm run dev` and checking your changes in the browser
4. **Check for errors** by running:
   ```bash
   npm run build  # This will show TypeScript errors
   npm run lint    # This will show code style issues
   ```

**Example**: Let's say you want to add a new button to the homepage:

1. Open `components/HomePage.tsx`
2. Add your button component
3. Save the file
4. Check `http://localhost:3000` to see your changes

### Step 7: Stage and Commit Your Changes

Once you're happy with your changes:

```bash
# See what files you've changed
git status

# Add all changed files (or specific files)
git add .

# Or add specific files only
git add components/HomePage.tsx

# Commit with a descriptive message
git commit -m "feat: add new call-to-action button to homepage"
```

**Commit message format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Formatting, styling (no code change)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests

**Good commit messages:**
-  `feat: add user login functionality`
-  `fix: resolve navbar mobile menu issue`
-  `update stuff`
-  `fix bug`

### Step 8: Push Your Branch to GitHub

Push your branch to the remote repository:

```bash
git push origin feature/your-feature-name
```

**First time pushing?** You might need to set the upstream:
```bash
git push -u origin feature/your-feature-name
```

### Step 9: Create a Pull Request

1. **Go to GitHub/GitLab** and navigate to the repository
2. You should see a banner saying "Your recently pushed branches" with a button to "Compare & pull request"
3. **Click "Compare & pull request"** (or go to the Pull Requests tab and click "New Pull Request")
4. **Fill out the PR form:**
   - **Title**: Clear, descriptive title (e.g., "Add user login functionality")
   - **Description**: Explain what you changed and why
     ```markdown
     ## What changed?
     - Added a new login button to the homepage
     - Created LoginPage component
     
     ## Why?
     - Users need a way to access their accounts
     
     ## How to test?
     1. Go to homepage
     2. Click "Login" button
     3. Should navigate to login page
     ```
   - **Reviewers**: Tag team members if needed
   - **Labels**: Add appropriate labels (feature, bug, etc.)

5. **Click "Create Pull Request"**

### Step 10: Address Review Feedback

After creating your PR, team members will review it. They might:
- Request changes
- Ask questions
- Suggest improvements

**How to respond:**
1. Read the feedback carefully
2. Make the requested changes on your branch
3. Commit and push again:
   ```bash
   git add .
   git commit -m "fix: address review feedback - update button styling"
   git push origin feature/your-feature-name
   ```
4. The PR will automatically update with your new changes

### Step 11: Merge and Clean Up

Once your PR is approved and merged:

1. **Switch back to main branch:**
   ```bash
   git checkout main
   ```

2. **Pull the latest changes:**
   ```bash
   git pull origin main
   ```

3. **Delete your feature branch** (optional, but recommended):
   ```bash
   # Delete local branch
   git branch -d feature/your-feature-name
   
   # Delete remote branch (if not auto-deleted)
   git push origin --delete feature/your-feature-name
   ```

### Common Issues and Solutions

**Issue**: "Permission denied" when pushing
- **Solution**: Make sure you have write access to the repository, or fork the repo and create a PR from your fork

**Issue**: "Merge conflicts"
- **Solution**: 
  ```bash
  git checkout main
  git pull origin main
  git checkout feature/your-feature-name
  git merge main
  # Resolve conflicts, then:
  git add .
  git commit -m "fix: resolve merge conflicts"
  git push origin feature/your-feature-name
  ```

**Issue**: TypeScript errors
- **Solution**: Run `npm run build` to see detailed errors. Fix type issues before committing.

**Issue**: "Module not found"
- **Solution**: Run `npm install` to ensure all dependencies are installed

### Quick Reference Checklist

Before submitting a PR, make sure:

- [ ] Code follows TypeScript best practices (no `any` types unless necessary)
- [ ] All changes are tested locally (`npm run dev`)
- [ ] Build passes without errors (`npm run build`)
- [ ] Linter passes (`npm run lint`)
- [ ] Commit messages follow conventional format
- [ ] Branch name follows naming conventions
- [ ] PR description is clear and descriptive
- [ ] No console errors in browser
- [ ] Code is properly formatted

### Need Help?

- Check the [How to Collaborate](#-how-to-collaborate) section above
- Review existing PRs to see examples
- Ask questions in team chat or GitHub discussions
- Read the [Learning Resources](#-learning-resources) section

---

##  Project Structure

```
tranquil/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage route (renders HomePage component)
│   ├── globals.css        # Global styles and Tailwind imports
│   └── favicon.ico        # Site favicon
├── components/            # Reusable React components
│   ├── Navbar.tsx        # Navigation bar component
│   ├── Footer.tsx        # Footer component with team information
│   └── HomePage.tsx      # Homepage component with main content
├── lib/                   # Utility libraries and configurations
│   ├── firebase/         # Firebase configuration and utilities
│   │   └── config.ts     # Firebase initialization and client setup
│   └── openai/           # OpenAI configuration
│       └── config.ts     # OpenAI client setup
├── public/               # Static assets (images, icons, etc.)
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── eslint.config.mjs     # ESLint configuration
├── postcss.config.mjs    # PostCSS configuration for Tailwind
├── package.json          # Project dependencies and scripts
└── README.md             # This file
```

##  How to Collaborate

### Development Workflow

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
   Use descriptive branch names:
   - `feature/user-authentication`
   - `fix/navbar-styling`
   - `docs/update-readme`

2. **Make Your Changes**
   - Write type-safe TypeScript code
   - Follow existing code style and patterns
   - Add comments for complex logic
   - Keep components small and focused

3. **Test Your Changes**
   ```bash
   npm run build  # Check for TypeScript errors
   npm run dev    # Test locally
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add user authentication"
   ```
   Use conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `style:` for formatting
   - `refactor:` for code refactoring
   - `test:` for tests

5. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a pull request on GitHub/GitLab.

### Code Style Guidelines

- **TypeScript First**: Always use TypeScript types. Avoid `any` when possible.
- **Component Structure**: Keep components in the `components/` directory
- **File Naming**: Use PascalCase for components (`Navbar.tsx`), camelCase for utilities
- **Imports**: Use absolute imports with `@/` alias (configured in `tsconfig.json`)
- **Styling**: Use Tailwind CSS utility classes. Keep custom CSS minimal.

### Type Safety Best Practices

1. **Define Types**: Create interfaces/types for all data structures
2. **Type Props**: Always type React component props
3. **Type Functions**: Type function parameters and return values
4. **Use Type Guards**: When dealing with unknown data, use type guards
5. **Avoid `any`**: If you must use `any`, add a comment explaining why

### Example: Creating a New Component

```typescript
// components/UserCard.tsx
interface UserCardProps {
  name: string;
  email: string;
  avatar?: string;
}

export default function UserCard({ name, email, avatar }: UserCardProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      {avatar && <img src={avatar} alt={name} className="w-12 h-12 rounded-full" />}
      <h3 className="font-semibold">{name}</h3>
      <p className="text-gray-600">{email}</p>
    </div>
  );
}
```

##  Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

##  Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)



##  Contributing

1. Read this README thoroughly
2. Check existing issues and pull requests
3. Create a new branch for your feature
4. Write type-safe, well-documented code
5. Test your changes locally
6. Submit a pull request with a clear description

##  CI / Automated Checks

This repository includes a GitHub Actions workflow that runs dependency installation, linting, and a build on pushes and pull requests. If you push a branch to GitHub the workflow will run automatically.

If you prefer to run checks locally, use the helper script added at `scripts/install-deps.sh`:

```bash
# make the script executable once
chmod +x scripts/install-deps.sh

# run it from the project root
./scripts/install-deps.sh

# then run lint/build locally
npm run lint
npm run build
```

If you don't have Node/npm installed, see the "Prerequisites" section above for recommended installers (`nvm` or Homebrew).


##  Team

 'Eileen Lojano'
 'Faraibe Khan'
 'Nuzat Khan'
 'Sagor S. Dhor'
 'Madiha'

---

**Happy Coding! **

Remember: Type safety is not just a feature—it's a commitment to code quality and team collaboration.

Practice change for learning pull requests.