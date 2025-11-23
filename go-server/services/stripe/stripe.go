package stripe

import (
	"go-server/helpers"
	"net/http"
	"os"
	"github.com/stripe/stripe-go/v75"
	"github.com/stripe/stripe-go/v75/checkout/session"
)


func GenerateSession(w http.ResponseWriter, r *http.Request, description string, metaData *map[string]string) (*stripe.CheckoutSession, bool) {
	stripe.Key = os.Getenv("STRIPE_KEY")
	if stripe.Key == "" {
		panic("STRIPE KEY NOT SET")
	}

	params := &stripe.CheckoutSessionParams{
		Mode: stripe.String("payment"),
		SuccessURL: stripe.String("http://localhost:5173/"),
		CancelURL: stripe.String("http://localhost:5173/"),
		LineItems: []*stripe.CheckoutSessionLineItemParams{
			{
				Quantity: stripe.Int64(1),
				PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
					Currency: stripe.String("usd"),
					UnitAmount: stripe.Int64(2500),
					ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
						Name: stripe.String("Nail Deposit"),
						Description: stripe.String(description),
					},
				},
			},
		},
		Metadata: *metaData,
	}

	s, err := session.New(params)

	if err != nil {
		helpers.SendNetworkError(w, r)
		return nil, false
	}


	return s, true
}