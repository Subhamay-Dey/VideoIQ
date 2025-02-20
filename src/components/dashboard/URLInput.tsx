"use client";

import React, { useState, useRef, FormEvent, ChangeEvent } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import VanishAnimation from "./VanishAnimation";
import Loading from "../common/Loading";

function URLInput() {
  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);
  const [triggerVanish, setTriggerVanish] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const vanishAndClear = () => {
    if (!value || animating) return;
    setAnimating(true);
    setTriggerVanish(true);
  };

  const onAnimationComplete = () => {
    setValue("");
    setAnimating(false);
    setTriggerVanish(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!animating) {
      setValue(e.target.value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <input
          type="url"
          ref={inputRef}
          value={value}
          onChange={handleChange}
          className={`w-full px-5 bg-white dark:bg-zinc-800 h-12 rounded-full shadow transition duration-200 pr-10 ${
            animating ? "text-transparent" : "text-black"
          }`}
          placeholder="Enter Video URL"
          disabled={loading}
        />
        {loading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Loading/>
            </div>
        )}

        {animating && inputRef.current && (
          <VanishAnimation
            value={value}
            trigger={triggerVanish}
            inputElement={inputRef.current}
            onAnimationComplete={onAnimationComplete}
          />
        )}

        <button
          type="button"
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
          onClick={vanishAndClear}
          disabled={!value || animating}
        >
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: value ? 1 : 0.4 }}
          >
            <X
              className={`w-5 h-5 ${
                value
                  ? "text-black cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            />
          </motion.div>
        </button>
      </div>
    </form>
  );
}

export default URLInput;
