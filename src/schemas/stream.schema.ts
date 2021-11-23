import { object, string} from "yup";


export const createStreamSchema = object({
    query: object({
        video :string().matches(/\.(mp4|mkv|gif)$/gi,"video extension must be .mp4 or .mkv"),
        token:string()
    })
})