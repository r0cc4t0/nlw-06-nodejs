import { getCustomRepository } from 'typeorm';
import ComplimentsRepository from '../repositories/ComplimentsRepository';
import UsersRepository from '../repositories/UsersRepository';

interface ComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
};

class CreateComplimentService {
  async execute({ tag_id, user_sender, user_receiver, message }: ComplimentRequest) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const usersRepository = getCustomRepository(UsersRepository);

    if (user_sender === user_receiver) {
      throw new Error('The receiver user is equal to sender user!');
    }

    const userReceiverExists = await usersRepository.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new Error('The receiver user does not exist!');
    }

    const compliment = complimentsRepository.create({ tag_id, user_sender, user_receiver, message });

    await complimentsRepository.save(compliment);

    return compliment;
  }
}

export default CreateComplimentService;
