export type ActionType = "Create" | "Update" | "Delete" | " Login" | "Approve" | "Reject"
export type EntityType = "User" | "EmployerProfile" | "JobPost" | "Payment" | "System"

export interface AuditLog {
    id: string;
    createdAt: string;
    userId: string
    email: string
    action: ActionType
    entityType: EntityType
    entityId: string
    ipAddress: string
    description: string
}