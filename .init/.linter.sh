#!/bin/bash
cd /home/kavia/workspace/code-generation/product-backlog-generator-20813-20822/frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

