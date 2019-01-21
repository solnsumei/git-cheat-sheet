export default {
  user: {
    _id: '2345',
    name: 'ejiro',
    email: 'ejiro@gmail.com',
    isAdmin: true,
  },
  user2: {
    _id: '2346',
    name: 'ejiro2',
    email: 'ejiro2@gmail.com',
    isAdmin: false,
  },
  categories: [
    {
      _id: '2342',
      name: 'Install Git',
    },
    {
      _id: '673828',
      name: 'Configure',
    },
  ],
  categoryWithCommands: {
    _id: '673828',
    name: 'Configure',
    commands: [
      {
        _id: '2452',
        snippet: 'git --hire',
        action: 'Andela KK',
        user: '2345',
        category: '673828'
      },
      {
        _id: '2457',
        snippet: 'git --hire -devs',
        action: 'Andela Hires',
        user: '2345',
        category: '673828'
      }
    ]
  },
  commands: [
    {
      _id: '2452',
      snippet: 'git --hire',
      action: 'Andela Cohorts',
      user: '1234',
      category: '2345'
    },
    {
      _id: '2458',
      snippet: 'git --tweak',
      action: 'Andela Git Course',
      user: '1234',
      category: '2345'
    }
  ],
  emptyCommand: {
    _id: null,
    snippet: '',
    action: '',
    category: '2345'
  },
};
