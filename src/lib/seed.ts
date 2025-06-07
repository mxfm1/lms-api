import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://hopeful-baboon-36732.upstash.io',
  token: 'AY98AAIjcDEyNmU3ZWM1ZWJiNGM0N2E3ODBkMjMzZGNmYWY0ZTkxZXAxMA',
})

await redis.set('foo', 'bar');
const data = await redis.get('foo');    




