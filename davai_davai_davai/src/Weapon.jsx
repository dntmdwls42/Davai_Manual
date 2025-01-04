import React from "react";

function Weapon() {
  const [weapon, setWeapon] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchRandomWeapon = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/weapon");
        if (!response.ok) throw new Error("Failed to fetch weapon list");

        const data = await response.json();
        setWeapon(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRandomWeapon();
  }, []);

  if (error) {
    return <div>Error : {error}</div>;
  }

  if (!weapon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>총기 이름 : {weapon.Weapon_Name}</h3>
      <h3>총기 종류 : {weapon.Weapon_Type}</h3>
      <h3>총기 구경 : {weapon.Weapon_Caliber}</h3>
      <h3>총기 발사속도 : {weapon.Weapon_Fire_Rate}</h3>
    </div>
  );
}

export default Weapon;
