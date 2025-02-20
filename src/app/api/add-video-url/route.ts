import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse, NextMiddleware } from "next/server";

interface AddUrlBody {
    url: string;
}

class AddUrl {
    static async addurl(req: NextRequest, res: NextResponse) {
        try {

            const token = await getToken({req});

            if(!token) {
                return NextResponse.json({ message: "Unauthorized" },{status: 401 });
            }

        } catch (error) {
            if (error instanceof Error) {
                return NextResponse.json({ error: error.message }, { status: 400 });
            }
            return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        }
    }
}

export default AddUrl;