import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import UsersRepository from '../repositories/UsersRepository';

interface UserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
};

class CreateUserService {
  async execute({ name, email, password, admin = false }: UserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new Error('Incorrect email!');
    }

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error('The user already exists!');
    }

    const encryptedPassword = await hash(password, 8);

    const user = usersRepository.create({ name, email, password: encryptedPassword, admin });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
