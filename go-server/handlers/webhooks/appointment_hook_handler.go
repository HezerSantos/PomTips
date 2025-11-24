package webhooks

import (
	"fmt"
	"net/http"

	"github.com/stripe/stripe-go/v84"
)

func appointmentHook(w http.ResponseWriter, r *http.Request, session stripe.CheckoutSession) {
	if session.Metadata != nil {
		fmt.Println(session.Metadata)
	} else {
		fmt.Println("WEBHOOK")
	}
}