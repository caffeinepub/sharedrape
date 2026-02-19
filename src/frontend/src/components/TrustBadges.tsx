export default function TrustBadges() {
  const badges = [
    {
      image: '/assets/generated/badge-escrow.dim_128x128.png',
      title: 'Secure Escrow Payments',
      description: 'Your money is safe until dress handover is confirmed',
    },
    {
      image: '/assets/generated/badge-ai-detection.dim_128x128.png',
      title: 'AI Damage Detection',
      description: 'Automated condition checks protect all members',
    },
    {
      image: '/assets/generated/badge-cleaning.dim_128x128.png',
      title: 'Verified Cleaning',
      description: 'Professional cleaning certificates for every rotation',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {badges.map((badge, index) => (
        <div key={index} className="text-center">
          <img
            src={badge.image}
            alt={badge.title}
            className="w-24 h-24 mx-auto mb-4"
          />
          <h3 className="font-semibold text-lg text-charcoal mb-2">{badge.title}</h3>
          <p className="text-charcoal/70">{badge.description}</p>
        </div>
      ))}
    </div>
  );
}
