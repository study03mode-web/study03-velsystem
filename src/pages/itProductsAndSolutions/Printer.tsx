import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Printer = React.memo(() => {
  const navigate = useNavigate();

  const printerTypes = useMemo(() => [
    {
      id: 'inkjet-printers',
      title: 'Inkjet Printers',
      description: 'This printer offers high-quality, fast printing with wireless connectivity, automatic duplexing, and a compact, energy-efficient design.',
      image: '/printer/printer.png'
    },
    {
      id: 'laser-printers',
      title: 'Laser Printers',
      description: 'These printers use toner cartridges and a laser to deliver high-quality prints. Additionally, they operate at fast speeds, ensuring efficient performance.',
      image: '/printer/printer.png'
    },
    {
      id: 'thermal-printers',
      title: 'Thermal Printers',
      description: 'These printers use heat to transfer images onto special paper, which makes them perfect for printing receipts. Additionally, they are ideal for handling other small documents efficiently.',
      image: '/printer/printer.png'
    },
    {
      id: 'dot-matrix-printers',
      title: 'Dot Matrix Printers',
      description: 'These printers use a print head that strikes an ink ribbon to produce text and images. As a result, they are commonly used for printing invoices and other multi-part documents.',
      image: '/printer/printer.png'
    },
    {
      id: 'barcode-printer',
      title: 'Barcode Printer',
      description: 'This printer is designed for high-speed label and barcode printing, making it ideal for retail applications. Additionally, it\'s perfect for efficient inventory management.',
      image: '/printer/printer.png'
    },
    {
      id: 'ink-tank-printers',
      title: 'Ink Tank Printers',
      description: 'These printers are specifically designed for printing high-quality photographs. Moreover, they can produce prints in a variety of sizes, offering flexibility for different needs.',
      image: '/printer/printer.png'
    }
  ], []);

  const epsonPrinters = useMemo(() => [
    {
      id: 'epson-l3250',
      title: 'Epson EcoTank L3250 Printer',
      description: 'This printer offers high-quality, fast printing and wireless connectivity for seamless use. Additionally, it features automatic duplexing and a compact, energy-efficient design for space-saving and eco-friendly performance.',
      image: '/printer/printer.png'
    },
    {
      id: 'epson-l3210',
      title: 'Epson EcoTank L3210 Printer',
      description: 'This printer enables cartridge-free, high-volume printing with ink tanks that yield 4,500 black and 7,500 color pages. Furthermore, it features USB connectivity and supports various paper sizes, making it versatile for different printing needs.',
      image: '/printer/printer.png'
    },
    {
      id: 'epson-l4260',
      title: 'Epson EcoTank L4260',
      description: 'This printer is an all-in-one solution that features refillable ink tanks for high-quality, cost-effective printing, scanning, and copying. Moreover, it is ideal for home offices that require low-cost, high-volume output.',
      image: '/printer/printer.png'
    },
    {
      id: 'epson-l850',
      title: 'Epson EcoTank L850',
      description: 'This printer is designed for high-quality photo printing, scanning, and copying, while also featuring cost-effective, refillable ink tanks. Additionally, it provides an efficient solution for your printing needs.',
      image: '/printer/printer.png'
    },
    {
      id: 'epson-l805',
      title: 'Epson EcoTank L805',
      description: 'This Printer is ideal for high-quality, cost-efficient photo printing with wireless connectivity.',
      image: '/printer/printer.png'
    },
    {
      id: 'epson-l6460',
      title: 'Epson EcoTank L6460',
      description: 'This Printer is an all-in-one printer designed for high-speed, cost-effective printing, scanning, and copying, perfect for office use.',
      image: '/printer/printer.png'
    },
    {
      id: 'epson-m100',
      title: 'Epson EcoTank M100',
      description: 'This Printer is a compact monochrome printer offering high-quality, cost-efficient printing with low ink costs. Ideal for small offices seeking reliable performance.',
      image: '/printer/printer.png'
    },
    {
      id: 'epson-l3260',
      title: 'Epson EcoTank L3260',
      description: 'This printer is an all-in-one solution for high-quality, cost-effective printing, scanning, and copying. Moreover, it is ideal for home and small offices, offering versatility to meet various needs.',
      image: '/printer/printer.png'
    },
    {
      id: 'epson-l15150',
      title: 'Epson EcoTank L15150',
      description: 'This printer is a high-capacity all-in-one solution designed for fast, cost-effective A3+ printing, scanning, and copying. Additionally, it is perfect for large offices, providing the efficiency needed to handle high-volume tasks.',
      image: '/printer/printer.png'
    }
  ], []);

  const canonPrinters = useMemo(() => [
    {
      id: 'canon-g3010',
      title: 'Canon G3010 Printer',
      description: 'This printer is ideal for high-volume printing and scanning, as it features a refillable ink tank for cost efficiency. Additionally, it offers wireless connectivity, providing added convenience for users.',
      image: '/printer/printer.png'
    },
    {
      id: 'canon-g2010',
      title: 'Canon G2010 Printer',
      description: 'This printer is ideal for high-volume printing, scanning, and copying, making it perfect for home and small office use. Moreover, it features a cost-effective refillable ink tank system, ensuring economical operation over time.',
      image: '/printer/printer.png'
    },
    {
      id: 'canon-g3730',
      title: 'Canon G3730 Printer',
      description: 'This printer is not only ideal for high-volume, cost-effective printing, thanks to its refillable ink tanks, but it also offers versatile functionality, making it suitable for various printing, scanning, and copying needs.',
      image: '/printer/printer.png'
    },
    {
      id: 'canon-maxify-gx2070',
      title: 'Canon MAXIFY GX2070',
      description: 'This printer is perfect for high-efficiency printing in small offices, as it offers low-cost, high-volume output. Additionally, it features refillable ink tanks, further enhancing its cost-effectiveness and sustainability.',
      image: '/printer/printer.png'
    },
    {
      id: 'canon-maxify-gx4070',
      title: 'Canon MAXIFY GX4070',
      description: 'This printer is designed specifically for businesses that require high-quality, low-cost printing. Moreover, it includes advanced features that facilitate efficient document handling, making it an excellent choice for any workplace.',
      image: '/printer/printer.png'
    },
    {
      id: 'canon-lbp121dn',
      title: 'Laser image CLASS LBP121dn',
      description: 'This printer is perfectly designed for fast, high-quality mono printing, making it an excellent choice for small offices. Additionally, it features automatic duplexing, which enhances efficiency by allowing double-sided printing with ease.',
      image: '/printer/printer.png'
    },
    {
      id: 'canon-mf3010',
      title: 'Laser image CLASS MF3010',
      description: 'This printer is a compact all-in-one solution for monochrome printing, scanning, and copying. Furthermore, it is ideal for home and small offices that require efficient performance, ensuring versatility in a limited space.',
      image: '/printer/printer.png'
    },
    {
      id: 'canon-mf232w',
      title: 'Canon image CLASS MF232w',
      description: 'This printer is a versatile, wireless all-in-one solution for fast monochrome printing, scanning, and copying. Moreover, it is perfect for home and small office use, providing convenience and efficiency in one compact device.',
      image: '/printer/printer.png'
    },
    {
      id: 'canon-mf241d',
      title: 'Canon MF241D',
      description: 'This printer is an all-in-one monochrome solution designed for efficient printing, scanning, and copying. Additionally, it features automatic duplexing, making it ideal for small offices that require high productivity and convenience.',
      image: '/printer/printer.png'
    }
  ], []);

  const hpPrinters = useMemo(() => [
    {
      id: 'hp-laserjet-126a',
      title: 'HP Laser Jet PRO MFP 126a Printer',
      description: 'This printer is an all-in-one solution designed for efficient monochrome printing, scanning, and copying. Furthermore, it is specifically tailored for small office environments, ensuring optimal performance and convenience.',
      image: '/printer/printer.png'
    },
    {
      id: 'hp-laserjet-126nw',
      title: 'HP Laser Jet PRO 126nw Printer',
      description: 'This printer is a compact, wireless all-in-one solution for efficient monochrome printing, scanning, and copying. Additionally, it is ideal for small offices that require reliable performance, making it a practical choice for everyday tasks.',
      image: '/printer/printer.png'
    },
    {
      id: 'hp-smart-tank-580',
      title: 'HP Smart Tank 580',
      description: 'This printer is an all-in-one solution that offers high-volume, cost-effective printing, scanning, and copying. Moreover, it features a built-in ink tank system, which enhances efficiency and reduces the cost of operations.',
      image: '/printer/printer.png'
    },
    {
      id: 'hp-smart-tank-585',
      title: 'HP Smart Tank 585',
      description: 'This printer is an all-in-one solution that features high-volume, cost-effective printing. Additionally, it offers smart wireless connectivity and refillable ink tanks for enhanced efficiency.',
      image: '/printer/printer.png'
    },
    {
      id: 'hp-smart-tank-675',
      title: 'HP Smart Tank 675',
      description: 'This printer is an all-in-one solution featuring high-capacity ink tanks, enabling cost-effective and high-quality printing, scanning, and copying. Additionally, it ensures efficiency for various office tasks.',
      image: '/printer/printer.png'
    },
    {
      id: 'hp-laserjet-m501dn',
      title: 'HP Laser Jet Pro M501dn',
      description: 'This printer is a high-speed, energy-efficient monochrome solution that features automatic duplexing. Additionally, it is ideal for large-volume printing in office environments, ensuring efficient performance.',
      image: '/printer/printer.png'
    }
  ], []);

  const brotherPrinters = useMemo(() => [
    {
      id: 'brother-hl-b2000d',
      title: 'Brother HL-B2000D Printer',
      description: 'This Printer is designed for fast, high-quality monochrome printing with automatic duplexing, ideal for small to medium offices.',
      image: '/printer/printer.png'
    },
    {
      id: 'brother-hl-b2100d',
      title: 'Brother HL-B2100D',
      description: 'This Printer provides fast, high-quality monochrome printing with automatic duplexing. It\'s ideal for small to medium offices needing reliable performance and efficiency.',
      image: '/printer/printer.png'
    },
    {
      id: 'brother-dcp-t520w',
      title: 'Brother DCP-T520W Printer',
      description: 'This Printer is an all-in-one printer that offers high-quality printing, scanning, and copying. Its refillable ink tanks make it cost-effective for home and small offices.',
      image: '/printer/printer.png'
    },
    {
      id: 'brother-dcp-l2520d',
      title: 'Brother DCP-L2520D Printer',
      description: 'This printer is an all-in-one monochrome solution designed for efficient printing, scanning, and copying. Furthermore, it is ideal for small offices, providing the performance needed for daily tasks.',
      image: '/printer/printer.png'
    },
    {
      id: 'brother-dcp-l2541dw',
      title: 'Brother DCP-L2541DW Printer',
      description: 'This Printer is an all-in-one monochrome printer that provides fast printing, scanning, and copying. Its wireless connectivity and compact design make it ideal for small offices.',
      image: '/printer/printer.png'
    },
    {
      id: 'brother-dcp-b7500d',
      title: 'Brother DCP-B7500D Printer',
      description: 'This Printer is an all-in-one color printer that delivers high-quality printing, scanning, and copying, perfect for small to medium-sized offices.',
      image: '/printer/printer.png'
    }
  ], []);

  const tvsPrinters = useMemo(() => [
    {
      id: 'tvs-415ca',
      title: 'TVS 415CA Android Touch POS',
      description: 'This Printer is an all-in-one point-of-sale system with a touchscreen interface, ideal for streamlined billing and inventory management.',
      image: '/printer/printer.png'
    },
    {
      id: 'tvs-rp3230',
      title: 'TVS RP 3230 Printer',
      description: 'This Printer offers high-speed, reliable receipt printing for retail and business. Its compact design maximizes space efficiency.',
      image: '/printer/printer.png'
    },
    {
      id: 'tvs-rp3200',
      title: 'TVS RP3200 Thermal Printer',
      description: 'This Printer is designed for fast and reliable receipt printing, ideal for retail and hospitality environments.',
      image: '/printer/printer.png'
    },
    {
      id: 'tvs-msp245',
      title: 'TVS MSP245 Star Dot Matrix',
      description: 'This Printer is designed for high-speed, multi-copy document printing, ideal for billing and invoices.',
      image: '/printer/printer.png'
    },
    {
      id: 'tvs-msp250',
      title: 'TVS MSP 250 Monochrome Dot Matrix',
      description: 'This Printer is designed for high-speed, multi-copy printing, ideal for continuous forms and invoices.',
      image: '/printer/printer.png'
    },
    {
      id: 'tvs-3160',
      title: 'TVS 3160 Gold Thermal Receipt Printer',
      description: 'This Printer offers fast, reliable, and high-quality printing for efficient business operations.',
      image: '/printer/printer.png'
    }
  ], []);

  const impactPrinters = useMemo(() => [
    {
      id: 'impact-ihr810',
      title: 'Impact IHR810 Printer',
      description: 'This printer is designed for reliable and efficient thermal printing, ideal for receipt and label generation in various industries.',
      image: '/printer/printer.png'
    },
    {
      id: 'impact-ih210',
      title: 'Impact IH-210',
      description: 'This Printer is a compact thermal printer ideal for fast and efficient receipt and label printing in retail and hospitality.',
      image: '/printer/printer.png'
    },
    {
      id: 'impact-honeywell-ih2',
      title: 'Impact Honeywell IH-2',
      description: 'This printer is a reliable thermal printer designed for high-speed receipt and barcode printing. Additionally, it is ideal for retail and logistics, ensuring efficiency in various operational tasks.',
      image: '/printer/printer.png'
    }
  ], []);

  const authorizedPartners = useMemo(() => [
    { name: 'Canon', image: '/partner/Canon.png' },
    { name: 'Epson', image: '/partner/Epson.png' },
    { name: 'Brother', image: '/partner/Brother.png' },
    { name: 'Impact by Honeywell', image: '/partner/impacthoneywell.png' },
    { name: 'Pantum', image: '/partner/Pantum.png' },
    { name: 'Fingers', image: '/partner/fingers-printer.png' },
    { name: 'TVS', image: '/partner/Tvs.png' },
    { name: 'HP', image: '/partner/Hp.png' }
  ], []);

  const handleShopClick = () => {
    navigate('/shop');
  };

  const PrinterCard = ({ printer }: { printer: any }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="aspect-[16/9] flex items-center justify-center bg-gray-100">
        <img
          src={printer.image}
          alt={printer.title}
          className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {printer.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-4 text-sm">
          {printer.description}
        </p>
        <button
          onClick={handleShopClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 transform hover:scale-[1.02]"
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
            Printers
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Complete range of printers for all your business and personal needs
          </p>
        </div>
      </section>

      {/* Printer Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Printer Types
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {printerTypes.map((printer) => (
              <PrinterCard key={printer.id} printer={printer} />
            ))}
          </div>
        </div>
      </section>

      {/* EPSON Printers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              EPSON PRINTER
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {epsonPrinters.map((printer) => (
              <PrinterCard key={printer.id} printer={printer} />
            ))}
          </div>
        </div>
      </section>

      {/* CANON Printers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              CANON PRINTER
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {canonPrinters.map((printer) => (
              <PrinterCard key={printer.id} printer={printer} />
            ))}
          </div>
        </div>
      </section>

      {/* HP Printers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              HP PRINTER
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hpPrinters.map((printer) => (
              <PrinterCard key={printer.id} printer={printer} />
            ))}
          </div>
        </div>
      </section>

      {/* BROTHER Printers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              BROTHER PRINTER
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brotherPrinters.map((printer) => (
              <PrinterCard key={printer.id} printer={printer} />
            ))}
          </div>
        </div>
      </section>

      {/* TVS Printers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              TVS PRINTER
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tvsPrinters.map((printer) => (
              <PrinterCard key={printer.id} printer={printer} />
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT Printers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              IMPACT PRINTER
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactPrinters.map((printer) => (
              <PrinterCard key={printer.id} printer={printer} />
            ))}
          </div>
        </div>
      </section>

      {/* Authorized Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Authorized Sales & Service Partner
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {authorizedPartners.map((partner, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="max-h-16 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

Printer.displayName = 'Printer';

export default Printer;