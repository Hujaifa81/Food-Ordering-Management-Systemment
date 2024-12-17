import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from 'src/dtos/createFeedback.dto';
import { UpdateFeedbackDto } from 'src/dtos/updateFeedback.dto';


@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Get()
  async findAll() {
    return this.feedbackService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbackService.update(id, updateFeedbackDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.feedbackService.delete(id);
  }
}
