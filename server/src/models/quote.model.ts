import mongoose,{Schema} from "mongoose";
import { IQuote } from "../types/type";


const quoteSchema=new Schema<IQuote>({
    quoteText: {
        type: String,
        required: true,
      },
      authorName: {
        type: String,
        required: true,
      },
      authorImage: {
        type: String,
        required: true,
      },
      tags: {
        type: [String],
        enum: ['life', 'love', 'success', 'motivation', 'wisdom'], 
        default: [],
      }
})
export const Quote=mongoose.model("Quote",quoteSchema)
