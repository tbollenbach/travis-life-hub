# Travis Life Hub

Real-time personal dashboard for tracking mood, health, finance, and more.

## Features

- 📊 **Dashboard** - Overview of current status
- 💰 **Finance** - Track income and expenses
- 🏥 **Health** - Monitor weight, steps, and health notes
- 🐕 **Chance** - Track pet activities and care
- 🎵 **Music** - Log and rate music you're listening to
- 🎯 **Goals** - Track progress on personal goals
- 💻 **Projects** - Monitor project status and updates
- 😊 **Mood** - Track daily mood and energy levels

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## Data Persistence

The app now saves data to both:
- **Browser localStorage** (for immediate access)
- **Server-side JSON file** (`data/status.json`) for persistent storage

This ensures your data persists across browser sessions and devices.

## Troubleshooting

### Data Not Saving?

If you're experiencing issues with data not saving:

1. **Check the server is running** - Make sure you see "Server running on http://localhost:3000" in the console
2. **Check browser console** - Open Developer Tools (F12) and look for any error messages
3. **Verify file permissions** - Ensure the `data` directory is writable
4. **Try the reset button** - Use the "Reset Data (Debug)" button in the Debug Info panel

### Debug Information

The Debug Info panel shows:
- **Storage Available** - Whether localStorage is working
- **Data Entries** - Number of activities logged
- **Last Save** - When data was last saved

## Development

To run in development mode:
```bash
npm run dev
```

## File Structure

```
travis-life-hub/
├── index.html          # Main dashboard interface
├── js/
│   └── main.js        # Frontend JavaScript
├── data/
│   └── status.json    # Persistent data storage
├── server.js          # Node.js server
├── package.json       # Dependencies
└── README.md         # This file
```

## Recent Fixes

- **Fixed data persistence** - Data now saves to server-side JSON file
- **Added server-side storage** - Data persists across browser sessions
- **Improved error handling** - Better fallback to localStorage if server unavailable
- **Enhanced debugging** - More detailed console logging and debug panel 