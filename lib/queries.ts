import clientPromise from "@/mongoose";

export const getTodos = async () => {
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const collection = db.collection("test");

        const todos = await collection.find({}).toArray();
        return todos;
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}