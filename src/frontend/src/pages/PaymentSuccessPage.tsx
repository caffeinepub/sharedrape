export default function PaymentSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-heading text-3xl font-bold text-charcoal mb-4">Payment Successful!</h1>
        <p className="text-charcoal/70 mb-8">Your payment has been processed successfully.</p>
      </div>
    </div>
  );
}
