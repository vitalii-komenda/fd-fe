import { get } from "local-storage";
import { createContext } from "react";

export const AppContext = createContext(
  {} as {
    signup: any;
    login: any;
    del: any;
    create: any;
    update: any;
    fetchAll: any;
  }
);

export default ({ children }: { children: React.ReactNode }) => {
  const url = "http://localhost:3001";

  const request = async (path: string, options?: RequestInit) => {
    const res = await fetch(`${url}/${path}`, {
      ...options,
      headers: {
        ...options?.headers,
        "x-access-token": get("token"),
      },
      credentials: "include",
    });

    if (res.status === 401) {
      throw new Error('"Unauthorized');
    }

    return res;
  };

  const fetchAll = () => {
    return request(`todos`).then((response) => {
      return response.json();
    });
  };
  const update = (data: { id: number; completed: boolean }) => {
    return request(`todos/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: data.completed }),
    }).then((response) => response.json());
  };
  const create = (data: { title: string }) => {
    return request(`todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: data.title }),
    }).then((response) => response.json());
  };
  const del = (data: { id: number }) => {
    return request(`todos`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: data.id }),
    }).then((response) => response.json());
  };
  const login = (data: { email: string; password: string }) => {
    return request(`login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    }).then((response) => response.json());
  };
  const signup = (data: { name: string; email: string; password: string }) => {
    return request(`signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    }).then((response) => response.json());
  };

  return (
    <AppContext.Provider
      value={{
        signup,
        login,
        del,
        create,
        update,
        fetchAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
