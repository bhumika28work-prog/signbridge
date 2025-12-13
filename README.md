# SignLearn - Deaf & Mute Learning App

A full-stack learning application for Deaf & Mute students, featuring AI-powered sign language translation and practice.

## Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Zustand, Framer Motion
- **Backend**: Node.js, Express, MongoDB
- **AI Integration**: MediaPipe (Hand Tracking), Web Speech API (Speech-to-Text)

## Features

- **Structured Learning**: Modules for Gujarati Alphabets, Numbers, Science, and Maths.
- **AI Practice Mode**: Real-time hand tracking for practicing signs.
- **Text/Speech to Sign**: Convert text or speech into sign language (simulation).
- **Writing Practice**: Canvas for practicing writing characters.

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd deaf-mute-learning-app
   ```

2. **Install Dependencies**
   ```bash
   # Server
   cd server
   npm install
   
   # Client
   cd ../client
   npm install
   ```

3. **Environment Setup**
   - Create `.env` in `server/`:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/deaf-mute-learning-app
     ```

4. **Run the Application**
   - **Backend**: `cd server && npm run dev`
   - **Frontend**: `cd client && npm run dev`

5. **Access the App**
   - Open [http://localhost:3000](http://localhost:3000)

## Deployment

- **Frontend**: Deploy `client` folder to Vercel.
- **Backend**: Deploy `server` folder to Render/Heroku/Vercel (as Serverless Functions).
