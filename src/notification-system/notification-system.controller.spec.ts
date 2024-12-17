import { Test, TestingModule } from '@nestjs/testing';
import { NotificationSystemController } from './notification-system.controller';

describe('NotificationSystemController', () => {
  let controller: NotificationSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationSystemController],
    }).compile();

    controller = module.get<NotificationSystemController>(NotificationSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
