import React, {useState, useEffect} from "react"
import {Card, Button} from "react-bootstrap";
import {useContractKit} from "@celo-tools/use-contractkit";
import {increaseCount, decreaseCount, getCount, getDomain, getConnectedAddressDomain, mintToken, getAllregisteredDomains} from "../utils/counter";
import Loader from "./ui/Loader";
import {NotificationSuccess} from "./ui/Notifications";

const Counter = ({counterContract, tokenContract}) => {
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const {performActions} = useContractKit();

    useEffect(() => {
        try {
            if (counterContract) {
                updateCount()
            }
        } catch (error) {
            console.log({error});
        }
    }, [counterContract, getCount]);


    
    const increment = async () => {
        try {

            setLoading(true)
            await increaseCount(counterContract, performActions);
            await updateCount()

        } catch (e) {
            console.log({e})
        } finally {
            setLoading(false)
        }
    };

    const decrement = async () => {
        try {
            setLoading(true)
            await decreaseCount(counterContract, performActions);

            await updateCount()
        } catch (e) {
            console.log({e})
        } finally {
            setLoading(false)
        }
    };

    const updateCount = async () => {
        try {

            setLoading(true)
            const value = await getCount(counterContract)
            setCount(value)
        } catch (e) {
            console.log({e})
        } finally {
            setLoading(false)
        }
    };

    const fetchDomain = async () => {
        try {

            setLoading(true)
            const value = await getConnectedAddressDomain(counterContract, performActions)
            if (value === ''){
                console.log("You don't have a domain yet")
                setCount("You don't have a domain yet")
            } else{
                console.log("value ",value)
                setCount(value)
            }



        } catch (e) {
            console.log({e})
        } finally {
            setLoading(false)
        }
    };

    const fetchAllDomain = async () => {
        try {

            setLoading(true)
            const value = await getAllregisteredDomains(counterContract, performActions)
            console.log("value ",value)
            console.log("Token Contract", tokenContract)
            setCount(value)
        } catch (e) {
            console.log({e})
        } finally {
            setLoading(false)
        }
    };


    const mintFastToken = async () => {
        try {
            setLoading(true)
            await mintToken(tokenContract, performActions)
            console.log("Token Minted Successfully");
            NotificationSuccess("Token Minted Successfully")

        } catch (e) {
            console.log({e})
        } finally {
            setLoading(false)
        }
    };

    

    return (

        <Card className="text-center w-50 m-auto">
            <Card.Header>Counter</Card.Header>
            <Card.Body className="mt-4">
                <Card.Title>Count: {count}</Card.Title>
                <br/>

                {!loading
                    ?
                    <div className="d-grid gap-2 d-md-block">
                        <Button className="m-2" variant="dark" size="lg" onClick={increment}>
                            Increase Count
                        </Button>

                        <Button className="m-2" variant="dark" size="lg" onClick={fetchDomain}>
                        Fetch Domain
                        </Button>

                        <Button className="m-2" variant="dark" size="lg" onClick={mintFastToken}>
                        Mint Token
                        </Button>


                        <Button className="m-2" variant="dark" size="lg" onClick={fetchAllDomain}>
                        Fetch all Domain
                        </Button>


                        <Button
                            className="m-2"
                            variant="outline-dark"
                            disabled={count < 1}
                            size="lg"
                            onClick={decrement}
                        >
                            Decrease Count
                        </Button>
                    </div>
                    :
                    <Loader/>
                }

            </Card.Body>
        </Card>
    );
};

export default Counter;
