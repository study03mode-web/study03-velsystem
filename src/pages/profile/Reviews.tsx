import React from 'react';
import { Star, MessageSquare } from 'lucide-react';

const Reviews = React.memo(() => {
  // Mock data - replace with actual API call
  const reviews = [
    {
      id: '1',
      productName: 'Dell Laptop Inspiron 15',
      rating: 5,
      comment: 'Excellent laptop with great performance. Highly recommended!',
      date: '2024-01-20',
      helpful: 12
    },
    {
      id: '2',
      productName: 'HP Printer LaserJet Pro',
      rating: 4,
      comment: 'Good printer, fast printing speed. Setup was easy.',
      date: '2024-01-18',
      helpful: 8
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">My Reviews</h2>
      </div>

      <div className="p-6">
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
            <p className="text-gray-600">Share your experience with products you've purchased.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {review.productName}
                    </h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-600">
                        {review.rating} out of 5 stars
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-2 md:mt-0">
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {review.comment}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{review.helpful} people found this helpful</span>
                  <button className="text-blue-600 hover:text-blue-700 transition-colors">
                    Edit Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

Reviews.displayName = 'Reviews';

export default Reviews;