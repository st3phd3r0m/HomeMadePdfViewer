#!/bin/sh

package_name=$1

./gradlew assembleDebug
adb -d install -r app/build/outputs/apk/debug/app-debug.apk
#adb shell monkey -p "$package_name" -c android.intent.category.LAUNCHER 1

#./logcat.sh "$package_name"