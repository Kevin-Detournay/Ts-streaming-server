import {AnySchema} from "yup"
import {Context} from "koa";


const validate = (schema: AnySchema) => async (
    ctx : Context,
    next: () => Promise<any>,
) => {
    try {
        await schema.validate({
            body: ctx.body,
            query: ctx.query,
        })
        return next()
    } catch (e: any) {
        console.log(e)
        return ctx.status=400
    }
}

export default validate
