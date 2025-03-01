import { revalidateTag } from "next/cache";

class ClearCache {
    static async clearcache(key:string) {
        revalidateTag(key)
    }
}

export {ClearCache}