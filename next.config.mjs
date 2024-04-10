/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
      },
};

export default withNextIntl(nextConfig);