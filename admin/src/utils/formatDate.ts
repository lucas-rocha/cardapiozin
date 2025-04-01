const daysOfTheWeek = ['Seg', 'Ter', 'Quarta', 'Qui', 'Sex', 'Sáb', 'Dom']

export const formatDate = (date: string) => {
  const dateObj = new Date(date)
  const day = dateObj.getDay()
  const month = dateObj.getMonth() + 1
  const hour = dateObj.getHours()
  const minutes = dateObj.getMinutes()

  return `${daysOfTheWeek[day]} às ${hour}:${minutes}`
}