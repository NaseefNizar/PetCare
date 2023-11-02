export interface users  {
    _id:string;
    userId:string;
    email:string;
    password:string;
    contactNumber: number;
    is_admin: number;
    role:string;
    is_blocked:boolean;
}