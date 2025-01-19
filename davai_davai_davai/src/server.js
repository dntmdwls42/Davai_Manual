import Bun from "bun";
import { connectDB } from "./db";

//queries.json 파일을 읽어와서 쿼리를 불러옴
async function loadQueries() {
  try {
    const queriesJson = await Bun.file(
      "./src/config/queries.json",
      "utf-8",
    ).text();
    return JSON.parse(queriesJson);
  } catch (err) {
    console.error("Error reading queries.json : ", err);
    return {};
  }
}

let db;
connectDB()
  .then((connection) => {
    db = connection;
    console.log("DB connection established for the server.");
  })
  .catch((err) => {
    console.error("Error initializing DB connection: ", err);
  });

Bun.serve({
  port: 8000,
  async fetch(req) {
    console.log("New request received : ", req.url);
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    const url = new URL(req.url);
    const queries = await loadQueries();

    //============================weapon============================\\

    if (url.pathname === "/api/weapon" && req.method === "GET") {
      try {
        //DB에서 무기 리스트를 불러옴
        const [weaponList] = await db.query(queries.getWeaponList);

        //무기 리스트가 없을 경우 에러 반환
        if (weaponList.length === 0) {
          return new Response(JSON.stringify({ error: "Weapon not found" }), {
            status: 404,
          });
        }

        //정상이면 무기 리스트 반환
        return new Response(JSON.stringify(weaponList), {
          headers: {
            ...corsHeaders,
            //응답 데이터 타입을 json으로 설정
            "Content-Type": "application/json",
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

console.log("Server.js is running on http://localhost:8000");
