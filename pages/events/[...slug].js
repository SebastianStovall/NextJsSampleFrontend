import { useRouter } from "next/router"
import { getFilteredEvents } from "../../dummy-data"
import EventList from "../../components/events/event-list"
import ResultsTitle from "../../components/events/results-title"

function FilteredEventsPage() {
    const router = useRouter()

    // .slug since thats what we named the catch all in the file name ---->  [...slug]
    const filterData = router.query.slug

    // before this component mounts, we wont have access to this data
    if(!filterData || filterData.length === 0) return <p className="center">...Loading</p>

    const filteredYear = Number(filterData[0])
    const filteredMonth = Number(filterData[1])

    if( isNaN(filteredYear) || isNaN(filteredMonth) || filteredYear > 2030 || filteredYear < 2021 || filteredMonth < 1 || filteredMonth > 12) return <p>Invalid Filter</p>

    const filteredEvents = getFilteredEvents({year: filteredYear, month: filteredMonth})
    if(!filteredEvents || filteredEvents.length === 0) return <p>No events found</p>

    const date = new Date(filteredYear, filteredMonth - 1)

    return (
        <>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    )
}

export default FilteredEventsPage
