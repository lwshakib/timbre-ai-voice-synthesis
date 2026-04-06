# Contributing to Timbre AI

Thank you for your interest in contributing to Timbre AI. We follow a strict institutional-grade development protocol to maintain the high quality and performance of our vocal synthesis engine.

## 🛠️ Development Workflow

To contribute, follow this standardized 7-step process:

### 1. Fork the Repository
Create a personal fork of the repository on GitHub to work in your own environment.

### 2. Clone Your Fork
Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/timbre-ai-voice-synthesis.git
cd timbre-ai-voice-synthesis
```

### 3. Setup Your Environment
Follow the instructions in [**`README.md`**](README.md) to initialize your environment, including copying `.env.example` to `.env` and installing dependencies.

### 4. Create a Feature Branch
Create a new branch for your work:
```bash
git checkout -b feature/your-feature-name
```

### 5. Commit Your Changes
We follow [**Conventional Commits**](https://www.conventionalcommits.org/). Ensure your commit messages are clear and descriptive:
```bash
git commit -m "feat: added synthesis quality monitoring"
```

### 6. Push & Sync Upstream
Push your changes to your fork and ensure you're synced with the upstream repository:
```bash
# Push your branch
git push origin feature/your-feature-name

# Sync with Upstream
git remote add upstream https://github.com/leadwithshakib/timbre-ai-voice-synthesis.git
git fetch upstream
git merge upstream/main
```

### 7. Open a Pull Request
Open a pull request from your fork to the main repository. Provide a detailed description of your changes, including screenshots and testing evidence.

## 🧑‍💻 Code Style & Standards
- **Styling**: Use Tailwind CSS with the predefined "Swiss" design variables.
- **Components**: Use Radix UI and Shadcn/UI primitives.
- **Naming**: Use descriptive camelCase for variables and PascalCase for components.
- **Types**: Ensure all logic is fully typed using TypeScript.

## 📜 Code of Conduct
By participating in this project, you agree to abide by our [**Code of Conduct**](CODE_OF_CONDUCT.md).
