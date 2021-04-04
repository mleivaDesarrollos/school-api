import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDTO } from './dto/create-student.dto';
import { UpdateStudentDTO } from './dto/update-student.dto';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async getOne(idNumber: number): Promise<Student> {
    const foundedStudent = await this.studentRepository.findOne(idNumber);
    if (!foundedStudent) {
      throw new NotFoundException(
        null,
        `El estudiante con id ${idNumber} no fue encontrado`,
      );
    }
    return foundedStudent;
  }

  async create(newStudent: CreateStudentDTO): Promise<Student> {
    return this.studentRepository.save(newStudent);
  }

  async update(updatedStudent: UpdateStudentDTO): Promise<Student> {
    const currentStudent = await this.getOne(updatedStudent.id);
    currentStudent.firstName = updatedStudent.firstName;
    currentStudent.lastName = updatedStudent.lastName;
    return this.studentRepository.save(currentStudent);
  }

  async deleteOne(idStudent: number): Promise<void> {
    const foundedStudent = await this.getOne(idStudent);
    await this.studentRepository.delete(foundedStudent.id);
    return;
  }
}
