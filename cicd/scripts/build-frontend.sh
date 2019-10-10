#!/bin/bash -x

cd frontend
npm install
npm build
cd ..
rm -rf backend/issuedex-api/client/build
cp -R frontend/build backend/issuedex-api/client/
