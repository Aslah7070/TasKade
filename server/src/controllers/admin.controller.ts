import { Request, Response } from "express";
import { Quote } from "../models/quote.model";

export const createQuote=async(req:Request,res:Response)=>{

    const { quoteText, authorName, authorImage, tags } = req.body;

    const newQuote = new Quote({
      quoteText,
      authorName,
      authorImage,
      tags,
    });

    await newQuote.save();
     res.status(201).json({ message: "Quote created successfully", data: newQuote });
     return

}