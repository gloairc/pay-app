import { useState } from "react"
import Transaction1 from "./Transaction1"
import Transaction2 from "./Transaction2"

const Transaction = (props) => {
    const [receipient, setReceipient] = useState([])
    console.log("Receipient", receipient)

    const step1 = (<Transaction1 setReceipient={setReceipient} user={props.user} />);
    const step2 = <Transaction2 receipient={receipient} user={props.user} setReceipient={setReceipient} />

    const showTransactionComponent = (Object.keys(receipient).length === 0) ? step1 : step2

    return (
        <div>

            { showTransactionComponent}
        </div>
    )
}

export default Transaction