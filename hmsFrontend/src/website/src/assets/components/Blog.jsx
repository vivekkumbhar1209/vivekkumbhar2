import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const blogs = [
  {
    title: "The Rise Of Conjunctivitis In Delhi-NCR: Understanding Pink Eye And How To Stay Protected",
    description:
      "Recent reports indicate a sharp rise in conjunctivitis cases across Delhi-NCR, with hospitals witnessing a surge in patients experiencing red, itchy, and watery eyes. Doctors attribute this increase to a combination of seasonal changes, high humidity, and a newly emerging viral strain. The monsoon season creates an ideal breeding ground for bacteria and viruses, increasing the spread of eye infections.",
    image: "https://sahyadrihospital.com/wp-content/uploads/2025/02/18925-400x250.jpg",
  },
  {
    title: "How To Cure Dehydration At Home​?",
    description:
      "Dehydration occurs when the body loses more fluids than it takes in, leading to an imbalance that affects normal bodily functions. Water plays a crucial role in maintaining body temperature, digestion, circulation, and overall cellular function. When dehydration sets in, it can cause fatigue, dizziness, headaches, dry skin, and in severe cases, serious health complications like kidney problems or heat exhaustion.",
    image: "https://sahyadrihospital.com/wp-content/uploads/2025/02/687.jpg",
  },
  {
    title: "What Happens In Dehydration​?",
    description:
      "Dehydration occurs when the body loses more fluids than it takes in, leading to an imbalance that affects essential bodily functions. Water is crucial for digestion, circulation, temperature regulation, and cellular function. When dehydration sets in, the body struggles to perform these tasks efficiently, leading to fatigue, dizziness, headaches, and in severe cases, organ failure.",
    image: "https://sahyadrihospital.com/wp-content/uploads/2025/02/31600.jpg",
  },
  {
    title: "How To Cool Down Stomach Heat​?",
    description:
      "Stomach heat, often described as a burning sensation in the stomach area, is a common complaint that many individuals experience. It can be uncomfortable and distracting, leading people to seek relief. This condition is often related to acid reflux, gastritis, or indigestion, and may also result from eating spicy foods, overeating, or stress. Stomach heat occurs when the stomach produces excess acid or experiences inflammation, which leads to irritation in the digestive tract.",
    image: "https://sahyadrihospital.com/wp-content/uploads/2025/02/2148371265.jpg",
  },
];

const BlogGrid = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* Heading */}
      <h2
        className="text-3xl font-extrabold text-gray-800 text-center mb-10"
        data-aos="fade-up"
      >
        Read Our Latest Blogs
      </h2>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogs.map((blog, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={`${index * 100}`}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
          >
            {/* Blog Image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 object-cover"
            />
            {/* Blog Content */}
            <div className="p-5 text-center">
              <h3 className="text-lg font-bold text-gray-900">{blog.title}</h3>
              <p className="text-gray-600 text-sm mt-2">
                {expandedIndex === index
                  ? blog.description
                  : `${blog.description.substring(0, 60)}...`}
              </p>
              <button
                className="text-blue-600 font-semibold mt-2 hover:underline focus:outline-none"
                onClick={() => toggleReadMore(index)}
              >
                {expandedIndex === index ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Blogs Button */}
      <div className="text-center mt-10" data-aos="zoom-in">
        <a
          href="/all-blogs"
          className="bg-purple-900 text-white px-8 py-3 rounded-md text-lg font-semibold shadow-md hover:bg-purple-500 hover:shadow-lg transition duration-300"
        >
          View All Blogs
        </a>
      </div>
    </div>
  );
};

export default BlogGrid;
