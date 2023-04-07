import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import FilterComponent from "../components/filter.component";
import InputComponent from "../components/input.component";
import DeleteBtn from "../assets/delete-btn.svg";
import { AppContext } from "../service";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  color: #1f2a4b;
`;

const TodoText = styled.p<{ completed: boolean }>`
  width: calc(100% - 45px);
  color: #1f2a4b;
`;

const TodoDelete = styled.img.attrs(() => ({
  src: DeleteBtn,
}))`
  width: 11px;
  height: 11px;
  cursor: pointer;
`;

const TodoCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 18px;
  height: 18px;
  margin: 15px 14px 15px 0;
  border-radius: 4px;
  background-color: #4a77e5;
`;

const TodoListContainer = styled.div`
  margin: 25px 0 0 0;
`;

const TodoPage = ({
  todos,
  refetchTodos,
}: {
  todos: Todo[];
  refetchTodos: () => void;
}) => {
  const [localTodos, setLocalTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const appContext = useContext(AppContext);

  useEffect(() => {
    setLocalTodos(todos);
  }, [todos]);

  const handleToggleTodo = (id: number) => {
    setLocalTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          const completed = !todo.completed;
          appContext.update({ id, completed });

          return { ...todo, completed };
        }
        return todo;
      })
    );
  };
  const handleTodoDeleteion = async (id: number) => {
    await appContext.del({ id });

    refetchTodos();
  };

  const handleCreatingTodo = async (title: string) => {
    await appContext.create({ title });

    refetchTodos();
  };

  const handleFilterChange = (e: any): void => {
    setSelectedFilter(e.target.attributes.getNamedItem("data-name").value);
  };

  const filtered = () => {
    return localTodos.filter((todo: Todo) => {
      return (
        selectedFilter === "All" ||
        (todo.completed && selectedFilter === "Completed") ||
        (!todo.completed && selectedFilter === "Incompleted")
      );
    });
  };

  return (
    <TodoListContainer>
      <InputComponent
        placeholder="Add a new todo"
        onEnter={handleCreatingTodo}
        cleanOnEnter={true}
      />

      {filtered().map((todo) => (
        <TodoContainer key={todo.id}>
          <TodoCheckbox
            checked={todo.completed}
            onChange={() => handleToggleTodo(todo.id)}
          />
          <TodoText completed={todo.completed}>{todo.title}</TodoText>
          <TodoDelete onClick={() => handleTodoDeleteion(todo.id)} />
        </TodoContainer>
      ))}

      <FilterComponent
        handleFilterChange={handleFilterChange}
        selected={selectedFilter}
      />
    </TodoListContainer>
  );
};

export default TodoPage;
