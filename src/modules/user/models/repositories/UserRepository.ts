import { Repository } from 'typeorm';
import User from '../entities/User';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import appDataSource from '../../../../config/database.config';
import IUserDTO from '@modules/user/dtos/IUserDTO';

class UserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = appDataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user || undefined;
  }

  async findByPhone(phone_number: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { phone_number },
    });

    return user || undefined;
  }

  async findByPhoneOrEmail(
    data: 'phone_number' | 'email',
    value: string
  ): Promise<User | undefined> {
    let user: User | null;

    if ((data = 'phone_number')) {
      user = await this.ormRepository.findOne({
        where: { phone_number: value },
      });
    } else {
      user = await this.ormRepository.findOne({
        where: { email: value },
      });
    }

    return user || undefined;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user || undefined;
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  async findOne(data: IUserDTO): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: data,
      select: [
        'id',
        'first_name',
        'last_name',
        'email',
        'created_at',
        'updated_at',
      ],
    });

    return user || undefined;
  }

  async save(user: IUserDTO): Promise<User> {
    return this.ormRepository.save(user);
  }

  async update() {
    
  }
}

export default UserRepository;
