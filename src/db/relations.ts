import { relations } from "drizzle-orm/relations";
import { permissionGroup, permission, role, user, internalCompany, feature, sprint, project, projectTaskStatus, taskStatus, room, roomType, booking, bookingRoom, customer, bookingServiceFailures, bookingLogs, label, task, activity, comment, department, featureTaskStatus, featureUpload, uploadFile, internalCompanyMember, userCustomer, session, account, rolePermissionsPermission, featureTeamMember, teamMember, projectUploads, taskUploads } from "./schema";

export const permissionRelations = relations(permission, ({one, many}) => ({
	permissionGroup: one(permissionGroup, {
		fields: [permission.permissionGroupId],
		references: [permissionGroup.id]
	}),
	rolePermissionsPermissions: many(rolePermissionsPermission),
}));

export const permissionGroupRelations = relations(permissionGroup, ({many}) => ({
	permissions: many(permission),
}));

export const userRelations = relations(user, ({one, many}) => ({
	role: one(role, {
		fields: [user.roleId],
		references: [role.id]
	}),
	features: many(feature),
	projects: many(project),
	labels: many(label),
	tasks_addedById: many(task, {
		relationName: "task_addedById_user_id"
	}),
	tasks_assignedToId: many(task, {
		relationName: "task_assignedToId_user_id"
	}),
	tasks_assignedById: many(task, {
		relationName: "task_assignedById_user_id"
	}),
	activities: many(activity),
	comments: many(comment),
	departments: many(department),
	internalCompanyMembers: many(internalCompanyMember),
	uploadFiles: many(uploadFile),
	featureTeamMembers: many(featureTeamMember),
	teamMembers: many(teamMember),
}));

export const roleRelations = relations(role, ({many}) => ({
	users: many(user),
	rolePermissionsPermissions: many(rolePermissionsPermission),
}));

export const featureRelations = relations(feature, ({one, many}) => ({
	internalCompany: one(internalCompany, {
		fields: [feature.internalCompanyId],
		references: [internalCompany.id]
	}),
	user: one(user, {
		fields: [feature.adminId],
		references: [user.id]
	}),
	sprint: one(sprint, {
		fields: [feature.activeSprintId],
		references: [sprint.id]
	}),
	tasks: many(task),
	featureTaskStatuses: many(featureTaskStatus),
	featureUploads: many(featureUpload),
	featureTeamMembers: many(featureTeamMember),
}));

export const internalCompanyRelations = relations(internalCompany, ({many}) => ({
	features: many(feature),
	projects: many(project),
	rooms: many(room),
	customers: many(customer),
	internalCompanyMembers: many(internalCompanyMember),
	bookings: many(booking),
	userCustomers: many(userCustomer),
}));

export const sprintRelations = relations(sprint, ({many}) => ({
	features: many(feature),
	tasks: many(task),
}));

export const projectRelations = relations(project, ({one, many}) => ({
	internalCompany: one(internalCompany, {
		fields: [project.internalCompanyId],
		references: [internalCompany.id]
	}),
	user: one(user, {
		fields: [project.adminId],
		references: [user.id]
	}),
	projectTaskStatuses: many(projectTaskStatus),
	tasks: many(task),
	teamMembers: many(teamMember),
	projectUploads: many(projectUploads),
}));

export const projectTaskStatusRelations = relations(projectTaskStatus, ({one}) => ({
	project: one(project, {
		fields: [projectTaskStatus.projectId],
		references: [project.id]
	}),
	taskStatus: one(taskStatus, {
		fields: [projectTaskStatus.taskStatusId],
		references: [taskStatus.id]
	}),
}));

export const taskStatusRelations = relations(taskStatus, ({many}) => ({
	projectTaskStatuses: many(projectTaskStatus),
	tasks: many(task),
	featureTaskStatuses: many(featureTaskStatus),
}));

export const roomRelations = relations(room, ({one, many}) => ({
	internalCompany: one(internalCompany, {
		fields: [room.internalCompanyId],
		references: [internalCompany.id]
	}),
	roomType: one(roomType, {
		fields: [room.roomTypeId],
		references: [roomType.id]
	}),
	bookingRooms: many(bookingRoom),
}));

export const roomTypeRelations = relations(roomType, ({one, many}) => ({
	rooms: many(room),
	uploadFile: one(uploadFile, {
		fields: [roomType.thumbnailUrlId],
		references: [uploadFile.id]
	}),
}));

export const bookingRoomRelations = relations(bookingRoom, ({one}) => ({
	booking: one(booking, {
		fields: [bookingRoom.bookingId],
		references: [booking.id]
	}),
	room: one(room, {
		fields: [bookingRoom.roomById],
		references: [room.id]
	}),
}));

export const bookingRelations = relations(booking, ({one, many}) => ({
	bookingRooms: many(bookingRoom),
	bookingServiceFailures: many(bookingServiceFailures),
	bookingLogs: many(bookingLogs),
	internalCompany: one(internalCompany, {
		fields: [booking.hotelId],
		references: [internalCompany.id]
	}),
	userCustomer: one(userCustomer, {
		fields: [booking.customerId],
		references: [userCustomer.id]
	}),
}));

export const customerRelations = relations(customer, ({one}) => ({
	internalCompany: one(internalCompany, {
		fields: [customer.associatedInternalCompanyId],
		references: [internalCompany.id]
	}),
}));

export const bookingServiceFailuresRelations = relations(bookingServiceFailures, ({one}) => ({
	booking: one(booking, {
		fields: [bookingServiceFailures.bookingId],
		references: [booking.id]
	}),
}));

export const bookingLogsRelations = relations(bookingLogs, ({one}) => ({
	booking: one(booking, {
		fields: [bookingLogs.bookingId],
		references: [booking.id]
	}),
}));

export const labelRelations = relations(label, ({one, many}) => ({
	user: one(user, {
		fields: [label.addedById],
		references: [user.id]
	}),
	tasks: many(task),
}));

export const taskRelations = relations(task, ({one, many}) => ({
	user_addedById: one(user, {
		fields: [task.addedById],
		references: [user.id],
		relationName: "task_addedById_user_id"
	}),
	user_assignedToId: one(user, {
		fields: [task.assignedToId],
		references: [user.id],
		relationName: "task_assignedToId_user_id"
	}),
	user_assignedById: one(user, {
		fields: [task.assignedById],
		references: [user.id],
		relationName: "task_assignedById_user_id"
	}),
	label: one(label, {
		fields: [task.taskLabelId],
		references: [label.id]
	}),
	sprint: one(sprint, {
		fields: [task.sprintId],
		references: [sprint.id]
	}),
	taskStatus: one(taskStatus, {
		fields: [task.taskStatusId],
		references: [taskStatus.id]
	}),
	project: one(project, {
		fields: [task.projectId],
		references: [project.id]
	}),
	feature: one(feature, {
		fields: [task.featureId],
		references: [feature.id]
	}),
	activities: many(activity),
	comments: many(comment),
	taskUploads: many(taskUploads),
}));

export const activityRelations = relations(activity, ({one}) => ({
	user: one(user, {
		fields: [activity.activityById],
		references: [user.id]
	}),
	task: one(task, {
		fields: [activity.taskId],
		references: [task.id]
	}),
}));

export const commentRelations = relations(comment, ({one}) => ({
	user: one(user, {
		fields: [comment.addedById],
		references: [user.id]
	}),
	task: one(task, {
		fields: [comment.task],
		references: [task.id]
	}),
}));

export const departmentRelations = relations(department, ({one}) => ({
	user: one(user, {
		fields: [department.addedById],
		references: [user.id]
	}),
}));

export const featureTaskStatusRelations = relations(featureTaskStatus, ({one}) => ({
	taskStatus: one(taskStatus, {
		fields: [featureTaskStatus.taskStatusId],
		references: [taskStatus.id]
	}),
	feature: one(feature, {
		fields: [featureTaskStatus.featureId],
		references: [feature.id]
	}),
}));

export const featureUploadRelations = relations(featureUpload, ({one}) => ({
	feature: one(feature, {
		fields: [featureUpload.featureId],
		references: [feature.id]
	}),
	uploadFile: one(uploadFile, {
		fields: [featureUpload.uploadId],
		references: [uploadFile.id]
	}),
}));

export const uploadFileRelations = relations(uploadFile, ({one, many}) => ({
	featureUploads: many(featureUpload),
	user: one(user, {
		fields: [uploadFile.createdBy],
		references: [user.id]
	}),
	roomTypes: many(roomType),
	projectUploads: many(projectUploads),
	taskUploads: many(taskUploads),
}));

export const internalCompanyMemberRelations = relations(internalCompanyMember, ({one}) => ({
	user: one(user, {
		fields: [internalCompanyMember.userId],
		references: [user.id]
	}),
	internalCompany: one(internalCompany, {
		fields: [internalCompanyMember.internalCompanyId],
		references: [internalCompany.id]
	}),
}));

export const userCustomerRelations = relations(userCustomer, ({one, many}) => ({
	bookings: many(booking),
	internalCompany: one(internalCompany, {
		fields: [userCustomer.associatedInternalCompanyId],
		references: [internalCompany.id]
	}),
	sessions: many(session),
	accounts: many(account),
}));

export const sessionRelations = relations(session, ({one}) => ({
	userCustomer: one(userCustomer, {
		fields: [session.userId],
		references: [userCustomer.id]
	}),
}));

export const accountRelations = relations(account, ({one}) => ({
	userCustomer: one(userCustomer, {
		fields: [account.userId],
		references: [userCustomer.id]
	}),
}));

export const rolePermissionsPermissionRelations = relations(rolePermissionsPermission, ({one}) => ({
	role: one(role, {
		fields: [rolePermissionsPermission.roleId],
		references: [role.id]
	}),
	permission: one(permission, {
		fields: [rolePermissionsPermission.permissionId],
		references: [permission.id]
	}),
}));

export const featureTeamMemberRelations = relations(featureTeamMember, ({one}) => ({
	feature: one(feature, {
		fields: [featureTeamMember.featureId],
		references: [feature.id]
	}),
	user: one(user, {
		fields: [featureTeamMember.userId],
		references: [user.id]
	}),
}));

export const teamMemberRelations = relations(teamMember, ({one}) => ({
	project: one(project, {
		fields: [teamMember.projectId],
		references: [project.id]
	}),
	user: one(user, {
		fields: [teamMember.userId],
		references: [user.id]
	}),
}));

export const projectUploadsRelations = relations(projectUploads, ({one}) => ({
	project: one(project, {
		fields: [projectUploads.projectId],
		references: [project.id]
	}),
	uploadFile: one(uploadFile, {
		fields: [projectUploads.uploadId],
		references: [uploadFile.id]
	}),
}));

export const taskUploadsRelations = relations(taskUploads, ({one}) => ({
	task: one(task, {
		fields: [taskUploads.taskId],
		references: [task.id]
	}),
	uploadFile: one(uploadFile, {
		fields: [taskUploads.uploadId],
		references: [uploadFile.id]
	}),
}));