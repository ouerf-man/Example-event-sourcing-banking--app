#!/bin/bash

# Variables
EC2_USER="ubuntu"
EC2_HOST="ec2-13-39-19-219.eu-west-3.compute.amazonaws.com"
EC2_KEY_PATH="$1"
APP_DIR="/home/ubuntu/nextjs-app"

# Commands
echo "Connecting to EC2 instance..."
scp -i "$EC2_KEY_PATH" build_artifact.tar.gz "$EC2_USER@$EC2_HOST:$APP_DIR"

ssh -i "$EC2_KEY_PATH" "$EC2_USER@$EC2_HOST" << 'EOF'
  cd /home/ubuntu/nextjs-app
  tar -xzvf build_artifact.tar.gz
  npm install --production
  pm2 reload all
EOF

echo "Deployment to EC2 completed."
