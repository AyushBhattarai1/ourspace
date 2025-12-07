#!/bin/bash
set -e

echo "Installing root dependencies..."
npm install

echo "Installing client dependencies (including dev)..."
cd client
npm install --include=dev

echo "Building client with npx..."
npx vite build

echo "Build complete!"
