import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const blogs = [
  {
    title: "The Rise Of Conjunctivitis In Delhi-NCR: Understanding Pink Eye And How To Stay Protected",
    description:
      "Recent reports indicate a sharp rise in conjunctivitis cases across Delhi-NCR, with hospitals witnessing a surge in patients experiencing red, itchy, and watery eyes...",
    image: "https://sahyadrihospital.com/wp-content/uploads/2025/02/18925-400x250.jpg",
  },
  {
    title: "How To Cure Dehydration At Home?",
    description:
      "Dehydration occurs when the body loses more fluids than it takes in, leading to an imbalance that affects normal bodily functions...",
    image: "https://sahyadrihospital.com/wp-content/uploads/2025/02/687.jpg",
  },
  {
    title: "What Happens In Dehydration?",
    description:
      "Dehydration occurs when the body loses more fluids than it takes in, leading to an imbalance that affects essential bodily functions...",
    image: "https://sahyadrihospital.com/wp-content/uploads/2025/02/31600.jpg",
  },
  {
    title: "How To Cool Down Stomach Heat?",
    description:
      "Stomach heat, often described as a burning sensation in the stomach area, is a common complaint that many individuals experience...",
    image: "https://sahyadrihospital.com/wp-content/uploads/2025/02/2148371265.jpg",
  },
  {
    title: "Benefits of Drinking Warm Water in the Morning",
    description:
      "Drinking warm water in the morning helps improve digestion, detoxifies the body, and boosts metabolism...",
    image: "https://cdn.shopify.com/s/files/1/0439/2537/3087/files/19-Laguna-2024-Banners-1512x792-FreeSip-19.jpg?v=1721924022",
  },
  {
    title: "5 Natural Remedies for Headache Relief",
    description:
      "Many natural remedies, such as hydration, essential oils, and acupressure, can help alleviate headaches without medication...",
    image: "https://www.maxlab.co.in/categoryimage/1667991868.jpg",
  },
  {
    title: "The Importance of Sleep for a Healthy Life",
    description:
      "Getting enough sleep is crucial for mental and physical well-being. It improves focus, memory, and overall immune function...",
    image: "https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325353/why-is-sleep-important.jpg",
  },
  {
    title: "Easy Home Workouts to Stay Fit",
    description:
      "Maintaining fitness at home is possible with bodyweight exercises like squats, lunges, push-ups, and yoga...",
    image: "https://www.anytimefitness.com/wp-content/uploads/2020/11/HERO_At-Home-Circuit-Workout-1536x1024.jpg",
  },
  {
    title: "Healthy Eating Habits for a Balanced Diet",
    description:
      "A balanced diet includes whole foods, lean proteins, fruits, vegetables, and healthy fats to maintain overall health...",
    image: "https://kaynutrition.com/wp-content/uploads/2024/06/healthy-eating-habits-1.jpg",
  },
  {
    title: "How to Reduce Stress Naturally?",
    description:
      "Reducing stress naturally involves mindfulness, deep breathing, meditation, and spending time in nature...",
    image: "https://domf5oio6qrcr.cloudfront.net/medialibrary/2057/exercising-to-relax.jpg",
  },
  {
    title: "The Benefits of Yoga for Mental Health",
    description:
      "Yoga is known to improve mental health by reducing anxiety, stress, and depression while increasing flexibility and mindfulness...",
    image: "https://psychologieindia.com/wp-content/uploads/2022/03/Yoga_How-It-Boosts-Your-Mental-Health-blog-img-1.png",
  },
  {
    title: "Tips to Improve Digestion Naturally",
    description:
      "Eating fiber-rich foods, staying hydrated, and practicing mindful eating are key to maintaining a healthy digestive system...",
    image: "https://bgapc.com/wp-content/uploads/2023/06/unnamed-2023-06-05T113817.505.png",
  },
];
const AllBlogGrid = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);

  }, []);

  

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* Heading */}
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-10" data-aos="fade-up">
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
            <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover" />
            {/* Blog Content */}
            <div className="p-5 text-center">
              <h3 className="text-lg font-bold text-gray-900">{blog.title}</h3>
              <p className="text-gray-600 text-sm mt-2">
                {expandedIndex === index ? blog.description : `${blog.description.substring(0, 60)}...`}
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
    </div>
  );
};

export default AllBlogGrid;
