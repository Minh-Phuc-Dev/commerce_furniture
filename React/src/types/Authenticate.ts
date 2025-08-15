export type User = {
    displayName: string
    email: string
    id: string
    role: "USER" | "ADMIN",
    attributes: Record<string, string>
    meta: Record<string, string>

}

