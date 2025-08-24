import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Software = React.memo(() => {
  const navigate = useNavigate();

  const generalSoftware = useMemo(() => [
    { id: 'windows-10-pro', title: 'WINDOWS 10 PRO', image: '/software/windows10pro.png' },
    { id: 'windows-10-home', title: 'WINDOWS 10 HOME', image: '/software/windows10home.png' },
    { id: 'ms-office-365', title: 'MS - OFFICE 365', image: '/software/ms_office365.png' },
    { id: 'tally', title: 'TALLY', image: '/software/tally.png' },
    { id: 'windows-11-pro', title: 'WINDOWS 11 PRO', image: '/software/windows11Pro.png' },
    { id: 'quick-heal', title: 'QUICK HEAL', image: '/software/quickHeal.png' },
    { id: 'e-scan', title: 'E SCAN', image: '/software/eScan.png' },
    { id: 'mcafee', title: 'MCAFEE', image: '/software/mcafee.png' },
    { id: 'bull-guard', title: 'BULL GUARD', image: '/software/bullGaurd.png' },
    { id: 'kaspersky-plus', title: 'kaspersky +', image: '/software/kaspersky.jpg' },
    { id: 'kaspersky', title: 'KASPERSKY', image: '/software/kasperskys.png' },
    { id: 'vtiger', title: 'VTIGER', image: '/software/vtiiger.png' },
    { id: 'pager-book', title: 'Pager Book', image: '/software/pagerbook.jpg' },
    { id: 'host-books', title: 'Host Books', image: '/software/hostbook.png' },
    { id: 'greytip-hr', title: 'Greytip HR', image: '/software/greytip-hr.png' },
    { id: 'k7-total-security', title: 'K7 - TOTAL SECURITY', image: '/software/k7TotalSecurity.png' }
  ], []);

  const tallySoftware = useMemo(() => [
    { id: 'tally-silver', title: 'TALLY SILVER', image: '/software/tallySilver.png' },
    { id: 'tally-gold', title: 'TALLY GOLD', image: '/software/tallyGold.png' },
    { id: 'tally-on-cloud', title: 'TALLY ON CLOUD', image: '/software/tallyOnCloud.png' },
    { id: 'tally-server', title: 'TALLY SERVER', image: '/software/tallyServer.png' },
    { id: 'tally-tss-silver', title: 'Tally TSS silver', image: '/software/tallyTssSilver.png' },
    { id: 'tally-tss-gold', title: 'Tally TSS Gold', image: '/software/tally-tss-gold.png' },
    { id: 'tally-single-user-tss', title: 'Tally Single User TSS', image: '/software/tally-single-user-tss.png' },
    { id: 'tally-multi-user-tss', title: 'Tally Multi User TSS', image: '/software/tally-tss-multi-userr.png' }
  ], []);

  const handleShopClick = () => {
    navigate('/shop');
  };

  const SoftwareCard = ({ software }: { software: any }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="aspect-[16/9] flex items-center justify-center bg-gray-100">
        <img
          src={software.image}
          alt={software.title}
          className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors text-center">
          {software.title}
        </h3>
        <button
          onClick={handleShopClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 transform hover:scale-[1.02]"
        >
          Shop
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Software Solutions
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Complete range of software for business and personal use
          </p>
        </div>
      </section>

      {/* General Software */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {generalSoftware.map((software) => (
              <SoftwareCard key={software.id} software={software} />
            ))}
          </div>
        </div>
      </section>

      {/* Tally Software Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              We do Authorized Tally Software for Reliable Business Solutions
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tallySoftware.map((software) => (
              <SoftwareCard key={software.id} software={software} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

Software.displayName = 'Software';

export default Software;