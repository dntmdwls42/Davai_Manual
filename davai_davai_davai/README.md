## 미니게임

    1. 랩 탈출 듣기평가
    2. 스캐브 무장보고 맞추기
    3. 총 소리 듣고 어떤 총인지 맞추기
    4. 스폰화면 보고 어느 맵 어느 스폰인지 맞추기 / 해당 스폰 위치 기준으로 주변 스폰 외워서 쉽게 죽지 않게? 하는 느낌
    5. 보스 멈블 듣고 어떤 보스인지 맞추기 / 스캐브 멈블 듣고 어떤 상태 / 대사인지 맞추기
    6. 아이템 가격 맞추기
    7. 사진을 보고 여기가 어딘지 맞추기, 탈출 조건 맞추기
    8. 이 총이 어떤 총인지 맞추시오 + 이 총이 사용하는 구경을 맞추시오 + 이 총의 구경에 맞는 총알의 이름을 대시오
    9. 해당 탄창을 보고 어떤 탄이 들어갈 수 있는지 맞추시오 + 해당 총알을 보고 어떤 총알인지 맞추시오

참고 해야할 사이트

https://tarkov.akdong.kr/
https://escapefromtarkov.fandom.com/wiki/Escape_from_Tarkov_Wiki





















## Eslint와 Prettier를 적용하는 방법
    *끝까지 읽고 진행 함을 추천

    vscode에서 Eslint와 Prettier를 사용하기 위해선 Extension으로 설치를 해주어야 함
    이럴 경우 둘 다 전역적으로 사용되는데 Eslint와 Prettier는 일부 설정이 충돌 할 수 있음
    SingleQuote에 대한 설정으로 예를 들자면 Eslint에서는 DoubleQuote를 SingleQuote로 바꾸는 설정을, Prettier에서는 SingleQuote를 DoubleQuote로 바꾸는 설정을 사용한다면 충돌이 남

    그래서 작성자의 경우 Eslint는 (전역 비활성화), Prettier는 (전역 활성화)를 하여 사용함

    기본적으로 이 프로젝트에는 vite에서 자동으로 설정한 eslint config 파일이 존재하는데 아마 prettier와 충돌이 없는 것으로 보임
    그래서 프로젝트에 settings.json을 추가해서 vscode가 자동으로 해당 설정을 우선으로 사용하도록 해두었으니 본인이 원하는 대로 설정을 바꾸어 사용하면 되는데 아래서 서술하도록 함

    아래는 위에서 서술한 이 프로젝트의 setting.json의 설정임
        "files.autoSave": "afterDelay", // 기본 설정된 delay(1000ms) 이후 자동으로 파일이 저장됨
        "editor.defaultFormatter": "esbenp.prettier-vscode", // 이 프로젝트의 기본 formatter를 prettier로 지정
        "editor.formatOnSave": true, // 저장시 formatter가 작동함
        "eslint.enable": true, // eslint 활성화
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": "always" // eslint가 저장시 작동 하도록 함
        },

    작성자는 Eslint, Prettier를 설치 후 vscode의 settings.json에서 아래 코드를 추가하여 Eslint를 전역 비활성화 및 Prettier를 적용함
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true,
        "eslint.enable": false,

    즉 본인이 원하는대로 settings.json을 설정하면 됨 Prettier를 전역적으로 사용하고 싶지 않다면
        "editor.defaultFormatter": null,
        "editor.formatOnSave": false,
        "prettier.enable": false,
    
    Eslint와 Prettier를 둘 다 전역적으로 사용하고 싶지 않다면
        "editor.defaultFormatter": null,
        "editor.formatOnSave": false,
        "prettier.enable": false,
        "eslint.enable": false,

    를 vscode의 settings.json에 추가하면 됨
