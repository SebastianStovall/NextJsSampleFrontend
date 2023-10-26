import Button from "./ui/button"
import styles from "./events-search.module.css"

import { useRef } from "react"

function EventsSearch(props) {
    const yearInputRef = useRef()
    const monthInputRef = useRef()

    function handleOnSubmit(e) {
        e.preventDefault()

        const selectedYear = yearInputRef.current.value
        const selectedMonth = monthInputRef.current.value

        // props.onSearch 's value is = to a function... so this line is simply just calling that function
        props.onSearch(selectedYear, selectedMonth)
    }

    return (
        <form className={styles.form} onSubmit={handleOnSubmit}>
            <div className={styles.controls}>
                <div className={styles.control}>
                    <label htmlFor="year">Year</label>
                    <select id="year" ref={yearInputRef}>
                        <option value={'2021'}>2021</option>
                        <option value={'2022'}>2022</option>
                    </select>
                </div>
                <div className={styles.control}>
                    <label htmlFor="month">Month</label>
                    <select id="month" ref={monthInputRef}>
                        <option value={"1"}>Jan</option>
                        <option value={"2"}>Feb</option>
                        <option value={"3"}>March</option>
                        <option value={"4"}>April</option>
                        <option value={"5"}>May</option>
                        <option value={"6"}>June</option>
                        <option value={"7"}>July</option>
                        <option value={"8"}>Aug</option>
                        <option value={"9"}>Sept</option>
                        <option value={"10"}>Oct</option>
                        <option value={"11"}>Nov</option>
                        <option value={"12"}>Dec</option>
                    </select>
                </div>
            </div>
            <Button>Find Events</Button>
        </form>
    )
}

export default EventsSearch
