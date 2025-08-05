# Travis Life Hub — Real-Time Personal Dashboard

A modular personal website that gathers and displays Travis's real-world data (finance, health, goals, habits, music, etc.), allows quick input, updates a centralized brain (JSON), and exposes a summary endpoint for AI use.

## 🚀 Features

### Core Functionality
- **Modular Tabbed Interface** - Sidebar navigation with 8 life domains
- **Real-time Data Entry** - Quick forms for each life area
- **Auto-updating Status** - Centralized `status.json` for AI access
- **Local Storage** - All data stored in browser localStorage
- **Export Functionality** - One-click data export as JSON
- **AI Chat Integration** - Optional chat interface using status data

### Life Domains Tracked
- 📊 **Dashboard** - Overview and quick actions
- 💰 **Finance** - Income, expenses, and descriptions
- 🏥 **Health** - Weight, steps, and wellness notes
- 🐕 **Chance** - Dog activities and care tracking
- 🎵 **Music** - What you're listening to with ratings
- 🎯 **Goals** - Personal and professional goal progress
- 💻 **Projects** - Project status and updates
- 😊 **Mood** - Current mood, energy level, and notes

## 🛠️ Tech Stack

- **Frontend**: HTML5 + Tailwind CSS
- **JavaScript**: Vanilla JS (ES6+)
- **Storage**: Browser localStorage
- **Deployment**: GitHub Pages ready

## 📁 Project Structure

```
/
├── index.html          # Main dashboard
├── js/
│   └── main.js        # Core application logic
├── data/
│   └── status.json    # AI-accessible status summary
└── README.md          # This file
```

## 🚀 Quick Start

1. **Open the Dashboard**
   ```bash
   # Simply open index.html in your browser
   # Or serve with a local server:
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

2. **Start Logging Data**
   - Navigate between tabs using the sidebar
   - Fill out forms and click "Log Entry"
   - Watch the dashboard update in real-time

3. **Access AI Data**
   - Status data is automatically saved to `data/status.json`
   - Use the AI chat interface on the dashboard
   - Export data anytime with the "Export Data" button

## 📊 Data Structure

### Status Summary (`status.json`)
```json
{
  "mood": "burnt-out",
  "weather": "Clear",
  "last_checkin": "2025-01-27T10:02:00Z",
  "chance_status": "Fed, no outdoor time yet",
  "predicted_next_action": "Likely to sit outside and smoke",
  "recent_activities": [...]
}
```

### Activity Logs
Each entry includes:
- `type`: Activity category (mood, finance, health, etc.)
- `timestamp`: ISO timestamp
- Domain-specific data (mood, amount, notes, etc.)

## 🔧 Customization

### Adding New Life Domains
1. Add tab link in `index.html` sidebar
2. Create tab content loading function in `main.js`
3. Add data logging method
4. Update status summary logic

### AI Integration
The system is designed for easy AI integration:
- Status data is always available at `/data/status.json`
- Recent activities provide context
- Export function creates AI-ready JSON

### Deployment
- **GitHub Pages**: Push to repo, enable Pages in settings
- **GoDaddy**: Upload files to web hosting
- **Local**: Use any static file server

## 🎯 Use Cases

### For Travis
- Quick daily check-ins across all life areas
- Historical tracking of habits and progress
- Centralized data for AI assistants
- Easy export for backup/analysis

### For AI Systems
- Real-time context about Travis's current state
- Historical patterns and trends
- Structured data for personalized responses
- Predictable JSON format for integration

## 🔮 Future Enhancements

- **SQLite Backend** - For more robust data storage
- **Weather API Integration** - Auto-update weather status
- **Local LLM Integration** - Connect to Ollama for real AI chat
- **Mobile App** - Progressive Web App capabilities
- **Data Visualization** - Charts and trends
- **Reminders** - Scheduled check-ins and notifications

## 📝 License

This project is for personal use by Travis. Feel free to adapt for your own life tracking needs!

---

**Built with ❤️ for Travis's personal productivity and AI integration needs.** 