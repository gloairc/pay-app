import { Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import axios from "axios"
import { useEffect, useState } from "react"
import DateModal from "../components/DateModal"
import { Edit } from "@material-ui/icons";
import Record from "../components/Record"

const History = (props) => { //props.user
    //search transaction database, filter  date, then filter to & from, sort by date & time
    const [transferDetails, setTransferDetails] = useState([])
    const [modalShow, setModalShow] = useState(false);

    const defaultEndDate = new Date() //today
    const defaultStartDate = new Date(defaultEndDate.setMonth(defaultEndDate.getMonth() - 1)) //default one month before
    const [dateRange, setDateRange] = useState({ startDate: defaultStartDate, endDate: new Date() })


    useEffect(() => { //run when first load the page
        const storedDateRange = JSON.parse(sessionStorage.getItem("tempDateRange"));
        if (storedDateRange !== null) {
            setDateRange(storedDateRange)
        }
    }, [])

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
            <div>
                <h4 >Transaction History</h4>
            </div>
            <div>
                {new Date(dateRange.startDate).toLocaleDateString("en-AU")}
                {" "}to{" "}
                {new Date(dateRange.endDate).toLocaleDateString("en-AU")}
                {"   "}

                <Button className="p-0" variant="light" onClick={() => setModalShow(true)}>
                    <Edit />
                </Button>
            </div>

            <div>
                <DateModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    setDateRange={setDateRange}
                />
            </div>

            <div>
                {transferDetails ? (transferDetails.length > 0 ? <div></div> : <div>No transaction found</div>) : <></>}
                {transferDetails ? (<div>
                    {transferDetails.map((data, index) => (
                        <Record index={index} data={data} user={props.user} />
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