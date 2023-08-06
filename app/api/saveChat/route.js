import prisma from "../../../libs/prismadb"

export async function POST(req) {

    // Endpoint function receives the POST request from Axios

    const { chatContent, userEmail } = await req.json();

    try {
        // Find the user by their email
        const user = await prisma.user.findUnique({
          where: { email: userEmail },
        });
    
        if (!user) {
          // Handle case where no user was found
          return new Response("User not found");
        }
    
        // Create the chat with the found user's ID
        const chat = await prisma.chat.create({
          data: {
            content: chatContent,
            userId: user.id, // Use the ID from the found user
          },
        });
    
        return new Response(JSON.stringify(chat));
      } catch (error) {
        console.error(error);
        return new Response("Error occurred while saving the chat");
      }
}