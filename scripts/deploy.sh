#!/bin/bash

# Build Next.js static export
npm run build

# Copy out folder contents to a new folder for GitHub Pages
rm -rf ../youngin9630.github.io-temp
mkdir ../youngin9630.github.io-temp
cp -r out/* ../youngin9630.github.io-temp/

# Navigate to the temp folder
cd ../youngin9630.github.io-temp

# Initialize git and push to GitHub Pages
git init
git add .
git commit -m "Deploy Next.js portfolio"
git branch -M main
git remote add origin https://github.com/youngin9630/youngin9630.github.io.git
git push -f origin main

# Clean up
cd ../portfolio-nextjs
rm -rf ../youngin9630.github.io-temp

echo "Deployment complete!"

