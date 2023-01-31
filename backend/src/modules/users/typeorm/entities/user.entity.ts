import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('users')
class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column({ select: false })
    password: string

    @Column()
    address: string

    @Column()
    city: string

    @Column()
    state: string

    @Column()
    cep: string

    @Column({ type: 'date' })
    birth_day: Date
}

export default User
