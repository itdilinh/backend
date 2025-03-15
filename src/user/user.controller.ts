import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { CreateUserDto, UpdateUserDto } from './user.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { Roles } from '../auth/roles.decorator';
  import { RolesGuard } from '../auth/roles.guard';
  
  @Controller('admin/users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Get()
    @Roles('admin') // Chỉ Admin mới có quyền lấy danh sách user
    async findAll() {
      return this.userService.findAll();
    }
  
    @Get(':id')
    @Roles('admin')
    async findOne(@Param('id') id: string) {
      return this.userService.findOne(id);
    }
  
    @Post()
    @Roles('admin')
    async create(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
    }
  
    @Put(':id')
    @Roles('admin')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(id, updateUserDto);
    }
  
    @Delete(':id')
    @Roles('admin')
    async delete(@Param('id') id: string) {
      return this.userService.delete(id);
    }
  }
  