"use client";

import { useMemo, useState } from "react";

const junkFoods = [
  "burger",
  "cheeseburger",
  "fries",
  "french fries",
  "pizza",
  "hot dog",
  "fried chicken",
  "donut",
  "doughnut",
  "cake",
  "cookie",
  "cookies",
  "candy",
  "chocolate bar",
  "chips",
  "soda",
  "cola",
  "ice cream",
  "milkshake",
  "nachos",
  "taco",
  "burrito",
  "popcorn",
];

const healthyFoods = [
  "apple",
  "banana",
  "orange",
  "grapes",
  "strawberry",
  "carrot",
  "broccoli",
  "spinach",
  "salad",
  "oatmeal",
  "rice",
  "beans",
  "lentils",
  "chicken breast",
  "fish",
  "egg",
  "yogurt",
  "avocado",
  "nuts",
  "water",
];

function cleanFoodName(food) {
  return food.trim().toLowerCase();
}

function getFoodResult(food) {
  const cleanedFood = cleanFoodName(food);

  if (!cleanedFood) {
    return {
      emoji: "🤔",
      title: "Type a food to check it!",
      message: "Try examples like apple, pizza, broccoli, or soda.",
      cardStyle: "border-orange-200 bg-white",
    };
  }

  if (junkFoods.includes(cleanedFood)) {
    return {
      emoji: "🍟",
      title: "Junk food",
      message:
        "This is usually high in sugar, salt, or unhealthy fats. It is okay sometimes, but not every day.",
      cardStyle: "border-red-200 bg-red-50",
    };
  }

  if (healthyFoods.includes(cleanedFood)) {
    return {
      emoji: "🥦",
      title: "Not junk food",
      message:
        "Nice choice! This food is usually a better everyday option for your body.",
      cardStyle: "border-green-200 bg-green-50",
    };
  }

  return {
    emoji: "🧐",
    title: "Not sure yet",
    message:
      "I do not know that food yet. A helpful clue: foods that are very sugary, very salty, or deep-fried are often junk food.",
    cardStyle: "border-yellow-200 bg-yellow-50",
  };
}

export default function Home() {
  const [food, setFood] = useState("");
  const result = useMemo(() => getFoodResult(food), [food]);

  function checkExample(example) {
    setFood(example);
  }

  return (
    <main className="min-h-screen bg-green-100 px-6 py-10">
      <section className="mx-auto flex max-w-4xl flex-col gap-8">
        <div className="rounded-3xl bg-white/85 p-8 text-center shadow-xl shadow-orange-100 ring-1 ring-orange-100">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Beginner food checker
          </p>
          <h1 className="mt-4 inline-block rounded-2xl bg-green-600 px-6 py-3 text-4xl font-black text-white sm:text-6xl">
            Junk or No
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            Type a food item below. The app will tell you if it is junk food,
            not junk food, or something it still needs to learn.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-orange-100">
            <label htmlFor="food" className="text-lg font-bold text-gray-800">
              What food are you thinking about?
            </label>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                id="food"
                value={food}
                onChange={(event) => setFood(event.target.value)}
                placeholder="Example: pizza"
                className="w-full rounded-2xl border-2 border-orange-200 px-4 py-3 text-lg outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />
              <button
                type="button"
                onClick={() => setFood("")}
                className="rounded-2xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200"
              >
                Clear
              </button>
            </div>

            <div className="mt-6">
              <p className="font-semibold text-gray-700">Try a quick example:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["apple", "pizza", "broccoli", "soda"].map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => checkExample(example)}
                    className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold capitalize text-orange-700 transition hover:bg-orange-200"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`rounded-3xl border-2 p-6 text-center shadow-lg transition ${result.cardStyle}`}
          >
            <div className="text-6xl" aria-hidden="true">
              {result.emoji}
            </div>
            <h2 className="mt-4 text-3xl font-black text-gray-900">
              {result.title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-700">{result.message}</p>
          </div>
        </div>

        <div className="rounded-3xl bg-green-900 p-6 text-white shadow-lg">
          <h2 className="text-2xl font-black">How this beginner app works</h2>
          <ol className="mt-4 list-inside list-decimal space-y-2 text-green-50">
            <li>It cleans up your typing by removing spaces and using lowercase.</li>
            <li>It checks the food against a small junk food list.</li>
            <li>It checks the food against a small not-junk food list.</li>
            <li>If the food is not listed, it gives a simple clue instead.</li>
          </ol>
        </div>
      </section>
    </main>
  );
}
