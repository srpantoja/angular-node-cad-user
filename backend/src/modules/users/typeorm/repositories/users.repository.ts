import { Repository } from 'typeorm'

import User from '../entities/user.entity'
import { connectionSource } from '../../../../shared/typeorm'

class UserRepository extends Repository<User> {

    constructor() {
        super(User, connectionSource.createEntityManager())
    }

}

export default UserRepository
