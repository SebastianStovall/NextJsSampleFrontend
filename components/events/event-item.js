import styles from './event-item.module.css' // need the styles classword (bananable) there when importing a css file if you want to locally scope styles with the same className's
import Button from './ui/button'

function EventItem(props) {
    const {title, image, date, location, id} = props
    const humanReadableDate = new Date(date).toLocaleDateString("en-US", {day: 'numeric', month: 'long', year: 'numeric'})
    const formattedAddress = location.replace(', ', '\n') // all the dates have ", "... we are replacing with a line break

    const exploreLink = `/events/${id}`

    return (
        // if we have another class css element named .item now, it will only used the locally scoped one in the event-item.module.css file
        <li className={styles.item}>
            <img src={'/' + image} alt={title} />
            <div className={styles.content}>
                <div className={styles.summary}>
                    <h2>{title}</h2>
                    <div className={styles.date}>
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={styles.address}>
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div className={styles.actions}>
                    <Button link={exploreLink}>Explore Event</Button>
                </div>
            </div>
        </li>
    )
}

export default EventItem
