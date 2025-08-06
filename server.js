const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const execAsync = util.promisify(exec);
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Route to save data
app.post('/save-data', async (req, res) => {
    try {
        const data = req.body;
        const statusPath = path.join(__dirname, 'data', 'status.json');
        
        // Ensure the data directory exists
        await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
        
        // Write the data to status.json
        await fs.writeFile(statusPath, JSON.stringify(data, null, 2));
        
        console.log('Data saved successfully:', data);
        res.json({ success: true, message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ success: false, message: 'Error saving data' });
    }
});

// Route to push data to GitHub
app.post('/push-to-github', async (req, res) => {
    try {
        const { data, timestamp } = req.body;
        
        // Save the data to status.json
        const statusPath = path.join(__dirname, 'data', 'status.json');
        await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
        await fs.writeFile(statusPath, JSON.stringify(data, null, 2));
        
        // Git commands to push to GitHub
        try {
            // Add all changes
            await execAsync('git add .');
            console.log('Git add completed');
            
            // Commit with timestamp
            const commitMessage = `Update data - ${new Date().toLocaleString()}`;
            await execAsync(`git commit -m "${commitMessage}"`);
            console.log('Git commit completed');
            
            // Push to GitHub
            await execAsync('git push origin main');
            console.log('Git push completed');
            
            res.json({ 
                success: true, 
                message: 'Data pushed to GitHub successfully',
                timestamp: timestamp
            });
        } catch (gitError) {
            console.error('Git operations failed:', gitError);
            res.status(500).json({ 
                success: false, 
                message: 'Git operations failed. Make sure you have git configured and have push access.',
                error: gitError.message
            });
        }
        
    } catch (error) {
        console.error('Error pushing to GitHub:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error pushing to GitHub',
            error: error.message
        });
    }
});

// Route to get current data
app.get('/data/status.json', async (req, res) => {
    try {
        const statusPath = path.join(__dirname, 'data', 'status.json');
        
        // Check if file exists
        try {
            await fs.access(statusPath);
        } catch (error) {
            // File doesn't exist, return default data
            const defaultData = {
                mood: "Unknown",
                weather: "Unknown",
                last_checkin: new Date().toISOString(),
                chance_status: "Unknown",
                predicted_next_action: "Unknown",
                recent_activities: []
            };
            
            // Create the file with default data
            await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
            await fs.writeFile(statusPath, JSON.stringify(defaultData, null, 2));
            
            return res.json(defaultData);
        }
        
        // Read and return the file
        const data = await fs.readFile(statusPath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).json({ error: 'Error reading data' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Travis Life Hub available at http://localhost:${PORT}`);
}); 