import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
// files
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';

// mock any properties & methods inside TaskRepository
const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

// mock for user input object
const mockUser = {
  id: 'some-uuid',
  username: 'rifandani',
  password: 'R1f4nd4n1',
  tasks: [],
};

// mock for task object
const mockTask = {
  id: 'some-uuid',
  title: 'Cleaning',
  description: 'clean my room',
  status: TaskStatus,
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskRepository: TaskRepository & {
    getTasks: jest.Mock<any, any>;
    findOne: jest.Mock<any, any>;
  };

  beforeEach(async () => {
    // initialize nestjs module with tasksService & taskRepository
    const moduleRef = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TaskRepository,
          useFactory: mockTaskRepository,
        },
      ],
    }).compile();

    tasksService = await moduleRef.resolve(TasksService);
    taskRepository = await moduleRef.resolve(TaskRepository);
    // tasksService = moduleRef.get(TasksService);
    // taskRepository = moduleRef.get(TaskRepository);
  });

  describe('getTasks', () => {
    it('calls TaskRepository.getTasks and returns Task[]', async () => {
      // mock getTasks resolved value because Promise based
      taskRepository.getTasks.mockResolvedValue([]);

      // then call tasksService.getTasks
      // which should then call taskRepository.getTasks
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual([]);
    });
  });

  describe('getTaskById', () => {
    it('calls TaskRepository.findOne and returns Task', async () => {
      // mock getTasks resolved value because Promise based
      taskRepository.findOne.mockResolvedValue(mockTask);

      // then call tasksService.getTaskById
      // which should then call taskRepository.findOne
      const result = await tasksService.getTaskById(mockTask.id, mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls TaskRepository.findOne and handles NotFoundException error', async () => {
      // mock getTasks resolved value because Promise based
      taskRepository.findOne.mockResolvedValue(null);

      // then call tasksService.getTaskById
      // which should then call taskRepository.findOne
      // which should then throws error
      expect(
        tasksService.getTaskById('invalid-uuid', mockUser),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
