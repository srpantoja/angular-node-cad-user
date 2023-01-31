class CreateUserDto {
    readonly name: string
    readonly email: string
    readonly password: string
    readonly address: string
    readonly city: string
    readonly state: string
    readonly cep: string
    readonly birth_day: Date
}

export default CreateUserDto
