require('dotenv').config({ path: __dirname + '/.env' });
const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'ask',
    description: 'Ask Ronny or Jonny. Uses last 5 messages as context.',
    dm_permission: true,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
    options: [
      { name: 'text', description: 'Your message', type: 3, required: true },
      {
        name: 'who',
        description: 'Who should reply first?',
        type: 3,
        required: false,
        choices: [
          { name: 'Ronny', value: 'ronny' },
          { name: 'Jonny', value: 'jonny' },
        ]
      }
    ],
  },
  {
    name: 'spam',
    description: 'Ping someone multiple times',
    dm_permission: true,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
    options: [
      { name: 'who', description: 'User to ping', type: 6, required: true },
      { name: 'amount', description: 'Number of pings', type: 4, required: true, min_value: 1, max_value: 50 }
    ],
  },
  {
    name: 'clearmem',
    description: 'Clear DM memory, optionally with pre-wipe reaction messages.',
    dm_permission: true,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
    options: [
      {
        name: 'parting',
        description: 'Optional parting message Ronny/Jonny should react to before wipe',
        type: 3,
        required: false,
      },
      {
        name: 'replies',
        description: 'How many pre-wipe reaction messages (1-4)',
        type: 4,
        required: false,
        min_value: 1,
        max_value: 4,
      },
      {
        name: 'who',
        description: 'Who reacts before memory clear?',
        type: 3,
        required: false,
        choices: [
          { name: 'Ronny', value: 'ronny' },
          { name: 'Jonny', value: 'jonny' },
        ]
      }
    ],
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  console.log('📡 Registering GUILD commands (instant)…');
  await rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
    { body: commands }
  );

  console.log('📡 Registering GLOBAL commands (DMs; may take a few minutes)…');
  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands }
  );

  console.log('✅ Done.');
})();
