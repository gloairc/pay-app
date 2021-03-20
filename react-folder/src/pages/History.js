import { Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import axios from "axios"
import { useEffect, useState } from "react"

const History = (props) => { //props.user
    // from props.user.transaction, get the array. For each item in array, axios .get to retrieve transfer data, then check date :/
    // [THIS] OR search transaction database, filter the date, then filter to & filter from, sort by date & time
    const [transferDetails, setTransferDetails] = useState([])

    const endDate = new Date() //today
    console.log("todayDate", endDate)
    const startDate = new Date(endDate.setMonth(endDate.getMonth() - 1))
    console.log("startDate", startDate)

    useEffect(() => {
        const transactionRange = {
            to: props.user.username,
            from: props.user.username,
            startDate: startDate, //default one month before
            endDate: new Date()
        }
        console.log("transactionRange", transactionRange)
        axios
            .get("/api/transaction", { params: transactionRange })
            .then((response) => {
                console.log("axios response", response)
                setTransferDetails(response.data)
            })
            .catch((error) => {
                console.log("error", error)
            })

    }, [])

    // for each item in transferDetails array, map it out into card 

    return (
        <div>
            Transaction History
            {transferDetails ? <div>hihihihi</div> : <div>mp have </div>}
            {transferDetails ? (<div>
                {transferDetails.map((data, index) => (
                    <table>
                        < tr key={index} >
                            <td>{data.createdAt}</td>
                        </tr>
                        <tr>
                            <td>{data.comment}</td>
                            <td>{data.from}{data.to}</td>
                            <td>{data.amount}</td>
                            <td><Button size="sm"
                                // onClick={() => {
                                //     // console.log("handle view click", data)
                                //     props.handleViewClick(data);
                                // }}
                                variant="primary"
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
        </div >
    )
}

export default History