import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const testTable = pgTable('test',{
    id: uuid().primaryKey().defaultRandom(),
    name: text()
})