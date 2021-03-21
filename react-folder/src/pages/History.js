import { Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import axios from "axios"
import { useEffect, useState } from "react"
import SelectDate from "../components/SelectDate"

const History = (props) => { //props.user
    //search transaction database, filter  date, then filter to & from, sort by date & time
    const [transferDetails, setTransferDetails] = useState([])

    const defaultEndDate = new Date() //today
    const defaultStartDate = new Date(defaultEndDate.setMonth(defaultEndDate.getMonth() - 1)) //default one month before
    const [dateRange, setDateRange] = useState({ startDate: defaultStartDate, endDate: new Date() })


    useEffect(() => { //run when first load the page
        const storedDateRange = JSON.parse(sessionStorage.getItem("tempDateRange"));
        if (storedDateRange !== null) {
            setDateRange(storedDateRange)
        }
    }, [])

    // const dateRangeDisplay = () => {
    //     const dateDisplay = {
    //         startDate: dateRange.startDate.toLocaleDateString("en-AU"),
    //         endDate: dateRange.endDate.toLocaleDateString("en-AU"),
    //     }
    //     console.log(dateDisplay.startDate)
    //     return (
    //         <div>{dateDisplay.startDate} to {dateDisplay.endDate}</div>
    //     )
    // }

    console.log("dateRange in History", dateRange)

    useEffect(() => {
        const transactionRange = {
            to: props.user.username,
            from: props.user.username,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate
        }
        console.log("transactionRange", transactionRange)
        sessionStorage.setItem("tempDateRange", JSON.stringify(dateRange));
        axios
            .get("/api/transaction", { params: transactionRange })
            .then((response) => {
                console.log("axios response", response)
                setTransferDetails(response.data)
            })
            .catch((error) => {
                console.log("error", error)
            })

    }, [dateRange])

    // for each item in transferDetails array, map it out into card or table role 

    return (
        <div>
            Transaction History
            <br />
            {/* {dateRangeDisplay()} */}
            {/* {dateRange.startDate.toLocaleDateString("en-AU")} */}
            <div>
                <SelectDate setDateRange={setDateRange} />
            </div>

            <div>
                {transferDetails ? (transferDetails.length > 0 ? <div></div> : <div>No transaction found</div>) : <></>}
                {transferDetails ? (<div>
                    {transferDetails.map((data, index) => (
                        <table>
                            < tr key={index} >
                                <td>{data.createdAt}</td>
                            </tr>
                            <tr key={`A${index}`}>
                                <td>{data.comment}</td>
                                <td>{data.from}{data.to}</td>
                                <td>{data.amount}</td>
                                <td><Button size="sm"
                                    as={Link} to={`/history/${data._id}`}
                                >View</Button></td>
                            </tr>
                        </table>
                    ))}
                </div>) : (<></>)
                }
                <div class="mt-3">
                    <Row>
                        <Button variant="outline-secondary" as={Link} to="/landing">Back</Button>
                    </Row>
                </div>
            </div>
        </div >
    )
}

export default History