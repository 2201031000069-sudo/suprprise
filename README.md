# Morning Cards ☀️

A beautiful interactive web app that shows 4 surprise cards every morning. Premium, playful, and emotionally warm.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, GSAP, Lottie React
- **Backend**: FastAPI, SQLAlchemy, Pydantic, Alembic
- **Database**: PostgreSQL (Neon)
- **Deployment**: Vercel (FE), Railway (BE), Neon (DB)

## Project Structure

```
morning-cards/
├── frontend/          # Next.js app
│   └── src/
│       ├── app/       # Pages & layout
│       ├── components/# Card components
│       └── hooks/     # Custom hooks
├── backend/           # FastAPI app
│   └── app/
│       ├── api/       # Route handlers
│       ├── models/    # SQLAlchemy models
│       └── schemas/   # Pydantic schemas
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.11+
- PostgreSQL (or Neon account)

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or .\venv\Scripts\activate on Windows
pip install -r requirements.txt

# Set up database
alembic revision --autogenerate -m "init"
alembic upgrade head

# Run server
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

**Backend** (`.env`):
```
DATABASE_URL=postgresql://user:password@host:5432/morning_cards
CORS_ORIGINS=http://localhost:3000
```

**Frontend** (`.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/quotes/random` | Random morning quote |
| GET | `/api/v1/chocolate/random` | Random chocolate + compliment |
| POST | `/api/v1/wishes` | Save a wish |

## Cards Flow

1. **Morning Quote** — Random motivational quote with flower bloom animation
2. **Cute Animation** — Random Lottie animation (panda, cat, butterfly, bunny, coffee)
3. **Chocolate Surprise** — Random chocolate name + compliment with confetti burst
4. **Make A Wish** — Write a wish, shooting star animation, saved to database

## Deployment

### Frontend (Vercel)

```bash
cd frontend
npx vercel --prod
```

Set `NEXT_PUBLIC_API_URL` to your Railway backend URL.

### Backend (Railway)

Connect your repo, set the `DATABASE_URL` to your Neon PostgreSQL connection string.

### Database (Neon)

Create a free PostgreSQL database at [neon.tech](https://neon.tech).
