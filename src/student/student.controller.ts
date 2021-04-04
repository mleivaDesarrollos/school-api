import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateStudentDTO } from './dto/create-student.dto';
import { UpdateStudentDTO } from './dto/update-student.dto';
import { Student } from './student.entity';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Get()
  async getAll(): Promise<Student[]> {
    return this.studentService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Student> {
    return this.studentService.getOne(id);
  }

  @Post()
  async create(@Body() newStudent: CreateStudentDTO): Promise<Student> {
    return this.studentService.create(newStudent);
  }

  @Put()
  async update(@Body() updatedStudent: UpdateStudentDTO): Promise<Student> {
    return this.studentService.update(updatedStudent);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteOne(@Param('id') id: number): Promise<void> {
    return this.studentService.deleteOne(id);
  }
}
