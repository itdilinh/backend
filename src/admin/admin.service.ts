import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  private users = [
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
    { id: 2, name: 'Regular User', email: 'user@example.com', role: 'user' },
  ];

  getUsers() {
    return this.users;
  }

  createUser(userData) {
    const newUser = { id: Date.now(), ...userData };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string, userData) {
    const index = this.users.findIndex(user => user.id === Number(id));
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...userData };
      return this.users[index];
    }
    return null;
  }

  deleteUser(id: string) {
    this.users = this.users.filter(user => user.id !== Number(id));
    return { message: 'User deleted' };
  }
}
