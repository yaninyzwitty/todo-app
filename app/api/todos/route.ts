import { NextResponse } from "next/server";
import clientPromise from "@/mongoose";

export async function POST (request: Request) {

    try {
        
        const { todo } = await request.json();
        const client = await clientPromise;
        const db = client.db("test");
        const collection = db.collection("test");

        const newTodo = await collection.insertOne({
            todo,
            completed: false,
            createdAt: new Date()
        });

        return NextResponse.json(newTodo);
      
    } catch (error) {
        console.log(error);

        return new NextResponse('Something went wrong', { status: 500 })
        
    }
    

}



  