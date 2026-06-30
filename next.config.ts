import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The sections are now grouped into family pages (Hero, Feature, …), each stacking its numbered
  // variants (see memory `site-ia-tiers`). Hero/Gallery/Testimonials kept their slugs as family
  // pages; only Bento moved into the Feature family, so redirect its old slug there.
  async redirects() {
    return [
      {
        source: "/marketing/sections/bento",
        destination: "/marketing/sections/feature",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
