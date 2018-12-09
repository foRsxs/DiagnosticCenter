add plugins: 

1) react-i18next <-- https://github.com/i18next/react-i18next
2) react-native-snap-carousel <-- https://github.com/archriss/react-native-snap-carousel
3) react-native-star-rating <-- https://github.com/djchie/react-native-star-rating
4) react-native-text-input-mask <-- https://github.com/react-native-community/react-native-text-input-mask
5) react-native-htmlview <-- https://github.com/jsdf/react-native-htmlview
6) react-native-languages <-- https://github.com/react-community/react-native-languages
7) react-native-share <-- https://www.npmjs.com/package/react-native-share
8) react-native-onesignal <-- https://www.npmjs.com/package/react-native-onesignal
9) react-native-fs <-- https://www.npmjs.com/package/react-native-fs


cleane cache rm -rf ~/.rncache

Создание билда для android
First, from your app's root dir, run the following command:
mkdir -p android/app/src/main/assets && rm -rf android/app/build && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res && cd android && ./gradlew assembleDebug

Then the second and final step:
cd android && ./gradlew assembleDebug

If ERROR when run dev-mode, need clean all build android:
cd android && ./gradlew clean

Generating the release APK:
cd android && ./gradlew assembleRelease

Run: react-native run-android --variant=release

Создание билда для ios
react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

react-native run-ios --configuration Release