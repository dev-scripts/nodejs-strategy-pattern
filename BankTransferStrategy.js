export default class BankTransferStrategy {
    async pay(amount) {
        return {
            message: `${amount} paid via Bank Transfer.`
        };
    }
}