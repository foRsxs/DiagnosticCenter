add plugins: 

1) react-native-languages
2) react-native-snap-carousel

cleane cache rm -rf ~/.rncache

Создание билда для android
First, from your app's root dir, run the following command:
react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug

Then the second and final step:
cd android ./gradlew assembleDebug

If ERROR when run dev-mode, need clean all build android:
cd android ./gradlew clean

Generating the release APK:
cd android ./gradlew assembleRelease

Run: react-native run-android --variant=release

Создание билда для ios
react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

react-native run-ios --configuration Release