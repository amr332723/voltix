const R = [
[1,'phones','Apple','iPhone 16 Pro 256GB',1099,1199,'Save $100','ph1','Built for Apple Intelligence.','Display:6.3-inch Super Retina XDR|Chip:A18 Pro|Camera:48MP Fusion|Battery:Up to 27 hours'],
[2,'phones','Samsung','Galaxy S25 Ultra 512GB',1249,1399,'-11%','ph2','Ultra performance, ultra display.','Display:6.9-inch AMOLED 2X|Chip:Snapdragon 8 Elite|Camera:200MP Quad|Battery:5,000 mAh'],
[3,'phones','Google','Pixel 10 Pro 256GB',949,999,'Save $50','ph3','Google AI in your pocket.','Display:6.3-inch OLED LTPO|Chip:Tensor G5|Camera:50MP Triple|Battery:Up to 30 hours'],
[4,'phones','Apple','iPhone 16 Pro Max 512GB',1399,0,'New','ph4','The biggest Pro display yet.','Display:6.9-inch Super Retina XDR|Chip:A18 Pro|Camera:48MP Fusion|Battery:Up to 33 hours'],
[5,'phones','Samsung','Galaxy S25+ 256GB',999,1119,'-11%','ph5','Big screen, everyday power.','Display:6.7-inch AMOLED 2X|Chip:Snapdragon 8 Elite|Camera:50MP Triple|Battery:4,900 mAh'],
[6,'phones','Google','Pixel 10 128GB',799,0,'','ph6','Smart, simple and fast.','Display:6.3-inch OLED|Chip:Tensor G5|Camera:48MP Dual|Battery:Up to 28 hours'],
[7,'phones','OnePlus','OnePlus 13 256GB',899,0,'New','ph7','Flagship speed, all-day battery.','Display:6.8-inch LTPO AMOLED|Chip:Snapdragon 8 Elite|Camera:50MP Triple|Battery:6,000 mAh'],
[8,'phones','Nothing','Nothing Phone (3) 256GB',699,0,'','ph8','A phone that stands out.','Display:6.7-inch AMOLED|Chip:Snapdragon 8s Gen 4|Camera:50MP Dual|Battery:5,150 mAh'],
[9,'laptops','Apple','MacBook Air 15-inch M4',1299,0,'New','lp1','Big screen, everyday lightness.','Display:15.3-inch Liquid Retina|Processor:Apple M4|Memory:16GB unified|Battery:Up to 18 hours'],
[10,'laptops','Dell','XPS 14',1499,1699,'-12%','lp2','OLED brilliance in a compact frame.','Display:14.5-inch OLED 3.2K|Processor:Intel Core Ultra 7|Memory:32GB LPDDR5X|Battery:Up to 20 hours'],
[11,'laptops','ASUS','Zenbook S 14',1399,0,'','lp3','Ultralight with all-day battery.','Display:14-inch 3K OLED|Processor:Intel Core Ultra 7|Memory:16GB LPDDR5X|Battery:Up to 24 hours'],
[12,'laptops','Lenovo','ThinkPad X1 Carbon',1649,1899,'-13%','lp4','Business-ready and featherlight.','Display:14-inch 2.8K OLED|Processor:Intel Core Ultra 7|Memory:32GB LPDDR5X|Battery:Up to 15 hours'],
[13,'laptops','HP','Spectre x360 14',1349,0,'New','lp5','Flexible, premium, 2-in-1.','Display:14-inch 2.8K OLED touch|Processor:Intel Core Ultra 7|Memory:16GB LPDDR5X|Battery:Up to 17 hours'],
[14,'laptops','Microsoft','Surface Laptop 7',1199,1399,'-14%','lp6','Fast, quiet and beautifully simple.','Display:13.8-inch PixelSense|Processor:Snapdragon X Elite|Memory:16GB LPDDR5X|Battery:Up to 20 hours'],
[15,'monitors','Dell','UltraSharp 32 4K Monitor',749,829,'-10%','mn1','Sharper views for creators.','Panel:IPS Black|Resolution:3840 x 2160|Refresh rate:60 Hz|Ports:USB-C 90W hub'],
[16,'monitors','LG','UltraGear 27 QHD',429,0,'','mn2','Fast and fluid for gaming.','Panel:Nano IPS|Resolution:2560 x 1440|Refresh rate:240 Hz|Ports:HDMI 2.1, DisplayPort'],
[17,'monitors','Samsung','Odyssey G7 32',599,699,'-14%','mn3','Immersive curved gaming.','Panel:VA curved|Resolution:2560 x 1440|Refresh rate:240 Hz|Ports:HDMI 2.1, DisplayPort'],
[18,'monitors','Apple','Studio Display',1599,0,'','mn4','A brilliant 5K display.','Panel:27-inch Retina|Resolution:5120 x 2880|Refresh rate:60 Hz|Ports:Thunderbolt 3'],
[19,'monitors','ASUS','ProArt 27 4K',649,0,'New','mn5','Colour-accurate for creators.','Panel:IPS|Resolution:3840 x 2160|Refresh rate:60 Hz|Ports:USB-C 96W'],
[20,'monitors','BenQ','Designer 32 4K',799,0,'','mn6','Designed for designers.','Panel:IPS|Resolution:3840 x 2160|Refresh rate:60 Hz|Ports:USB-C 90W'],
[21,'accessories','Sony','WH-1000XM6 Headphones',399,0,'New','ac1','Industry-leading noise cancelling.','Type:Over-ear|Connectivity:Bluetooth 5.3|Battery:Up to 30 hours|Feature:Adaptive noise cancelling'],
[22,'accessories','Bose','QuietComfort Ultra',429,449,'Save $20','ac2','Quiet comfort, immersive sound.','Type:Over-ear|Connectivity:Bluetooth 5.3|Battery:Up to 24 hours|Feature:Immersive audio'],
[23,'accessories','Apple','AirPods Max',549,0,'','ac3','Spatial audio, iconic design.','Type:Over-ear|Connectivity:Bluetooth 5.0|Battery:Up to 20 hours|Feature:Spatial audio'],
[24,'accessories','Sennheiser','Momentum 5',379,429,'-12%','ac4','Up to 60 hours of listening.','Type:Over-ear|Connectivity:Bluetooth 5.4|Battery:Up to 60 hours|Feature:Adaptive noise cancelling'],
[25,'accessories','Anker','Everyday Tech Kit',89,0,'','ac5','Everything for your travel setup.','Type:Travel kit|Connectivity:USB-C|Battery:10,000 mAh power bank|Feature:65W GaN charger'],
];
export const products = R.map(([id, cat, brand, name, price, old, badge, img, tag, f]) => ({ id, cat, brand, name, price, old: old || null, badge, img, tag, stock: id === 3 ? 0 : 12, specs: f.split('|').map((x) => x.split(':')) }));
export const cats = {
  all: { label: 'All products', title: 'All products' },
  phones: { label: 'Phones', title: 'Smartphones' },
  laptops: { label: 'Laptops', title: 'Laptops' },
  monitors: { label: 'Monitors', title: 'Monitors' },
  accessories: { label: 'Accessories', title: 'Accessories' },
  deals: { label: 'Deals', title: 'Deals' },
};
export const navCats = ['phones', 'laptops', 'monitors', 'accessories', 'deals'];
export const inCat = (c) => products.filter((p) => c === 'all' || (c === 'deals' ? p.old : p.cat === c));
export const pick = (...ids) => ids.map((i) => products.find((p) => p.id === i));
export const reviews = (p) => 120 + ((p.id * 397) % 1800);
export const options = {
  phones: { Color: ['Natural', 'Desert', 'Black', 'White'], Storage: ['128GB', '256GB', '512GB', '1TB'], RAM: ['8 GB'] },
  laptops: { Color: ['Midnight', 'Silver'], Storage: ['256GB', '512GB', '1TB'], RAM: ['16 GB', '32 GB'] },
  monitors: { Stand: ['Fixed', 'Height-adjustable'] },
  accessories: { Color: ['Black', 'Silver'] },
};
export const blurb = {
  phones: 'A flagship display, all-day battery life and a camera system built for everyday moments, with fast performance and years of software support.',
  laptops: 'Thin, light and powerful enough for work, school and creative projects, with a bright display and battery life that lasts the whole day.',
  monitors: 'A sharp, colour-accurate display with a flexible stand and the ports you need to build a comfortable, productive desk setup.',
  accessories: 'Thoughtfully chosen essentials that complete your setup, with premium build quality and everything you need out of the box.',
};
export const categories = [
  ['Phones', 'Stay connected with the latest flagship devices.', 'phones'],
  ['Laptops', 'Power and portability for work and play.', 'laptops'],
  ['Monitors', 'Sharper views for creators and gamers.', 'monitors'],
  ['Accessories', 'Complete your setup with thoughtful essentials.', 'accessories'],
];
export const orders = [
  { id: '#TS-18492', date: 'Sep 27, 2026', items: 'iPhone 16 Pro + 1', total: '$2,198.00', status: 'Processing' },
  { id: '#TS-18104', date: 'Sep 13, 2026', items: 'WH-1000XM6', total: '$399.00', status: 'Delivered' },
  { id: '#TS-17682', date: 'Aug 29, 2026', items: 'UltraSharp 32 4K', total: '$749.00', status: 'Shipped' },
  { id: '#TS-17118', date: 'Aug 02, 2026', items: 'USB-C accessories', total: '$129.00', status: 'Cancelled' },
  { id: '#TS-16643', date: 'Jul 17, 2026', items: 'Pixel 10 Pro', total: '$949.00', status: 'Pending' },
];
export const adminOrders = [
  { id: '#TS-18492', customer: 'Avery Morgan', date: 'Sep 27', items: 2, total: '$2,198', pay: 'Paid', status: 'Processing' },
  { id: '#TS-18491', customer: 'Mia Chen', date: 'Sep 27', items: 1, total: '$749', pay: 'Paid', status: 'Shipped' },
  { id: '#TS-18490', customer: 'Noah Smith', date: 'Sep 27', items: 3, total: '$1,427', pay: 'COD', status: 'Pending' },
  { id: '#TS-18489', customer: 'Priya Shah', date: 'Sep 26', items: 1, total: '$399', pay: 'Paid', status: 'Delivered' },
];
export const adminProducts = [
  { name: 'iPhone 16 Pro', cat: 'Smartphones', price: '$1,099', stock: 42, sales: 284 },
  { name: 'Galaxy S25 Ultra', cat: 'Smartphones', price: '$1,249', stock: 18, sales: 236 },
  { name: 'Zenbook S 14', cat: 'Laptops', price: '$1,399', stock: 7, sales: 192 },
  { name: 'UltraSharp 32 4K', cat: 'Monitors', price: '$749', stock: 24, sales: 170 },
  { name: 'WH-1000XM6', cat: 'Accessories', price: '$399', stock: 0, sales: 158 },
];
export const stockLabel = (n) => (n === 0 ? 'Out of Stock' : n < 10 ? 'Low Stock' : 'In Stock');
