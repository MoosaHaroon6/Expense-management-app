export default {
    schema: "./utils/scheme.tsx",
    driver: "pg",
    dbCredentials: {
        connectionString: 'postgresql://db-expense_owner:************@ep-white-block-a5n58p3y.us-east-2.aws.neon.tech/db-expense?sslmode=require'
    },
    dialect: "postgresql",
}