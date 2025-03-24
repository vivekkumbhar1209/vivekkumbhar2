import React, { useState, useEffect } from "react";

const Counter = ({ finalValue, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const startTime = performance.now(); // Track animation start time

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // Normalize progress (0 to 1)
            const newValue = Math.round(progress * finalValue);

            setCount(newValue);

            if (progress < 1) {
                requestAnimationFrame(animate); // Continue animation
            }
        };

        requestAnimationFrame(animate); // Start animation

    }, [finalValue, duration]);

    return <p>{count}</p>;
};

export default Counter;
