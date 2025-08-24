import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const SignalBooster = React.memo(() => {
    const navigate = useNavigate();

    const signalBoosterFeatures = useMemo(() => [
        'Enhances Signal Strength',
        'Wide Coverage Area',
        'User-Friendly Installation',
        'Broad Compatibility',
        'Improved Connectivity'
    ], []);

    const handleShopClick = () => {
        navigate('/shop');
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Signal Booster
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto">
                        Experience crystal-clear calls and faster internet with our advanced Signal Booster technology.
                    </p>
                </div>
            </section>

            {/* Signal Booster */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Signal Booster
                        </h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <div className="flex items-center justify-center mb-8">
                                <img
                                    src="/signalBooster/mobile_signal_booster.png"
                                    alt="Signal Booster"
                                    className="w-full max-w-md h-64 object-cover rounded-lg shadow-lg"
                                    loading="lazy"
                                />
                            </div>

                            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
                                A signal booster enhances the strength and quality of cellular or Wi-Fi signals, improving connectivity and coverage in areas with weak or inconsistent signals. Ideal for both residential and commercial applications, signal boosters provide reliable communication and internet access by amplifying existing signals.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-blue-50 rounded-lg p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features:</h3>
                                    <ul className="space-y-2">
                                        {signalBoosterFeatures.map((feature, index) => (
                                            <li key={index} className="flex items-center text-gray-700">
                                                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-green-50 rounded-lg p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Applications:</h3>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>• Residential Buildings</li>
                                        <li>• Commercial Offices</li>
                                        <li>• Industrial Facilities</li>
                                        <li>• Remote Locations</li>
                                        <li>• Vehicle Installation</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="text-center mt-8">
                                <button
                                    onClick={handleShopClick}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 transform hover:scale-[1.02]"
                                >
                                    Get Signal Booster
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
});

SignalBooster.displayName = 'SignalBooster';

export default SignalBooster;