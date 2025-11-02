//@ts-check

const { composePlugins, withNx } = require('@nx/next');
const createMDX = require('@next/mdx');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  output: 'export', // For GitHub Pages
  distDir: 'dist',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true, // use Rust-based MDX compiler (faster)
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // 👈 optional but helps with GitHub Pages routing
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  withMDX,
];

module.exports = composePlugins(...plugins)(nextConfig);
