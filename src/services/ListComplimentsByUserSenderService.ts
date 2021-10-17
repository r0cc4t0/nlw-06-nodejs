import { getCustomRepository } from 'typeorm';
import ComplimentsRepository from '../repositories/ComplimentsRepository';

class ListComplimentsByUserSenderService {
  async execute(user_id: string) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const compliments = await complimentsRepository.find({
      where: { user_sender: user_id },
      relations: ['userSender', 'userReceiver', 'tagID']
    });

    return compliments;
  }
}

export default ListComplimentsByUserSenderService;
