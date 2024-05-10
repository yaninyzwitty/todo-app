import {NotebookPen} from "lucide-react";
import TodoForm from "./todo-form";
import {db} from "@/lib/db";
import Todo from "./todo";
async function Home() {
  const todos = await db.todo.findMany({});

  console.log(todos);
  return (
    <div
      className="bg-gradient-to-br   from-blue-500  to-[#8b5cf6] h-screen flex items-center justify-center flex-col space-y-6
    "
    >
      <div className="bg-white w-full max-w-xl rounded-md p-8 ">
        <div className="flex items-center   space-x-3">
          <h3 className="text-2xl font-bold">To-do-list</h3>
          {/* <Image src={"/ledger.svg"} width={32} height={32} alt="notebook" /> */}
          <NotebookPen className="h-7 w-7   text-green-500" />
        </div>
        <TodoForm />
        <div className="flex text-black  flex-col mt-4 space-y-4 ">
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

// CRUD
