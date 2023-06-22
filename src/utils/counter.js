import CounterAddress from "../contracts/CounterAddress.json";
import BigNumber from "bignumber.js"


export const approve = async (tokenContract, performActions) => {
    try {
        await performActions(async (kit) => {
            const {defaultAccount} = kit;
            let amountToApprove = new BigNumber(1).shiftedBy(18).toString()
            await tokenContract.methods.approve(CounterAddress?.FastDomain, amountToApprove).send({from: defaultAccount});
        });
    } catch (e) {
        console.log({e});
        // document.querySelector('.Approval-error').style.display='block';
    }
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

export const registerFastDomain = async (counterContract, performActions, domainName) => {
    try {
        await performActions(async (kit) => {
            console.log("registerFastDomain", domainName)
            const {defaultAccount} = kit;
            await counterContract.methods.registerFastDomain(domainName).send({from: defaultAccount});
        });
    } catch (e) {
        console.log({e});
    }
};


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
            return value
        });


    } catch (e) {
        console.log({e});
    }
};

export const isDomainRegistered = async (counterContract) => {
    try {

        const value =  await counterContract.methods.isDomainRegistered().call();
        return value
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