export function generateDummyBankData(numEntries) {

    const generateRoutingNumber = () => {
        return Math.floor(100000000 + Math.random() * 900000000).toString();
    };

    const generatePhoneNumber = () => {
        return Math.floor(1000000000 + Math.random() * 9000000000).toString();
    };

    const generateRandomDate = () => {
        const startDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
        return startDate.toISOString();
    };

    const countryId = "afaf4b7e-be8f-49d5-9afa-8bae64ed3030";
    const state = "4016ce22-4e9c-4681-96f6-4f15afbe8803";
    const cityId = "1e2a76a5-58b6-42ac-aade-5291e0a95a2f";
    const zipCodeId = "c0454fc7-08f6-4341-a935-fb8570532331";

    return Array.from({ length: numEntries }).map(() => ({
        countryId: countryId,
        bankName: "Payne, Sweeney and Brown" + Math.floor(1000 + Math.random() * 9000),
        displayName: "Payne Bank" + Math.floor(1000 + Math.random() * 9000),
        routingNumber: generateRoutingNumber(),
        bankPhoneNumber: generatePhoneNumber(),
        bankCode: "PSB",
        primaryContactNumber: generatePhoneNumber(),
        email: "jonesbilly@kirby.com",
        bankWebsite: "https://www.johnston.biz" + Math.floor(1 + Math.random() * 9000),
        state: state,
        cityId: cityId,
        zipCodeId: zipCodeId,
        address1: "6676 Thompson Falls, Williamburgh, IN 01366",
        address2: "string",
        startDate: generateRandomDate()
    }))
}