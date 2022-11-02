import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user =  await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'qualquercoisa2@gmail.com',
        avatarUrl: 'https://github.com/renanvcb.png',
      }
    })
  
    const pool = await prisma.pool.create({
      data: {
        title: 'Example Pool2',
        code: 'p12345',
        ownerId: user.id,
  
        participants: {
          create: {
            userId: user.id
          }
        }
      }
    })
  
    await prisma.game.create({
      data: {
        data: '2022-11-03T12:00:00.974Z',
        firstTeamCountryCode: 'DE',
        secondTeamCountryCode: 'BR',
      }
    })
  
    await prisma.game.create({
      data: {
        data: '2022-11-04T12:00:00.974Z',
        firstTeamCountryCode: 'BR',
        secondTeamCountryCode: 'AR',
  
        guesses: {
          create: {
            firstTeamPoints: 2,
            secoundTeamPoints: 1,
  
            participant: {
              connect: {
                userId_poolId: {
                  userId: user.id,
                  poolId: pool.id
                }
              }
            }
          }
        }
      }
    })
  }

main()