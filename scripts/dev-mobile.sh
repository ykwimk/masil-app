#!/bin/bash

ADB="$HOME/Library/Android/sdk/platform-tools/adb"
EMULATOR="$HOME/Library/Android/sdk/emulator/emulator"
AVD_NAME="Small_Phone"
PORT=8081

echo "🚀 Masil 개발환경 시작"

# 1. Android Emulator가 실행 중인지 확인
if ! "$ADB" devices | grep -q "emulator-"; then
  echo "🤖 Android Emulator 실행 중..."

  nohup "$EMULATOR" \
    -avd "$AVD_NAME" \
    -no-boot-anim \
    > /tmp/masil-android-emulator.log 2>&1 &
else
  echo "✅ Android Emulator가 이미 실행 중입니다."
fi

# 2. Emulator 연결 대기
echo "⏳ Android 연결 대기..."
"$ADB" wait-for-device

# 3. Android 부팅 완료 대기
echo "⏳ Android 부팅 완료 대기..."

until [ "$("$ADB" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = "1" ]; do
  sleep 2
done

echo "✅ Android 부팅 완료"

# 4. Android localhost:8081 → Mac localhost:8081
"$ADB" reverse tcp:$PORT tcp:$PORT

echo "🔗 Android ↔ Metro 연결 완료"

# 5. Metro가 실행되면 Android Expo Go 자동 실행
(
  echo "⏳ Metro 시작 대기..."

  until nc -z 127.0.0.1 $PORT 2>/dev/null; do
    sleep 1
  done

  sleep 2

  echo "🤖 Android에서 Masil 자동 실행"

  "$ADB" shell am start \
    -a android.intent.action.VIEW \
    -d "exp://127.0.0.1:$PORT" \
    >/dev/null 2>&1
) &

echo ""
echo "🍎 iPhone은 아래 QR 코드를 Expo Go로 스캔하세요."
echo "🤖 Android는 자동으로 열립니다."
echo ""

# 6. Expo 실행
npx expo start --lan --port $PORT