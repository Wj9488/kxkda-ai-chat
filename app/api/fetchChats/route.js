
import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb"

// /api/fetchChats

export async function POST(req) {

    // const userEmail = "wtjones10@gmail.com"
    const { userEmail } = await req.json()
    
    // console.log("Request Query", req);
    // console.log("Fetch Chat Endpoint Email",userEmail);

    try {
        const user = await prisma.user.findUnique({
            where: { email: userEmail },
            include: { chats: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ chats: user.chats }, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred fetching chats." }, { status: 501 });
    }
}


// import { NextResponse } from "next/server";
// import prisma from "../../libs/prismadb";

// // /api/fetchChats

// export async function POST(req) {
//   const userEmail = await req.json()

//   console.log(req.body);
//   console.log(userEmail);

//   return NextResponse( {status: 200}, { ENDPOINT_REQUEST: req } )

// //   try {
// //     const user = await prisma.user.findUnique({
// //       where: { email: userEmail },
// //       include: { chats: true },
// //     });

// //     if (!user) {
// //       return NextResponse.json({ error: "User not found" }, { status: 404 });
// //     }

// //     return NextResponse.json({ chats: user.chats }, { status: 200 });
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json({ error: "An error occurred fetching chats." }, { status: 500 });
// //   }
// }
