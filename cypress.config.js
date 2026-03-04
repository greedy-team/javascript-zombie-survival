const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // 기본 URL 설정
    baseUrl: "http://localhost:5500",

    // 테스트 파일 위치 설정
    specPattern: "test/e2e/**/*.cy.js",

    // support 파일 위치 설정
    supportFile: "test/support/e2e.js",

    // 뷰포트 설정
    viewportWidth: 1280,
    viewportHeight: 720,

    // 비디오 녹화 비활성화 (CI에서 속도 향상)
    video: false,

    // 스크린샷 설정
    screenshotOnRunFailure: true,
    screenshotsFolder: "test/screenshots",

    // 재시도 설정
    retries: {
      runMode: 2, // cypress run 시 재시도 횟수
      openMode: 0, // cypress open 시 재시도 횟수
    },

    // 타임아웃 설정
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,

    // 실험적 기능
    experimentalRunAllSpecs: true,
  },
});
