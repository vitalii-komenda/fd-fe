import "./App.css";
import { useState, useEffect, useContext } from "react";
import "react-notifications/lib/notifications.css";
import { Logo } from "./components/logo.component";
import TodoPage from "./pages/todo.page";
import LoginPage from "./pages/login.page";
import SignupPage from "./pages/signup.page";
import { AppContext } from "./service";

function App() {
  const [page, setPage] = useState("todo");
  const [todos, setTodos] = useState([]);
  const appContext = useContext(AppContext);

  const refetchTodos = () => {
    appContext
      .fetchAll()
      .then((data: []) => {
        setPage("todo");
        setTodos(data);
      })
      .catch((err: Error) => {
        setPage("login");
      });
  };

  const handleRedirectToSignup = () => {
    setPage("signup");
  };
  const handleRedirectToLogin = () => {
    console.log(111)
    setPage("login");
  };

  useEffect(() => {
    refetchTodos();
  }, []);

  const renderPage = () => {
    switch (page) {
      case "todo":
        return (
          <>
            <header className="App-header">Todo List</header>
            <TodoPage refetchTodos={refetchTodos} todos={todos} />
          </>
        );
      case "signup":
        return (
          <>
            <header className="App-header">Welcome!</header>
            <SignupPage handleRedirectToLogin={handleRedirectToLogin} />
          </>
        );
      case "login":
        return (
          <>
            <header className="App-header">Welcome back!</header>
            <LoginPage
              handleRedirectToSignup={handleRedirectToSignup}
              refetchTodos={refetchTodos}
            />
          </>
        );
    }
  };

  return (
    <div className="App-container">
      <div className="App">
        <Logo />

        {renderPage()}
      </div>
    </div>
  );
}

export default App;
