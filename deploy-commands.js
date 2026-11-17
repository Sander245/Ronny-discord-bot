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
      },
      {
        name: 'clear_long_term',
        description: 'Also clear your long-term memory entries',
        type: 5,
        required: false,
      }
    ],
  },
  {
    name: 'viewmem',
    description: 'View your long-term memory (raw or AI summary).',
    dm_permission: true,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
    options: [
      {
        name: 'ai',
        description: 'Use AI summary (default true)',
        type: 5,
        required: false,
      },
      {
        name: 'who',
        description: 'Who should summarize memory?',
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
    name: 'mode',
    description: 'Set how unhinged Ronny is with you. Leave blank to see your current mode.',
    dm_permission: true,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
    options: [
      {
        name: 'mode',
        description: 'Which Ronny do you want?',
        type: 3,
        required: false,
        choices: [
          { name: 'Boring (experimental)', value: 'boring' },
          { name: 'Normal', value: 'normal' },
          { name: 'Overtemp (experimental)', value: 'overtemp' },
        ]
      }
    ],
  },
  {
    name: 'fix',
    description: 'Admin memory reset command.',
    dm_permission: true,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
    options: [],
  },
  {
    name: 'tempchat',
    description: 'Admin only: chat with Ronny using your own prompt (only affects you).',
    dm_permission: true,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
    options: [
      {
        name: 'start',
        description: 'Start a temp chat with your own prompt',
        type: 1,
        options: [
          {
            name: 'prompt',
            description: 'The prompt Ronny should follow when talking to you',
            type: 3,
            required: true,
            max_length: 6000,
          },
          {
            name: 'keep_ronny',
            description: "Keep Ronny's normal personality and add your prompt on top (default: replace it)",
            type: 5,
            required: false,
          },
        ],
      },
      { name: 'end', description: 'End your temp chat and go back to normal Ronny', type: 1 },
      { name: 'view', description: 'See your current temp chat prompt', type: 1 },
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
