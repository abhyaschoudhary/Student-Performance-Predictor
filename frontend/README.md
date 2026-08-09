# EduPredict AI Frontend

A React and Vite frontend for the EduPredict AI Student Performance Predictor.

## Run locally

```bash
npm install
npm run dev
```

The frontend uses `http://127.0.0.1:8000` by default. To point it at another compatible API, create a `.env` file from `.env.example` and set `VITE_API_BASE_URL`.

The FastAPI backend must be running separately for prediction requests to succeed.
