# Couple App - Private Space for Ayush & Neha

A private web application for two people to share moments, journals, notes, and memories with three distinct viewing modes.

## Features

- Three viewing modes: Me, Partner, and Couple
- Journals with photos and tags
- Moments (memory cards)
- Shared gallery
- Notes and reminders
- "What's On My Mind" section

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Authentication: JWT
- Deployment: Vercel (Free Tier)

## Local Development Setup

1. Install dependencies:
```bash
npm install
cd client && npm install && cd ..
```

2. Set up MongoDB Atlas:
   - Create a free cluster at https://www.mongodb.com/cloud/atlas
   - Get your connection string
   - Copy `.env.example` to `.env` and update with your MongoDB URI

3. Seed the database with default users:
```bash
npm run seed
```

4. Start development:
```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
npm run client
```

5. Open http://localhost:5174

## Default Accounts

- Ayush: ayush@couple.app / password123
- Neha: neha@couple.app / password123

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed Vercel deployment instructions.

### Quick Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables (MONGODB_URI, JWT_SECRET)
4. Deploy!

## Project Structure

```
couple-app/
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable components
│   │   └── api.js      # API configuration
│   └── package.json
├── server/              # Express backend
│   ├── models/         # MongoDB models
│   ├── index.js        # Main server file
│   └── auth.js         # JWT authentication
├── vercel.json         # Vercel configuration
└── package.json        # Root package.json

```

## Environment Variables

Required environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_minimum_32_characters
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

## Features by Mode

### Me Mode
- View all content you created
- Edit/delete only your content
- See private, shared, and couple content

### Partner Mode
- View what your partner shared with you
- Read-only access
- Cannot edit or delete

### Couple Mode
- View all shared content from both
- Edit/delete only your own contributions
- Collaborative space

## License

Private project for Ayush & Neha
