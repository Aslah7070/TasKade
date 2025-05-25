
declare namespace Express {
  export interface Response {
    standardResponse: (
      statusCode: number,
  data: {
    success: boolean;
    message: string;
    [key: string]: any;
  }
    ) => void;
  }
  export interface Request {
    user?: string;
  }
}