declare namespace Express {
  export interface Request {
    token?: string;
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: string;
    NODE_ENV: 'development' | 'production' | 'test';
    MONGODB_URI: string;
  }
}
