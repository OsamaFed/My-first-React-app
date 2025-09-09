
# React Todo App

My first React project - a simple and functional todo list application built with React, Material-UI, and Styled Components.

## 🌐 Live Demo

[View Live Demo](https://re-tasks.netlify.app)

## ✨ Features

- ✅ Add new tasks
- ✅ Update existing tasks
- ✅ Delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Modern and user-friendly interface
- ✅ Interactive notifications (Snackbar)
- ✅ Responsive design that works on all devices

## 🛠️ Technologies Used

- **React** - JavaScript library for building user interfaces
- **Material-UI** - Professional ready-to-use UI components
- **Styled Components** - CSS-in-JS library for component styling
- **Context API** - Global state management
- **UUID** - Unique identifier generation for tasks

## 🎯 React Concepts Applied

As my first React project, I implemented and learned the following concepts:

### Core React Concepts
- **Components** - Building reusable UI components
- **JSX** - Writing HTML-like syntax in JavaScript
- **Props** - Passing data between components
- **State Management** - Managing component state with useState
- **Event Handling** - Handling user interactions

### Advanced React Concepts
- **React Hooks**
  - `useState` - Managing local component state
  - `useReducer` - Managing complex state logic
  - `useContext` - Consuming context data
  - `useEffect` - Side effects and lifecycle methods

- **Context API** - Global state management without prop drilling
- **Custom Hooks** - Creating reusable stateful logic
- **Component Composition** - Building complex UIs from simple components

### State Management Patterns
- **Reducer Pattern** - Using useReducer for complex state updates
- **Context Provider Pattern** - Sharing state across components
- **Immutable State Updates** - Properly updating state without mutations

### Modern JavaScript (ES6+)
- Arrow functions
- Destructuring assignment
- Spread operator
- Template literals
- Array methods (map, filter, find)

## 📁 Project Structure

```
src/
├── contexts/              # React Context for global state
│   ├── TodosContext.js       # Todo items state management
│   └── SnackbarContext.js    # Notification system
├── Reducers/             # State management logic
│   └── TodolistReducer.js    # Todo list reducer functions
├── App.js                # Main application component
├── Todolist.js           # Todo list container component
├── Todos.js              # Individual todo item component
├── Snackbar.js           # Notification component
└── index.js              # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm (package manager)

### Installation

1. **Clone or download the project**
```bash
cd to
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The app will open in your browser at [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
```

## 📋 Available Scripts

### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.
Optimizes the build for the best performance.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## 💡 How to Use

1. **Add a new task**: Type your task in the text field and press Enter or click the add button
2. **Mark as complete**: Click the checkbox next to any task
3. **Edit a task**: Click the edit button and modify the text
4. **Delete a task**: Click the delete button to remove a task

## 🎓 What I Learned

This being my first React project, I gained hands-on experience with:

- Component-based architecture
- State management patterns
- React Hooks ecosystem
- Context API for global state
- Material-UI component library
- Modern JavaScript features
- CSS-in-JS with Styled Components
- Event handling and user interactions
- Conditional rendering
- List rendering and keys

## 🤝 Contributing

This is a learning project, but suggestions and feedback are welcome!

## 📄 License

This project is open source and available for personal and commercial use.

---

**Note**: This project was created with [Create React App](https://github.com/facebook/create-react-app).
