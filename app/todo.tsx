"use client";
import {onDeleteTodo} from "@/actions/todo";
import {Button} from "@/components/ui/button";
import {Todo as TodoType} from "@prisma/client";
import {SquarePen, Trash2} from "lucide-react";
import React, {useState, useTransition} from "react";
import EditForm from "./edit-form";

type Props = {
  todo: TodoType;
};

function Todo({todo}: Props) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const deleteTodo = (todoId: string) => {
    startTransition(() => {
      onDeleteTodo(todoId);
    });
  };

  const editting = (value: boolean) => {
    setIsEditing(value);
  };

  return (
    <>
      {isEditing === false ? (
        <div className="rounded-md w-full py-1 bg-green-500 flex items-center  ">
          {todo.todo}

          <div className=" px-4">
            <Button
              variant={"ghost"}
              className="hover:bg-yellow-500 rounded ml-auto"
              onClick={() => setIsEditing(true)}
            >
              <SquarePen className="h-4 w-4" />
            </Button>
            <Button
              variant={"ghost"}
              className="hover:bg-rose-500 rounded"
              disabled={isPending}
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <EditForm todo={todo.todo} todoId={todo.id} setIsEditing={editting} />
      )}
    </>
  );
}

export default Todo;
