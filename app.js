import express from 'express'; 
import BankTransferStrategy from './BankTransferStrategy.js';
import PayPalStrategy from './PayPalStrategy.js';
import CreditCardStrategy from './CreditCardStrategy.js';
// import more payment Strategy if needed ....

const app = express();
const PORT = 3000;// Run app in the port 3000

// Middleware to parse JSON request bodies
app.use(express.json());

// Handle POST requests (4. client)
app.post('/pay', async (req, res) => {
    try {
        const { provider, amount } = req.body; // Get data from request body
        console.log('Received data:', req.body);

        // 1. Context
        // Define payment strategies
        //The correct payment strategy is selected from the strategies object based on the provider specified in the request body.
        const strategies = {
            payPal: new PayPalStrategy(),
            bankTransfer: new BankTransferStrategy(),
            creditCard: new CreditCardStrategy(),
            //add more payment Strategy if needed ....
        };

        // Select the payment strategy based on the provider
        const paymentStrategy = strategies[provider];


        if (!paymentStrategy) {
            return res.status(400).json({ 
                message: "Invalid provider: Provider type should be either 'payPal', 'bankTransfer', or 'creditCard' (case-sensitive)." 
            });
        }        

        // Process the payment
        const result = await paymentStrategy.pay(amount);

        // Send success response
        return res.status(200).json({ message: result });
    } catch (err) {
        console.error('Error processing payment:', err.message);

        // Send error response
        return res.status(500).json({ message: 'Unexpected error occurred.' });
    }
});

// Start the server on port no 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
 