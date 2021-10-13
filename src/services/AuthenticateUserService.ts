import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UsersRepository from '../repositories/UsersRepository';

interface AuthenticateRequest {
  email: string;
  password: string;
};

class AuthenticateUserService {
  async execute({ email, password }: AuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new Error('The email address or password is incorrect!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('The email address or password is incorrect!');
    }

    const token = sign(
      {
        email: user.email
      },
      '19abcf1b1517b81c3c1ed8b4e9e2123b',
      {
        subject: user.id,
        expiresIn: '1d'
      }
    );

    return token;
  }
}

export default AuthenticateUserService;
