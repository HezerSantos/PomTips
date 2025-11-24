package webhooks

import (
	"encoding/json"
	"fmt"
	"go-server/helpers"
	"io"
	"net/http"
	"os"

	"github.com/stripe/stripe-go/v84"
	"github.com/stripe/stripe-go/v84/webhook"
)




func WebhookHandler(w http.ResponseWriter, r *http.Request) {
	WH_SECRET := os.Getenv("WH_SECRET")
	r.Body = http.MaxBytesReader(w, r.Body, 1<<20)
	stripe.Key = os.Getenv("STRIPE_KEY")
	payload, err := io.ReadAll(r.Body)

	if err != nil {
		helpers.SendNetworkError(w, r, "PAYLOAD ERROR", err)
		return
	}

	sigHeader := r.Header.Get("Stripe-Signature")
	event, err := webhook.ConstructEvent(payload, sigHeader, WH_SECRET)
	if err != nil {
		helpers.SendNetworkError(w, r, "EVENT ERROR", err)
		return
	}

	switch event.Type {
	case "checkout.session.completed":
		var session stripe.CheckoutSession
		if err := json.Unmarshal(event.Data.Raw, &session); err != nil {
			fmt.Println("	JSON ERROR")
			helpers.SendNetworkError(w, r, "JSON ERROR", err)
			return
		}
		appointmentHook(w, r, session)
	}

	w.WriteHeader(http.StatusOK)

}