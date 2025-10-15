import {
    bigserial,
    boolean,
    check,
    foreignKey,
    index,
    integer,
    json,
    jsonb,
    numeric,
    pgEnum,
    pgTable,
    primaryKey,
    serial,
    text,
    timestamp,
    unique,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

export const activityActionEnum = pgEnum("activity_action_enum", [
    "CREATED_TICKET",
    "ASSIGNED_TICKET",
    "MOVED_TICKET",
    "UPDATED_TICKET",
    "COMMENTED_TICKET",
    "DELETED_COMMENT",
    "EDITED_COMMENT",
]);
export const bookingLogsActionEnum = pgEnum("booking_logs_action_enum", [
    "CREATED",
    "ASSIGNED",
    "MOVED",
    "UPDATED",
    "COMMENTED",
    "DELETED",
    "EDITED",
    "EMAIL_SENT",
    "NOTIFICATION_SENT",
]);
export const bookingLogsServiceNameEnum = pgEnum(
    "booking_logs_service_name_enum",
    [
        "BOOKING_CREATED",
        "BOOKING_EMAIL",
        "BOOKING_TASK",
        "BOOKING_NOTIFICATION",
        "BOOKING_LOGS",
        "BOOKING_ADMIN_CUSTOMER",
    ]
);
export const bookingServiceFailuresServiceNameEnum = pgEnum(
    "booking_service_failures_service_name_enum",
    [
        "BOOKING_CREATED",
        "BOOKING_EMAIL",
        "BOOKING_TASK",
        "BOOKING_NOTIFICATION",
        "BOOKING_LOGS",
        "BOOKING_ADMIN_CUSTOMER",
    ]
);
export const bookingServiceFailuresStatusEnum = pgEnum(
    "booking_service_failures_status_enum",
    [
        "FAILED",
        "IN_PROGRESS",
        "RETRY_COMPLETED",
        "RETRY_FAILED",
        "STARTED",
        "BACKLOG",
    ]
);
export const customerCredentialtypeEnum = pgEnum(
    "customer_credentialtype_enum",
    ["ADMIN", "GOOGLE", "CUSTOMER_CREDENTIAL"]
);
export const emailNotificationsStatusEnum = pgEnum(
    "email_notifications_status_enum",
    ["pending", "sent", "failed", "queued", "in_progress", "completed"]
);
export const emailNotificationsTypeEnum = pgEnum(
    "email_notifications_type_enum",
    ["user_email_verification", "booking_confirmation"]
);
export const permissionGroupPermissionTypeEnum = pgEnum(
    "permission_group_permission_type_enum",
    ["NORMAL", "NORMAL_SETTINGS", "COMPANY_SETTINGS", "SUPER_ADMIN_SETTINGS"]
);
export const projectPriorityEnum = pgEnum("project_priority_enum", [
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
    "BACKLOG",
]);
export const projectStatusEnum = pgEnum("project_status_enum", [
    "TODO",
    "IN_PROGRESS",
    "COMPLETED",
    "UNDER_REVIEW",
    "STARTED",
    "BACKLOG",
]);
export const roomTypeFacilitiesEnum = pgEnum("room_type_facilities_enum", [
    "WIFI",
    "AIR_CONDITIONING",
    "TV",
    "MINI_BAR",
    "ROOM_SERVICE",
    "SWIMMING_POOL",
    "GYM",
    "PARKING",
    "BREAKFAST_INCLUDED",
    "PET_FRIENDLY",
    "SEA_VIEW",
    "BALCONY",
    "SAFE_BOX",
    "HAIR_DRYER",
    "COFFEE_MAKER",
]);
export const taskPriorityEnum = pgEnum("task_priority_enum", [
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
    "BACKLOG",
]);
export const taskStatusEnum = pgEnum("task_status_enum", [
    "TODO",
    "IN_PROGRESS",
    "DONE",
    "COMPLETED",
    "FOR_FIX",
    "UNDER_REVIEW",
]);
export const uploadFileUploadTypeEnum = pgEnum("upload_file_upload_type_enum", [
    "PUBLIC",
    "PRIVATE",
    "PERSONAL",
]);

export const emailNotifications = pgTable("email_notifications", {
    id: serial().primaryKey().notNull(),
    type: emailNotificationsTypeEnum().notNull(),
    to: varchar().notNull(),
    status: emailNotificationsStatusEnum().notNull(),
    dataId: varchar("data_id").notNull(),
    createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
    subject: varchar().notNull(),
    text: varchar(),
    htmlTemplate: varchar("html_template"),
    retries: integer().default(0).notNull(),
});

export const notifications = pgTable("notifications", {
    id: serial().primaryKey().notNull(),
    type: varchar().notNull(),
    link: varchar().notNull(),
    message: varchar().notNull(),
    payload: json().notNull(),
    createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
    htmlTemplate: varchar("html_template"),
});

export const userNotifications = pgTable("user_notifications", {
    id: serial().primaryKey().notNull(),
    isRead: boolean().default(false).notNull(),
    readAt: timestamp("read_at", { mode: "string" }).defaultNow().notNull(),
    userId: integer("user_id").notNull(),
    notificationId: integer("notification_id").notNull(),
});

export const permissionGroup = pgTable("permission_group", {
    id: serial().primaryKey().notNull(),
    displayName: varchar().notNull(),
    isActive: boolean().default(true).notNull(),
    permissionType: permissionGroupPermissionTypeEnum("permission_type")
        .default("NORMAL")
        .notNull(),
    description: text(),
});

export const permission = pgTable(
    "permission",
    {
        id: serial().primaryKey().notNull(),
        displayName: varchar().notNull(),
        enumName: varchar().notNull(),
        isActive: boolean().default(true).notNull(),
        description: varchar().notNull(),
        permissionGroupId: integer().notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.permissionGroupId],
            foreignColumns: [permissionGroup.id],
            name: "FK_29b093b202d3ae3e37438ce158c",
        }),
        unique("UQ_b690135d86d59cc689d465ac952").on(table.description),
    ]
);

export const role = pgTable(
    "role",
    {
        id: serial().primaryKey().notNull(),
        isActive: boolean().default(true).notNull(),
        name: varchar().notNull(),
        roleType: varchar("role_type").default(true).notNull(),
        description: varchar(),
    },
    (table) => [unique("UQ_ae4578dcaed5adff96595e61660").on(table.name)]
);

export const user = pgTable(
    "user",
    {
        id: serial().primaryKey().notNull(),
        email: varchar().notNull(),
        firstName: varchar().notNull(),
        lastName: varchar().notNull(),
        employeeId: varchar().default("PMA-0001").notNull(),
        roleId: integer().notNull(),
        department: varchar(),
        mobileNumber: varchar().default("0000-00-00").notNull(),
        emailVerified: boolean().default(false).notNull(),
        isActive: boolean().default(false).notNull(),
        createdAt: timestamp({ mode: "string" }).notNull(),
        profilePictureUrl: varchar(),
        password: varchar(),
        refreshToken: varchar(),
        verifyEmailToken: varchar(),
    },
    (table) => [
        foreignKey({
            columns: [table.roleId],
            foreignColumns: [role.id],
            name: "FK_c28e52f758e7bbc53828db92194",
        }),
        unique("UQ_e12875dfb3b1d92d7d7c5377e22").on(table.email),
    ]
);

export const internalCompany = pgTable(
    "internal_company",
    {
        id: serial().primaryKey().notNull(),
        name: varchar().notNull(),
        slug: varchar().notNull(),
        logoUrl: varchar(),
        address: varchar(),
        contactEmail: varchar(),
        contactPhone: varchar(),
        isActive: boolean().default(true).notNull(),
        createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
        updatedAt: timestamp({ mode: "string" }).defaultNow().notNull(),
    },
    (table) => [
        unique("UQ_603c1010f036a929f372c486d43").on(table.name),
        unique("UQ_878d68b30c0154062fea7738436").on(table.slug),
    ]
);

export const feature = pgTable(
    "feature",
    {
        id: serial().primaryKey().notNull(),
        name: varchar().notNull(),
        description: varchar().notNull(),
        slug: varchar().notNull(),
        active: boolean().notNull(),
        profilePicture: varchar(),
        internalCompanyId: integer().notNull(),
        adminId: integer(),
        activeSprintId: integer(),
    },
    (table) => [
        foreignKey({
            columns: [table.internalCompanyId],
            foreignColumns: [internalCompany.id],
            name: "FK_caa0dd118dfd19c7d759cb120c9",
        }),
        foreignKey({
            columns: [table.adminId],
            foreignColumns: [user.id],
            name: "FK_ed968d503f0df9098e1c6300bb9",
        }),
        foreignKey({
            columns: [table.activeSprintId],
            foreignColumns: [sprint.id],
            name: "FK_2fe6ae69ed85797061449c48bc7",
        }),
    ]
);

export const sprint = pgTable("sprint", {
    id: serial().primaryKey().notNull(),
    name: varchar().notNull(),
    goal: text(),
    startDate: timestamp({ mode: "string" }).notNull(),
    endDate: timestamp({ mode: "string" }).notNull(),
    isActive: boolean().default(true).notNull(),
});

export const project = pgTable(
    "project",
    {
        id: serial().primaryKey().notNull(),
        name: varchar().notNull(),
        description: varchar().notNull(),
        profilePicture: varchar(),
        status: projectStatusEnum().default("STARTED").notNull(),
        priority: projectPriorityEnum().default("MEDIUM").notNull(),
        startDate: timestamp({ mode: "string" }).notNull(),
        endDate: timestamp({ mode: "string" }).notNull(),
        internalCompanyId: integer(),
        adminId: integer(),
    },
    (table) => [
        foreignKey({
            columns: [table.internalCompanyId],
            foreignColumns: [internalCompany.id],
            name: "FK_423e261ea63a500ff4eaa2f226a",
        }).onDelete("set null"),
        foreignKey({
            columns: [table.adminId],
            foreignColumns: [user.id],
            name: "FK_9e5c56e72fbbb0a00cd5d9c3d3b",
        }),
    ]
);

export const projectTaskStatus = pgTable(
    "project_task_status",
    {
        id: serial().primaryKey().notNull(),
        projectId: integer("project_id"),
        taskStatusId: integer("task_status_id"),
    },
    (table) => [
        foreignKey({
            columns: [table.projectId],
            foreignColumns: [project.id],
            name: "FK_d03f8b56db6956136ecf4b713d0",
        }).onDelete("cascade"),
        foreignKey({
            columns: [table.taskStatusId],
            foreignColumns: [taskStatus.id],
            name: "FK_de8c49c6e7d7e8dcdb98decb830",
        }).onDelete("cascade"),
    ]
);

export const taskStatus = pgTable(
    "task_status",
    {
        id: serial().primaryKey().notNull(),
        name: varchar().notNull(),
        colorCode: text("color_code").default("#023047").notNull(),
        isActive: boolean("is_active").default(true).notNull(),
    },
    (table) => [unique("UQ_b0c955f276679dd2b2735c3936a").on(table.name)]
);

export const room = pgTable(
    "room",
    {
        id: serial().primaryKey().notNull(),
        roomNumber: varchar().notNull(),
        isActive: boolean().default(true).notNull(),
        internalCompanyId: integer("internal_company_id").notNull(),
        roomTypeId: integer(),
    },
    (table) => [
        foreignKey({
            columns: [table.internalCompanyId],
            foreignColumns: [internalCompany.id],
            name: "FK_9cbc54fb7e73a5a349b1631aa76",
        }),
        foreignKey({
            columns: [table.roomTypeId],
            foreignColumns: [roomType.id],
            name: "FK_9e55182c47f8ba7a32466131837",
        }),
    ]
);

export const bookingRoom = pgTable(
    "booking_room",
    {
        id: serial().primaryKey().notNull(),
        userBookingRoomId: varchar(),
        bookingId: integer().notNull(),
        roomById: integer().notNull(),
        roomStatus: varchar("room_status").notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.bookingId],
            foreignColumns: [booking.id],
            name: "FK_d2c224e81b16a2c06aecfcd5842",
        }),
        foreignKey({
            columns: [table.roomById],
            foreignColumns: [room.id],
            name: "FK_b0e69480a7d40aaaec08623bc1b",
        }),
    ]
);

export const customer = pgTable(
    "customer",
    {
        id: serial().primaryKey().notNull(),
        name: varchar().notNull(),
        email: varchar().notNull(),
        mobileNumber: varchar().default("0000-00-00").notNull(),
        credentialType: customerCredentialtypeEnum("CredentialType").notNull(),
        associatedInternalCompanyId: integer(
            "associated_internal_company_id"
        ).notNull(),
        emailVerified: boolean().default(false).notNull(),
        isActive: boolean().notNull(),
        createdAt: timestamp({ mode: "string" }).notNull(),
        profilePictureUrl: varchar(),
        password: varchar(),
        refreshToken: varchar(),
        verifyEmailToken: varchar(),
    },
    (table) => [
        foreignKey({
            columns: [table.associatedInternalCompanyId],
            foreignColumns: [internalCompany.id],
            name: "FK_543d17c09c7bb7af9a21bdd2c6d",
        }),
        unique("UQ_fdb2f3ad8115da4c7718109a6eb").on(table.email),
    ]
);

export const bookingServiceFailures = pgTable(
    "booking_service_failures",
    {
        id: serial().primaryKey().notNull(),
        bookingId: integer("booking_id").notNull(),
        serviceName:
            bookingServiceFailuresServiceNameEnum("service_name").notNull(),
        errorMessage: text("error_message"),
        status: bookingServiceFailuresStatusEnum(),
        createdAt: timestamp("created_at", { mode: "string" }).notNull(),
        retries: integer().default(0).notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.bookingId],
            foreignColumns: [booking.id],
            name: "FK_2cbe6ce85fd811a03e69f55ffde",
        }),
    ]
);

export const bookingLogs = pgTable(
    "booking_logs",
    {
        id: serial().primaryKey().notNull(),
        details: jsonb(),
        action: bookingLogsActionEnum().notNull(),
        logTime: timestamp("log_time", { mode: "string" }).notNull(),
        serviceName: bookingLogsServiceNameEnum("service_name").notNull(),
        bookingId: integer("booking_id").notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.bookingId],
            foreignColumns: [booking.id],
            name: "FK_6e3a4909bc427bce3d23f4b85a1",
        }),
    ]
);

export const label = pgTable(
    "label",
    {
        id: serial().primaryKey().notNull(),
        name: varchar().notNull(),
        description: text(),
        colorCode: text().default("#023047").notNull(),
        isActive: boolean().default(true).notNull(),
        addedAt: timestamp({ mode: "string" }).notNull(),
        addedById: integer().notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.addedById],
            foreignColumns: [user.id],
            name: "FK_4aeb3834e59962c0d915b42f841",
        }),
    ]
);

export const task = pgTable(
    "task",
    {
        id: serial().primaryKey().notNull(),
        title: varchar().notNull(),
        taskNumber: varchar(),
        description: varchar().notNull(),
        addedDate: timestamp({ mode: "string" }).notNull(),
        status: taskStatusEnum().default("TODO").notNull(),
        priority: taskPriorityEnum().default("MEDIUM").notNull(),
        addedById: integer(),
        assignedToId: integer(),
        assignedById: integer(),
        taskLabelId: integer(),
        sprintId: integer(),
        taskStatusId: integer(),
        projectId: integer(),
        featureId: integer("feature_id"),
    },
    (table) => [
        foreignKey({
            columns: [table.addedById],
            foreignColumns: [user.id],
            name: "FK_13ec6c01e992f6a0150b4c1dbb8",
        }),
        foreignKey({
            columns: [table.assignedToId],
            foreignColumns: [user.id],
            name: "FK_fd5f652e2fcdc4a5ab30aaff7a7",
        }),
        foreignKey({
            columns: [table.assignedById],
            foreignColumns: [user.id],
            name: "FK_d67cd7c5e34f48cf33be802898a",
        }),
        foreignKey({
            columns: [table.taskLabelId],
            foreignColumns: [label.id],
            name: "FK_bc24781086071b2b0c37535b55e",
        }),
        foreignKey({
            columns: [table.sprintId],
            foreignColumns: [sprint.id],
            name: "FK_5ad8a047b8f023bf36b2a232a42",
        }),
        foreignKey({
            columns: [table.taskStatusId],
            foreignColumns: [taskStatus.id],
            name: "FK_0cbe714983eb0aae5feeee8212b",
        }),
        foreignKey({
            columns: [table.projectId],
            foreignColumns: [project.id],
            name: "FK_3797a20ef5553ae87af126bc2fe",
        }),
        foreignKey({
            columns: [table.featureId],
            foreignColumns: [feature.id],
            name: "FK_0c6b81e80f62b633c1fa9134c0c",
        }),
        check(
            "CHK_5c2eb49100436b2023ed81aadc",
            sql`(("projectId" IS NOT NULL) AND (feature_id IS NULL)) OR (("projectId" IS NULL) AND (feature_id IS NOT NULL))`
        ),
    ]
);

export const activity = pgTable(
    "activity",
    {
        id: serial().primaryKey().notNull(),
        action: activityActionEnum().notNull(),
        details: text(),
        comment: text(),
        createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
        activityById: integer(),
        taskId: integer(),
    },
    (table) => [
        foreignKey({
            columns: [table.activityById],
            foreignColumns: [user.id],
            name: "FK_ea80fc5388a11a545a1da727c84",
        }),
        foreignKey({
            columns: [table.taskId],
            foreignColumns: [task.id],
            name: "FK_2743f8990fde12f9586287eb09f",
        }),
    ]
);

export const comment = pgTable(
    "comment",
    {
        id: serial().primaryKey().notNull(),
        content: text().notNull(),
        isActive: boolean().default(true).notNull(),
        addedAt: timestamp({ mode: "string" }).defaultNow().notNull(),
        addedById: integer().notNull(),
        task: integer().notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.addedById],
            foreignColumns: [user.id],
            name: "FK_02580c0d73323befbbe80922c48",
        }),
        foreignKey({
            columns: [table.task],
            foreignColumns: [task.id],
            name: "FK_9b11780d812a18e98731a1e65ed",
        }),
    ]
);

export const department = pgTable(
    "department",
    {
        id: serial().primaryKey().notNull(),
        name: varchar().notNull(),
        description: text(),
        colorCode: text().default("#023047").notNull(),
        isActive: boolean().default(true).notNull(),
        addedAt: timestamp({ mode: "string" }).notNull(),
        iconUrl: varchar(),
        addedById: integer(),
    },
    (table) => [
        foreignKey({
            columns: [table.addedById],
            foreignColumns: [user.id],
            name: "FK_e3b679cfb1dc5a8d8b4d55a258e",
        }),
    ]
);

export const featureTaskStatus = pgTable(
    "feature_task_status",
    {
        id: serial().primaryKey().notNull(),
        featureId: integer("feature_id").notNull(),
        taskStatusId: integer("task_status_id"),
    },
    (table) => [
        foreignKey({
            columns: [table.taskStatusId],
            foreignColumns: [taskStatus.id],
            name: "FK_fe1b36ddd0252e9822240c5ee0b",
        }).onDelete("cascade"),
        foreignKey({
            columns: [table.featureId],
            foreignColumns: [feature.id],
            name: "FK_5d0e0dc5e8c60a15477cb654e98",
        }).onDelete("cascade"),
    ]
);

export const featureUpload = pgTable(
    "feature_upload",
    {
        id: serial().primaryKey().notNull(),
        featureId: integer("feature_id"),
        uploadId: uuid("upload_id"),
    },
    (table) => [
        foreignKey({
            columns: [table.featureId],
            foreignColumns: [feature.id],
            name: "FK_301a84a35c8252809d2c65fe6e8",
        }).onDelete("cascade"),
        foreignKey({
            columns: [table.uploadId],
            foreignColumns: [uploadFile.id],
            name: "FK_1f68d659577caaf564ad29dd40f",
        }).onDelete("cascade"),
    ]
);

export const internalCompanyMember = pgTable(
    "internal_company_member",
    {
        id: serial().primaryKey().notNull(),
        userId: integer("user_id").notNull(),
        internalCompanyId: integer("internal_company_id").notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [user.id],
            name: "FK_0c7a94aa04b3a3c2022f02aa425",
        }).onDelete("cascade"),
        foreignKey({
            columns: [table.internalCompanyId],
            foreignColumns: [internalCompany.id],
            name: "FK_2f2b4bce25efbd2ed247f1fdc2f",
        }).onDelete("cascade"),
    ]
);

export const uploadFile = pgTable(
    "upload_file",
    {
        id: uuid()
            .default(sql`uuid_generate_v4()`)
            .primaryKey()
            .notNull(),
        filename: varchar().notNull(),
        originalname: varchar().notNull(),
        size: integer().notNull(),
        extension: varchar().notNull(),
        mimetype: varchar(),
        fileType: varchar(),
        cloudPath: varchar(),
        cloudId: varchar(),
        cloudUrl: varchar(),
        createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
        updatedAt: timestamp({ mode: "string" }).defaultNow().notNull(),
        createdBy: integer().notNull(),
        uploadType: uploadFileUploadTypeEnum("upload_type")
            .default("PRIVATE")
            .notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.createdBy],
            foreignColumns: [user.id],
            name: "FK_9b61d2c7827e3f0f6a8bc4cd08a",
        }),
    ]
);

export const auditLogs = pgTable(
    "audit_logs",
    {
        id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
        userId: integer().notNull(),
        apiName: varchar({ length: 255 }).notNull(),
        apiFor: varchar({ length: 255 }).notNull(),
        apiAction: varchar({ length: 255 }).notNull(),
        method: varchar({ length: 10 }).notNull(),
        requestBody: jsonb(),
        responseBody: jsonb(),
        statusCode: integer().notNull(),
        status: varchar({ length: 20 }).notNull(),
        createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
    },
    (table) => [
        index("idx_audit_logs_api_action").using(
            "btree",
            table.apiAction.asc().nullsLast().op("text_ops")
        ),
        index("idx_audit_logs_api_for").using(
            "btree",
            table.apiFor.asc().nullsLast().op("text_ops")
        ),
        index("idx_audit_logs_created_at").using(
            "btree",
            table.createdAt.asc().nullsLast().op("timestamp_ops")
        ),
        index("idx_audit_logs_status").using(
            "btree",
            table.status.asc().nullsLast().op("text_ops")
        ),
    ]
);

export const roomType = pgTable(
    "room_type",
    {
        id: serial().primaryKey().notNull(),
        name: varchar().notNull(),
        description: text(),
        facilities: roomTypeFacilitiesEnum().array(),
        isActive: boolean().notNull(),
        thumbnailUrlId: uuid(),
        roomPrice: numeric({ precision: 10, scale: 2 }).notNull(),
        totalNumberOfRooms: integer("total_number_of_rooms").notNull(),
        thumbnailPublicUrl: varchar(),
        slug: varchar().notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.thumbnailUrlId],
            foreignColumns: [uploadFile.id],
            name: "FK_7d5c54928aa26bd4141501c4d01",
        }),
        unique("REL_7d5c54928aa26bd4141501c4d0").on(table.thumbnailUrlId),
    ]
);

export const verification = pgTable("verification", {
    id: text().primaryKey().notNull(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
        .defaultNow()
        .notNull(),
});

export const booking = pgTable(
    "booking",
    {
        id: serial().primaryKey().notNull(),
        userBookingId: varchar(),
        checkInDate: timestamp({ mode: "string" }).notNull(),
        checkOutDate: timestamp({ mode: "string" }).notNull(),
        status: varchar().notNull(),
        paymentStatus: varchar("payment_status").notNull(),
        totalPrice: numeric({ precision: 10, scale: 2 }).notNull(),
        bookingDate: timestamp({ mode: "string" }).notNull(),
        hotelId: integer().notNull(),
        customerId: text().notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.hotelId],
            foreignColumns: [internalCompany.id],
            name: "FK_a8c9f0b0d2e97e4cdf825d3d830",
        }),
        foreignKey({
            columns: [table.customerId],
            foreignColumns: [userCustomer.id],
            name: "FK_72e32d29a7de28b3c469f858d56",
        }),
    ]
);

export const userCustomer = pgTable(
    "user_customer",
    {
        id: text().primaryKey().notNull(),
        name: text().notNull(),
        email: text().notNull(),
        emailVerified: boolean().default(false).notNull(),
        image: text(),
        createdAt: timestamp("created_at", { mode: "string" })
            .defaultNow()
            .notNull(),
        updatedAt: timestamp("updated_at", { mode: "string" })
            .defaultNow()
            .notNull(),
        mobileNumber: varchar(),
        associatedInternalCompanyId: integer(
            "associated_internal_company_id"
        ).notNull(),
        isAccountByAdmin: boolean().default(false).notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.associatedInternalCompanyId],
            foreignColumns: [internalCompany.id],
            name: "FK_0239b0447d21e88dc984d5a604d",
        }),
        unique("UQ_652871340c5cf297a4a77fba96a").on(table.email),
    ]
);

export const session = pgTable(
    "session",
    {
        id: text().primaryKey().notNull(),
        expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
        token: text().notNull(),
        createdAt: timestamp("created_at", { mode: "string" })
            .defaultNow()
            .notNull(),
        updatedAt: timestamp("updated_at", { mode: "string" })
            .defaultNow()
            .notNull(),
        ipAddress: text("ip_address"),
        userAgent: text("user_agent"),
        userId: text("user_id").notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [userCustomer.id],
            name: "FK_30e98e8746699fb9af235410aff",
        }).onDelete("cascade"),
        unique("UQ_232f8e85d7633bd6ddfad421696").on(table.token),
    ]
);

export const account = pgTable(
    "account",
    {
        id: text().primaryKey().notNull(),
        accountId: text("account_id").notNull(),
        providerId: text("provider_id").notNull(),
        userId: text("user_id").notNull(),
        accessToken: text("access_token"),
        refreshToken: text("refresh_token"),
        idToken: text("id_token"),
        accessTokenExpiresAt: timestamp("access_token_expires_at", {
            mode: "string",
        }),
        refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
            mode: "string",
        }),
        scope: text(),
        password: text(),
        createdAt: timestamp("created_at", { mode: "string" })
            .defaultNow()
            .notNull(),
        updatedAt: timestamp("updated_at", { mode: "string" })
            .defaultNow()
            .notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [userCustomer.id],
            name: "FK_efef1e5fdbe318a379c06678c51",
        }).onDelete("cascade"),
    ]
);

export const rolePermissionsPermission = pgTable(
    "role_permissions_permission",
    {
        roleId: integer().notNull(),
        permissionId: integer().notNull(),
    },
    (table) => [
        index("IDX_b36cb2e04bc353ca4ede00d87b").using(
            "btree",
            table.roleId.asc().nullsLast().op("int4_ops")
        ),
        index("IDX_bfbc9e263d4cea6d7a8c9eb3ad").using(
            "btree",
            table.permissionId.asc().nullsLast().op("int4_ops")
        ),
        foreignKey({
            columns: [table.roleId],
            foreignColumns: [role.id],
            name: "FK_b36cb2e04bc353ca4ede00d87b9",
        })
            .onUpdate("cascade")
            .onDelete("cascade"),
        foreignKey({
            columns: [table.permissionId],
            foreignColumns: [permission.id],
            name: "FK_bfbc9e263d4cea6d7a8c9eb3ad2",
        })
            .onUpdate("cascade")
            .onDelete("cascade"),
        primaryKey({
            columns: [table.roleId, table.permissionId],
            name: "PK_b817d7eca3b85f22130861259dd",
        }),
    ]
);

export const featureTeamMember = pgTable(
    "feature_team_member",
    {
        featureId: integer("feature_id").notNull(),
        userId: integer("user_id").notNull(),
    },
    (table) => [
        index("IDX_17c2b87b2c6c5449508a76ae67").using(
            "btree",
            table.userId.asc().nullsLast().op("int4_ops")
        ),
        index("IDX_8ba8a828914adeb197b0c9ece4").using(
            "btree",
            table.featureId.asc().nullsLast().op("int4_ops")
        ),
        foreignKey({
            columns: [table.featureId],
            foreignColumns: [feature.id],
            name: "FK_8ba8a828914adeb197b0c9ece43",
        })
            .onUpdate("cascade")
            .onDelete("cascade"),
        foreignKey({
            columns: [table.userId],
            foreignColumns: [user.id],
            name: "FK_17c2b87b2c6c5449508a76ae675",
        })
            .onUpdate("cascade")
            .onDelete("cascade"),
        primaryKey({
            columns: [table.featureId, table.userId],
            name: "PK_5f025630098a6a18109e8d1ab8b",
        }),
    ]
);

export const teamMember = pgTable(
    "team_member",
    {
        projectId: integer().notNull(),
        userId: integer().notNull(),
    },
    (table) => [
        index("IDX_c243bdb10b2a6e9e50d66d70da").using(
            "btree",
            table.projectId.asc().nullsLast().op("int4_ops")
        ),
        index("IDX_d2be3e8fc9ab0f69673721c7fc").using(
            "btree",
            table.userId.asc().nullsLast().op("int4_ops")
        ),
        foreignKey({
            columns: [table.projectId],
            foreignColumns: [project.id],
            name: "FK_c243bdb10b2a6e9e50d66d70da2",
        })
            .onUpdate("cascade")
            .onDelete("cascade"),
        foreignKey({
            columns: [table.userId],
            foreignColumns: [user.id],
            name: "FK_d2be3e8fc9ab0f69673721c7fc3",
        })
            .onUpdate("cascade")
            .onDelete("cascade"),
        primaryKey({
            columns: [table.projectId, table.userId],
            name: "PK_f7c8ab23fa067c331b145db6716",
        }),
    ]
);

export const projectUploads = pgTable(
    "project_uploads",
    {
        projectId: integer().notNull(),
        uploadId: uuid().notNull(),
    },
    (table) => [
        index("IDX_23cecb0cfcf129b5826c934cd7").using(
            "btree",
            table.projectId.asc().nullsLast().op("int4_ops")
        ),
        index("IDX_26a083346a1aab150cb3a550c2").using(
            "btree",
            table.uploadId.asc().nullsLast().op("uuid_ops")
        ),
        foreignKey({
            columns: [table.projectId],
            foreignColumns: [project.id],
            name: "FK_23cecb0cfcf129b5826c934cd77",
        })
            .onUpdate("cascade")
            .onDelete("cascade"),
        foreignKey({
            columns: [table.uploadId],
            foreignColumns: [uploadFile.id],
            name: "FK_26a083346a1aab150cb3a550c28",
        })
            .onUpdate("cascade")
            .onDelete("cascade"),
        primaryKey({
            columns: [table.projectId, table.uploadId],
            name: "PK_89965edcd09c12866e1548a3766",
        }),
    ]
);

export const taskUploads = pgTable(
    "task_uploads",
    {
        taskId: integer().notNull(),
        uploadId: uuid().notNull(),
    },
    (table) => [
        index("IDX_062413e9f8a87a5526d5148635").using(
            "btree",
            table.uploadId.asc().nullsLast().op("uuid_ops")
        ),
        index("IDX_0fdc2926eb58b8ab68648ed44c").using(
            "btree",
            table.taskId.asc().nullsLast().op("int4_ops")
        ),
        foreignKey({
            columns: [table.taskId],
            foreignColumns: [task.id],
            name: "FK_0fdc2926eb58b8ab68648ed44c4",
        })
            .onUpdate("cascade")
            .onDelete("cascade"),
        foreignKey({
            columns: [table.uploadId],
            foreignColumns: [uploadFile.id],
            name: "FK_062413e9f8a87a5526d51486352",
        })
            .onUpdate("cascade")
            .onDelete("cascade"),
        primaryKey({
            columns: [table.taskId, table.uploadId],
            name: "PK_f3d9930b9177debddec7f2095e2",
        }),
    ]
);
