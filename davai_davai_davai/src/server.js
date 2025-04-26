import Bun from "bun";
import { connectDB } from "./db";

const queriesPath = "./src/config/queries.json";
const correctWeaponAnswersPath = "./src/config/correct_weapon_answers.json";
const correctCaliberAnswersPath = "./src/config/correct_caliber_answers.json";

let cachedQueries = null;
let cachedWeaponAnswers = null;
let cachedCaliberAnswers = null;
let cachedWeaponList = null;
let cachedWeaponAndCaliberNotGrList = null;
let cachedImageList = null;
let db = null;

// queries.json 파일을 읽어와서 쿼리를 불러옴
async function loadQueries() {
  try {
    const queriesJson = await Bun.file(queriesPath).text();
    return JSON.parse(queriesJson);
  } catch (err) {
    console.error("Error reading queries.json : ", err);
    return {};
  }
}

// correct_weapon_answers.json 파일을 읽어와서 정답을 불러옴
async function loadWeaponAnswers() {
  try {
    const weaponAnswersJson = await Bun.file(correctWeaponAnswersPath).text();
    return JSON.parse(weaponAnswersJson);
  } catch (err) {
    console.error("Error reading answers.json : ", err);
    return {};
  }
}

async function loadCaliberAnswers() {
  try {
    const caliberAnswersJson = await Bun.file(correctCaliberAnswersPath).text();
    return JSON.parse(caliberAnswersJson);
  } catch (err) {
    console.error("Error reading answers.json : ", err);
    return {};
  }
}

// 초기화 함수
async function initializeData() {
  try {
    await connectDB()
      .then((connection) => {
        db = connection;
        console.log("DB connection established for the server.");
      })
      .catch((err) => {
        console.error("Error initializing DB connection: ", err);
      });

    cachedQueries = await loadQueries();
    cachedWeaponAnswers = await loadWeaponAnswers();
    cachedCaliberAnswers = await loadCaliberAnswers();

    // DB에서 데이터 리스트를 불러옴
    cachedWeaponList = (await db.query(cachedQueries.getWeaponName))[0];
    cachedWeaponAndCaliberNotGrList = (
      await db.query(cachedQueries.getWeaponNameAndCaliberNotGr)
    )[0];
    cachedImageList = (
      await db.query(cachedQueries.getImageNameAndImageItemName)
    )[0];

    // 데이터 유효성 검사
    if (
      !cachedQueries ||
      !cachedWeaponAnswers ||
      !cachedCaliberAnswers ||
      !cachedWeaponList ||
      !cachedWeaponAndCaliberNotGrList ||
      !cachedImageList ||
      Object.keys(cachedQueries).length === 0 ||
      Object.keys(cachedWeaponAnswers).length === 0 ||
      Object.keys(cachedCaliberAnswers).length === 0 ||
      cachedWeaponList.length === 0 ||
      cachedWeaponAndCaliberNotGrList.length === 0 ||
      cachedImageList.length === 0
    ) {
      throw new Error("Invalid or empty data loaded");
    }

    console.log("Initial data loaded successfully");
  } catch (err) {
    console.error("Error initializing data: ", err);

    // 초기화 실패 시 캐시된 데이터 삭제
    cachedQueries = {};
    cachedWeaponAnswers = {};
    cachedCaliberAnswers = {};
    cachedWeaponList = [];
    cachedWeaponAndCaliberNotGrList = [];
    cachedImageList = [];
  }
}

const server = Bun.serve({
  port: 8000,
  async fetch(req) {
    console.log("New request received : ", req.url);
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // CORS Preflight 처리
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    const url = new URL(req.url);

    //============================weapon============================\\

    if (url.pathname === "/api/weapon" && req.method === "GET") {
      try {
        // 데이터 유효성 검사
        if (
          !cachedWeaponList ||
          !cachedImageList ||
          !cachedWeaponAnswers ||
          cachedWeaponList.length === 0 ||
          cachedImageList.length === 0 ||
          Object.keys(cachedWeaponAnswers).length === 0
        ) {
          return new Response(JSON.stringify({ error: "Data not available" }), {
            status: 503,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          });
        }

        const responseData = {
          weaponList: cachedWeaponList,
          imageList: cachedImageList,
          weaponAnswersList: cachedWeaponAnswers,
        };

        // 정상이면 데이터 반환
        return new Response(JSON.stringify(responseData), {
          headers: {
            ...corsHeaders,
            // 응답 데이터 타입을 json으로 설정
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600", // 1시간 캐싱
          },
        });
      } catch (err) {
        console.error("Request error: ", err);
        return new Response(
          JSON.stringify({ error: "Internal Server Error" }),
          {
            status: 500,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          },
        );
      }
    }

    //============================Caliber============================\\

    if (url.pathname === "/api/weaponAndCaliber" && req.method === "GET") {
      try {
        if (
          !cachedWeaponAndCaliberNotGrList ||
          !cachedImageList ||
          !cachedCaliberAnswers ||
          cachedWeaponAndCaliberNotGrList === 0 ||
          cachedImageList.length === 0 ||
          Object.keys(cachedCaliberAnswers).length === 0
        ) {
          return new Response(JSON.stringify({ error: "Data not available" }), {
            status: 503,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          });
        }

        const responseData = {
          weaponList: cachedWeaponAndCaliberNotGrList,
          imageList: cachedImageList,
          caliberAnswersList: cachedCaliberAnswers,
        };

        return new Response(JSON.stringify(responseData), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600",
          },
        });
      } catch (err) {
        console.error("Database query error : ", err);
        return new Response(
          JSON.stringify({ error: "Internal Server Error" }),
          {
            status: 500,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          },
        );
      }
    }

    return new Response(JSON.stringify({ error: "Not Found" }), {
      status: 404,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  },
});

// 서버 시작 전 초기화
initializeData().then(() => {
  console.log(`Server running at http://localhost:${server.port}`);
});
