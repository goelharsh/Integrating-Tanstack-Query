'use client'

// we can use the useIsFetching thing -> this can be used to show a loader until and unless all apis have fetched their data 
import { useQuery, useIsFetching } from "@tanstack/react-query";

interface Todo {
  id: number;
  title: string;
}

export default function Home() {
  const { data: todosData, isLoading, isError, isSuccess } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: ()=> fetch('https://jsonplaceholder.typicode.com/todos').then((res)=> res.json()),
    select: (todos) => todos.map((todo)=> ({id: todo.id, title: todo.title}))
  })

  const { data: usersData } = useQuery<any[]>({
    queryKey: ['users'],
    queryFn: ()=> fetch('https://jsonplaceholder.typicode.com/users').then((res)=> res.json()),
    enabled: !!todosData
  })

  if(isLoading){
    return (
      <main className="mt-4 flex items-center justify-center">
        Loading data....
      </main>
    )
  }

  if(isError){
    return (
      <main className="mt-4 flex items-center justify-center">
        Error while loading data...
      </main>
    )
  }
  return ( 
   <div>
      <h1 className="text-xl">Todos</h1>
      <div className="flex flex-col gap-2">
        {
          todosData?.slice(0,5).map((todo: Todo)=>(
            <div className="flex " key={todo.id}>
              <h2>{todo.title}</h2>
              </div>
          ))
        }
      </div>
      <h1 className="text-xl mt-9">Users</h1>
      <div className="flex flex-col gap-2">
        {
          usersData?.map((user: any)=>(
            <div className="flex " key={user.id}>
              <h2>{user.name}</h2>
              </div>
          ))
        }
      </div>
   </div>
  );
}
