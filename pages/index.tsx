import styles from "../styles/home.module.css";
import Head from "next/head";
export default function home() {
  return (
    <div>
      <div className={styles.title}>
        <h1>Welcome to MHS Comp Sci</h1>
      </div>
      <p>
        The purpose of this website is to give students resources for improving
        their computer sciences skills, submitting hw and learning new things
      </p>
      <h2>What we offer</h2>
      <p>
        This website offers tools for practicing mc tests, offering timers,
        graders, and also practice exams for registered students. We also offer
        guides for many cs topics, especially those pertenant to uil
        competitions.
      </p>
      <h2>Whats to come</h2>
      <p>
        We intend to offer a judging system, allowing labs or problem packet
        solutions to be submitted for grading.
      </p>
    </div>
  );
}
