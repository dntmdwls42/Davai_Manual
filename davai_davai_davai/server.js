import Bun from "bun";
import { connectDB } from "./db";

let db;
connectDB()
  .then((connection) => {
    db = connection;
    console.log("DB connection established for the server.");
  })
  .catch((err) => {
    console.error("Error initializing DB connection: ", err.message);
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

    if (url.pathname === "/api/weapon" && req.method === "GET") {
      try {
        const [weaponList] = await db.query("SELECT Weapon_Name FROM weapon");

        const randomWeapon =
          weaponList[Math.floor(Math.random() * weaponList.length)]
            ?.Weapon_Name;

        if (!randomWeapon) {
          return new Response(
            JSON.stringify({ error: "Weapon not found in the list" }),
            {
              status: 404,
            },
          );
        }

        const [weaponData] = await db.query(
          "SELECT * FROM weapon WHERE Weapon_Name = ?",
          [randomWeapon],
        );

        if (weaponData.length === 0) {
          return new Response(JSON.stringify({ error: "Weapon not found" }), {
            status: 404,
          });
        }
        return new Response(JSON.stringify(weaponData[0]), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        });
      } catch (err) {
        console.error("Database query error : ", err.message);
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

console.log("Server is running on http://localhost:8000");
