export default interface Register {
    firstName: string,
    lastName: string,
    email: string,
    // Personal ID that the user enters(not _id mongo)
    userId: number,
    password:string,
    city: string,
    street: string,
}