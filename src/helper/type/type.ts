export enum roleType{
    admin='admin',
    doctor='doctor',
    patient='patient'
}
 
export type JwtPayload={
    sub:string,
    email:string,
    role:string
}