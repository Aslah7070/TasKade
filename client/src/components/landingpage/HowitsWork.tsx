import React from "react";
import StickyScrollReveal from "../user/common/StickySlider";
import Image from "next/image";
import Discipline from "../../Assets/Discipline.jpeg"
import HabitsSuccess from "../../Assets/HabitsSuccess.jpeg"
import Habtyy from "../../Assets/Habtyy.jpeg"
import whyapp from "../../Assets/whyapp.jpeg"


const content = [
  {
    title: " 1. What is this app?",
    description:
      "This is a habit-building app designed to help you stay consistent and develop better routines. Whether you're aiming to exercise, meditate, or read more, the app helps you form habits one day at a time..",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        <Image
          src={Habtyy}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "2. How does it help users build habits",
    description:
      `1-You set a goal (like “Drink water daily”).\n
       2-The app gives you daily reminders and a simple tracker to mark your progress.
       3-You stay motivated through streaks, progress charts, and rewards.
       4-Over time, it helps you stay consistent and turn small actions into habits.
      `,
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src={Discipline}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "3. Why should they sign up?",
    description:
      `1-To take control of their personal growth.
      2-To build long-term habits with accountability tools.
      3-To stay motivated using streaks, reminders, and rewards.
      4-Signing up lets them track progress, save data, and use all features.
      `,
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        <Image
          src={HabitsSuccess}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "4. What makes this app different?",
    description:
      "Unlike boring to-do apps, this one is made just for habit-building — with fun rewards, motivational charts, and friendly nudges to keep you on track, even when you're not feeling it. It’s simple, user-friendly, and actually fun to use!",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
      <Image
          src={whyapp}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
];

const StickyScrollRevealDemo = () => {
  return <StickyScrollReveal content={content} />;
};

export default StickyScrollRevealDemo;
