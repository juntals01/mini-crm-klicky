# Mini CRM Klicky

A lightweight CRM system built with Node.js and Yarn.

## ⚙️ Requirements

- **Node.js**: `v20.19.2`
- **Yarn**: `v1.22.22`

## 🧰 Install Node.js with NVM (recommended)

If you don't have the correct Node version, install it using **NVM**:

### 1. Install NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Then restart your terminal or run:

```bash
source ~/.nvm/nvm.sh
```

### 2. Install Node.js

```bash
nvm install 20.19.2
nvm use 20.19.2
```

## 📦 Install Yarn (if not yet installed)

```bash
npm install -g yarn@1.22.22
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/juntals01/mini-crm-klicky.git
cd mini-crm-klicky
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Then update `.env.local` with your environment-specific settings.

### 3. Install dependencies

```bash
yarn install
```

### 4. Start the development server

```bash
yarn dev
```

### 5. Access the application

Once the server is running, open your browser and navigate to:

```
http://localhost:3001
```

Make sure your `.env.local` contains:

```env
FRONTEND_URL=http://localhost:3001
```

---

## 📂 Project Status

This project is **public** and actively maintained.

## 👨‍💻 Author

Built by [@juntals01](https://github.com/juntals01)
