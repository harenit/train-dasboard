
# AI-Powered Train Traffic Control System

## 1. Project Overview

The **AI-Powered Train Traffic Control System** is a web-based railway traffic monitoring and control dashboard designed to visualize train schedules, monitor railway performance, analyze potential disruptions, and support traffic management decisions.

The system provides an interactive dashboard with train information, key performance indicators (KPIs), what-if analysis, control panel actions, and an audit trail.

It aims to demonstrate how digital technologies can support efficient railway traffic monitoring and decision-making.

## 2. Features

### Dashboard
- Displays an overview of railway traffic.
- Shows train information and operational statistics.
- Provides visual representations of railway performance.

### Schedule View
- Displays train scheduling information.
- Provides an overview of train movements and timings.

### What-If Analysis
- Simulates potential railway disruptions.
- Estimates the impact of disruptions on train operations.
- Displays preset recommendations for handling different scenarios.

### Key Performance Indicators (KPIs)
- Displays railway performance metrics.
- Monitors operational statistics.
- Provides simulated KPI updates.

### Control Panel
- Provides manual override controls.
- Includes emergency action options.
- Displays notifications when control actions are triggered.

### Audit Trail
- Displays sample system activity records.
- Maintains a visual history of system actions.
- Supports exporting audit information in JSON format.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structure of the web application |
| CSS3 | Styling and responsive design |
| JavaScript (ES6) | Application logic and interactions |
| Chart.js | Data visualization and charts |

## 4. Project Structure

```text
AI-Powered-Train-Traffic-Control-System/
│
├── index.html
├── style.css
├── app.js
└── README.md
```

- **index.html** – Defines the structure and layout of the dashboard.
- **style.css** – Contains styling, themes, and responsive layouts.
- **app.js** – Implements dashboard interactions, train data, KPI simulations, charts, and analysis.
- **README.md** – Provides project documentation.

## 5. Installation and Setup

### Prerequisites
- A modern web browser such as Google Chrome, Microsoft Edge, or Firefox.
- A code editor such as Visual Studio Code.
- Internet connection for loading the Chart.js CDN.

### Steps to Run the Project

1. Download or clone the project repository.

2. Open the project folder in Visual Studio Code.

3. Ensure that the following files are present:
   - `index.html`
   - `style.css`
   - `app.js`

4. Open `index.html` in a web browser.

Alternatively, run the project using Python's local development server:

```bash
python -m http.server 8000
```

Then open the following URL in your browser:

```text
http://localhost:8000
```

## 6. How to Use the Application

1. Open the application in your browser.
2. Navigate through the dashboard sections.
3. View train information and railway performance metrics.
4. Use the Schedule View to explore train scheduling information.
5. Open What-If Analysis to simulate railway disruptions and view their estimated impacts.
6. Explore the KPI section to monitor operational performance.
7. Use the Control Panel to trigger available demonstration actions.
8. Visit the Audit Trail to view recorded sample activities and export the data.

## 7. Implementation Details

The application uses a JavaScript class named `TrainControlSystem` to manage its functionality.

The implementation includes:

- Sample train and operational data.
- Dashboard navigation and section management.
- Simulated KPI updates.
- What-if disruption impact calculations using predefined multipliers.
- Preset recommendations for disruption scenarios.
- Demonstration notifications for manual override and emergency actions.
- Sample audit trail entries.
- JSON export functionality.
- Chart.js-based data visualization.
- Periodic simulated dashboard updates.

## 8. Current Limitations

The current version is a frontend demonstration prototype.

- Train information is based on predefined sample data.
- KPI optimization is simulated rather than performed using an actual Genetic Algorithm or Network Flow optimization engine.
- What-if analysis uses predefined calculations and recommendations.
- Manual override and emergency controls display notifications but do not control real railway infrastructure.
- Schedule filtering is not fully implemented.
- Audit records are sample entries rather than persistent database records.
- No backend database or real-time railway data integration is currently available.
- The online status indicator is visual and does not verify an actual server connection.

**Important:** This project is intended for academic demonstration and visualization. It is not designed or certified for real-world railway traffic control.

## 9. Future Enhancements

The project can be enhanced with the following features:

- Integration with real-time railway data sources.
- Development of a backend using Python or Java.
- Database integration for train schedules and audit records.
- Implementation of actual Genetic Algorithm-based optimization.
- Network Flow algorithms for train routing and traffic management.
- Machine learning-based delay prediction.
- Real-time alerts and notifications.
- User authentication and role-based access control.
- Advanced disruption detection and recovery recommendations.
- Integration with railway monitoring systems.

## 10. Conclusion

The AI-Powered Train Traffic Control System demonstrates a web-based approach to railway traffic monitoring and management. It combines dashboard visualization, train scheduling information, KPI monitoring, disruption analysis, and control panel demonstrations in a single interface.

The project provides a foundation for developing a more advanced intelligent railway traffic management solution through future integration of optimization algorithms, artificial intelligence, real-time data, and backend services.

## 11. License

This project is developed for educational and academic purposes. Add an appropriate open-source license if you intend to distribute the project publicly.

---

**Developed as an academic project.**
