import { User, Category, Command } from './dataHolder';

export const users = {
  admin: User('Admin', 'ejiro@gmail.com', 'solomon1', true),
  user: User('User', 'solomon@gmail.com', 'solomon1', false),
  newUser: User('User', 'solomon2@gmail.com', 'solomon1'),
};

export const categories = {
  category1: new Category('Category 1'),
  category2: new Category('Category 2')
};

export const commands = {
  command1: Command('command 1', 'Command 1', null, null),
  command2: Command('command 2', 'Command 2', null, null),
  command3: Command('command 3', 'Command 3', null, null),
};

export const invalidData = {
  user: User('Nna', 'sol@', 'olodo', false),
  category: Category('Iv'),
  command: Command('cm', 'CC', '1527272728282', '57ywwjososhwu21')
};