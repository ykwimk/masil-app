#!/bin/bash

ADB="$HOME/Library/Android/sdk/platform-tools/adb"

echo "🤖 Android에서 Masil 실행"

# 포트 연결이 혹시 풀렸다면 다시 연결
"$ADB" reverse tcp:8081 tcp:8081

# Expo Go에서 localhost Metro 열기
"$ADB" shell am start \
  -a android.intent.action.VIEW \
  -d "exp://127.0.0.1:8081"