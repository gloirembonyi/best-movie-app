#!/bin/bash

# Replace these variables with your actual GitHub information
GITHUB_USERNAME="your-username"
REPO_NAME="movie-app"

# Setup the remote
git remote set-url origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

# Add all files if needed
git add .

# Commit changes if needed
# git commit -m "Update: your commit message here"

# Push to master branch
git push -u origin master

echo "Done! Check your repository at https://github.com/$GITHUB_USERNAME/$REPO_NAME" 