import { useEffect, useState, SetStateAction } from "react"
import BookDate from "./bookDate";


type GetDaysType = (year: number, month: number, x: number) => Date[]

const  getLastXDays: GetDaysType = (year, month, x) => {
  const lastDay = new Date(year, month + 1, 0).getDate();
  const dates = [];

  for (let day = lastDay - x + 1; day <= lastDay; day++) {
    dates.push(new Date(year, month, day));
  }

  return dates;
}

const getFirstXDaysNextMonth: GetDaysType = (year, month, x) => {
  const dates = [];
  for (let day = 1; day <= x; day++) {
    dates.push(new Date(year, month + 1, day));
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
    const month = now.getMonth()
    const dates = []


    const daysInMonth = new Date(year, month + 1, 0).getDate()

    for (let day = 1; day <= daysInMonth; day++) {
        dates.push(new Date(year, month, day));
    }

    const startDate = startMap.get(dates[0].toString().split(" ")[0]) as number
    const endDate = endMap.get(dates[dates.length - 1].toString().split(" ")[0]) as number
    const startDays = getLastXDays(year, month - 1, startDate)
    const endDays = getFirstXDaysNextMonth(year, month, endDate)

    const finalDates = [...startDays, ...dates, ...endDays]

    return finalDates
    
}

interface BookCalendarProps {
    selectedDate: Date | null
    setSelectedDate: React.Dispatch<SetStateAction<Date | null>>
}
const BookCalendar: React.FC<BookCalendarProps> = ({selectedDate, setSelectedDate}) => {
    const [ dates, setDates ] = useState<Date[] | []>([])
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
                    {dates.map((date, i) => {
                        return(
                            <BookDate 
                                date={date} 
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                key={i}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default BookCalendar