import React from "react";
import { styles } from "../../styles/common";

function StatsCard({ title, value, icon }) {
  return (
    <div className={`${styles.statsCard} group`}>

      <div className={styles.statsLeft}>
        <p className={styles.statsTitle}>{title}</p>
        <h2 className={styles.statsValue}>{value}</h2>
      </div>

      <div className={`${styles.statsIconBox} group-hover:scale-110 transition`}>
        {icon}
      </div>

    </div>
  );
}

export default StatsCard;