/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
        util: false,
        assert: false,
        url: false,
        buffer: false,
        process: false,
        child_process: false,
        net: false,
        tls: false,
        dns: false,
        dgram: false,
        constants: false,
        module: false,
        vm: false,
        events: false,
        string_decoder: false,
        querystring: false,
        punycode: false,
        readline: false,
        repl: false,
        timers: false,
        tty: false,
        v8: false,
        worker_threads: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig 