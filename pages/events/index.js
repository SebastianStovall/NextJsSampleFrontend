import { useRouter } from 'next/router'

import { getAllEvents } from "../../dummy-data"
import EventList from "../../components/events/event-list"
import EventsSearch from "../../components/events/events-search"

function AllEventsPage() {
    const events = getAllEvents()
    const router = useRouter()

    // this function is called when a user submits the event search form (reference onSubmit function in event search component)
    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath)
    }

    return (
        <div>
            <EventsSearch onSearch={findEventsHandler}/>
            <EventList items={events} />
        </div>
    )
}

export default AllEventsPage
