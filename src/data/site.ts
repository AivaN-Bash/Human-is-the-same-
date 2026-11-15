export type SiteActivity = {
  id: string;
  menu: string;
  tag: string;
  title: string;
  text: string;
  facts: [string, string][];
  topics: { title: string; description: string }[];
  imageAlt: string;
  image: string;
  color: string;
};

type SiteContent = {
  name: string;
  menuLabel: string;
  closeLabel: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    button: string;
    image: string;
    tickerItems: string[];
  };
  about: {
    menu: string;
    label: string;
    title: string;
    text: string;
    movingPhrases: { text: string; color: 'blue' | 'crimson' }[];
    details: { title: string; text: string; icon: 'book' | 'bulb' | 'sprout' | 'people' }[];
  };
  activities: SiteActivity[];
  join: { menu: string; label: string; title: string; text: string; actionLabel: string; quote: string; attribution: string };
  footer: string;
};

/**
 * Edit the site content here. Activity items render from this list, so you can
 * add, remove, or reorder sections without changing the page components.
 */
export const site: SiteContent = {
  name: 'Human is the same',
  menuLabel: 'เมนู',
  closeLabel: 'ปิด',
  hero: {
    eyebrow: 'โครงการลดความเหลื่อมล้ำทางการศึกษา',
    title: 'เรียนรู้ได้ ทุกวัย ทุกพื้นที่',
    subtitle: 'สอนในพื้นที่ห่างไกล ตั้งแต่เด็กจนถึงผู้ใหญ่ในชุมชน',
    button: 'ดูกิจกรรม',
    image: '/images/hero.jpg',
    tickerItems: ['พี่สอนน้อง', 'ไม่แก่เกินเรียน', 'ความรู้คู่อาชีพ', 'อาสาสมัครพร้อมสอน', 'เรียนรู้ได้ทุกวัย'],
  },
  about: {
    menu: 'เกี่ยวกับเรา',
    label: 'เกี่ยวกับเรา',
    title: 'เราทำอะไร',
    text: 'เราไปสอนในพื้นที่ห่างไกล เพื่อลดความเหลื่อมล้ำทางการศึกษา',
     movingPhrases: [
      { text: 'เรียนรู้ได้ทุกวัย', color: 'crimson' },
      { text: 'แบ่งปันได้ทุกพื้นที่', color: 'blue' },
      { text: 'เติบโตไปด้วยกัน', color: 'crimson' }
    ],
    details: [
      { title: 'เรียนรู้ระหว่างวัย', text: 'พี่อาสาออกค่ายและแบ่งปันบทเรียนกับเด็กในพื้นที่ห่างไกล', icon: 'book' },
      { title: 'พื้นฐานที่ใช้ได้ทุกวัน', text: 'เรียนคณิตศาสตร์ ภาษาอังกฤษพื้นฐาน และเกษตร ตามความต้องการของผู้เรียน', icon: 'bulb' },
      { title: 'ทักษะจากชุมชน', text: 'แลกเปลี่ยนความรู้เรื่องวัตถุดิบท้องถิ่นและทักษะสร้างอาชีพ', icon: 'sprout' },
      { title: 'ทุกคนร่วมสอนได้', text: 'ครู อาจารย์ นักศึกษา และคนในชุมชน ร่วมแบ่งปันสิ่งที่ถนัดได้', icon: 'people' },
    ],
  },
  activities: [
    {
      id: 'peer', menu: 'พี่สอนน้อง', tag: 'ผู้เรียน: เด็ก',
      title: 'กิจกรรม พี่สอนน้อง', text: 'พี่อาสาพาเด็ก ๆ เรียนรู้ผ่านกิจกรรมในพื้นที่ห่างไกล',
      facts: [['ผู้สอน', 'รุ่นพี่อาสา'], ['พื้นที่', 'ชุมชนบนดอยและพื้นที่ห่างไกล']],
      topics: [{ title: 'อ่านจับใจความ', description: 'อ่านเรื่องสั้นหรือป้ายใกล้ตัว แล้วเล่าสิ่งสำคัญด้วยคำของตัวเอง' }, { title: 'คณิตศาสตร์รอบตัว', description: 'ฝึกนับ บวก และลบผ่านเกมกับสถานการณ์ในชีวิตประจำวัน' }, { title: 'ภาษาอังกฤษพื้นฐาน', description: 'เรียนคำทักทายและคำศัพท์ที่ใช้พูดคุยในแต่ละวัน' }], image: '/images/teacher.jpg', imageAlt: 'อาสาสมัครช่วยนักเรียนทำกิจกรรมการเรียนรู้', color: '#538BD3',
    },
    {
      id: 'elder', menu: 'ไม่แก่เกินเรียน', tag: 'ผู้เรียน: อายุ 40 ปีขึ้นไป',
      title: 'กิจกรรม ไม่แก่เกินเรียน', text: 'สอนพื้นฐานให้คนอายุ 40 ปีขึ้นไปในชุมชน',
      facts: [['ผู้ร่วมสอน', 'ครู อาจารย์ นักศึกษา หรืออาสาสมัคร']],
      topics: [{ title: 'คำนวณในชีวิตประจำวัน', description: 'ฝึกบวก ลบ และทอนเงินจากตัวอย่างการซื้อขายใกล้ตัว' }, { title: 'ภาษาอังกฤษใช้จริง', description: 'ฝึกคำศัพท์และประโยคสั้น ๆ สำหรับทักทายและสื่อสาร' }, { title: 'เกษตรในชุมชน', description: 'แลกเปลี่ยนวิธีปลูกพืชและดูแลผลผลิตที่เหมาะกับพื้นที่' }],
      image: '/images/graduate.jpg', imageAlt: 'ผู้ใหญ่กำลังเรียนรู้ร่วมกับผู้สอน', color: '#981449',
    },
    {
      id: 'career', menu: 'ความรู้คู่อาชีพ', tag: 'ผู้เรียน: คนในชุมชน',
      title: 'กิจกรรม ความรู้คู่อาชีพ', text: 'ชวนคนในชุมชนต่อยอดความรู้และทักษะให้เป็นอาชีพ',
      facts: [['ผู้ร่วมสอน', 'คนในชุมชนและผู้มีประสบการณ์']],
      topics: [{ title: 'ต่อยอดภูมิปัญญาท้องถิ่น', description: 'เลือกทักษะหรือวัตถุดิบในชุมชนมาต่อยอดเป็นสินค้าและบริการ' }, { title: 'เล่าเรื่องสินค้า', description: 'ฝึกบอกจุดเด่น ตั้งชื่อ และสื่อสารสินค้าให้ลูกค้าเข้าใจ' }, { title: 'วางแผนต้นทุนและราคา', description: 'คำนวณต้นทุน กำหนดราคา และจดรายรับรายจ่ายเบื้องต้น' }],
      image: '/images/student.jpg', imageAlt: 'ผู้สอนแบ่งปันทักษะกับผู้เรียนในชุมชน', color: '#45577D',
    },
  ],
  join: {
    menu: 'ร่วมกับเรา',
    label: 'ร่วมกับเรา',
    title: 'ร่วมเป็นผู้สอน',
    text: 'ไม่แก่เกินเรียนและความรู้คู่อาชีพเปิดให้ทุกคนร่วมสอน',
    actionLabel: 'เลือกกิจกรรมที่อยากสอน',
    quote: 'Education is the most powerful weapon which you can use to change the world.',
    attribution: 'Nelson Mandela',
  },
  footer: '© 2026 Human is the same',
};
