import type { User, Package } from '~/types'

const packages: Package[] = ['Basic', 'Standard', 'Premium', null]

const customers: User[] = ([
  {
    id: 1,
    name: 'Alex Smith',
    email: 'alex.smith@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=1'
    },
    role: 'admin',
  },
  {
    id: 2,
    name: 'Jordan Brown',
    email: 'jordan.brown@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=2'
    },
    role: 'user',
  },
  {
    id: 3,
    name: 'Taylor Green',
    email: 'taylor.green@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=3'
    },
    role: 'user',
  },
  {
    id: 4,
    name: 'Morgan White',
    email: 'morgan.white@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=4'
    },
    role: 'user',
  },
  {
    id: 5,
    name: 'Casey Gray',
    email: 'casey.gray@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=5'
    },
    role: 'user',
  },
  {
    id: 6,
    name: 'Jamie Johnson',
    email: 'jamie.johnson@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=6'
    },
    role: 'user',
  },
  {
    id: 7,
    name: 'Riley Davis',
    email: 'riley.davis@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=7'
    },
    role: 'user',
  },
  {
    id: 8,
    name: 'Kelly Wilson',
    email: 'kelly.wilson@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=8'
    },
    role: 'user',
  },
  {
    id: 9,
    name: 'Drew Moore',
    email: 'drew.moore@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=9'
    },
    role: 'user',
  },
  {
    id: 10,
    name: 'Jordan Taylor',
    email: 'jordan.taylor@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=10'
    },
    role: 'user',
  },
  {
    id: 11,
    name: 'Morgan Anderson',
    email: 'morgan.anderson@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=11'
    },
    role: 'user',
  },
  {
    id: 12,
    name: 'Casey Thomas',
    email: 'casey.thomas@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=12'
    },
    role: 'user',
  },
  {
    id: 13,
    name: 'Jamie Jackson',
    email: 'jamie.jackson@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=13'
    },
    role: 'user',
  },
  {
    id: 14,
    name: 'Riley White',
    email: 'riley.white@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=14'
    },
    role: 'user',
  },
  {
    id: 15,
    name: 'Kelly Harris',
    email: 'kelly.harris@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=15'
    },
    role: 'user',
  },
  {
    id: 16,
    name: 'Drew Martin',
    email: 'drew.martin@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=16'
    },
    role: 'user',
  },
  {
    id: 17,
    name: 'Alex Thompson',
    email: 'alex.thompson@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=17'
    },
    role: 'user',
  },
  {
    id: 18,
    name: 'Jordan Garcia',
    email: 'jordan.garcia@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=18'
    },
    role: 'user',
  },
  {
    id: 19,
    name: 'Taylor Rodriguez',
    email: 'taylor.rodriguez@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=19'
    },
    role: 'user',
  },
  {
    id: 20,
    name: 'Morgan Lopez',
    email: 'morgan.lopez@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=20'
    },
    role: 'user',
  }
] as const).map((user) => ({
  ...user,
  package: packages[user.id % packages.length]
}))

export default eventHandler(async () => {
  return customers
})