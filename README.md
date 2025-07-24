# SkillSwap

**Learn and Teach in Your Neighborhood**

SkillSwap is a community-driven platform that allows users to exchange skills by offering and browsing lessons based on categories and neighborhoods. Whether you want to teach photography, learn coding, or share cooking techniques, SkillSwap makes it easy to connect with people nearby.

---

## Features

- **Search & Filter Skills** by keyword, category, and neighborhood
- **Browse Skills** in a clean, card-based layout
- **Add New Skills** using a validated submission form
- **Backend Powered by JSON Server**
- **Navigation Bar** with links to Home, Browse Skills, Add Skill, and Profile
- **Favorites page** when you favorite a skill
- **Responsive Design** for mobile and desktop

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/skillswap.git
cd skillswap
````

### 2. Install Dependencies

```bash
npm install
npm install react-router-dom json-server axios
```

### 3. Start the Backend (JSON Server)

```bash
npx json-server --watch db.json --port 3000
```

### 4. Start the React App

```bash
npm run dev
```

---

## Project Structure

```
src/
├── assets/                     # Static assets like images, icons
│   └── [image files...]
├── components/                 # Reusable UI components
│   ├── AddSkillForm.jsx
│   ├── Favorites.jsx
│   ├── NavBar.jsx
│   ├── NearMeToggle.jsx
│   ├── SearchBar.jsx
│   ├── SkillCard.jsx
│   ├── SkillList.jsx
│   ├── AddSkillForm.css
│   ├── Favorites.css
│   ├── NavBar.css
│   ├── NearMeToggle.css
│   ├── SearchBar.css
│   ├── SkillCard.css
│   └── SkillList.css
├── pages/                      # Page-level components
│   ├── AddSkillPage.jsx
│   ├── FavoritesPage.jsx
│   ├── HomePage.jsx
│   ├── ProfilePage.jsx
│   ├── SkillsPage.jsx
│   ├── AddSkillPage.css
│   ├── FavoritesPage.css
│   ├── HomePage.css
│   ├── ProfilePage.css
│   └── SkillsPage.css
├── App.jsx                     # Root component with routes
├── main.jsx                    # Vite app entry point
└── db.json                     # Mock JSON server data

```

---

## Contributors

* **Mohamed Abdulrashid**
* **Caleb Muindi**
* **Joe Wanjema**



## License

This project is for educational and portfolio purposes.

---

## Future Enhancements

* User authentication & login
* Chat feature between users
* Ratings and reviews
* Skill availability calendar

© 2025 SkillSwap. All rights reserved.

