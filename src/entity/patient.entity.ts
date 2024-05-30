// import { Column, Entity, ManyToOne } from "typeorm";
// import { parentEntity } from ".";
import { Column, Entity, ManyToOne } from "../../node_modules/typeorm/index";
import { Doctor } from "./doctor.entity";
import { parentEntity } from "./index";

@Entity('patient')
export class Patient extends parentEntity{
    @Column()
    name:string;

    @Column({type:'bigint'})
    contact:number;

    @Column()
    email:string;

    @Column({type:'float'})
    stroke:number;

    @Column('text')
    prescription:string

    @ManyToOne(()=>Doctor,doctor=>doctor.patient,{onDelete:'CASCADE'})
    doctor:Doctor;
}