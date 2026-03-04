aps

This project is a frontend implementation of a cybersecurity vulnerability management dashboard. The goal was to build an interface similar to what you would find in a real enterprise security platform. It focuses on presenting scan data, vulnerability summaries, and scan activity in a way that is clear, responsive, and easy to interact with.

The application is built with React and Vite and uses a component‑based structure to keep the UI modular and maintainable.

Overview
The dashboard simulates how security teams monitor vulnerability scans across different assets. It includes a main dashboard with scan statistics and a table of scans. Selecting a scan opens a side panel that displays detailed information about the scan, including progress, logs, and detected vulnerabilities.

The project uses mock data so the interface behaves like a real application without requiring a backend service.

Tech Stack
React

Vite

React Router

Tailwind CSS

Context API for theme management

Key Features
Dashboard
The main dashboard shows an overview of security scans. It includes severity cards for vulnerabilities and a table listing all scans. The table supports search, filtering, and pagination so the data remains manageable even with larger lists.

Clicking a scan row opens a slide‑in panel from the right side of the screen that shows the detailed scan view.

Scan Detail View
The scan detail panel provides more context about a selected scan. It includes:

Circular progress indicator showing scan progress

Step tracker for the scan pipeline

Scan metadata such as targets, credentials, and files

Live scan console with activity logs

Finding log displaying vulnerabilities with severity labels

Theme System
The interface supports light and dark themes. The theme state is managed with React Context and stored in localStorage so the selected theme persists across sessions.

Responsive Layout
The layout is designed to work across different screen sizes. On desktop the scan detail view appears as a side panel, while on smaller screens it expands to full width.

Project Structure
src/

components/ – reusable UI components used throughout the app

pages/ – main route level views such as authentication and dashboard

context/ – global state providers such as the theme context

data/ – mock data used to simulate scan results

App.jsx – root component with application routing

Running the Project
Install dependencies:

npm install

Start the development server:

npm run dev

Build the project for production:

npm run build

Preview the production build:

npm run preview

Notes
This project focuses on frontend architecture and UI behavior. The scan data and logs are mocked to simulate how the interface would behave in a real security platform.

The structure is designed so a backend API could be integrated later without major changes to the UI components.