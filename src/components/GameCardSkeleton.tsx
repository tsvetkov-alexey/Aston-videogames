import React from 'react';
import ContentLoader from 'react-content-loader';

export const GameCardSkeleton: React.FC = () => (
  <div className="skeleton">
    <ContentLoader
      speed={2}
      width={500}
      height={370}
      viewBox="0 0 520 370"
      backgroundColor="#e6e6e6"
      foregroundColor="#ecebeb">
      <rect x="60" y="-4" rx="25" ry="25" width="400" height="225" />
      <rect x="60" y="271" rx="5" ry="5" width="220" height="18" />
      <rect x="146" y="231" rx="5" ry="5" width="220" height="28" />
      <rect x="60" y="296" rx="5" ry="5" width="220" height="18" />
      <rect x="60" y="325" rx="10" ry="10" width="400" height="30" />
    </ContentLoader>
  </div>
);
