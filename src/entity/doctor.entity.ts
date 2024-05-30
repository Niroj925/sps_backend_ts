import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { parentEntity } from "./";
import { Patient } from "./patient.entity";
import { Auth } from "./auth.entity";

@Entity('doctor')
export class Doctor extends parentEntity {

    @Column()
    name: string; 

    @Column({type:'bigint'})
    contact:number;

    @Column({unique:true})
    email:string;

    @Column()
    ratingCount:number;

    @Column({type:'float'})
    ratings:number;


    @Column()
    visitPatient:number;

    @Column()
    hospital:string;

    @Column()
    description:string;

    @ManyToOne(()=>Auth,auth=>auth.doctor,{onDelete:'CASCADE'})
    auth:Auth

    @OneToMany(()=>Patient,patient=>patient.doctor,{onDelete:"CASCADE"})
    patient:Patient[]
}
