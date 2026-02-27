import { pgTable, uuid, text, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";

/* ── Users ── */
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    password: text("password"), // nullable for OAuth
    role: text("role", { enum: ["admin", "gym_owner"] }).notNull().default("gym_owner"),
    image: text("image"),
    emailVerified: timestamp("email_verified"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* ── Auth.js required tables ── */
export const accounts = pgTable("accounts", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
});

export const sessions = pgTable("sessions", {
    id: uuid("id").primaryKey().defaultRandom(),
    sessionToken: text("session_token").notNull().unique(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires").notNull(),
});

export const verificationTokens = pgTable("verification_tokens", {
    identifier: text("identifier").notNull(),
    token: text("token").notNull().unique(),
    expires: timestamp("expires").notNull(),
});

/* ── Subscriptions ── */
export const subscriptions = pgTable("subscriptions", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    stripeCustomerId: text("stripe_customer_id"),
    stripeSubscriptionId: text("stripe_subscription_id"),
    stripePriceId: text("stripe_price_id"),
    status: text("status", { enum: ["active", "canceled", "past_due", "trialing", "incomplete"] }).notNull().default("incomplete"),
    currentPeriodEnd: timestamp("current_period_end"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* ── Gyms (tenants) ── */
export const gyms = pgTable("gyms", {
    id: uuid("id").primaryKey().defaultRandom(),
    ownerId: uuid("owner_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    logoUrl: text("logo_url"),
    approxMembers: integer("approx_members"),
    hasJimboKit: boolean("has_jimbo_kit").notNull().default(false),
    settings: jsonb("settings").default({}),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* ── Gym Members (account holders) ── */
export const members = pgTable("members", {
    id: uuid("id").primaryKey().defaultRandom(),
    gymId: uuid("gym_id").notNull().references(() => gyms.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone"),
    status: text("status", { enum: ["active", "inactive", "suspended", "expired"] }).notNull().default("active"),
    photoUrl: text("photo_url"),
    membershipType: text("membership_type"),
    membershipPrice: integer("membership_price"), // cents
    membershipStart: timestamp("membership_start"),
    membershipEnd: timestamp("membership_end"),
    autoRenew: boolean("auto_renew").notNull().default(true),
    stripeCustomerId: text("stripe_customer_id"),
    stripeSubscriptionId: text("stripe_subscription_id"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* ── Face data for biometric access ── */
export const faceData = pgTable("face_data", {
    id: uuid("id").primaryKey().defaultRandom(),
    memberId: uuid("member_id").notNull().references(() => members.id, { onDelete: "cascade" }),
    faceDescriptor: jsonb("face_descriptor").notNull(), // 128-d float array
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* ── Access logs ── */
export const accessLogs = pgTable("access_logs", {
    id: uuid("id").primaryKey().defaultRandom(),
    gymId: uuid("gym_id").notNull().references(() => gyms.id, { onDelete: "cascade" }),
    memberId: uuid("member_id").references(() => members.id, { onDelete: "set null" }),
    method: text("method", { enum: ["face", "manual", "qr"] }).notNull().default("manual"),
    status: text("status", { enum: ["granted", "denied"] }).notNull(),
    checkedInAt: timestamp("checked_in_at").notNull().defaultNow(),
    checkedOutAt: timestamp("checked_out_at"),
});

/* ── Gym inventory (fixed assets) ── */
export const inventory = pgTable("inventory", {
    id: uuid("id").primaryKey().defaultRandom(),
    gymId: uuid("gym_id").notNull().references(() => gyms.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    category: text("category"),
    quantity: integer("quantity").notNull().default(0),
    minQuantity: integer("min_quantity").default(0),
    notes: text("notes"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* ── JimboKit orders ── */
export const orders = pgTable("orders", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    stripePaymentId: text("stripe_payment_id"),
    product: text("product").notNull().default("jimbo_kit"),
    status: text("status", { enum: ["pending", "paid", "shipped", "delivered", "canceled"] }).notNull().default("pending"),
    amount: integer("amount").notNull(), // cents
    shippingInfo: jsonb("shipping_info"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* ── Notifications log ── */
export const notifications = pgTable("notifications", {
    id: uuid("id").primaryKey().defaultRandom(),
    gymId: uuid("gym_id").notNull().references(() => gyms.id, { onDelete: "cascade" }),
    channel: text("channel", { enum: ["whatsapp", "email", "sms"] }).notNull(),
    recipientType: text("recipient_type", { enum: ["all", "member"] }).notNull(),
    memberId: uuid("member_id").references(() => members.id, { onDelete: "set null" }),
    subject: text("subject"),
    message: text("message").notNull(),
    status: text("status", { enum: ["sent", "failed", "pending"] }).notNull().default("pending"),
    sentAt: timestamp("sent_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});
