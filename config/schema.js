import { pgTable, integer, serial, varchar } from "drizzle-orm/pg-core"

export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    imageUrl: varchar('imageUrl').notNull(),
    credits: integer('credits').default(5)
})

export const AiGeneratedImage = pgTable('aiGeneratedImage', {
    id: serial('id').primaryKey(),
    roomType: varchar('roomType').notNull(),
    designType: varchar('designType').notNull(),
    orgImg: varchar('orgImg').notNull(),
    aiImage: varchar('aiImage').notNull(),
    userEmail: varchar('userEmail')
})