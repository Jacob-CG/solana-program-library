#!/usr/bin/env bash

set -e -x

cwd=$(pwd)

cd ${cwd}/token/js
npm install
npm run build
npm run docs

cd ${cwd}/token-lending/js
npm install
npm run build
npm run docs

cd ${cwd}/stake-pool/js
npm install
npm run build
npm run docs

cd ${cwd}/token-swap/js
npm install
npm run build
npm run docs

cd ${cwd}
npm install
npm run deploy
