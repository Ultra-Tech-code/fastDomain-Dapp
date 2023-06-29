import CounterAddress from "../contracts/CounterAddress.json";
import BigNumber from "bignumber.js"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import{ NotificationInfo, NotificationSuccess, NotificationError } from "../components/ui/Notifications"


export const approve = async (tokenContract, performActions) => {
    try {
        await performActions(async (kit) => {
            const {defaultAccount} = kit;
            let amountToApprove = new BigNumber(1).shiftedBy(18).toString()
            await tokenContract.methods.approve(CounterAddress?.FastDomain, amountToApprove).send({from: defaultAccount});
            toast(<NotificationSuccess text="Approval Successfull...." />); 
        });
    } catch (e) {
        console.log({e});
        toast(<NotificationError text="OOps, Approval Failed." />);
    }

    return "done";
}


export const mintToken = async (counterContract, performActions) => {
    try {
        await performActions(async (kit) => {
            const {defaultAccount} = kit;
            await counterContract.methods.mintToken().send({from: defaultAccount});
        });
    } catch (e) {
        console.log({e});
    }
};

// export const registerFastDomain = async (counterContract, performActions, domainName) => {
//     try {
//         await performActions(async (kit) => {
//             console.log("registerFastDomain", domainName)
//             const {defaultAccount} = kit;
//             await counterContract.methods.registerFastDomain(domainName).send({from: defaultAccount});
//         });
//     } catch (e) {
//         console.log({e});
//     }
// };


export const reassignDomain = async (counterContract, performActions, newDomainName) => {
    try {
        await performActions(async (kit) => {
            const {defaultAccount} = kit;
            await counterContract.methods.reassignDomain(newDomainName).send({from: defaultAccount});
        });
    } catch (e) {
        console.log({e});
    }
};

export const getDomain = async (counterContract) => {
    try {

        const value =  await counterContract.methods.getDomain().call();
        return value
    } catch (e) {
        console.log({e});
    }
};

export const getConnectedAddressDomain = async (counterContract, performActions) => {
    try {

        await performActions(async (kit) => {
            const {defaultAccount} = kit;
            const value =  await counterContract.methods.getDomain(defaultAccount).call();
            if (value === undefined){
                toast(<NotificationInfo text="You don't have a domain yet" />); 
            } else{
              toast(<NotificationInfo text={ <span> Welcome {value}</span> } />); 
                console.log("value ",value)
            }
        });


    } catch (e) {
        console.log({e});
    }
};

export const isDomainRegistered = async (counterContract, domainName) => {
    try {

        const value =  await counterContract.methods.isDomainRegistered(domainName).call();
        if(value === true){
            toast(<NotificationSuccess text="Domain name already Taken"/>);
            return;
        }
    } catch (e) {
        console.log({e});
    }
};

export const getAllregisteredDomains = async (counterContract) => {
    try {

        const value =  await counterContract.methods.getAllregisteredDomains().call();
        return value
    } catch (e) {
        console.log({e});
    }
};