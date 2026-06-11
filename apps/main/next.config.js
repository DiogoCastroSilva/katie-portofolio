//@ts-check

const path = require('path');
const { composePlugins, withNx } = require('@nx/next');
const createMDX = require('@next/mdx');

const isGithubPages = process.env.GITHUB_ACTIONS === 'true';
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (isGithubPages ? '/katie-portofolio' : '');
const assetPrefix = basePath ? `${basePath.replace(/\/$/, '')}/` : '';

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  output: 'export', // For GitHub Pages
  distDir: '../../public',
  basePath,
  assetPrefix,
  transpilePackages: [
    '@katie-portofolio/content',
    '@katie-portofolio/projects',
    '@katie-portofolio/publications',
    '@katie-portofolio/navigation',
  ],
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true, // use Rust-based MDX compiler (faster)
  },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  trailingSlash: true, // 👈 optional but helps with GitHub Pages routing
  turbopack: {
    root: path.join(__dirname, '../..'),
  },
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
