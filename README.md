# User Weather App

A **React + Next.js** application that displays user profiles along with current weather information based on their location. Users can save favorite profiles to SupaBase DB and retrieve their weather data anytime.

---

## Features

- **User Profiles**: Fetches and displays users with detailed, stylish profile cards.
- **Weather Info**: Shows current weather for each user's location with clear, meaningful icons.
- **Persistent Saving**: Save users to a local JSON file on the server instead of localStorage.
- **Responsive Design**: UI adapts seamlessly across desktop, tablet, and mobile devices.
- **Breadcrumb Navigation**: Improves app usability and navigation clarity.
- **Smooth Animations**: Enhanced user experience using Framer Motion for transitions.

---

## Bonus Points Implemented

- **Next.js API Routes**  
  All third-party API requests (e.g., weather data from Open-Meteo) are proxied through Next.js API routes for improved security and API key hiding.

- **Persistent Storage**  
  Saved users are stored in a SupaBase DB, avoiding the limitations of client-side localStorage.

- **Responsive Design**  
  Fully responsive UI that looks great on any device — from small phones to large desktops.

---

## Project Structure

```
/pages
  ├── index.tsx               # Main user listing page
  ├── saved.tsx               # Saved users page
  ├── api
       ├── users.ts           # API routes for saving, retrieving, deleting users
       └── weather.ts         # API route fetching weather from Open-Meteo
/components                   # Reusable React components (UserCard, WeatherModal, Header, Breadcrumbs)
/data                         # Local JSON file storage (savedUsers.json)
/types                        # TypeScript interfaces and types
/lib
  ├── supabaseClient.ts       # Conection with SupaBase
```

---

## API Routes

| Method | Endpoint      | Description                            |
|--------|---------------|----------------------------------------|
| GET    | `/api/users`  | Retrieve saved users                   |
| POST   | `/api/users`  | Save a new user to DB |
| DELETE | `/api/users`  | Remove a user by email                 |
| GET    | `/api/weather`| Fetch current weather by lat/lon       |

---

## AI Usage Disclosure

- This project was assisted by **AI (ChatGPT)** for:
  - Optimizing React components and Next.js API routes
  - Writing descriptive comments
  - Improving code readability and structure
  - Suggesting best development practices

- All architectural and logical decisions were reviewed and adapted manually by the developer.

---

## Future Improvements

- Implement **user authentication** to personalize saved profiles.
- Enhance weather data with more metrics such as humidity, wind speed, and forecasts.
- Add **pagination** and filtering for managing large user lists.

---
