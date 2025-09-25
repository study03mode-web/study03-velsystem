interface PlaceholderPageProps {
  title: string;
  description: string;
}

function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8">{description}</p>
        <div className="bg-gray-100 rounded-lg p-12">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">This feature is coming soon!</p>
        </div>
      </div>
    </div>
  );
}

export default PlaceholderPage;