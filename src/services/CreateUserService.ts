import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';

interface UserRequest {
  name: string;
  email: string;
  admin?: boolean;
};

class CreateUserService {
  async execute({ name, email, admin }: UserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new Error('Incorrect email!');
    }

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error('The user already exists!');
    }

    const user = usersRepository.create({ name, email, admin });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
