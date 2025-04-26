// key : {quizType}_{quizNumber}_{rank} -> weapon_5_1
// quizType : 미니게임 종류 / quizNumber : 문제 갯수 / userName : 문제 풀이자 이름
// score : 점수 / rank : 순위 / expirationTime : 만료시간
export function setScoreToLocalStorage(quizType, quizNumber, userName, score) {
  const now = Date.now();
  const expirationTime = now + 7 * 24 * 60 * 60 * 1000; // 7일 후 만료
  const newItem = { score, userName, expirationTime };

  const rankings = [];

  // 1~5위까지의 점수를 가져오고 없다면 null을 배열에 저장
  for (let rank = 1; rank <= 5; rank++) {
    const key = `${quizType}_${quizNumber}_${rank}`;
    const item = localStorage.getItem(key);
    rankings.push(item ? JSON.parse(item) : null);
  }

  let insertIndex = -1;
  // 빈 랭크 배열이 있거나 현재 점수가 해당 랭크 배열의 점수보다 높으면 배열 위치 저장
  for (let i = 0; i < 5; i++) {
    if (!rankings[i] || score > rankings[i].score) {
      insertIndex = i;
      break;
    }
  }

  // -1이면 5등보다 점수가 낮아서 저장하지 않음
  if (insertIndex === -1) {
    return;
  }

  const newRankings = [...rankings]; // 기존 점수 배열 복사
  newRankings.splice(insertIndex, 0, newItem); // 0번 배열에 데이터 삽입 및 기존 데이터 배열 한칸 씩 밀어내기
  newRankings.pop(); // 맨 마지막 배열 (제일 낮은 점수) 삭제

  for (let rank = 1; rank <= 5; rank++) {
    const key = `${quizType}_${quizNumber}_${rank}`;
    if (newRankings[rank - 1]) {
      localStorage.setItem(key, JSON.stringify(newRankings[rank - 1]));
    } else {
      localStorage.removeItem(key); // 빈 배열(null)은 제거
    }
  }
}

export function getScoreFromLocalStorage(quizType, quizNumber) {
  const now = Date.now();
  let rankings = [];

  for (let rank = 1; rank <= 5; rank++) {
    const key = `${quizType}_${quizNumber}_${rank}`;
    const item = localStorage.getItem(key);
    const parsedItem = JSON.parse(item);

    if (item) {
      // expirationTime이 만료되었는지 확인
      if (now > parsedItem.expirationTime) {
        localStorage.removeItem(key); // 만료된 항목 삭제
      } else {
        rankings.push(JSON.parse(item));
      }
    } else {
      rankings.push(null);
    }
  }

  return rankings;
}
