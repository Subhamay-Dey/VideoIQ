import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./ErrorReporter";

vine.errorReporter = () => new CustomErrorReporter();

const AddUrlSchema = vine.object({
    url: vine.string().url(),
    userid: vine.string(),
})

export default AddUrlSchema;