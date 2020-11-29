#!/usr/bin/env bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
ROOT="$(realpath "${DIR}/..")"
DIR_APP="${ROOT}/packages/mobile-app/android/app"

ANDROID_KEY_ALIAS=andrejov

echo "${ANDROID_KEYSTORE}" | base64 --decode > "${DIR_APP}/andrejov.keystore"
echo -e "ANDROID_KEYSTORE_FILE=andrejov.keystore\nANDROID_KEYSTORE_PASS=${ANDROID_KEYSTORE_PASS}\nANDROID_KEY_ALIAS=${ANDROID_KEY_ALIAS}\nANDROID_KEY_PASS=${ANDROID_KEY_PASS}" > "${DIR_APP}/gradle.properties"
