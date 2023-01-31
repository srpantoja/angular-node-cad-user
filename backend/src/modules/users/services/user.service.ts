import UserRepository from '../typeorm/repositories/users.repository'
import AppError from '../../../shared/errors/app.error'
import User from '../typeorm/entities/user.entity'
import * as bcrypt from 'bcrypt'
import CreateUserDto from '../dto/create.user.dto'
import { connectionSource } from '../../../shared/typeorm'

class UserService {
    private userRepository: UserRepository
    private readonly connection = connectionSource
    constructor() {
        this.userRepository = this.connection.getRepository(User)
    }
    public async create({
        name,
        email,
        password,
        address,
        city,
        state,
        cep,
        birth_day,
    }: CreateUserDto): Promise<User> {
        const userExists = await this.userRepository.findOne({
            where: { name },
        })
        const encryptedPassword = bcrypt.hashSync(password, 8)

        if (userExists) {
            throw new AppError(['There is already one user with same name'])
        }

        const user = this.userRepository.create({
            name,
            email,
            password: encryptedPassword,
            address,
            city,
            state,
            cep,
            birth_day,
        })

        await this.userRepository.save(user)

        return user
    }

    public async findAll(): Promise<User[]> {
        const users = await this.userRepository.find()

        return users
    }
}

export default UserService
