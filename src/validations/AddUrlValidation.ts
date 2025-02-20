import vine from "@vinejs/vine";

const AddUrlSchema = vine.object({
    url: vine.string().url(),
    userid: vine.string(),
})

export default AddUrlSchema;