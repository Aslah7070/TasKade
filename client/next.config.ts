/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'app.habitsgarden.com',
      'images.unsplash.com',
      'media.istockphoto.com',
      'lh3.googleusercontent.com'
    ],
  },
  transpilePackages: ['mui-one-time-password-input'],
};

module.exports = nextConfig;
 