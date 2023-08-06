import prisma from "../../../libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(req) {

    try {
        const { uniqueChatId } = await req.json();
    
        const chat = await prisma.chat.findUnique({
          where: {
            id: uniqueChatId,
          },
        });
    
        if (!chat) {
            return NextResponse.json({ error: "Unique chat was not able to be found." }, { status: 404 });
        }
    
        return NextResponse.json({ uniqueChat: chat }, { status: 200 });

      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred while retrieving the chat" }, { status: 500 });
      }

}