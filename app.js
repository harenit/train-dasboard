// AI-Powered Train Scheduling System - Frontend Application
class TrainControlSystem {
    constructor() {
        this.currentSection = 'dashboard';
        this.refreshInterval = null;
        this.charts = {};
        this.data = {
            trains: [
                {"id": 1, "name": "Express 101", "type": "Express", "route": ["A", "B", "C", "D"], "priority": 1, "scheduledTime": "08:00", "actualTime": "08:02", "status": "Delayed", "platform": "P1"},
                {"id": 2, "name": "Local 201", "type": "Local", "route": ["A", "C", "D"], "priority": 3, "scheduledTime": "08:15", "actualTime": "08:15", "status": "On-time", "platform": "P2"},
                {"id": 3, "name": "Freight 301", "type": "Freight", "route": ["B", "C", "D"], "priority": 4, "scheduledTime": "08:30", "actualTime": "08:35", "status": "Delayed", "platform": "P3"},
                {"id": 4, "name": "Express 102", "type": "Express", "route": ["A", "B", "D"], "priority": 1, "scheduledTime": "08:45", "actualTime": "08:45", "status": "On-time", "platform": "P1"},
                {"id": 5, "name": "Local 202", "type": "Local", "route": ["A", "C"], "priority": 3, "scheduledTime": "09:00", "actualTime": "09:00", "status": "On-time", "platform": "P2"}
            ],
            kpis: {
                punctuality: 85.2,
                averageDelay: 3.5,
                throughput: 28,
                utilization: 72.8,
                conflicts: 2
            },
            disruptions: [
                {"type": "Signal Failure", "location": "B-C", "impact": "High", "duration": 30},
                {"type": "Weather", "location": "C-D", "impact": "Medium", "duration": 15}
            ]
        };
        
        this.init();
    }

    async init() {
        console.log('🚂 Initializing Train Control System...');
        this.setupEventListeners();
        this.setupNavigation();
        this.loadInitialData();
        this.startAutoRefresh();
        this.initializeCharts();
        this.showNotification('System initialized successfully', 'success');
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.switchSection(section);
            });
        });

        // Run Optimization Button
        document.getElementById('runOptimization').addEventListener('click', () => {
            this.runOptimization();
        });

        // What-If Analysis Form
        document.getElementById('scenarioForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.runSimulation();
        });

        // Control Panel Forms
        document.getElementById('overrideForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.applyOverride();
        });

        // Emergency Controls
        document.getElementById('emergencyStop').addEventListener('click', () => {
            this.emergencyAction('stop');
        });
        document.getElementById('holdAllTrains').addEventListener('click', () => {
            this.emergencyAction('hold');
        });
        document.getElementById('resumeOperations').addEventListener('click', () => {
            this.emergencyAction('resume');
        });

        // Audit Trail Controls
        document.getElementById('exportAudit').addEventListener('click', () => {
            this.exportAuditTrail();
        });
        document.getElementById('refreshAudit').addEventListener('click', () => {
            this.loadAuditTrail();
        });

        // Notification Close
        document.querySelector('.toast-close').addEventListener('click', () => {
            this.hideNotification();
        });
    }

    setupNavigation() {
        // Set initial active section
        this.switchSection('dashboard');
    }

    switchSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        this.currentSection = sectionName;

        // Load section-specific data
        switch(sectionName) {
            case 'dashboard':
                this.loadDashboardData();
                break;
            case 'schedule':
                this.loadScheduleData();
                break;
            case 'kpis':
                this.updateCharts();
                break;
            case 'control':
                this.loadControlPanelData();
                break;
            case 'audit':
                this.loadAuditTrail();
                break;
        }
    }

    loadInitialData() {
        this.loadDashboardData();
    }

    loadDashboardData() {
        this.updateKPIDisplay(this.data.kpis);
        this.updateTrainStatus(this.data.trains);
        this.updateDisruptions(this.data.disruptions);
    }

    updateKPIDisplay(kpis) {
        document.getElementById('punctuality').textContent = `${kpis.punctuality}`;
        document.getElementById('throughput').textContent = kpis.throughput;
        document.getElementById('utilization').textContent = `${kpis.utilization}`;
        document.getElementById('conflicts').textContent = kpis.conflicts;

        // Update timestamp
        document.getElementById('lastUpdateTime').textContent = new Date().toLocaleTimeString();
    }

    updateTrainStatus(trains) {
        const container = document.getElementById('trainStatusList');
        container.innerHTML = '';

        trains.forEach(train => {
            const trainElement = document.createElement('div');
            trainElement.className = `train-status-item ${train.status.toLowerCase().replace('-', '')}`;
            trainElement.innerHTML = `
                <div class="train-info">
                    <h4>${train.name}</h4>
                    <div class="train-details">
                        Route: ${train.route.join(' → ')} | Platform: ${train.platform}
                    </div>
                </div>
                <div class="train-status ${train.status.toLowerCase().replace('-', '')}">${train.status}</div>
            `;
            container.appendChild(trainElement);
        });
    }

    updateDisruptions(disruptions) {
        const container = document.getElementById('disruptionList');
        container.innerHTML = '';

        if (disruptions.length === 0) {
            container.innerHTML = '<p class="no-disruptions">No active disruptions</p>';
            return;
        }

        disruptions.forEach(disruption => {
            const disruptionElement = document.createElement('div');
            disruptionElement.className = 'disruption-item';
            disruptionElement.innerHTML = `
                <div class="disruption-info">
                    <h4>${disruption.type}</h4>
                    <div class="disruption-details">
                        Location: ${disruption.location} | Impact: ${disruption.impact} | Duration: ${disruption.duration}min
                    </div>
                </div>
            `;
            container.appendChild(disruptionElement);
        });
    }

    runOptimization() {
        this.showLoading();
        this.showNotification('Running GA + Network Flow optimization...', 'info');

        // Simulate optimization process
        setTimeout(() => {
            // Simulate improved metrics
            this.data.kpis.punctuality = Math.min(95, this.data.kpis.punctuality + Math.random() * 5);
            this.data.kpis.throughput = Math.max(1, this.data.kpis.throughput + Math.floor(Math.random() * 3));
            this.data.kpis.utilization = Math.min(95, this.data.kpis.utilization + Math.random() * 3);
            this.data.kpis.conflicts = Math.max(0, this.data.kpis.conflicts - Math.floor(Math.random() * 2));

            this.updateKPIDisplay(this.data.kpis);
            this.hideLoading();
            this.showNotification(`Optimization completed! Improved punctuality to ${this.data.kpis.punctuality.toFixed(1)}%`, 'success');
        }, 3000);
    }

    runSimulation() {
        this.showLoading();

        const scenario = {
            type: document.getElementById('disruptionType').value,
            location: document.getElementById('disruptionLocation').value,
            impact: document.getElementById('impactLevel').value,
            duration: parseInt(document.getElementById('duration').value)
        };

        // Simulate scenario analysis
        setTimeout(() => {
            this.displaySimulationResults(scenario);
            this.hideLoading();
            this.showNotification('What-if simulation completed', 'success');
        }, 2000);
    }

    displaySimulationResults(scenario) {
        const container = document.getElementById('simulationResults');
        
        // Calculate impact based on scenario
        const impactMultiplier = {'Low': 0.1, 'Medium': 0.3, 'High': 0.5}[scenario.impact];
        const throughputImpact = Math.floor(this.data.kpis.throughput * impactMultiplier);
        const punctualityImpact = this.data.kpis.punctuality * impactMultiplier;
        
        container.innerHTML = `
            <div class="simulation-result">
                <h4>Scenario: ${scenario.type} at ${scenario.location}</h4>
                <div class="result-metrics">
                    <div class="metric">
                        <span class="label">Impact Level:</span>
                        <span class="value">${scenario.impact}</span>
                    </div>
                    <div class="metric">
                        <span class="label">Duration:</span>
                        <span class="value">${scenario.duration} minutes</span>
                    </div>
                    <div class="metric">
                        <span class="label">Throughput Reduction:</span>
                        <span class="value">-${throughputImpact} trains</span>
                    </div>
                    <div class="metric">
                        <span class="label">Punctuality Impact:</span>
                        <span class="value">-${punctualityImpact.toFixed(1)}%</span>
                    </div>
                </div>
                <div class="scenario-recommendation">
                    <h5>AI Recommendations:</h5>
                    <ul>
                        <li>Reroute ${Math.ceil(throughputImpact * 0.7)} trains via alternative routes</li>
                        <li>Increase buffer times by ${scenario.duration / 2} minutes</li>
                        <li>Deploy additional signaling personnel to affected section</li>
                        <li>Estimated recovery time: ${scenario.duration + 15} minutes</li>
                    </ul>
                </div>
            </div>
        `;
    }

    applyOverride() {
        const overrideData = {
            trainId: document.getElementById('overrideTrainId').value,
            action: document.getElementById('overrideAction').value,
            reason: document.getElementById('overrideReason').value
        };

        this.showNotification('Manual override applied successfully', 'success');
        document.getElementById('overrideForm').reset();
    }

    emergencyAction(action) {
        const actions = {
            stop: 'Emergency stop activated for all trains',
            hold: 'All trains placed on hold',
            resume: 'Normal operations resumed'
        };

        this.showNotification(actions[action], action === 'stop' ? 'error' : 'warning');
    }

    loadScheduleData() {
        this.displayScheduleTimeline();
    }

    displayScheduleTimeline() {
        const container = document.getElementById('scheduleTimeline');
        const timeLabels = document.getElementById('timeLabels');
        
        // Create time labels
        timeLabels.innerHTML = '';
        for (let hour = 8; hour <= 18; hour++) {
            const label = document.createElement('span');
            label.textContent = `${hour}:00`;
            timeLabels.appendChild(label);
        }

        // Display trains in timeline
        container.innerHTML = '';
        
        this.data.trains.forEach(train => {
            const trainElement = document.createElement('div');
            trainElement.className = `timeline-train ${train.type.toLowerCase()}`;
            trainElement.innerHTML = `
                <div class="train-info">
                    <h4>${train.name}</h4>
                    <div class="train-route">${train.route.join(' → ')}</div>
                    <div class="train-time">Scheduled: ${train.scheduledTime} | Actual: ${train.actualTime}</div>
                </div>
                <div class="train-status ${train.status.toLowerCase().replace('-', '')}">${train.status}</div>
            `;
            container.appendChild(trainElement);
        });
    }

    loadControlPanelData() {
        // Populate train selection dropdown
        const trainSelect = document.getElementById('overrideTrainId');
        trainSelect.innerHTML = '';
        
        this.data.trains.forEach(train => {
            const option = document.createElement('option');
            option.value = train.id;
            option.textContent = `${train.name} (${train.type})`;
            trainSelect.appendChild(option);
        });
    }

    initializeCharts() {
        this.createPunctualityChart();
        this.createThroughputChart();
        this.createTrainTypeChart();
        this.createUtilizationChart();
    }

    createPunctualityChart() {
        const ctx = document.getElementById('punctualityChart').getContext('2d');
        this.charts.punctuality = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00'],
                datasets: [{
                    label: 'Punctuality %',
                    data: [88, 92, 87, 94, 89, 91],
                    borderColor: '#4a9eff',
                    backgroundColor: 'rgba(74, 158, 255, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#ffffff' } }
                },
                scales: {
                    x: { ticks: { color: '#b8b8d4' } },
                    y: { ticks: { color: '#b8b8d4' } }
                }
            }
        });
    }

    createThroughputChart() {
        const ctx = document.getElementById('throughputChart').getContext('2d');
        this.charts.throughput = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Express', 'Local', 'Freight'],
                datasets: [{
                    label: 'Trains/Hour',
                    data: [12, 18, 6],
                    backgroundColor: ['#ff6b6b', '#4ecdc4', '#ffe66d']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#ffffff' } }
                },
                scales: {
                    x: { ticks: { color: '#b8b8d4' } },
                    y: { ticks: { color: '#b8b8d4' } }
                }
            }
        });
    }

    createTrainTypeChart() {
        const ctx = document.getElementById('trainTypeChart').getContext('2d');
        this.charts.trainType = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Express', 'Local', 'Freight'],
                datasets: [{
                    data: [35, 45, 20],
                    backgroundColor: ['#ff6b6b', '#4ecdc4', '#ffe66d']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#ffffff' } }
                }
            }
        });
    }

    createUtilizationChart() {
        const ctx = document.getElementById('utilizationChart').getContext('2d');
        this.charts.utilization = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Track A-B', 'Track B-C', 'Track C-D', 'Track A-C', 'Platform P1', 'Platform P2'],
                datasets: [{
                    label: 'Utilization %',
                    data: [85, 72, 90, 65, 88, 78],
                    borderColor: '#4a9eff',
                    backgroundColor: 'rgba(74, 158, 255, 0.2)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#ffffff' } }
                },
                scales: {
                    r: {
                        ticks: { color: '#b8b8d4' },
                        grid: { color: '#3c3c5a' }
                    }
                }
            }
        });
    }

    updateCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.update();
        });
    }

    loadAuditTrail() {
        const auditData = [
            { timestamp: "09:15:30", action: "optimization_run", user: "System", details: "GA + Network Flow optimization completed" },
            { timestamp: "09:10:45", action: "manual_override", user: "Controller A", details: "Delayed Express 101 by 2 minutes" },
            { timestamp: "09:05:12", action: "simulation_run", user: "Controller A", details: "What-if analysis: Signal Failure at B-C" },
            { timestamp: "09:00:00", action: "system_startup", user: "System", details: "AI Train Control System initialized" }
        ];
        
        this.displayAuditTrail(auditData);
    }

    displayAuditTrail(auditData) {
        const tbody = document.getElementById('auditTableBody');
        tbody.innerHTML = '';

        auditData.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.timestamp}</td>
                <td>${entry.action.replace('_', ' ').toUpperCase()}</td>
                <td>${entry.user}</td>
                <td>${entry.details}</td>
            `;
            tbody.appendChild(row);
        });
    }

    exportAuditTrail() {
        const auditData = [
            { timestamp: "09:15:30", action: "optimization_run", user: "System", details: "GA + Network Flow optimization completed" }
        ];
        const dataStr = JSON.stringify(auditData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `audit_trail_${new Date().toISOString().slice(0, 10)}.json`;
        link.click();
        
        this.showNotification('Audit trail exported successfully', 'success');
    }

    startAutoRefresh() {
        this.refreshInterval = setInterval(() => {
            if (this.currentSection === 'dashboard') {
                // Simulate small data changes
                this.data.kpis.punctuality += (Math.random() - 0.5) * 2;
                this.data.kpis.throughput += Math.floor((Math.random() - 0.5) * 3);
                this.data.kpis.utilization += (Math.random() - 0.5) * 3;
                
                this.updateKPIDisplay(this.data.kpis);
            }
        }, 30000); // Refresh every 30 seconds
    }

    showLoading() {
        document.getElementById('loadingOverlay').style.display = 'flex';
    }

    hideLoading() {
        document.getElementById('loadingOverlay').style.display = 'none';
    }

    showNotification(message, type = 'info') {
        const toast = document.getElementById('notificationToast');
        const icon = toast.querySelector('.toast-icon');
        const messageEl = toast.querySelector('.toast-message');
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        icon.textContent = icons[type] || icons.info;
        messageEl.textContent = message;
        
        toast.style.display = 'flex';
        
        setTimeout(() => {
            this.hideNotification();
        }, 5000);
    }

    hideNotification() {
        document.getElementById('notificationToast').style.display = 'none';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.trainSystem = new TrainControlSystem();
});