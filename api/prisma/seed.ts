import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  const daysOfWeek = [
    { id: 1, name: 'Domingo', code: 0 },
    { id: 2, name: 'Segunda', code: 1 },
    { id: 3, name: 'Terça', code: 2 },
    { id: 4, name: 'Quarta', code: 3 },
    { id: 5, name: 'Quinta', code: 4 },
    { id: 6, name: 'Sexta', code: 5 },
    { id: 7, name: 'Sábado', code: 6 },
  ]

  for(const day of daysOfWeek) {
    await prisma.days_Of_Week.upsert({
      where: { id: day.id },
      update: {},
      create: day
    })
  }

  const categoriesImage = [
    { id: 1, image: 'apple.png'} ,
    {id: 2, image: 'ice_cream.png'}
  ]


  await prisma.category_Image.createMany({
    data: categoriesImage,
    skipDuplicates: true
  })

  const units = [
    { id: 1, name: 'unidade'} ,
    {id: 2, name: 'kilo'},
    {id: 3, name: 'litro'},
  ]


  await prisma.unit.createMany({
    data: units,
    skipDuplicates: true
  })


 
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })