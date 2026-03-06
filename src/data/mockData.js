export const PRODUCTS = [
  { id: 1,  name: 'Nike Air Max 270',           price: 3290,  originalPrice: 4500,  image: '👟', category: 'รองเท้า',          rating: 4.8, sold: 1240, stock: 50,  desc: 'รองเท้าวิ่งสุดคลาสสิก เบาสบาย รองรับแรงกระแทกได้ดี' },
  { id: 2,  name: 'MacBook Pro 14"',            price: 59900, originalPrice: 65000, image: '💻', category: 'อิเล็กทรอนิกส์', rating: 4.9, sold: 320,  stock: 15,  desc: 'Apple M3 Pro chip พลังงานสูง แบตทนทาน' },
  { id: 3,  name: 'AirPods Pro 2nd Gen',        price: 8990,  originalPrice: 10500, image: '🎧', category: 'อิเล็กทรอนิกส์', rating: 4.7, sold: 890,  stock: 30,  desc: 'ตัดเสียงรบกวน ANC รุ่นล่าสุด เสียงคุณภาพเยี่ยม' },
  { id: 4,  name: 'กระเป๋า Louis Vuitton Mini', price: 12500, originalPrice: 15000, image: '👜', category: 'แฟชั่น',          rating: 4.6, sold: 210,  stock: 8,   desc: 'กระเป๋าหนังคุณภาพสูง ดีไซน์สุดคลาสสิก' },
  { id: 5,  name: 'Sony WH-1000XM5',            price: 11900, originalPrice: 13500, image: '🎵', category: 'อิเล็กทรอนิกส์', rating: 4.8, sold: 567,  stock: 25,  desc: 'หูฟัง Noise Cancelling ระดับ flagship' },
  { id: 6,  name: 'เสื้อ Oversized Premium',    price: 490,   originalPrice: 690,   image: '👕', category: 'แฟชั่น',          rating: 4.5, sold: 3210, stock: 100, desc: 'ผ้าคอตตอน 100% นุ่มสบาย ทรง oversized' },
  { id: 7,  name: 'ครีมกันแดด SPF50+',          price: 320,   originalPrice: 420,   image: '🧴', category: 'ความงาม',          rating: 4.7, sold: 5400, stock: 200, desc: 'กันแดดเนื้อบาง ไม่เหนียว PA++++ กันน้ำได้' },
  { id: 8,  name: 'iPhone 15 Pro Max',          price: 49900, originalPrice: 52900, image: '📱', category: 'อิเล็กทรอนิกส์', rating: 4.9, sold: 1100, stock: 20,  desc: 'Titanium design, A17 Pro chip, 48MP camera' },
  { id: 9,  name: 'ขนมโตเกียว Pack 10',         price: 89,    originalPrice: 120,   image: '🍡', category: 'อาหาร',            rating: 4.4, sold: 8900, stock: 500, desc: 'ขนมโตเกียวไส้ครีมสด อร่อยมาก ส่งสดทุกวัน' },
  { id: 10, name: 'โต๊ะทำงาน Ergonomic',        price: 4500,  originalPrice: 5800,  image: '🪑', category: 'บ้านและสวน',      rating: 4.6, sold: 430,  stock: 35,  desc: 'โต๊ะปรับระดับได้ รองรับน้ำหนักได้ดี' },
  { id: 11, name: 'ลิปสติก Charlotte Tilbury',  price: 1290,  originalPrice: 1590,  image: '💄', category: 'ความงาม',          rating: 4.8, sold: 2300, stock: 80,  desc: 'เนื้อครีม ติดทนนาน 8 ชั่วโมง' },
  { id: 12, name: 'กระบอกน้ำ Stanley 40oz',     price: 1490,  originalPrice: 1890,  image: '🧊', category: 'บ้านและสวน',      rating: 4.7, sold: 1800, stock: 60,  desc: 'สแตนเลสคุณภาพสูง เก็บความเย็น 24 ชม.' },
]

export const CATEGORIES = [
  'ทั้งหมด', 'อิเล็กทรอนิกส์', 'แฟชั่น', 'ความงาม', 'รองเท้า', 'อาหาร', 'บ้านและสวน',
]

export const MOCK_USERS = [
  { id: 1, name: 'นายสมชาย ใจดี',  email: 'user@shopee.com',  password: '1234',  role: 'customer', avatar: 'สช' },
  { id: 2, name: 'Admin ShopShop', email: 'admin@shopee.com', password: 'admin', role: 'admin',    avatar: 'AD' },
]

export const INITIAL_ORDERS = [
  {
    id: 'ORD-001', date: '2024-03-01',
    items: [{ name: 'Nike Air Max 270', qty: 1, price: 3290 }],
    total: 3290, status: 'delivered', payment: 'card',
  },
  {
    id: 'ORD-002', date: '2024-03-04',
    items: [{ name: 'AirPods Pro 2nd Gen', qty: 1, price: 8990 }],
    total: 8990, status: 'shipping', payment: 'promptpay',
  },
]

export const ORDER_STATUS = {
  pending:    { label: 'รอดำเนินการ', color: '#ff9500',  bg: 'rgba(255,149,0,0.1)',   icon: '⏳' },
  processing: { label: 'กำลังเตรียม', color: '#1a94ff',  bg: 'rgba(26,148,255,0.1)',  icon: '📦' },
  shipping:   { label: 'กำลังจัดส่ง', color: '#7c3aed',  bg: 'rgba(124,58,237,0.1)',  icon: '🚚' },
  delivered:  { label: 'ส่งแล้ว',     color: '#00b14f',  bg: 'rgba(0,177,79,0.1)',    icon: '✅' },
  cancelled:  { label: 'ยกเลิก',      color: '#16a34a',  bg: 'rgba(22,163,74,0.1)',   icon: '❌' },
}
