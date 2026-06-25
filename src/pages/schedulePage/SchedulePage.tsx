import { Schedule } from "@/modules/schedule";
import styles from "./Schedule.module.less";

export const SchedulePage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.pageContainer}>
        <Schedule />
      </div>
    </main>
  );
};
