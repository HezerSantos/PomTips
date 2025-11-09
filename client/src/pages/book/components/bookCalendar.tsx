import { useEffect, useState } from "react"
import BookDate from "./bookDate";


type GetDaysType = (year: number, month: number, x: number) => string[]

const  getLastXDays: GetDaysType = (year, month, x) => {
  const lastDay = new Date(year, month + 1, 0).getDate();
  const dates = [];

  for (let day = lastDay - x + 1; day <= lastDay; day++) {
    dates.push(new Date(year, month, day).toString());
  }

  return dates;
}

const getFirstXDaysNextMonth: GetDaysType = (year, month, x) => {
  const dates = [];
  for (let day = 1; day <= x; day++) {
    dates.push(new Date(year, month + 1, day).toString());
  }
  return dates;
}

const getCurrentMonth = () => {
    const startMap = new Map([
        ['Sun', 0],
        ['Mon', 1],
        ['Tue', 2],
        ['Wed', 3],
        ['Thu', 4],
        ['Fri', 5],
        ['Sat', 6],
    ])
    const endMap = new Map([
        ['Sun', 6],
        ['Mon', 5],
        ['Tue', 4],
        ['Wed', 3],
        ['Thu', 2],
        ['Fri', 1],
        ['Sat', 0],
    ])
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 2
    const dates = []


    const daysInMonth = new Date(year, month + 1, 0).getDate()

    for (let day = 1; day <= daysInMonth; day++) {
        dates.push(new Date(year, month, day).toString());
    }

    const startDate = startMap.get(dates[0].split(" ")[0]) as number
    const endDate = endMap.get(dates[dates.length - 1].split(" ")[0]) as number
    const startDays = getLastXDays(year, month - 1, startDate)
    const endDays = getFirstXDaysNextMonth(year, month, endDate)

    const finalDates = [...startDays, ...dates, ...endDays]

    return finalDates
    
}
const BookCalendar: React.FC = () => {
    const [ dates, setDates ] = useState<string[]>([])
    useEffect(() => {
        const data = getCurrentMonth()
        setDates(data)
    }, [])
    return(
        <>
            <div className="book-calendar">
                <div className="calendar-header">
                    <p>S</p>
                    <p>M</p>
                    <p>T</p>
                    <p>W</p>
                    <p>TR</p>
                    <p>F</p>
                    <p>S</p>
                </div>
                <div className="calendar-content">
                    {dates.map(date => {
                        return(
                            <BookDate date={date}/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default BookCalendar