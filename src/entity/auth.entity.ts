import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { parentEntity } from ".";
import { roleType } from "../helper/type/type";
import { Doctor } from "./doctor.entity";

@Entity('auth')
export class Auth extends parentEntity {

    @Column({unique:true})
    email: string; 

    @Column()
    password:string;

    @Column()
    role:roleType;

    @OneToMany(()=>Doctor,doctor=>doctor.auth,{onDelete:"CASCADE"})
    doctor:Doctor[];
}
