# DAVAI MANUAL PROJECT
---
이 프로젝트는 ***"Escape from Tarkov"*** 게임을 처음 접하는 ***신규 플레이어나 경험이 부족한 사용자***를 위해 문제를 해결해 나가며 게임 시스템 이해에 도움이 되는 것을 목표로 제작되었습니다.

---

(localhost:3000/minigame/Weapon)

*db와 함께 개발을 진행하려면 "bun run db"를 실행 하면 됨




## To-Do

DB 테이블 및 컬럼을 검토해야함
현재 db에 아이템의 풀네임이 아닌 축약된 이름의 아이템들이 있음 전체 검토 필요
한국어 <-> 영어 언어변경
추후에 관통력에 비례해 관통 가능한 방탄등급에 대한 참조 테이블도 필요할듯
사용 할 저작권에 문제없는 폰트나 아이콘도 찾아야함 (Font Awesome, DaFont, Google Fonts, 눈누, 게임사 무료 폰트)
다크모드 <-> 라이트모드
백그라운드에 재생할 오디오 필요
server.js CORS 설정이 현재 *로 되어있어서 보안에 취약 (백엔드의 경우 localhost:3000의 도메인으로만 접속 가능하게 처럼 현재 도메인에 맞춰 지정하면 될 것 같음)
오류 신고 기능 추가 (세션별로 1시간에 5번까지만 + 오류 수정 )
홈버튼 백버튼 반대편 우측 상단에 추가?

====문제 풀이====
일부 무기 이름이 겹치는경우 정답이 아니어야 하는데 정답이 되어버림 일부 블랙리스트 시스템이 필요할지도?
예) PB -> APB가 정답처리됨, AKS-74 -> AKS-74UB 정답처리됨
중복 정답의 경우에도 이미 정답으로 입력한 답은 입력 못하도록 만들기


====점수 기록 서비스====
오프라인 점수 기록 서비스는 도입 (점수 일주일 유지) / 온라인 랭크 서비스 도입 유무 검토
오프라인 점수 기록 서비스 현재 문제의 종류 및 갯수별로 최대 5등까지 기록됨
현재는 문제를 풀고 난 이후에 랭크 데이터의 만료기간을 체크함 바꿔야 하는지 여부에 대해 검토

## Font
### English

(https://fonts.google.com/specimen/Inter?query=inter) Inter 폰트
(https://fonts.google.com/specimen/Source+Sans+3?query=Source+Sans+Pro) Source Sans 3 폰트
(https://fonts.google.com/specimen/Montserrat?query=Montserrat) Montserrat 폰트 

### Common

(https://noonnu.cc/font_page/937) 디자인 폰트로 올드한 느낌 내기 가능
(https://noonnu.cc/font_page/92) 코딩체로 모던한 느낌은 낼만 할지도
(https://noonnu.cc/font_page/659) 육군체로 딱딱한 느낌
(https://noonnu.cc/font_page/1329) 테두리가 갈려있는 폰트인데 알게 모르게 정도의 디자인이라 괜찮은듯 
(https://noonnu.cc/font_page/1037) 위의 폰트와 비슷한데 크랙이 가있는 디자인임


## Before Publishing

server.js Access-Control-Allow-Origin 필요한 경로로만 설정 현재 *로 되어있어서 보안에 취약
혹시나 모를 디도스 방지를 위해 동일 위치 접속 시 일정 시간동안 일정 횟수만 접속 가능하게 만들기
없는 경로의 URL이나 허용되지 않은 경로의 URL에 접속 시 보여줄 페이지 필요(현재 공백의 화면이 출력됨)


## 미니게임

    - 랩 탈출 듣기평가
    
    - 탈출 조건 맞추기, 탈출구 사진 보고 탈출구 이름 맞추기 or 어느 맵 탈출구 인지 맞추기

    - 이 총의 구경에 맞는 총알의 이름을 대시오

    - 해당 탄창을 보고 어떤 탄이 들어갈 수 있는지 맞추시오 + 해당 총알을 보고 어떤 총알인지 맞추시오


    ==== 구현 후순위 ====

    - 사진을 보고 여기가 어딘지 맞추기

    - 스폰화면 보고 어느 맵 어느 스폰인지 맞추기 / 해당 스폰 위치 기준으로 주변 스폰 외워서 쉽게 죽지 않게? 하는 느낌

    - 스캐브 무장보고 맞추기

    - 총 소리 듣고 어떤 총인지 맞추기

    - 아이템 가격 맞추기

    - 보스 멈블 듣고 어떤 보스인지 맞추기 / 스캐브 멈블 듣고 어떤 상태 / 대사인지 맞추기

    - 상대방이 흘린 소리를 듣고 상대방이 하고 있는 행동을 맞추기 (예: 커스텀 특정 장소에서 교전이 발생했다. 벽을 두고 상대와 대치 중인데 상대가 소리를 냈다. 이것은 무슨 행동인가?
    수류탄 드는 소리, 탄창 장전 소리, 인벤토리 여는소리, 밥이랑 음료 마시는 소리, 부상 신음소리, 치료하는 소리, 진통제 소리, 주사기 꼽는 소리, 수술하는 소리, 템 파밍(캐비넷 또는 박스), 가방 버리는 소리, 엎드리는 소리, 착지 소리, 파쿠르 소리(기어올라가기), 화면(시야) 돌리는 소리, 발끄는 소리, 문 여는 소리, 파츠 교체하는 소리, 스코프 토글사운드, 단발 연발 토글사운드, 줌하는소리(우클릭), 야시경 온오프 사운드(이거 들렸었나?), 스테미나 제로상태 헉헉대는소리, 죽는소리, 물이나 철 밟는소리, 버튼소리(d2같은거), BTR 지나가는 또는 탑승사운드, 지뢰/수류탄 소리(거리좀 있어야함), 창문깨는소리, 벽에다가 무기 휘두르는 소리, 트립와이어 소리)

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
