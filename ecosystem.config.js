module.exports = {
	apps: [
		{
			name: "api-reportes-server",
			script: "dist/server.js",
			ignore_watch: ["node_modules", "public/imgs"],
			watch: false,
			max_restarts: 3, // o incluso 0 para testear
			wait_ready: true,
			listen_timeout: 8000,
			max_memory_restart: "1G",
			env_production: {
				NODE_ENV: "production",
			},
		},
	],
}
