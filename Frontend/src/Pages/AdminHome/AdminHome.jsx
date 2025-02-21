import React from "react";
import Navbar from "../../Components/AdminPageComponents/Navbar/Navbar";
import BoardMemberHero from "../../Components/AdminPageComponents/BoardMemberHero/BoardMemberHero";
import styles from "./Home.module.css";

const BoardMember = () => {
  return (
    <>
      <Navbar />
      <div className={styles.BoardMemberHome}>
        <BoardMemberHero></BoardMemberHero>
      </div>
    </>
  );
};

export default BoardMember;
