export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public provider: Provider,
    public role: Role,
    public defaultBadgeId: number,
    public createdAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.provider = provider;
    this.role = role;
    this.defaultBadgeId = defaultBadgeId;
    this.createdAt = createdAt;
  }
}

export enum Provider {
  Local,
  Google,
  KaKao,
}

export enum Role {
  User,
  Admin,
}
