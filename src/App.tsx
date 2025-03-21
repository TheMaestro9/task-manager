import "./App.scss";
import Header from "./core/Header";
import "./index.scss";
import TaskDashboard from "./pages/task-dashboard/task-dashboard";

function App() {
  return (
    <div className="App">
      <Header />
      <TaskDashboard />
    </div>
  );
}

export default App;
