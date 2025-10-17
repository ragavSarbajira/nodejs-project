import{neon} from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const{PGHOST,PGDATABASE,PGUSER,PGPASSWORD}=process.env;
//CREATE A SQL CONNECTION USING OUR ENV VARIABLE
export const sql=neon(
    `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`
) 