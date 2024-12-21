export default class PayPalStrategy {
    async pay(amount) {
        return {
            message: `${amount} paid via PayPal.`
        };
    }
}