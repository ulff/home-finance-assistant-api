const {
  PORT,
  NODE_ENV,
  DATABASE_URL,
} = process.env;

type configType = {
  port: number;
  environment: string;
  databaseUrl: string;
}

export const config: configType = {
  port: +PORT || 8080,
  environment: NODE_ENV || "development",
  databaseUrl: DATABASE_URL || "postgres://hfa:nNC6LG@localhost:5432/hfadb",
};

