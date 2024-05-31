import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToOne(()=>Auth,auth=>auth.doctor,{onDelete:'CASCADE'})
    @JoinColumn({name:'authId'})
    auth:Auth

    @OneToMany(()=>Patient,patient=>patient.doctor,{onDelete:"CASCADE"})
    patient:Patient[]
}
