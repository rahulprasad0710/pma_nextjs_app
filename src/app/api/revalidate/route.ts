import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

function corsHeaders() {
    return {
        "Access-Control-Allow-Origin": "*", // or your specific admin domain
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
}

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const secret = searchParams.get("secret");
        const path = searchParams.get("path");
        console.log({
            secret,
            path,
        });

        if (secret !== process.env.REVALIDATE_TOKEN) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 }
            );
        }

        if (!path) {
            return NextResponse.json(
                { message: "Path is required" },
                { status: 400 }
            );
        }

        revalidatePath(path);
        revalidateTag("rooms");

        return NextResponse.json({ revalidated: true, path });
    } catch (error) {
        console.error("Error fetching rooms:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500, headers: corsHeaders() } // ✅ include here too
        );
    }
}
