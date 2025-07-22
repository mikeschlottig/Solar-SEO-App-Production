# Solar SEO App - E2B Development Environment with SEO Analysis Tools
FROM node:21-slim

RUN apt-get update && apt-get install -y curl git python3 python3-pip python3-venv libpq5 build-essential && apt-get clean && rm -rf /var/lib/apt/lists/*

# The installer requires curl (and certificates) to download the release archive
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates

# Download the latest installer
ADD https://astral.sh/uv/install.sh /uv-installer.sh

# Run the installer then remove it
RUN sh /uv-installer.sh && rm /uv-installer.sh

# Install pnpm
RUN npm install -g pnpm

# Move uv to non-root path
RUN cp /root/.local/bin/uv /usr/local/bin/uv

# Ensure the installed binary is on the `PATH`
ENV PATH="/root/.local/bin/:$PATH"

# Install dependencies and customize sandbox
WORKDIR /home/user

# Set up Git configurations
RUN git config --global user.email "seo@leverageai.com" && git config --global user.name "leverageai-seo-app"

# Add build argument for cache busting
ARG BUST=1

# Create app directory and copy template files
RUN mkdir -p /home/user/app
COPY app/ /home/user/app/

WORKDIR /home/user/app
RUN mkdir -p /home/user/app/logs
RUN pnpm install

# Create a directory for the FastAPI server
RUN mkdir -p /home/user/services
COPY services/ /home/user/services/

# Create a directory for the FastAPI logging server
RUN mkdir -p /home/user/logging-server
COPY logging-server/ /home/user/logging-server/

# Install Chrome for SEO auditing (Lighthouse, etc.)
RUN apt-get update && apt-get install -y wget gnupg
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -y google-chrome-stable

# Install additional SEO analysis tools
RUN apt-get install -y curl wget jq

# Sync the project into a new environment, using the frozen lockfile
WORKDIR /home/user/services
RUN uv add google-api-python-client google-auth google-auth-oauthlib
RUN uv add selenium beautifulsoup4 requests aiohttp
RUN uv add lighthouse-python python-whois
RUN uv sync --frozen

# Expose ports for SEO app interface and API
EXPOSE 5173 8000

# Start script for SEO analysis environment
RUN echo '#!/bin/bash\
set -e\
\
# Start FastAPI backend with SEO services\
cd /home/user/services\
uv run uvicorn main:app --host 0.0.0.0 --port 8000 &\
\
# Start frontend development server\
cd /home/user/app\
pnpm dev --host 0.0.0.0\
' > /home/user/start.sh && chmod +x /home/user/start.sh

CMD ["/home/user/start.sh"]