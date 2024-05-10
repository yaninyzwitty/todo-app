"use server";

import { db } from "@/lib/db";
import { formSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const onAddToDo = async (values: z.infer<typeof formSchema>) => {
    try {

        const validatedFields = formSchema.safeParse(values);
        if (!validatedFields.success) {
            return {
                error: "Invalid fields!"
            }
        }

        const { todo } = validatedFields.data;


        // add this to the database

        const newTodo = await db.todo.create({
            data: {
                todo,
               description: "this is a new description",


            }
        });

        revalidatePath("/")
        
        return {
            success: newTodo.id
        }






    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong"
        }

    }



}

export const onDeleteTodo = async (todoId: string) => {
    try {
        if(!todoId) {
            // return
            throw new Error("Invalid todo id");
        }

        // delete from the database
        await db.todo.delete({
            where: {
                id: todoId
            },
            
        });
        revalidatePath("/");
        return {
            success: "Todo deleted successfully"
        
        }

        
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong"
        
        }
    }
}



export const onUpdateTodo = async (values: z.infer<typeof formSchema>, id: string ) => {
    try {
        const validatedFields = formSchema.safeParse(values);
        if (!validatedFields.success) {
            return {
                error: "Invalid fields!"
            }
        }

        const { todo } = validatedFields.data;

        // update the todo
        const updatedTodo = await db.todo.update({
            where: {
                id
            }, 
            data: {
                todo: todo
            }

        })

        revalidatePath('/')
        
        return {
            success: updatedTodo.todo
        }



        
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong!"

        
        }
        
    }

}