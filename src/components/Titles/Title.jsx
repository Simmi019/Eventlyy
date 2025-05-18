// import React from 'react';

// const Title = () => {
//   return (
//     <div className="text-center my-10">
//       <p className="text-lg text-gray-600 uppercase tracking-wide font-medium mb-1">Our Events</p>
//       <h2 className="text-3xl text-gray-800 font-bold capitalize">What We Offer</h2>
//     </div>
//   );
// };

// export default Title;
import React from 'react';

const Title = ({ subtitle = "Our Events", title = "What We Offer" }) => {
  return (
    <div className="text-center my-10">
      <p className="text-lg text-purple-600 uppercase tracking-wide font-medium mb-1">
        {subtitle}
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 capitalize">
        <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
          {title}
        </span>
      </h2>
    </div>
  );
};

export default Title;
