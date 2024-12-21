export default class CreditCardStrategy {
    async pay(amount) {
        return {
            message: `${amount} paid via Credit Card.`
        };
    }
}