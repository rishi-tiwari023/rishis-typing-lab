# Typing Practice App

A modern React-based typing practice application that helps users improve their typing speed and accuracy.

## Features

- 🚀 Real-time WPM (Words Per Minute) calculation
- 📊 Typing accuracy tracking
- 📈 Statistics visualization with charts
- 🏆 Leaderboard functionality
- 🌓 Dark mode support
- 📱 Responsive design with Tailwind CSS

## Tech Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Hooks
- **Data Persistence**: js-cookie

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/rishi-tiwari023/rishis-typing-lab.git
cd typing-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

You can access the app here: [App](https://rishis-typing-lab.onrender.com/)

## Project Structure

```
rishis-typing-lab/
├── Dockerfile
├── README.md
├── package.json
├── package-lock.json
├── postcss.config.js
├── render.yaml
├── static.json
├── tailwind.config.js
├── public/
│   ├── _redirects
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── components/
│   │   ├── CarouselCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── StatsChart.jsx
│   │   └── TypingBox.jsx
│   ├── hooks/
│   │   └── useTypingTracker.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Progress.jsx
│   │   └── Test.jsx
│   ├── utils/
│   │   ├── getRandomSentence.js
│   │   ├── monkeytypeApi.js
│   │   └── saveStatsToCookies.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   ├── service-worker.js
│   ├── serviceWorkerRegistration.js
│   └── setupTests.js
└── node_modules/
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Features in Detail

### Typing Box
- Real-time character matching
- Current word highlighting
- Error tracking
- Input focus management

### Statistics Tracking
- Words per minute (WPM) calculation
- Accuracy percentage
- Historical performance tracking
- Visual statistics with charts

### Leaderboard
- Display of top performers
- Personal best tracking
- Score persistence using cookies

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Create React App for the initial project setup
- Tailwind CSS for the styling framework
- Recharts for the charting library 