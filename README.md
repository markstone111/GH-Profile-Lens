# 📌 GH Profile Lens

A **GitHub Profile Viewer** web application that lets you log in with your GitHub account, view your profile details, and explore your public repositories — all powered by the **GitHub REST API** and **OAuth authentication**.

🔗 **Live Demo:** [https://gh-profile-lens.onrender.com](https://gh-profile-lens.onrender.com)  
📂 **Source Code:** [GitHub Repository](https://github.com/settings/apps/gh-profile-lens)  

---

## 🚀 Features
- **Login with GitHub** via OAuth
- Display **GitHub profile details**: avatar, username, name, bio, location, and public email
- List all **public repositories** with:
  - Name & description
  - Primary language
  - Star count ⭐
  - Repo link
- Fully responsive UI for desktop and mobile
- Secure session handling with `express-session`

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, JavaScript
- **Auth:** GitHub OAuth 2.0
- **API:** GitHub REST API v3
- **Hosting:** Render (Free Tier)

---

## 📂 Project Structure

├── public/
│ ├── profile.html # Profile display page
│ ├── style.css # Styling
│ ├── script.js # Frontend logic
│
├── server.js # Express server and OAuth routes
├── package.json
└── README.md


---

## ⚙️ Installation & Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/markstone111/GH-Profile-Lens.git
   cd GH-Profile-Lens
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create .env file**
   ```env
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   SESSION_SECRET=any_random_secret
   ```
4. **Run the app locally**
   ```bash
   node server.js
   ```
Visit http://localhost:3000 in your browser.

---

## 🤝 Contributing
-  Fork the repository

-  Create a new branch (git checkout -b feature-branch)

-  Make your changes

-  Commit (git commit -m "Added new feature")

-  Push (git push origin feature-branch)

-  Open a Pull Request

---

## 💡 If you like this project, don’t forget to ⭐ star the repo and fork it for your own experiments!


## 📜 License
-  This project is licensed under the MIT License.
