add plugins: 

1) react-i18next <-- https://github.com/i18next/react-i18next
2) react-native-snap-carousel <-- https://github.com/archriss/react-native-snap-carousel
3) react-native-star-rating <-- https://github.com/djchie/react-native-star-rating
4) react-native-masked-text <-- https://github.com/benhurott/react-native-masked-text
5) react-native-htmlview <-- https://github.com/jsdf/react-native-htmlview
6) react-native-languages <-- https://github.com/react-community/react-native-languages
7) react-native-share <-- https://www.npmjs.com/package/react-native-share
8) react-native-onesignal <-- https://www.npmjs.com/package/react-native-onesignal
9) react-native-image-zoom-viewer <-- https://github.com/ascoders/react-native-image-viewer
10) react-native-fetch-blob <-- https://github.com/vonovak/react-native-fetch-blob

(Устранение ошибки при сборке - https://github.com/wkh237/react-native-fetch-blob/issues/716)

cleane cache: 
rm -rf ~/.rncache

Создание dev-билда для android:
mkdir -p android/app/src/main/assets && rm -rf android/app/build && npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res && cd android && ./gradlew assembleDebug && cd ../

Создание release-билда для android:
mkdir -p android/app/src/main/assets && rm -rf android/app/build && npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res && cd android && ./gradlew assembleRelease && cd ../

If ERROR when run dev-mode, need clean all build android:
cd android && ./gradlew clean

Run: react-native run-android --variant=release

Создание билда для ios
react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

react-native run-ios --configuration Release