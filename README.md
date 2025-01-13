# DAVAI MANUAL PROJECT
---
이 프로젝트는 ***"Escape from Tarkov"*** 게임을 처음 접하는 ***신규 플레이어나 경험이 부족한 사용자***를 위해 문제를 해결해 나가며 게임 시스템 이해에 도움이 되는 것을 목표로 제작되었습니다.

---

현재 미니게임을 위한 데이터 불러오기 베이스만 쌓아둔 상태 :
    1. DB 내에 있는 총기 이름을 가져온다.
    2. 총기 이름 배열 안에서 랜덤하게 총기 이름을 가져온다
    3. 그 총기 이름으로 다시 Select 구문을 돌려 해당 총기의 데이터를 가져온다.
    4. 프론트에 해당 데이터를 보여준다.

(localhost:3000/minigame/Weapon) 이 경로임
하지만 현재 클라우드 데이터센터를 이용하는게 아니라서 로컬로 DB를 만들고 데이터를 집어넣었음으로
로컬에서 직접 DB를 만들기 전까지는 확인하기 어려울 것임
DB 접속 관련된건 현재 env파일로 공개되지 않도록 해두었음

퀴즈에 필요한 요소는 더 만들어야하고
일단 동작만 가능하게 만든 상태임으로 코드에 불필요한건 없는지 예외처리는 제대로 되있는지
여러 확인이 필요함

*db와 함께 개발을 진행하려면 "bun run db"를 실행 하면 됨




## To-Do

DB 테이블 및 컬럼을 검토해야함
현재 db에 아이템의 풀네임이 아닌 축약된 이름의 아이템들이 있음 전체 검토 필요
json으로 sql 쿼리문 관리하기
한국어 <-> 영어 변경 가능하게 만드는건 어떤지? 한국어가 기본
미니게임에서 점수를 localStorage나 Cookie에 저장하는 방식을 사용할지? = 로컬에서 기존에 몇점 맞췄는지 본다던가 하는게 가능함 혹은 서버에 닉네임을 적어 비회원/익명 으로 랭크를 저장하고 공유하는 것도 가능함
퀴즈에 몇문제를 낼지 기회(생명)은 몇으로 할지
정답의 기준의 경우에 DB에 정답용 테이블을 따로 만들어주어야함, DB에는 없는 정답인데 정답 처리가 될만한 답이 있을경우를 생각해서 오류 신고 / 정답 추가 같은 유저의 의견을 수용하고 처리 할 공간 및 테이블이 필요할듯
추후에 문제 개수를 지정해 푸는 경우도 상정해야함 현재는 maxQuizCount를 직접 변수를 지정해주고 있음

## Before Publishing

server.js Access-Control-Allow-Origin 필요한 경로로만 설정 현재 *로 되어있어서 보안에 취약
혹시나 모를 디도스 방지를 위해 동일 위치 접속 시 일정 시간동안 일정 횟수만 접속 가능하게 만들기
없는 경로의 URL이나 허용되지 않은 경로의 URL에 접속 시 보여줄 페이지 필요(현재 공백의 화면이 출력됨)

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
    10. 상대방이 흘린 소리를 듣고 상대방이 하고 있는 행동을 맞추기 (예: 커스텀 특정 장소에서 교전이 발생했다. 벽을 두고 상대와 대치 중인데 상대가 소리를 냈다. 이것은 무슨 행동인가?
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
