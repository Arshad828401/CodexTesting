"use client";

import { useState } from "react";

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

const junkClues = [
  "deep fried",
  "deep-fried",
  "fried",
  "sugary",
  "sugar",
  "candy",
  "syrup",
  "cream-filled",
  "processed",
  "chips",
  "soda",
  "buttercream",
];

const healthyClues = [
  "baked",
  "grilled",
  "steamed",
  "roasted",
  "fresh",
  "whole grain",
  "vegetable",
  "fruit",
  "lean protein",
  "low sugar",
  "unsweetened",
];

function cleanText(text) {
  return text.trim().toLowerCase();
}

function hasAnyClue(text, clues) {
  return clues.some((clue) => text.includes(clue));
}

function getFoodResult(entry) {
  const cleanedFood = cleanText(entry.food);
  const details = cleanText(`${entry.description} ${entry.preparation}`);

  if (!cleanedFood) {
    return {
      emoji: "🤔",
      title: "Add a food item to check it!",
      message: "Try examples like apple, pizza, broccoli, or soda.",
      cardStyle: "border-orange-200 bg-white",
    };
  }

  if (junkFoods.includes(cleanedFood) || hasAnyClue(details, junkClues)) {
    return {
      emoji: "🍟",
      title: "Junk food",
      message:
        "This sounds like it is high in sugar, salt, unhealthy fats, or is heavily processed. It is okay sometimes, but not every day.",
      cardStyle: "border-red-200 bg-red-50",
    };
  }

  if (healthyFoods.includes(cleanedFood) || hasAnyClue(details, healthyClues)) {
    return {
      emoji: "🥦",
      title: "Not junk food",
      message:
        "Nice choice! Based on the food and how it is made, this sounds like a better everyday option for your body.",
      cardStyle: "border-green-200 bg-green-50",
    };
  }

  return {
    emoji: "🧐",
    title: "Not sure yet",
    message:
      "I do not know that food yet. A helpful clue: foods that are very sugary, very salty, heavily processed, or deep-fried are often junk food.",
    cardStyle: "border-yellow-200 bg-yellow-50",
  };
}

const emptyEntry = {
  food: "",
  description: "",
  preparation: "",
};

export default function Home() {
  const [entry, setEntry] = useState(emptyEntry);
  const [submittedEntry, setSubmittedEntry] = useState(null);

  const result = submittedEntry ? getFoodResult(submittedEntry) : null;

  function updateEntry(field, value) {
    setEntry((currentEntry) => ({
      ...currentEntry,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmittedEntry(entry);
  }

  function checkExample(example) {
    setEntry(example);
    setSubmittedEntry(example);
  }

  function clearEntry() {
    setEntry(emptyEntry);
    setSubmittedEntry(null);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 px-6 py-10">
      <section className="mx-auto flex max-w-4xl flex-col gap-8">
        <div className="rounded-3xl bg-white/85 p-8 text-center shadow-xl shadow-orange-100 ring-1 ring-orange-100">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Beginner food checker
          </p>
          <h1 className="mt-4 text-4xl font-black text-gray-900 sm:text-6xl">
            Junk or No
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            Add a food item, a short description, and how it is made. Submit the
            form to see if it sounds like junk food, not junk food, or something
            the app still needs to learn.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-orange-100"
          >
            <label htmlFor="food" className="text-lg font-bold text-gray-800">
              What food are you thinking about?
            </label>
            <input
              id="food"
              value={entry.food}
              onChange={(event) => updateEntry("food", event.target.value)}
              placeholder="Example: pizza"
              className="mt-4 w-full rounded-2xl border-2 border-orange-200 px-4 py-3 text-lg outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />

            <label
              htmlFor="description"
              className="mt-5 block text-lg font-bold text-gray-800"
            >
              Short description
            </label>
            <textarea
              id="description"
              value={entry.description}
              onChange={(event) =>
                updateEntry("description", event.target.value)
              }
              placeholder="Example: cheesy slices with tomato sauce"
              rows={3}
              className="mt-3 w-full rounded-2xl border-2 border-orange-200 px-4 py-3 text-lg outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />

            <label
              htmlFor="preparation"
              className="mt-5 block text-lg font-bold text-gray-800"
            >
              How is it made?
            </label>
            <textarea
              id="preparation"
              value={entry.preparation}
              onChange={(event) =>
                updateEntry("preparation", event.target.value)
              }
              placeholder="Example: baked in an oven, grilled, or deep-fried"
              rows={3}
              className="mt-3 w-full rounded-2xl border-2 border-orange-200 px-4 py-3 text-lg outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="rounded-2xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200"
              >
                Check food
              </button>
              <button
                type="button"
                onClick={clearEntry}
                className="rounded-2xl bg-orange-100 px-6 py-3 font-bold text-orange-700 transition hover:bg-orange-200 focus:outline-none focus:ring-4 focus:ring-orange-200"
              >
                Clear
              </button>
            </div>

            <div className="mt-6">
              <p className="font-semibold text-gray-700">Try a quick example:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  {
                    food: "apple",
                    description: "A fresh, sweet fruit with fiber.",
                    preparation: "Washed and sliced.",
                  },
                  {
                    food: "pizza",
                    description: "Cheesy slices with salty toppings.",
                    preparation: "Baked in an oven.",
                  },
                  {
                    food: "broccoli",
                    description: "A green vegetable side dish.",
                    preparation: "Steamed until tender.",
                  },
                  {
                    food: "soda",
                    description: "A sugary fizzy drink.",
                    preparation: "Served cold from a can.",
                  },
                ].map((example) => (
                  <button
                    key={example.food}
                    type="button"
                    onClick={() => checkExample(example)}
                    className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold capitalize text-orange-700 transition hover:bg-orange-200"
                  >
                    {example.food}
                  </button>
                ))}
              </div>
            </div>
          </form>

          <div
            className={`rounded-3xl border-2 p-6 text-center shadow-lg transition ${
              result ? result.cardStyle : "border-orange-200 bg-white"
            }`}
          >
            <div className="text-6xl" aria-hidden="true">
              {result?.emoji ?? "🍽️"}
            </div>
            <h2 className="mt-4 text-3xl font-black text-gray-900">
              {result?.title ?? "Submit a food to check it"}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-700">
              {result?.message ??
                "The result will appear here after you add the food details and press Check food."}
            </p>
            {submittedEntry ? (
              <div className="mt-6 rounded-2xl bg-white/70 p-4 text-left text-sm text-gray-700">
                <p>
                  <span className="font-bold">Food:</span> {submittedEntry.food}
                </p>
                <p className="mt-2">
                  <span className="font-bold">Description:</span>{" "}
                  {submittedEntry.description || "No description added."}
                </p>
                <p className="mt-2">
                  <span className="font-bold">Made by:</span>{" "}
                  {submittedEntry.preparation || "No preparation details added."}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="rounded-3xl bg-green-900 p-6 text-white shadow-lg">
          <h2 className="text-2xl font-black">How this beginner app works</h2>
          <ol className="mt-4 list-inside list-decimal space-y-2 text-green-50">
            <li>It waits until you submit the food details.</li>
            <li>It cleans up the food name by removing spaces and using lowercase.</li>
            <li>It checks the food against small junk and not-junk food lists.</li>
            <li>It also looks for clues in the description and preparation notes.</li>
            <li>If the food is not listed, it gives a simple clue instead.</li>
          </ol>
        </div>
      </section>
    </main>
  );
}
