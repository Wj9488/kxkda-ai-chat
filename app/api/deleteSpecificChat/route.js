import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { uniqueChatId } = await req.json();

        // Delete the chat with the provided uniqueChatId
        const deletedChat = await prisma.chat.delete({
            where: {
                id: uniqueChatId,
            },
        });

        if (!deletedChat) {
            return NextResponse.json({ error: "Unique chat was not able to be deleted." }, { status: 404 });
        }

        return NextResponse.json({ message: "Chat deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred while deleting the chat" }, { status: 500 });
    }
}
