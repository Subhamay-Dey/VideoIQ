import AddUrlSchema from "@/validations/AddUrlValidation";
import vine, {errors} from "@vinejs/vine";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface AddUrlBody {
    url: string;
    userid: string;
}

class AddUrl {
    static async addurl(req: NextRequest) {
        try {

            const token = await getToken({req});

            if(!token) {
                return NextResponse.json({ message: "Unauthorized" },{status: 401 });
            }

            const body:AddUrlBody = await req.json();
            const validator = vine.compile(AddUrlSchema);
            const payload = await validator.validate(body)
            return NextResponse.json({ message: "Url added successfully", data: payload }, { status: 200 });

        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return NextResponse.json({ error: error.message }, { status: 422 });
            }
            return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        }
    }
}

export default AddUrl;