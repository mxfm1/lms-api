import { pgTable, text, timestamp, boolean, integer, uuid, date, pgEnum, varchar } from "drizzle-orm/pg-core";

export const contentType = pgEnum('contentType',["video","text"])
export const courseContentStatus = pgEnum('status',["drafted","published","hidden"])

export const timestamps = {
    createdAt: timestamp("createdAt").$defaultFn(() => new Date()).notNull(),
    updatedAt: timestamp("updatedAt").$defaultFn(() => new Date()).notNull(),
}

export const user = pgTable("user", {
                    id: text('id').primaryKey(),
                    name: text('name').notNull(),
 email: text('email').notNull().unique(),
 emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
 image: text('image'),
 createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
 updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
                });

export const session = pgTable("session", {
                    id: text('id').primaryKey(),
                    expiresAt: timestamp('expires_at').notNull(),
 token: text('token').notNull().unique(),
 createdAt: timestamp('created_at').notNull(),
 updatedAt: timestamp('updated_at').notNull(),
 ipAddress: text('ip_address'),
 userAgent: text('user_agent'),
 userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' })
                });

export const account = pgTable("account", {
                    id: text('id').primaryKey(),
                    accountId: text('account_id').notNull(),
 providerId: text('provider_id').notNull(),
 userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
 accessToken: text('access_token'),
 refreshToken: text('refresh_token'),
 idToken: text('id_token'),
 accessTokenExpiresAt: timestamp('access_token_expires_at'),
 refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
 scope: text('scope'),
 password: text('password'),
 createdAt: timestamp('created_at').notNull(),
 updatedAt: timestamp('updated_at').notNull()
                });

export const verification = pgTable("verification", {
                    id: text('id').primaryKey(),
                    identifier: text('identifier').notNull(),
 value: text('value').notNull(),
 expiresAt: timestamp('expires_at').notNull(),
 createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
 updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
                });


export const profile = pgTable("profile",{
    id: text('id').primaryKey(),
    userId: text('userId').notNull().references(() => user.id,{onDelete: 'cascade'}),
    name: text('name').notNull(),
    lastName: text("lastName"),
    imageURL: text("imageURL"),
    email: text('email').unique(),
    companyName: text('companyName'),
    jobName: text('jobName'),
})

// COURSES SCHEMA
 
export const course = pgTable('course',{
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title'),
    description: text('description'),
    thumbnailUrl: text('thumbnailUrl'),
    isFree: boolean('isfree'),
    categoryId: uuid('categoryId').references(() => category.id,{onDelete:'cascade'}),
    status: courseContentStatus().default("drafted"),
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
})

export const category = pgTable('category',{
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name'),
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
})

// modulos - duracion estimada
export const courseModule = pgTable('courseModule',{
    id: uuid("id").primaryKey().defaultRandom(),
    title: text('title').notNull(),
    duration: integer('duration'),
    courseId: uuid('courseId').references(() => course.id,{onDelete:'cascade'}),
    order: integer('order').notNull(),
    isPublished: boolean('isPublished').default(false),
    ...timestamps
})

export const moduleLesson = pgTable('moduleLesson',{
    id: uuid('ID').primaryKey().defaultRandom(),
    title:text('title').notNull(),
    description: text('description'),
    duration: integer('duration'),
    completed: boolean('completed').default(false),
    order: integer('order').notNull(),
    moduleId: uuid('moduleId').references(() => courseModule.id,{onDelete:'cascade'})
})

export const lessonContent = pgTable('lessonContent',{
    id: uuid('id').primaryKey().defaultRandom(),
    contentType: contentType('contentType'),
    videoUrl: text('videoUrl'),
    duration: integer('duration'),
    transcript: text('transcript'),
    htmlContent: text('htmlContent'),
    lessonId: uuid('lessonId').references(() => moduleLesson.id,{onDelete: 'cascade'})
})

export const lessonAttachments = pgTable('lessonAttachment',{
    id: uuid('id').primaryKey().defaultRandom(),
    fileUrl: text('fileUrl').notNull(),
    fileName: varchar("fileName",{length:255}),
    fileDescription: text('fileDescription'),
    fileSize: integer('fileSize'),
    mimeType: varchar("mimeType",{length:255}),
    lessonId: uuid('lessonId').references(() => moduleLesson.id,{onDelete: 'cascade'}),
    ...timestamps
})