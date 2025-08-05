// Travis Life Hub - Main JavaScript
class TravisLifeHub {
    constructor() {
        this.currentTab = 'dashboard';
        this.data = {
            mood: 'Unknown',
            weather: 'Unknown',
            last_checkin: new Date().toISOString(),
            chance_status: 'Unknown',
            predicted_next_action: 'Unknown',
            recent_activities: []
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadStatus();
        this.updateDashboard();
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Export button
        document.getElementById('export-btn').addEventListener('click', () => {
            this.exportData();
        });

        // Refresh button
        document.getElementById('refresh-btn').addEventListener('click', () => {
            this.loadStatus();
            this.updateDashboard();
        });

        // AI chat
        document.getElementById('ai-send').addEventListener('click', () => {
            this.handleAIChat();
        });

        // Quick action buttons
        document.querySelectorAll('.quick-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleQuickAction(action);
            });
        });
    }

    switchTab(tabName) {
        // Update active tab styling
        document.querySelectorAll('.tab-link').forEach(link => {
            link.classList.remove('active', 'bg-blue-50', 'border-l-4', 'border-travis-blue', 'rounded-r-lg');
            link.classList.add('text-gray-600', 'hover:bg-gray-50', 'rounded-lg');
        });

        const activeLink = document.querySelector(`[data-tab="${tabName}"]`);
        activeLink.classList.add('active', 'bg-blue-50', 'border-l-4', 'border-travis-blue', 'rounded-r-lg');
        activeLink.classList.remove('text-gray-600', 'hover:bg-gray-50', 'rounded-lg');

        // Hide all tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
            content.classList.remove('active');
        });

        // Show selected tab content
        const selectedContent = document.getElementById(tabName);
        selectedContent.classList.remove('hidden');
        selectedContent.classList.add('active');

        // Update page title
        document.getElementById('page-title').textContent = this.getTabTitle(tabName);
        this.currentTab = tabName;

        // Load tab-specific content
        this.loadTabContent(tabName);
    }

    getTabTitle(tabName) {
        const titles = {
            'dashboard': 'Dashboard',
            'finance': 'Finance',
            'health': 'Health',
            'chance': 'Chance',
            'music': 'Music',
            'goals': 'Goals',
            'projects': 'Projects',
            'mood': 'Mood'
        };
        return titles[tabName] || 'Dashboard';
    }

    loadTabContent(tabName) {
        const contentDiv = document.getElementById(tabName);
        
        switch(tabName) {
            case 'finance':
                this.loadFinanceTab(contentDiv);
                break;
            case 'health':
                this.loadHealthTab(contentDiv);
                break;
            case 'chance':
                this.loadChanceTab(contentDiv);
                break;
            case 'music':
                this.loadMusicTab(contentDiv);
                break;
            case 'goals':
                this.loadGoalsTab(contentDiv);
                break;
            case 'projects':
                this.loadProjectsTab(contentDiv);
                break;
            case 'mood':
                this.loadMoodTab(contentDiv);
                break;
        }
    }

    loadFinanceTab(container) {
        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Finance Tracker</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Income</label>
                            <input type="number" id="income-input" placeholder="Enter amount" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Expense</label>
                            <input type="number" id="expense-input" placeholder="Enter amount" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent">
                        </div>
                    </div>
                    <div class="mt-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <input type="text" id="finance-description" placeholder="What was this for?" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent">
                    </div>
                    <button onclick="app.logFinanceEntry()" class="mt-4 px-6 py-2 bg-travis-green text-white rounded-lg hover:bg-green-600 transition-colors">
                        Log Entry
                    </button>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Finance Activity</h3>
                    <div id="finance-history" class="space-y-2">
                        <div class="text-gray-500">No recent activity</div>
                    </div>
                </div>
            </div>
        `;
    }

    loadHealthTab(container) {
        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Health Tracker</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Weight (lbs)</label>
                            <input type="number" id="weight-input" placeholder="Enter weight" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Steps Today</label>
                            <input type="number" id="steps-input" placeholder="Enter steps" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent">
                        </div>
                    </div>
                    <div class="mt-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                        <textarea id="health-notes" placeholder="How are you feeling?" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent" rows="3"></textarea>
                    </div>
                    <button onclick="app.logHealthEntry()" class="mt-4 px-6 py-2 bg-travis-green text-white rounded-lg hover:bg-green-600 transition-colors">
                        Log Entry
                    </button>
                </div>
            </div>
        `;
    }

    loadChanceTab(container) {
        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Chance Tracker</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Activity</label>
                            <select id="chance-activity" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent">
                                <option value="">Select activity</option>
                                <option value="fed">Fed</option>
                                <option value="walked">Walked</option>
                                <option value="played">Played</option>
                                <option value="groomed">Groomed</option>
                                <option value="vet">Vet Visit</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                            <input type="number" id="chance-duration" placeholder="How long?" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent">
                        </div>
                    </div>
                    <div class="mt-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                        <textarea id="chance-notes" placeholder="How was Chance's behavior?" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent" rows="3"></textarea>
                    </div>
                    <button onclick="app.logChanceEntry()" class="mt-4 px-6 py-2 bg-travis-green text-white rounded-lg hover:bg-green-600 transition-colors">
                        Log Entry
                    </button>
                </div>
            </div>
        `;
    }

    loadMusicTab(container) {
        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Music Tracker</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Artist/Song</label>
                            <input type="text" id="music-title" placeholder="What are you listening to?" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Rating (1-10)</label>
                            <input type="number" id="music-rating" min="1" max="10" placeholder="Rate it" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent">
                        </div>
                    </div>
                    <div class="mt-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                        <textarea id="music-notes" placeholder="Thoughts on this track?" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent" rows="3"></textarea>
                    </div>
                    <button onclick="app.logMusicEntry()" class="mt-4 px-6 py-2 bg-travis-green text-white rounded-lg hover:bg-green-600 transition-colors">
                        Log Entry
                    </button>
                </div>
            </div>
        `;
    }

    loadGoalsTab(container) {
        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Goals Tracker</h3>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Goal</label>
                            <input type="text" id="goal-title" placeholder="What's your goal?" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select id="goal-category" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent">
                                <option value="">Select category</option>
                                <option value="health">Health</option>
                                <option value="finance">Finance</option>
                                <option value="career">Career</option>
                                <option value="personal">Personal</option>
                                <option value="learning">Learning</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Progress Update</label>
                            <textarea id="goal-progress" placeholder="How's it going?" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent" rows="3"></textarea>
                        </div>
                        <button onclick="app.logGoalEntry()" class="px-6 py-2 bg-travis-green text-white rounded-lg hover:bg-green-600 transition-colors">
                            Log Progress
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    loadProjectsTab(container) {
        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Projects Tracker</h3>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                            <input type="text" id="project-name" placeholder="What project are you working on?" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select id="project-status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent">
                                <option value="">Select status</option>
                                <option value="planning">Planning</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="on-hold">On Hold</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Update</label>
                            <textarea id="project-update" placeholder="What did you accomplish?" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent" rows="3"></textarea>
                        </div>
                        <button onclick="app.logProjectEntry()" class="px-6 py-2 bg-travis-green text-white rounded-lg hover:bg-green-600 transition-colors">
                            Log Update
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    loadMoodTab(container) {
        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Mood Tracker</h3>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Current Mood</label>
                            <select id="mood-select" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent">
                                <option value="">Select mood</option>
                                <option value="excellent">😊 Excellent</option>
                                <option value="good">🙂 Good</option>
                                <option value="okay">😐 Okay</option>
                                <option value="bad">😔 Bad</option>
                                <option value="terrible">😢 Terrible</option>
                                <option value="stressed">😰 Stressed</option>
                                <option value="burnt-out">😤 Burnt Out</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Energy Level (1-10)</label>
                            <input type="number" id="energy-level" min="1" max="10" placeholder="How's your energy?" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                            <textarea id="mood-notes" placeholder="What's on your mind?" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travis-blue focus:border-transparent" rows="3"></textarea>
                        </div>
                        <button onclick="app.logMoodEntry()" class="px-6 py-2 bg-travis-green text-white rounded-lg hover:bg-green-600 transition-colors">
                            Log Mood
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Data logging methods
    logFinanceEntry() {
        const income = document.getElementById('income-input').value;
        const expense = document.getElementById('expense-input').value;
        const description = document.getElementById('finance-description').value;
        
        if (!income && !expense) {
            alert('Please enter either income or expense amount');
            return;
        }

        const entry = {
            type: 'finance',
            timestamp: new Date().toISOString(),
            income: parseFloat(income) || 0,
            expense: parseFloat(expense) || 0,
            description: description,
            net: (parseFloat(income) || 0) - (parseFloat(expense) || 0)
        };

        this.logEntry(entry);
        this.clearFinanceForm();
    }

    logHealthEntry() {
        const weight = document.getElementById('weight-input').value;
        const steps = document.getElementById('steps-input').value;
        const notes = document.getElementById('health-notes').value;
        
        if (!weight && !steps) {
            alert('Please enter at least weight or steps');
            return;
        }

        const entry = {
            type: 'health',
            timestamp: new Date().toISOString(),
            weight: weight ? parseFloat(weight) : null,
            steps: steps ? parseInt(steps) : null,
            notes: notes
        };

        this.logEntry(entry);
        this.clearHealthForm();
    }

    logChanceEntry() {
        const activity = document.getElementById('chance-activity').value;
        const duration = document.getElementById('chance-duration').value;
        const notes = document.getElementById('chance-notes').value;
        
        if (!activity) {
            alert('Please select an activity');
            return;
        }

        const entry = {
            type: 'chance',
            timestamp: new Date().toISOString(),
            activity: activity,
            duration: duration ? parseInt(duration) : null,
            notes: notes
        };

        this.logEntry(entry);
        this.clearChanceForm();
        
        // Update chance status in main data
        this.data.chance_status = `${activity}${duration ? ` for ${duration} minutes` : ''}`;
        this.updateStatus();
    }

    logMusicEntry() {
        const title = document.getElementById('music-title').value;
        const rating = document.getElementById('music-rating').value;
        const notes = document.getElementById('music-notes').value;
        
        if (!title) {
            alert('Please enter a song/artist');
            return;
        }

        const entry = {
            type: 'music',
            timestamp: new Date().toISOString(),
            title: title,
            rating: rating ? parseInt(rating) : null,
            notes: notes
        };

        this.logEntry(entry);
        this.clearMusicForm();
    }

    logGoalEntry() {
        const title = document.getElementById('goal-title').value;
        const category = document.getElementById('goal-category').value;
        const progress = document.getElementById('goal-progress').value;
        
        if (!title || !progress) {
            alert('Please enter both goal and progress update');
            return;
        }

        const entry = {
            type: 'goal',
            timestamp: new Date().toISOString(),
            title: title,
            category: category,
            progress: progress
        };

        this.logEntry(entry);
        this.clearGoalForm();
    }

    logProjectEntry() {
        const name = document.getElementById('project-name').value;
        const status = document.getElementById('project-status').value;
        const update = document.getElementById('project-update').value;
        
        if (!name || !update) {
            alert('Please enter both project name and update');
            return;
        }

        const entry = {
            type: 'project',
            timestamp: new Date().toISOString(),
            name: name,
            status: status,
            update: update
        };

        this.logEntry(entry);
        this.clearProjectForm();
    }

    logMoodEntry() {
        console.log('logMoodEntry called');
        
        const mood = document.getElementById('mood-select').value;
        const energy = document.getElementById('energy-level').value;
        const notes = document.getElementById('mood-notes').value;
        
        console.log('Form values:', { mood, energy, notes });
        
        if (!mood) {
            alert('Please select a mood');
            return;
        }

        const entry = {
            type: 'mood',
            timestamp: new Date().toISOString(),
            mood: mood,
            energy: energy ? parseInt(energy) : null,
            notes: notes
        };

        console.log('Created entry:', entry);
        this.logEntry(entry);
        this.clearMoodForm();
        
        // Update mood in main data
        this.data.mood = mood;
        this.updateStatus();
    }

    logEntry(entry) {
        console.log('logEntry called with:', entry);
        
        // Add to recent activities
        this.data.recent_activities.unshift(entry);
        
        // Keep only last 50 activities
        if (this.data.recent_activities.length > 50) {
            this.data.recent_activities = this.data.recent_activities.slice(0, 50);
        }
        
        // Update last check-in
        this.data.last_checkin = new Date().toISOString();
        
        console.log('Updated data:', this.data);
        
        // Save to localStorage
        this.saveToLocalStorage();
        
        // Update status.json
        this.updateStatus();
        
        // Update dashboard
        this.updateDashboard();
        
        // Show success message
        this.showNotification('Entry logged successfully!', 'success');
        
        console.log('Entry logged:', entry);
    }

    clearFinanceForm() {
        document.getElementById('income-input').value = '';
        document.getElementById('expense-input').value = '';
        document.getElementById('finance-description').value = '';
    }

    clearHealthForm() {
        document.getElementById('weight-input').value = '';
        document.getElementById('steps-input').value = '';
        document.getElementById('health-notes').value = '';
    }

    clearChanceForm() {
        document.getElementById('chance-activity').value = '';
        document.getElementById('chance-duration').value = '';
        document.getElementById('chance-notes').value = '';
    }

    clearMusicForm() {
        document.getElementById('music-title').value = '';
        document.getElementById('music-rating').value = '';
        document.getElementById('music-notes').value = '';
    }

    clearGoalForm() {
        document.getElementById('goal-title').value = '';
        document.getElementById('goal-category').value = '';
        document.getElementById('goal-progress').value = '';
    }

    clearProjectForm() {
        document.getElementById('project-name').value = '';
        document.getElementById('project-status').value = '';
        document.getElementById('project-update').value = '';
    }

    clearMoodForm() {
        document.getElementById('mood-select').value = '';
        document.getElementById('energy-level').value = '';
        document.getElementById('mood-notes').value = '';
    }

    loadStatus() {
        try {
            const saved = localStorage.getItem('travis-life-hub-data');
            if (saved) {
                const parsedData = JSON.parse(saved);
                // Merge with default data to ensure all properties exist
                this.data = { ...this.data, ...parsedData };
                console.log('Data loaded successfully:', this.data);
            } else {
                console.log('No saved data found, creating sample data');
                // Add some sample data for demonstration
                this.data = {
                    mood: 'Good',
                    weather: 'Sunny',
                    last_checkin: new Date().toISOString(),
                    chance_status: 'Fed and walked',
                    predicted_next_action: 'Work on projects',
                    recent_activities: [
                        {
                            type: 'mood',
                            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                            mood: 'Good',
                            energy: 8,
                            notes: 'Feeling productive today!'
                        },
                        {
                            type: 'chance',
                            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
                            activity: 'walked',
                            duration: 30,
                            notes: 'Great walk in the park'
                        },
                        {
                            type: 'music',
                            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
                            title: 'New Album - Artist',
                            rating: 9,
                            notes: 'Really digging this new sound'
                        }
                    ]
                };
                // Save the sample data immediately
                this.saveToLocalStorage();
                console.log('Sample data created and saved:', this.data);
            }
        } catch (error) {
            console.error('Error loading data:', error);
            // If there's an error, create default data
            this.data = {
                mood: 'Good',
                weather: 'Sunny',
                last_checkin: new Date().toISOString(),
                chance_status: 'Fed and walked',
                predicted_next_action: 'Work on projects',
                recent_activities: []
            };
        }
        
        // Force update the display immediately
        this.updateStatus();
        this.updateRecentActivity();
        this.refreshDebugInfo();
    }

    saveToLocalStorage() {
        try {
            const dataToSave = {
                mood: this.data.mood,
                weather: this.data.weather,
                last_checkin: this.data.last_checkin,
                chance_status: this.data.chance_status,
                predicted_next_action: this.data.predicted_next_action,
                recent_activities: this.data.recent_activities
            };
            
            localStorage.setItem('travis-life-hub-data', JSON.stringify(dataToSave));
            console.log('Data saved successfully:', dataToSave);
            
            // Also save a backup with timestamp
            const backupKey = `travis-life-hub-backup-${new Date().toISOString().split('T')[0]}`;
            localStorage.setItem(backupKey, JSON.stringify(dataToSave));
            
            // Update debug info
            this.refreshDebugInfo();
            
        } catch (error) {
            console.error('Error saving data:', error);
            this.showNotification('Error saving data. Please check your browser storage.', 'error');
        }
    }

    updateStatus() {
        // Create status summary for AI access
        const status = {
            mood: this.data.mood,
            weather: this.data.weather,
            last_checkin: this.data.last_checkin,
            chance_status: this.data.chance_status,
            predicted_next_action: this.data.predicted_next_action,
            recent_activities: this.data.recent_activities.slice(0, 10) // Last 10 activities
        };

        // Save status.json (in localStorage for now, but could be sent to server)
        try {
            localStorage.setItem('travis-life-hub-status', JSON.stringify(status, null, 2));
        } catch (error) {
            console.error('Error saving status:', error);
        }
        
        // Update display
        this.updateStatusDisplay(status);
    }

    updateStatusDisplay(status) {
        console.log('updateStatusDisplay called with:', status);
        
        const moodElement = document.getElementById('current-mood');
        const checkinElement = document.getElementById('last-checkin');
        const chanceElement = document.getElementById('chance-status');
        const predictedElement = document.getElementById('predicted-action');
        
        console.log('Found elements:', {
            moodElement: moodElement,
            checkinElement: checkinElement,
            chanceElement: chanceElement,
            predictedElement: predictedElement
        });
        
        if (moodElement) {
            moodElement.textContent = status.mood;
            console.log('Updated mood to:', status.mood);
        } else {
            console.error('Mood element not found!');
        }
        
        if (checkinElement) {
            checkinElement.textContent = new Date(status.last_checkin).toLocaleString();
            console.log('Updated checkin to:', new Date(status.last_checkin).toLocaleString());
        } else {
            console.error('Checkin element not found!');
        }
        
        if (chanceElement) {
            chanceElement.textContent = status.chance_status;
            console.log('Updated chance to:', status.chance_status);
        } else {
            console.error('Chance element not found!');
        }
        
        if (predictedElement) {
            predictedElement.textContent = status.predicted_next_action;
            console.log('Updated predicted to:', status.predicted_next_action);
        } else {
            console.error('Predicted element not found!');
        }
    }

    updateDashboard() {
        this.updateStatus();
        this.updateRecentActivity();
        this.refreshDebugInfo();
    }

    updateRecentActivity() {
        const container = document.getElementById('recent-activity');
        if (!container) return;
        
        const activities = this.data.recent_activities.slice(0, 5);
        
        if (activities.length === 0) {
            container.innerHTML = '<div class="text-gray-500">No recent activity</div>';
            return;
        }

        container.innerHTML = activities.map(activity => {
            const time = new Date(activity.timestamp).toLocaleTimeString();
            let description = '';
            
            switch(activity.type) {
                case 'mood':
                    description = `Mood: ${activity.mood}`;
                    break;
                case 'chance':
                    description = `Chance: ${activity.activity}`;
                    break;
                case 'music':
                    description = `Music: ${activity.title}`;
                    break;
                case 'finance':
                    description = `Finance: ${activity.description || 'Entry logged'}`;
                    break;
                case 'health':
                    description = `Health: ${activity.notes || 'Entry logged'}`;
                    break;
                case 'goal':
                    description = `Goal: ${activity.title}`;
                    break;
                case 'project':
                    description = `Project: ${activity.name}`;
                    break;
                default:
                    description = 'Activity logged';
            }
            
            return `<div class="flex justify-between text-sm">
                <span>${description}</span>
                <span class="text-gray-500">${time}</span>
            </div>`;
        }).join('');
    }

    exportData() {
        const data = {
            status: JSON.parse(localStorage.getItem('travis-life-hub-status') || '{}'),
            fullData: this.data,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `travis-life-hub-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Data exported successfully!', 'success');
    }

    handleAIChat() {
        const input = document.getElementById('ai-input').value.trim();
        if (!input) return;

        const responseDiv = document.getElementById('ai-response');
        responseDiv.innerHTML = '<p class="text-gray-500">Processing...</p>';

        // Simulate AI response (in real implementation, this would call your local LLM)
        setTimeout(() => {
            const status = JSON.parse(localStorage.getItem('travis-life-hub-status') || '{}');
            const response = this.generateAIResponse(input, status);
            responseDiv.innerHTML = `<p class="text-gray-800">${response}</p>`;
        }, 1000);

        document.getElementById('ai-input').value = '';
    }

    generateAIResponse(input, status) {
        // Simple response generation based on status data
        const inputLower = input.toLowerCase();
        
        if (inputLower.includes('mood') || inputLower.includes('feeling')) {
            return `Based on your recent data, your current mood is: ${status.mood || 'Unknown'}. Your last check-in was ${status.last_checkin ? new Date(status.last_checkin).toLocaleString() : 'unknown'}.`;
        } else if (inputLower.includes('chance') || inputLower.includes('dog')) {
            return `Chance's current status: ${status.chance_status || 'Unknown'}. ${status.predicted_next_action || 'No prediction available.'}`;
        } else if (inputLower.includes('activity') || inputLower.includes('recent')) {
            const recent = status.recent_activities || [];
            if (recent.length > 0) {
                const lastActivity = recent[0];
                return `Your most recent activity was: ${lastActivity.type} at ${new Date(lastActivity.timestamp).toLocaleString()}.`;
            } else {
                return 'No recent activities found.';
            }
        } else {
            return `I can see your current status: Mood: ${status.mood}, Last check-in: ${status.last_checkin ? new Date(status.last_checkin).toLocaleString() : 'Unknown'}. How can I help you today?`;
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500 text-white' : 
            type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }

    // Add method to check storage availability
    checkStorageAvailability() {
        try {
            const test = 'test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Add method to clear all data
    clearAllData() {
        try {
            localStorage.removeItem('travis-life-hub-data');
            localStorage.removeItem('travis-life-hub-status');
            this.data = {
                mood: 'Unknown',
                weather: 'Unknown',
                last_checkin: new Date().toISOString(),
                chance_status: 'Unknown',
                predicted_next_action: 'Unknown',
                recent_activities: []
            };
            this.updateDashboard();
            this.showNotification('All data cleared successfully!', 'success');
        } catch (error) {
            console.error('Error clearing data:', error);
            this.showNotification('Error clearing data.', 'error');
        }
    }

    // Add missing handleQuickAction method
    handleQuickAction(action) {
        switch(action) {
            case 'mood':
                this.switchTab('mood');
                break;
            case 'chance':
                this.switchTab('chance');
                break;
            case 'music':
                this.switchTab('music');
                break;
            default:
                console.log('Unknown action:', action);
        }
    }

    // Add debug methods
    refreshDebugInfo() {
        const storageStatus = document.getElementById('storage-status');
        const dataCount = document.getElementById('data-count');
        const lastSave = document.getElementById('last-save');
        
        if (storageStatus) {
            storageStatus.textContent = this.checkStorageAvailability() ? 'Available' : 'Not Available';
        }
        
        if (dataCount) {
            dataCount.textContent = this.data.recent_activities.length;
        }
        
        if (lastSave) {
            const saved = localStorage.getItem('travis-life-hub-data');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    lastSave.textContent = new Date(parsed.last_checkin || Date.now()).toLocaleString();
                } catch (e) {
                    lastSave.textContent = 'Error reading';
                }
            } else {
                lastSave.textContent = 'Never';
            }
        }
    }

    // Override saveToLocalStorage to update debug info
    saveToLocalStorage() {
        try {
            const dataToSave = {
                mood: this.data.mood,
                weather: this.data.weather,
                last_checkin: this.data.last_checkin,
                chance_status: this.data.chance_status,
                predicted_next_action: this.data.predicted_next_action,
                recent_activities: this.data.recent_activities
            };
            
            localStorage.setItem('travis-life-hub-data', JSON.stringify(dataToSave));
            console.log('Data saved successfully:', dataToSave);
            
            // Also save a backup with timestamp
            const backupKey = `travis-life-hub-backup-${new Date().toISOString().split('T')[0]}`;
            localStorage.setItem(backupKey, JSON.stringify(dataToSave));
            
            // Update debug info
            this.refreshDebugInfo();
            
        } catch (error) {
            console.error('Error saving data:', error);
            this.showNotification('Error saving data. Please check your browser storage.', 'error');
        }
    }

    // Override updateDashboard to include debug refresh
    updateDashboard() {
        this.updateStatus();
        this.updateRecentActivity();
        this.refreshDebugInfo();
    }

    // Add method to force display update
    forceDisplayUpdate() {
        console.log('Force updating display...');
        console.log('Current data:', this.data);
        
        // Force update the status display
        const status = {
            mood: this.data.mood,
            weather: this.data.weather,
            last_checkin: this.data.last_checkin,
            chance_status: this.data.chance_status,
            predicted_next_action: this.data.predicted_next_action,
            recent_activities: this.data.recent_activities.slice(0, 10)
        };
        
        this.updateStatusDisplay(status);
        this.updateRecentActivity();
        this.refreshDebugInfo();
        
        console.log('Display update complete');
    }
    
    // Add method to force reset data
    forceResetData() {
        console.log('Force resetting data...');
        
        // Clear localStorage
        localStorage.removeItem('travis-life-hub-data');
        localStorage.removeItem('travis-life-hub-status');
        
        // Reset data to sample data
        this.data = {
            mood: 'Good',
            weather: 'Sunny',
            last_checkin: new Date().toISOString(),
            chance_status: 'Fed and walked',
            predicted_next_action: 'Work on projects',
            recent_activities: [
                {
                    type: 'mood',
                    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                    mood: 'Good',
                    energy: 8,
                    notes: 'Feeling productive today!'
                },
                {
                    type: 'chance',
                    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
                    activity: 'walked',
                    duration: 30,
                    notes: 'Great walk in the park'
                },
                {
                    type: 'music',
                    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
                    title: 'New Album - Artist',
                    rating: 9,
                    notes: 'Really digging this new sound'
                }
            ]
        };
        
        // Save the new data
        this.saveToLocalStorage();
        
        // Update display
        this.updateDashboard();
        
        console.log('Data reset complete');
        this.showNotification('Data reset successfully!', 'success');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    window.app = new TravisLifeHub();
    
    // Check storage availability
    if (!window.app.checkStorageAvailability()) {
        alert('Warning: Local storage is not available. Data will not be saved.');
    }
    
    // Force display update after a short delay to ensure everything is loaded
    setTimeout(() => {
        console.log('Forcing display update...');
        window.app.forceDisplayUpdate();
    }, 100);
}); 