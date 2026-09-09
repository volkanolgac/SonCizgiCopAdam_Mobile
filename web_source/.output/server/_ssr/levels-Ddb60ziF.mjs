//#region node_modules/.nitro/vite/services/ssr/assets/levels-Ddb60ziF.js
var G$4 = (x, y, w, h) => ({
	x,
	y,
	w,
	h
});
var LEVELS_31_50 = [
	{
		id: 31,
		world: 7,
		name: "HAFİF ESİNTİ",
		width: 1300,
		gravity: .75,
		ink: 950,
		starInk: 500,
		starTime: 20,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1180,
			y: 430
		},
		ground: [G$4(0, 470, 260, 130), G$4(980, 470, 320, 130)],
		hint: "Düşük yerçekiminde çizdiğin rampa seni daha uzağa uçurur."
	},
	{
		id: 32,
		world: 7,
		name: "YÜKSEK VADİ",
		width: 1400,
		gravity: .7,
		ink: 1e3,
		starInk: 580,
		starTime: 24,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1280,
			y: 250
		},
		ground: [
			G$4(0, 470, 240, 130),
			G$4(500, 380, 120, 220),
			G$4(1050, 250, 350, 350)
		],
		hint: "Rüzgârı arkana al, basamakları rampalarla birleştir."
	},
	{
		id: 33,
		world: 7,
		name: "UÇUŞ HATTI",
		width: 1500,
		gravity: .65,
		ink: 1100,
		starInk: 620,
		starTime: 26,
		start: {
			x: 70,
			y: 350
		},
		door: {
			x: 1380,
			y: 470
		},
		ground: [G$4(0, 390, 220, 210), G$4(1200, 470, 300, 130)],
		spikes: [G$4(400, 560, 600, 40)],
		hint: "Yüksekten başla, dikenlerin üzerinden süzülen bir iniş yolu çiz."
	},
	{
		id: 34,
		world: 7,
		name: "RÜZGÂR TÜNELİ",
		width: 1550,
		gravity: .75,
		ink: 1100,
		starInk: 650,
		starTime: 28,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1420,
			y: 430
		},
		ground: [
			G$4(0, 470, 250, 130),
			G$4(600, 470, 150, 130),
			G$4(1200, 470, 350, 130),
			G$4(500, 180, 360, 40)
		],
		saws: [{
			x: 920,
			y: 330,
			r: 28,
			ay: 90,
			speed: 1.4
		}],
		checkpoints: [{
			x: 675,
			y: 440
		}],
		hint: "Havada süzülen testereden kaçmak için alçak bir köprü kur."
	},
	{
		id: 35,
		world: 7,
		name: "ÜÇ ADIM",
		width: 1600,
		gravity: .7,
		ink: 1150,
		starInk: 700,
		starTime: 30,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1480,
			y: 300
		},
		ground: [
			G$4(0, 470, 220, 130),
			G$4(500, 420, 100, 180),
			G$4(900, 360, 100, 240),
			G$4(1320, 300, 280, 300)
		],
		hint: "Üç ada arasındaki boşlukları kısa rampalarla bağla."
	},
	{
		id: 36,
		world: 7,
		name: "DALGALI ESİNTİ",
		width: 1650,
		gravity: .7,
		ink: 1200,
		starInk: 720,
		starTime: 32,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1520,
			y: 450
		},
		ground: [G$4(0, 470, 220, 130), G$4(1350, 450, 300, 150)],
		movers: [{
			x: 750,
			y: 410,
			w: 140,
			h: 22,
			ay: 80,
			speed: 1.2
		}],
		hint: "Yukarı aşağı sallanan hareketli adaya kon, sonra kapıya zıpla."
	},
	{
		id: 37,
		world: 7,
		name: "UÇURUM TEPESİ",
		width: 1700,
		gravity: .75,
		ink: 1250,
		starInk: 750,
		starTime: 35,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1580,
			y: 220
		},
		ground: [
			G$4(0, 470, 220, 130),
			G$4(650, 380, 80, 220),
			G$4(1400, 220, 300, 380)
		],
		fallers: [G$4(1020, 300, 120, 24)],
		checkpoints: [{
			x: 690,
			y: 350
		}],
		hint: "Düşen buluta dikkat et! Üzerinde durma, hızla geç."
	},
	{
		id: 38,
		world: 7,
		name: "GÖK ASMA",
		width: 1750,
		gravity: .7,
		ink: 1250,
		starInk: 780,
		starTime: 38,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1620,
			y: 430
		},
		ground: [
			G$4(0, 470, 240, 130),
			G$4(850, 430, 80, 170),
			G$4(1440, 430, 310, 170)
		],
		saws: [{
			x: 520,
			y: 360,
			r: 28,
			ax: 70,
			speed: 1.3
		}, {
			x: 1180,
			y: 350,
			r: 28,
			ay: 80,
			speed: 1.5
		}],
		checkpoints: [{
			x: 890,
			y: 400
		}],
		hint: "Testerelerin menzilinin altından veya üstünden kavisli bir yol çiz."
	},
	{
		id: 39,
		world: 7,
		name: "FIRTINANIN GÖZÜ",
		width: 1800,
		gravity: .65,
		ink: 1300,
		starInk: 820,
		starTime: 40,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1680,
			y: 280
		},
		ground: [
			G$4(0, 470, 220, 130),
			G$4(600, 490, 80, 110),
			G$4(1100, 380, 80, 220),
			G$4(1500, 280, 300, 320)
		],
		spikes: [G$4(220, 560, 1280, 40)],
		movers: [{
			x: 850,
			y: 420,
			w: 120,
			h: 20,
			ax: 80,
			speed: 1.2
		}],
		checkpoints: [{
			x: 1140,
			y: 350
		}],
		hint: "Uçurumun altı tamamen diken. Havada asılı adımları birleştir."
	},
	{
		id: 40,
		world: 7,
		name: "ZİRVE RÜZGÂRI",
		width: 1850,
		gravity: .7,
		ink: 1350,
		starInk: 850,
		starTime: 44,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1740,
			y: 190
		},
		ground: [
			G$4(0, 470, 220, 130),
			G$4(750, 380, 70, 220),
			G$4(1250, 290, 70, 310),
			G$4(1580, 190, 270, 410)
		],
		saws: [{
			x: 450,
			y: 350,
			r: 30,
			ay: 90,
			speed: 1.6
		}, {
			x: 1e3,
			y: 310,
			r: 30,
			ax: 80,
			speed: 1.5
		}],
		fallers: [G$4(1020, 440, 100, 22)],
		checkpoints: [{
			x: 785,
			y: 350
		}],
		hint: "Rüzgâr Tepesi'nin son zirvesi: yüksek rampalarla bulutların üzerine çık."
	},
	{
		id: 41,
		world: 8,
		name: "KOR KÖPRÜ",
		width: 1350,
		gravity: 1,
		ink: 950,
		starInk: 540,
		starTime: 22,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1220,
			y: 430
		},
		ground: [G$4(0, 470, 240, 130), G$4(1080, 470, 270, 130)],
		spikes: [G$4(240, 520, 840, 80)],
		hint: "Lav gölünün üzerine sağlam ve düz bir koruma köprüsü çiz."
	},
	{
		id: 42,
		world: 8,
		name: "MAGMA ÇATLAĞI",
		width: 1400,
		gravity: 1,
		ink: 1e3,
		starInk: 580,
		starTime: 24,
		start: {
			x: 70,
			y: 380
		},
		door: {
			x: 1280,
			y: 470
		},
		ground: [
			G$4(0, 420, 240, 180),
			G$4(550, 480, 120, 120),
			G$4(1100, 470, 300, 130)
		],
		spikes: [G$4(240, 560, 310, 40), G$4(670, 560, 430, 40)],
		hint: "Yüksekten inerken lav çatlaklarının üzerinden aşan rampalar çiz."
	},
	{
		id: 43,
		world: 8,
		name: "ATEŞ TESTERESİ",
		width: 1450,
		gravity: 1.05,
		ink: 1050,
		starInk: 620,
		starTime: 26,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1320,
			y: 430
		},
		ground: [
			G$4(0, 470, 240, 130),
			G$4(650, 450, 80, 150),
			G$4(1140, 470, 310, 130)
		],
		saws: [{
			x: 420,
			y: 380,
			r: 32,
			ay: 100,
			speed: 1.6
		}],
		spikes: [G$4(730, 550, 410, 50)],
		hint: "Testere en yukarı çıktığı anın altından geçecek bir yol kur."
	},
	{
		id: 44,
		world: 8,
		name: "LAV DUVARI",
		width: 1500,
		gravity: 1,
		ink: 1100,
		starInk: 660,
		starTime: 28,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1380,
			y: 280
		},
		ground: [
			G$4(0, 470, 240, 130),
			G$4(600, 280, 70, 320),
			G$4(1150, 280, 350, 320)
		],
		spikes: [G$4(240, 550, 360, 50), G$4(670, 550, 480, 50)],
		hint: "Yüksek duvarın tepesine tırman, ardından kapıya düz bir yol çiz."
	},
	{
		id: 45,
		world: 8,
		name: "KÜL PLATFORMU",
		width: 1550,
		gravity: 1,
		ink: 1150,
		starInk: 680,
		starTime: 30,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1420,
			y: 430
		},
		ground: [G$4(0, 470, 240, 130), G$4(1250, 470, 300, 130)],
		fallers: [G$4(550, 450, 110, 22), G$4(880, 450, 110, 22)],
		spikes: [G$4(240, 560, 1010, 40)],
		checkpoints: [{
			x: 605,
			y: 420
		}],
		hint: "Kül platformları bastığın an çöker. Düşmeden diğerine geç."
	},
	{
		id: 46,
		world: 8,
		name: "KAYNAYAN ÇUKUR",
		width: 1600,
		gravity: 1.05,
		ink: 1200,
		starInk: 720,
		starTime: 33,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1480,
			y: 430
		},
		ground: [
			G$4(0, 470, 220, 130),
			G$4(700, 430, 80, 170),
			G$4(1300, 470, 300, 130)
		],
		movers: [{
			x: 420,
			y: 420,
			w: 120,
			h: 22,
			ax: 70,
			speed: 1.3
		}],
		spikes: [G$4(220, 560, 480, 40), G$4(780, 560, 520, 40)],
		checkpoints: [{
			x: 740,
			y: 400
		}],
		hint: "Lavın üzerindeki hareketli platformu köprünle yakala."
	},
	{
		id: 47,
		world: 8,
		name: "ÇİFTE ATEŞ",
		width: 1650,
		gravity: 1,
		ink: 1200,
		starInk: 750,
		starTime: 36,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1520,
			y: 350
		},
		ground: [
			G$4(0, 470, 220, 130),
			G$4(750, 460, 80, 140),
			G$4(1320, 350, 330, 250)
		],
		saws: [{
			x: 450,
			y: 380,
			r: 30,
			ay: 90,
			speed: 1.7
		}, {
			x: 1050,
			y: 380,
			r: 30,
			ay: 90,
			speed: 1.7
		}],
		spikes: [G$4(220, 560, 530, 40), G$4(830, 560, 490, 40)],
		checkpoints: [{
			x: 790,
			y: 430
		}],
		hint: "İki testere birden çalışıyor. Her ikisinin de ritmini gözet."
	},
	{
		id: 48,
		world: 8,
		name: "VOLKANİK MERDİVEN",
		width: 1700,
		gravity: 1,
		ink: 1250,
		starInk: 780,
		starTime: 38,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1580,
			y: 200
		},
		ground: [
			G$4(0, 470, 220, 130),
			G$4(500, 390, 70, 210),
			G$4(850, 300, 70, 300),
			G$4(1200, 230, 70, 370),
			G$4(1450, 200, 250, 400)
		],
		spikes: [G$4(220, 560, 1230, 40)],
		hint: "Lav denizinin üstündeki basamakları adım adım tırman."
	},
	{
		id: 49,
		world: 8,
		name: "KIZGIN SALINCAK",
		width: 1750,
		gravity: 1.05,
		ink: 1300,
		starInk: 800,
		starTime: 42,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1620,
			y: 430
		},
		ground: [
			G$4(0, 470, 220, 130),
			G$4(800, 430, 70, 170),
			G$4(1400, 470, 350, 130)
		],
		movers: [{
			x: 480,
			y: 410,
			w: 120,
			h: 22,
			ay: 80,
			speed: 1.2
		}, {
			x: 1100,
			y: 410,
			w: 120,
			h: 22,
			ax: 80,
			speed: 1.2
		}],
		spikes: [G$4(220, 560, 1180, 40)],
		checkpoints: [{
			x: 835,
			y: 400
		}],
		hint: "İki hareketli salıncak arasındaki mesafeyi köprüyle kapat."
	},
	{
		id: 50,
		world: 8,
		name: "LAV KRATERİ",
		width: 1850,
		gravity: 1.05,
		ink: 1350,
		starInk: 840,
		starTime: 46,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1720,
			y: 220
		},
		ground: [
			G$4(0, 470, 220, 130),
			G$4(700, 480, 80, 120),
			G$4(1200, 360, 70, 240),
			G$4(1550, 220, 300, 380)
		],
		spikes: [
			G$4(220, 560, 480, 40),
			G$4(780, 560, 420, 40),
			G$4(1270, 560, 280, 40)
		],
		saws: [{
			x: 450,
			y: 370,
			r: 32,
			ay: 100,
			speed: 1.8
		}, {
			x: 950,
			y: 390,
			r: 32,
			ax: 80,
			speed: 1.5
		}],
		movers: [{
			x: 1380,
			y: 300,
			w: 110,
			h: 22,
			ay: 70,
			speed: 1.1
		}],
		checkpoints: [{
			x: 740,
			y: 450
		}],
		hint: "Lav Vadisi'nin dev krateri: testereleri aş, hareketli taşa tutun, zirveye çık."
	}
];
var G$3 = (x, y, w, h) => ({
	x,
	y,
	w,
	h
});
var LEVELS_51_70 = [
	{
		id: 51,
		world: 9,
		name: "İLK KAYIŞ",
		width: 1350,
		gravity: .95,
		ink: 900,
		starInk: 500,
		starTime: 18,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1220,
			y: 470
		},
		ground: [G$3(0, 470, 200, 130), G$3(1050, 470, 300, 130)],
		ice: [G$3(350, 470, 550, 30)],
		hint: "Buz üzerinde duramazsın! Hızını al ve uçuruma düşmeden geç."
	},
	{
		id: 52,
		world: 9,
		name: "BUZ RAMPASI",
		width: 1450,
		gravity: .95,
		ink: 950,
		starInk: 540,
		starTime: 20,
		start: {
			x: 70,
			y: 320
		},
		door: {
			x: 1320,
			y: 450
		},
		ground: [G$3(0, 360, 200, 240), G$3(1150, 450, 300, 150)],
		ice: [G$3(200, 440, 500, 30)],
		spikes: [G$3(750, 560, 400, 40)],
		hint: "Buz pistinde hız kazan, ucuna küçük bir fırlatma rampası çiz."
	},
	{
		id: 53,
		world: 9,
		name: "KAYGAN TEPELER",
		width: 1500,
		gravity: .95,
		ink: 1e3,
		starInk: 600,
		starTime: 24,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1380,
			y: 380
		},
		ground: [
			G$3(0, 470, 200, 130),
			G$3(600, 420, 80, 180),
			G$3(1200, 380, 300, 220)
		],
		ice: [G$3(280, 470, 260, 30), G$3(750, 420, 350, 30)],
		hint: "İki buz yüzeyinin arasını bir köprüyle bağla, kayarak ilerle."
	},
	{
		id: 54,
		world: 9,
		name: "BUZ VE TESTERE",
		width: 1550,
		gravity: .95,
		ink: 1050,
		starInk: 650,
		starTime: 26,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1420,
			y: 430
		},
		ground: [G$3(0, 470, 200, 130), G$3(1250, 470, 300, 130)],
		ice: [G$3(300, 470, 800, 30)],
		saws: [{
			x: 700,
			y: 370,
			r: 30,
			ay: 80,
			speed: 1.5
		}],
		hint: "Buzda kayarken testere üstüne gelmesin. Üzerinden atlatacak bir yay çiz."
	},
	{
		id: 55,
		world: 9,
		name: "DONMUŞ ŞELALE",
		width: 1600,
		gravity: .95,
		ink: 1100,
		starInk: 680,
		starTime: 28,
		start: {
			x: 70,
			y: 260
		},
		door: {
			x: 1480,
			y: 480
		},
		ground: [G$3(0, 300, 200, 300), G$3(1300, 480, 300, 120)],
		ice: [G$3(300, 380, 300, 30), G$3(750, 450, 350, 30)],
		spikes: [G$3(1100, 560, 200, 40)],
		checkpoints: [{
			x: 450,
			y: 350
		}],
		hint: "Kademeli olarak aşağı inen buz şelalesinde frenleme rampaları yap."
	},
	{
		id: 56,
		world: 9,
		name: "KIZAK PİSTİ",
		width: 1650,
		gravity: .95,
		ink: 1150,
		starInk: 700,
		starTime: 30,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1520,
			y: 260
		},
		ground: [G$3(0, 470, 200, 130), G$3(1350, 260, 300, 340)],
		ice: [G$3(300, 500, 600, 30)],
		spikes: [G$3(950, 560, 350, 40)],
		hint: "Aşağıdaki buz pistinden hız alarak yukarıdaki yüksek kapıya fırla."
	},
	{
		id: 57,
		world: 9,
		name: "ÇATLAYAN BUZ",
		width: 1700,
		gravity: .95,
		ink: 1200,
		starInk: 720,
		starTime: 33,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1580,
			y: 430
		},
		ground: [
			G$3(0, 470, 200, 130),
			G$3(850, 430, 80, 170),
			G$3(1400, 430, 300, 170)
		],
		ice: [G$3(300, 470, 250, 30), G$3(1e3, 430, 250, 30)],
		fallers: [G$3(600, 470, 110, 22)],
		checkpoints: [{
			x: 890,
			y: 400
		}],
		hint: "Buzdan düşen platforma atla, beklemeden ikinci buz pistine geç."
	},
	{
		id: 58,
		world: 9,
		name: "BUZ SÜRGÜNÜ",
		width: 1750,
		gravity: .95,
		ink: 1200,
		starInk: 750,
		starTime: 36,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1620,
			y: 380
		},
		ground: [G$3(0, 470, 200, 130), G$3(1450, 380, 300, 220)],
		ice: [G$3(280, 470, 350, 30), G$3(1050, 420, 300, 30)],
		movers: [{
			x: 780,
			y: 440,
			w: 130,
			h: 22,
			ax: 90,
			speed: 1.3
		}],
		hint: "Buzda kayıp hareketli platforma tutun, sonra karşı buza sıçra."
	},
	{
		id: 59,
		world: 9,
		name: "KUTUP GEÇİDİ",
		width: 1800,
		gravity: .9,
		ink: 1250,
		starInk: 780,
		starTime: 40,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1680,
			y: 320
		},
		ground: [
			G$3(0, 470, 200, 130),
			G$3(750, 420, 80, 180),
			G$3(1500, 320, 300, 280)
		],
		ice: [G$3(300, 470, 350, 30), G$3(950, 420, 400, 30)],
		saws: [{
			x: 500,
			y: 360,
			r: 28,
			ay: 80,
			speed: 1.6
		}, {
			x: 1200,
			y: 330,
			r: 28,
			ay: 80,
			speed: 1.6
		}],
		checkpoints: [{
			x: 790,
			y: 390
		}],
		hint: "Kaygan zemin üzerinde çift testere! Her ikisinin üstünden kavis çiz."
	},
	{
		id: 60,
		world: 9,
		name: "BUZUL DEVRİ",
		width: 1850,
		gravity: .95,
		ink: 1300,
		starInk: 820,
		starTime: 45,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1740,
			y: 200
		},
		ground: [
			G$3(0, 470, 200, 130),
			G$3(650, 460, 70, 140),
			G$3(1150, 340, 70, 260),
			G$3(1550, 200, 300, 400)
		],
		ice: [G$3(250, 470, 300, 30), G$3(800, 400, 250, 30)],
		spikes: [G$3(550, 560, 600, 40), G$3(1220, 560, 330, 40)],
		saws: [{
			x: 400,
			y: 380,
			r: 30,
			ax: 70,
			speed: 1.5
		}],
		movers: [{
			x: 1350,
			y: 270,
			w: 120,
			h: 22,
			ay: 70,
			speed: 1.2
		}],
		checkpoints: [{
			x: 685,
			y: 430
		}],
		hint: "Buzul Devri'nin sonu: kay, testereyi aş, hareketli buzla zirveye çık."
	},
	{
		id: 61,
		world: 10,
		name: "KARANLIK GİRİŞ",
		width: 1400,
		gravity: 1,
		ink: 1e3,
		starInk: 560,
		starTime: 22,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1280,
			y: 430
		},
		ground: [
			G$3(0, 470, 240, 130),
			G$3(1100, 470, 300, 130),
			G$3(400, 150, 500, 50)
		],
		spikes: [G$3(500, 200, 300, 25)],
		hint: "Tavandaki sarkıtlara dikkat et! Çizgin sarkıtların altından geçmeli."
	},
	{
		id: 62,
		world: 10,
		name: "DAR DEHLİZ",
		width: 1450,
		gravity: 1,
		ink: 1050,
		starInk: 600,
		starTime: 24,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1320,
			y: 360
		},
		ground: [
			G$3(0, 470, 220, 130),
			G$3(500, 300, 400, 40),
			G$3(1150, 360, 300, 240)
		],
		spikes: [G$3(300, 560, 800, 40)],
		hint: "Mağaranın altı dipsiz kuyu. Asma kata tırman ve dehlizden geç."
	},
	{
		id: 63,
		world: 10,
		name: "DÜŞEN SARKITLAR",
		width: 1500,
		gravity: 1,
		ink: 1100,
		starInk: 640,
		starTime: 26,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1380,
			y: 430
		},
		ground: [G$3(0, 470, 220, 130), G$3(1200, 470, 300, 130)],
		fallers: [
			G$3(450, 440, 100, 24),
			G$3(700, 410, 100, 24),
			G$3(950, 440, 100, 24)
		],
		spikes: [G$3(220, 560, 980, 40)],
		checkpoints: [{
			x: 750,
			y: 380
		}],
		hint: "Sarkıt basamakları hızla geç, yoksa hepsi birden çöker."
	},
	{
		id: 64,
		world: 10,
		name: "YERALTI NEHRİ",
		width: 1550,
		gravity: 1,
		ink: 1150,
		starInk: 680,
		starTime: 28,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1420,
			y: 430
		},
		ground: [G$3(0, 470, 220, 130), G$3(1250, 470, 300, 130)],
		movers: [{
			x: 500,
			y: 450,
			w: 110,
			h: 22,
			ax: 80,
			speed: 1.2
		}, {
			x: 880,
			y: 450,
			w: 110,
			h: 22,
			ax: 80,
			speed: 1.2
		}],
		spikes: [G$3(220, 560, 1030, 40)],
		hint: "Yeraltı gölü üzerinde yüzen sallar. İkisine de sırayla basarak geç."
	},
	{
		id: 65,
		world: 10,
		name: "DİK ŞAFT",
		width: 1600,
		gravity: 1,
		ink: 1200,
		starInk: 720,
		starTime: 32,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1480,
			y: 180
		},
		ground: [
			G$3(0, 470, 220, 130),
			G$3(600, 360, 60, 240),
			G$3(950, 260, 60, 340),
			G$3(1300, 180, 300, 420)
		],
		saws: [{
			x: 780,
			y: 280,
			r: 28,
			ay: 80,
			speed: 1.5
		}],
		checkpoints: [{
			x: 630,
			y: 330
		}],
		hint: "Mağaranın dik şaftı: yukarı doğru zikzak rampalar çizerek tırman."
	},
	{
		id: 66,
		world: 10,
		name: "KRİSTAL ODA",
		width: 1650,
		gravity: .9,
		ink: 1200,
		starInk: 750,
		starTime: 35,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1520,
			y: 430
		},
		ground: [
			G$3(0, 470, 220, 130),
			G$3(700, 430, 80, 170),
			G$3(1350, 430, 300, 170),
			G$3(950, 220, 50, 200)
		],
		saws: [{
			x: 450,
			y: 350,
			r: 30,
			ay: 90,
			speed: 1.6
		}],
		checkpoints: [{
			x: 740,
			y: 400
		}],
		hint: "Kristal sütunun altından veya üstünden geçecek rotanı belirle."
	},
	{
		id: 67,
		world: 10,
		name: "ÇÖKÜNTÜ",
		width: 1700,
		gravity: 1,
		ink: 1250,
		starInk: 780,
		starTime: 38,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1580,
			y: 320
		},
		ground: [G$3(0, 470, 200, 130), G$3(1400, 320, 300, 280)],
		fallers: [
			G$3(450, 450, 90, 22),
			G$3(750, 400, 90, 22),
			G$3(1050, 360, 90, 22)
		],
		spikes: [G$3(200, 560, 1200, 40)],
		hint: "Mağara çöküyor! Düşen taşlar üzerinden kesintisiz bir çizgiyle koş."
	},
	{
		id: 68,
		world: 10,
		name: "İKİZ TÜNEL",
		width: 1750,
		gravity: 1,
		ink: 1250,
		starInk: 800,
		starTime: 40,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1620,
			y: 430
		},
		ground: [
			G$3(0, 470, 220, 130),
			G$3(750, 450, 80, 150),
			G$3(1420, 430, 330, 170)
		],
		saws: [{
			x: 480,
			y: 370,
			r: 30,
			ax: 70,
			speed: 1.5
		}, {
			x: 1100,
			y: 370,
			r: 30,
			ax: 70,
			speed: 1.5
		}],
		spikes: [G$3(220, 560, 530, 40), G$3(830, 560, 590, 40)],
		checkpoints: [{
			x: 790,
			y: 420
		}],
		hint: "İki tünel girişi de testereyle korunuyor. Güvenli koridoru sen çiz."
	},
	{
		id: 69,
		world: 10,
		name: "LAV DAMLALARI",
		width: 1800,
		gravity: 1.05,
		ink: 1300,
		starInk: 820,
		starTime: 43,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1680,
			y: 260
		},
		ground: [
			G$3(0, 470, 200, 130),
			G$3(650, 460, 70, 140),
			G$3(1150, 360, 70, 240),
			G$3(1500, 260, 300, 340)
		],
		spikes: [G$3(200, 560, 1300, 40)],
		movers: [{
			x: 900,
			y: 410,
			w: 120,
			h: 22,
			ay: 80,
			speed: 1.3
		}],
		checkpoints: [{
			x: 685,
			y: 430
		}],
		hint: "Mağaranın dibi lavla kaplı. Asılı duran hareketli platforma tutun."
	},
	{
		id: 70,
		world: 10,
		name: "YERALTI KALBİ",
		width: 1900,
		gravity: 1,
		ink: 1350,
		starInk: 850,
		starTime: 48,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1780,
			y: 200
		},
		ground: [
			G$3(0, 470, 200, 130),
			G$3(700, 460, 80, 140),
			G$3(1200, 340, 70, 260),
			G$3(1600, 200, 300, 400)
		],
		spikes: [
			G$3(200, 560, 500, 40),
			G$3(780, 560, 420, 40),
			G$3(1270, 560, 330, 40)
		],
		saws: [{
			x: 450,
			y: 380,
			r: 32,
			ay: 100,
			speed: 1.7
		}, {
			x: 1420,
			y: 260,
			r: 32,
			ay: 90,
			speed: 1.8
		}],
		movers: [{
			x: 960,
			y: 400,
			w: 120,
			h: 22,
			ax: 90,
			speed: 1.3
		}],
		checkpoints: [{
			x: 740,
			y: 430
		}],
		hint: "Yeraltı Mağarası'nın kalbi: tehlikeli testereleri aş, derinliklerden ışığa çık."
	}
];
var G$2 = (x, y, w, h) => ({
	x,
	y,
	w,
	h
});
var LEVELS_71_90 = [
	{
		id: 71,
		world: 11,
		name: "İLK ÇARK",
		width: 1450,
		gravity: 1,
		ink: 1050,
		starInk: 600,
		starTime: 24,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1320,
			y: 430
		},
		ground: [G$2(0, 470, 220, 130), G$2(1150, 470, 300, 130)],
		movers: [{
			x: 500,
			y: 430,
			w: 130,
			h: 22,
			ax: 90,
			speed: 1.4
		}, {
			x: 820,
			y: 430,
			w: 130,
			h: 22,
			ax: 90,
			speed: 1.4
		}],
		spikes: [G$2(220, 560, 930, 40)],
		hint: "İki hareketli piston arasındaki boşluğu köprünle güvene al."
	},
	{
		id: 72,
		world: 11,
		name: "ASANSÖR",
		width: 1500,
		gravity: 1,
		ink: 1100,
		starInk: 640,
		starTime: 26,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1360,
			y: 200
		},
		ground: [G$2(0, 470, 220, 130), G$2(1200, 200, 300, 400)],
		movers: [{
			x: 550,
			y: 350,
			w: 130,
			h: 22,
			ay: 120,
			speed: 1.2
		}],
		spikes: [G$2(220, 560, 980, 40)],
		hint: "Aşağı inip çıkan asansöre bin, en üst kattaki kapıya rampa çiz."
	},
	{
		id: 73,
		world: 11,
		name: "SARKAÇ",
		width: 1550,
		gravity: 1,
		ink: 1100,
		starInk: 660,
		starTime: 28,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1420,
			y: 430
		},
		ground: [
			G$2(0, 470, 240, 130),
			G$2(650, 450, 80, 150),
			G$2(1250, 470, 300, 130)
		],
		saws: [{
			x: 440,
			y: 340,
			r: 32,
			ax: 90,
			speed: 1.5
		}, {
			x: 950,
			y: 340,
			r: 32,
			ax: 90,
			speed: 1.5
		}],
		checkpoints: [{
			x: 690,
			y: 420
		}],
		hint: "Sarkaç testereler sağa sola sallanıyor. Geçiş anını yakala."
	},
	{
		id: 74,
		world: 11,
		name: "BANT HATTI",
		width: 1600,
		gravity: 1,
		ink: 1150,
		starInk: 700,
		starTime: 30,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1480,
			y: 430
		},
		ground: [G$2(0, 470, 200, 130), G$2(1300, 470, 300, 130)],
		ice: [G$2(350, 450, 400, 25)],
		movers: [{
			x: 950,
			y: 430,
			w: 130,
			h: 22,
			ax: 80,
			speed: 1.4
		}],
		spikes: [G$2(200, 560, 1100, 40)],
		hint: "Kaygan üretim bandından hareketli platforma sıçra."
	},
	{
		id: 75,
		world: 11,
		name: "ÇİFTE PİSTON",
		width: 1650,
		gravity: 1,
		ink: 1200,
		starInk: 730,
		starTime: 34,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1520,
			y: 280
		},
		ground: [
			G$2(0, 470, 220, 130),
			G$2(800, 390, 80, 210),
			G$2(1350, 280, 300, 320)
		],
		movers: [{
			x: 450,
			y: 420,
			w: 120,
			h: 22,
			ay: 80,
			speed: 1.3
		}, {
			x: 1080,
			y: 340,
			w: 120,
			h: 22,
			ay: 80,
			speed: 1.3
		}],
		spikes: [G$2(220, 560, 580, 40), G$2(880, 560, 470, 40)],
		checkpoints: [{
			x: 840,
			y: 360
		}],
		hint: "İki farklı yükseklikteki dikey pistonu birbirine bağla."
	},
	{
		id: 76,
		world: 11,
		name: "ÇARPIŞMA KORİDORU",
		width: 1700,
		gravity: 1,
		ink: 1250,
		starInk: 760,
		starTime: 37,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1580,
			y: 430
		},
		ground: [G$2(0, 470, 220, 130), G$2(1380, 430, 320, 170)],
		saws: [{
			x: 600,
			y: 380,
			r: 32,
			ay: 100,
			speed: 1.8
		}, {
			x: 850,
			y: 380,
			r: 32,
			ay: 100,
			speed: 1.8
		}],
		movers: [{
			x: 1080,
			y: 430,
			w: 120,
			h: 22,
			ax: 70,
			speed: 1.2
		}],
		hint: "Testerelerin kesiştiği dar boğazda yüksek bir koruma kemeri çiz."
	},
	{
		id: 77,
		world: 11,
		name: "PRESLER",
		width: 1750,
		gravity: 1,
		ink: 1250,
		starInk: 780,
		starTime: 40,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1620,
			y: 340
		},
		ground: [
			G$2(0, 470, 220, 130),
			G$2(750, 430, 80, 170),
			G$2(1420, 340, 330, 260)
		],
		movers: [{
			x: 450,
			y: 400,
			w: 120,
			h: 22,
			ax: 80,
			speed: 1.4
		}],
		saws: [{
			x: 1050,
			y: 360,
			r: 30,
			ax: 90,
			ay: 60,
			speed: 1.5
		}],
		checkpoints: [{
			x: 790,
			y: 400
		}],
		hint: "Mekanik preslerin arasından güvenli geçiş hattı oluştur."
	},
	{
		id: 78,
		world: 11,
		name: "ÜÇLÜ MEKANİZMA",
		width: 1800,
		gravity: 1,
		ink: 1300,
		starInk: 820,
		starTime: 42,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1680,
			y: 220
		},
		ground: [
			G$2(0, 470, 200, 130),
			G$2(600, 390, 60, 210),
			G$2(1100, 310, 60, 290),
			G$2(1500, 220, 300, 380)
		],
		movers: [{
			x: 380,
			y: 430,
			w: 110,
			h: 22,
			ay: 70,
			speed: 1.3
		}, {
			x: 850,
			y: 350,
			w: 110,
			h: 22,
			ay: 70,
			speed: 1.3
		}],
		saws: [{
			x: 1300,
			y: 270,
			r: 30,
			ay: 80,
			speed: 1.6
		}],
		checkpoints: [{
			x: 630,
			y: 360
		}],
		hint: "Üç aşamalı fabrika zinciri: asansörler ve son testere engeli."
	},
	{
		id: 79,
		world: 11,
		name: "OTOMASYON",
		width: 1850,
		gravity: 1,
		ink: 1300,
		starInk: 840,
		starTime: 45,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1720,
			y: 380
		},
		ground: [
			G$2(0, 470, 200, 130),
			G$2(800, 430, 80, 170),
			G$2(1520, 380, 330, 220)
		],
		movers: [{
			x: 450,
			y: 410,
			w: 120,
			h: 22,
			ax: 80,
			speed: 1.5
		}, {
			x: 1150,
			y: 400,
			w: 120,
			h: 22,
			ax: 80,
			ay: 60,
			speed: 1.3
		}],
		saws: [{
			x: 450,
			y: 300,
			r: 28,
			speed: 1.2
		}, {
			x: 1150,
			y: 280,
			r: 28,
			speed: 1.2
		}],
		checkpoints: [{
			x: 840,
			y: 400
		}],
		hint: "Mekanik parçalar senkronize hareket ediyor. Zamanlamayı çöz."
	},
	{
		id: 80,
		world: 11,
		name: "ANA KUMANDA",
		width: 1950,
		gravity: 1,
		ink: 1400,
		starInk: 880,
		starTime: 50,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1820,
			y: 190
		},
		ground: [
			G$2(0, 470, 200, 130),
			G$2(700, 450, 70, 150),
			G$2(1250, 330, 70, 270),
			G$2(1620, 190, 330, 410)
		],
		spikes: [
			G$2(200, 560, 500, 40),
			G$2(770, 560, 480, 40),
			G$2(1320, 560, 300, 40)
		],
		saws: [
			{
				x: 450,
				y: 380,
				r: 32,
				ay: 100,
				speed: 1.7
			},
			{
				x: 950,
				y: 340,
				r: 32,
				ax: 90,
				speed: 1.6
			},
			{
				x: 1460,
				y: 260,
				r: 32,
				ay: 90,
				speed: 1.8
			}
		],
		movers: [{
			x: 1050,
			y: 400,
			w: 120,
			h: 22,
			ay: 70,
			speed: 1.2
		}],
		checkpoints: [{
			x: 735,
			y: 420
		}, {
			x: 1285,
			y: 300
		}],
		hint: "Fabrikanın ana kumanda kulesi: testereleri atlat, hareketli kollardan zirveye ulaş."
	},
	{
		id: 81,
		world: 12,
		name: "GÖLGE GEÇİDİ",
		width: 1500,
		gravity: 1,
		ink: 1e3,
		starInk: 550,
		starTime: 24,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1360,
			y: 430
		},
		ground: [G$2(0, 470, 200, 130), G$2(1200, 470, 300, 130)],
		spikes: [G$2(350, 460, 700, 30)],
		hint: "Mürekkep kısıtlı! En az çizgiyle dikenli gölge vadisini aş."
	},
	{
		id: 82,
		world: 12,
		name: "SESSİZ TEHLİKE",
		width: 1550,
		gravity: 1,
		ink: 1050,
		starInk: 600,
		starTime: 26,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1420,
			y: 350
		},
		ground: [
			G$2(0, 470, 200, 130),
			G$2(650, 420, 70, 180),
			G$2(1250, 350, 300, 250)
		],
		saws: [{
			x: 420,
			y: 370,
			r: 30,
			ay: 90,
			speed: 1.7
		}, {
			x: 950,
			y: 340,
			r: 30,
			ay: 90,
			speed: 1.7
		}],
		hint: "Gölgelerin arasından süzülen iki testerenin arasından yükselen rampa çiz."
	},
	{
		id: 83,
		world: 12,
		name: "KAYIP MERDİVEN",
		width: 1600,
		gravity: 1,
		ink: 1100,
		starInk: 650,
		starTime: 28,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1480,
			y: 180
		},
		ground: [
			G$2(0, 470, 200, 130),
			G$2(500, 380, 60, 220),
			G$2(850, 280, 60, 320),
			G$2(1300, 180, 300, 420)
		],
		fallers: [G$2(1050, 240, 100, 22)],
		hint: "Gölge kulesine tırmanırken düşen basamağı hızla geç."
	},
	{
		id: 84,
		world: 12,
		name: "KARANLIK SARKAÇ",
		width: 1650,
		gravity: 1,
		ink: 1150,
		starInk: 680,
		starTime: 32,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1520,
			y: 430
		},
		ground: [
			G$2(0, 470, 200, 130),
			G$2(800, 430, 80, 170),
			G$2(1350, 430, 300, 170)
		],
		saws: [{
			x: 480,
			y: 360,
			r: 32,
			ax: 90,
			speed: 1.6
		}, {
			x: 1080,
			y: 360,
			r: 32,
			ax: 90,
			speed: 1.6
		}],
		checkpoints: [{
			x: 840,
			y: 400
		}],
		hint: "Karanlıkta salınan dev sarkaçların altından pürüzsüzce kay."
	},
	{
		id: 85,
		world: 12,
		name: "GÖLGE TUZAĞI",
		width: 1700,
		gravity: 1,
		ink: 1200,
		starInk: 720,
		starTime: 35,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1580,
			y: 320
		},
		ground: [
			G$2(0, 470, 200, 130),
			G$2(650, 460, 70, 140),
			G$2(1400, 320, 300, 280)
		],
		spikes: [G$2(200, 560, 450, 40), G$2(720, 560, 680, 40)],
		movers: [{
			x: 1e3,
			y: 390,
			w: 120,
			h: 22,
			ay: 80,
			speed: 1.3
		}],
		checkpoints: [{
			x: 685,
			y: 430
		}],
		hint: "Gölge tuzağının üstündeki gizli platformu köprünle yakala."
	},
	{
		id: 86,
		world: 12,
		name: "HAYALET KÖPRÜ",
		width: 1750,
		gravity: .9,
		ink: 1200,
		starInk: 740,
		starTime: 37,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1620,
			y: 430
		},
		ground: [G$2(0, 470, 200, 130), G$2(1420, 430, 330, 170)],
		fallers: [
			G$2(450, 440, 90, 22),
			G$2(750, 440, 90, 22),
			G$2(1050, 440, 90, 22)
		],
		spikes: [G$2(200, 560, 1220, 40)],
		hint: "Hayalet gibi kaybolan üç platformu birbirine bağla ve duraksamadan koş."
	},
	{
		id: 87,
		world: 12,
		name: "GÖLGE LABİRENTİ",
		width: 1800,
		gravity: 1,
		ink: 1250,
		starInk: 780,
		starTime: 40,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1680,
			y: 240
		},
		ground: [
			G$2(0, 470, 200, 130),
			G$2(550, 380, 60, 220),
			G$2(1050, 320, 60, 280),
			G$2(1500, 240, 300, 360),
			G$2(780, 180, 40, 260)
		],
		saws: [{
			x: 1280,
			y: 280,
			r: 30,
			ay: 80,
			speed: 1.6
		}],
		checkpoints: [{
			x: 580,
			y: 350
		}],
		hint: "Gölge duvarının üstünden aş, testereden kaçıp kapıya yönel."
	},
	{
		id: 88,
		world: 12,
		name: "KARA FIRTINA",
		width: 1850,
		gravity: 1,
		ink: 1300,
		starInk: 800,
		starTime: 43,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1720,
			y: 430
		},
		ground: [
			G$2(0, 470, 200, 130),
			G$2(800, 450, 80, 150),
			G$2(1520, 430, 330, 170)
		],
		movers: [{
			x: 450,
			y: 420,
			w: 120,
			h: 22,
			ax: 80,
			speed: 1.4
		}, {
			x: 1180,
			y: 420,
			w: 120,
			h: 22,
			ax: 80,
			speed: 1.4
		}],
		saws: [{
			x: 840,
			y: 330,
			r: 30,
			ay: 80,
			speed: 1.5
		}],
		checkpoints: [{
			x: 840,
			y: 420
		}],
		hint: "Fırtına ortasındaki orta adaya in, testerenin altından ikinci hareketliye geç."
	},
	{
		id: 89,
		world: 12,
		name: "GÖLGE ARAF",
		width: 1900,
		gravity: 1.05,
		ink: 1350,
		starInk: 840,
		starTime: 46,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1780,
			y: 220
		},
		ground: [
			G$2(0, 470, 200, 130),
			G$2(650, 460, 70, 140),
			G$2(1150, 360, 70, 240),
			G$2(1600, 220, 300, 380)
		],
		saws: [{
			x: 420,
			y: 370,
			r: 32,
			ay: 100,
			speed: 1.7
		}, {
			x: 1380,
			y: 300,
			r: 32,
			ax: 80,
			speed: 1.6
		}],
		movers: [{
			x: 880,
			y: 410,
			w: 120,
			h: 22,
			ay: 70,
			speed: 1.2
		}],
		checkpoints: [{
			x: 685,
			y: 430
		}],
		hint: "Arafın zorlu parkuru: her hamleni hesapla, mürekkebini idareli kullan."
	},
	{
		id: 90,
		world: 12,
		name: "GÖLGE HÜKÜMDARI",
		width: 2e3,
		gravity: 1,
		ink: 1400,
		starInk: 880,
		starTime: 50,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1880,
			y: 180
		},
		ground: [
			G$2(0, 470, 200, 130),
			G$2(700, 450, 70, 150),
			G$2(1250, 320, 70, 280),
			G$2(1680, 180, 320, 420)
		],
		spikes: [
			G$2(200, 560, 500, 40),
			G$2(770, 560, 480, 40),
			G$2(1320, 560, 360, 40)
		],
		saws: [{
			x: 450,
			y: 380,
			r: 32,
			ay: 100,
			speed: 1.8
		}, {
			x: 980,
			y: 340,
			r: 32,
			ay: 90,
			speed: 1.7
		}],
		movers: [{
			x: 1460,
			y: 260,
			w: 120,
			h: 22,
			ay: 70,
			speed: 1.2
		}],
		checkpoints: [{
			x: 735,
			y: 420
		}, {
			x: 1285,
			y: 290
		}],
		hint: "Gölgeler Diyarı'nın son efendisi: tüm tuzakları aşarak zirveye ulaş."
	}
];
var G$1 = (x, y, w, h) => ({
	x,
	y,
	w,
	h
});
var LEVELS_91_100 = [
	{
		id: 91,
		world: 13,
		name: "ZİRVE KAPISI",
		width: 1600,
		gravity: .95,
		ink: 1150,
		starInk: 700,
		starTime: 30,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1480,
			y: 260
		},
		ground: [
			G$1(0, 470, 200, 130),
			G$1(600, 380, 80, 220),
			G$1(1300, 260, 300, 340)
		],
		ice: [G$1(250, 470, 300, 30)],
		saws: [{
			x: 950,
			y: 320,
			r: 30,
			ay: 90,
			speed: 1.6
		}],
		checkpoints: [{
			x: 640,
			y: 350
		}],
		hint: "Sonsuz Zirve'ye hoş geldin. Buzda hızlan, basamağa tırman, testereyi aş."
	},
	{
		id: 92,
		world: 13,
		name: "BUZ VE ÇELİK",
		width: 1700,
		gravity: .95,
		ink: 1200,
		starInk: 740,
		starTime: 34,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1580,
			y: 350
		},
		ground: [
			G$1(0, 470, 200, 130),
			G$1(750, 420, 80, 180),
			G$1(1400, 350, 300, 250)
		],
		ice: [G$1(300, 470, 350, 30), G$1(950, 400, 350, 30)],
		saws: [{
			x: 500,
			y: 370,
			r: 30,
			ay: 80,
			speed: 1.6
		}],
		movers: [{
			x: 1250,
			y: 360,
			w: 110,
			h: 22,
			ay: 60,
			speed: 1.2
		}],
		checkpoints: [{
			x: 790,
			y: 390
		}],
		hint: "Buzda kayıp testereyi atla, hareketli çeliğin üstünden kapıya geç."
	},
	{
		id: 93,
		world: 13,
		name: "DİKENLİ ASANSÖR",
		width: 1750,
		gravity: 1,
		ink: 1250,
		starInk: 780,
		starTime: 38,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1620,
			y: 180
		},
		ground: [
			G$1(0, 470, 200, 130),
			G$1(650, 360, 60, 240),
			G$1(1400, 180, 350, 420)
		],
		spikes: [G$1(200, 560, 450, 40), G$1(710, 560, 690, 40)],
		movers: [{
			x: 1e3,
			y: 300,
			w: 130,
			h: 22,
			ay: 110,
			speed: 1.3
		}],
		checkpoints: [{
			x: 680,
			y: 330
		}],
		hint: "Derin uçurumun üstündeki dikey asansöre yetiş ve zirveye çık."
	},
	{
		id: 94,
		world: 13,
		name: "HAREKETLİ KULE",
		width: 1800,
		gravity: .95,
		ink: 1300,
		starInk: 800,
		starTime: 42,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1680,
			y: 220
		},
		ground: [
			G$1(0, 470, 200, 130),
			G$1(600, 420, 60, 180),
			G$1(1150, 320, 60, 280),
			G$1(1550, 220, 250, 380)
		],
		movers: [{
			x: 380,
			y: 430,
			w: 110,
			h: 22,
			ax: 70,
			speed: 1.3
		}, {
			x: 880,
			y: 370,
			w: 110,
			h: 22,
			ax: 70,
			speed: 1.3
		}],
		saws: [{
			x: 1350,
			y: 270,
			r: 30,
			ay: 80,
			speed: 1.6
		}],
		checkpoints: [{
			x: 630,
			y: 390
		}],
		hint: "Kulenin hareketli basamaklarını adım adım tırman."
	},
	{
		id: 95,
		world: 13,
		name: "KUSURSUZ ZAMAN",
		width: 1850,
		gravity: 1,
		ink: 1300,
		starInk: 820,
		starTime: 45,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1720,
			y: 430
		},
		ground: [
			G$1(0, 470, 200, 130),
			G$1(850, 440, 80, 160),
			G$1(1520, 430, 330, 170)
		],
		saws: [{
			x: 500,
			y: 370,
			r: 32,
			ax: 80,
			ay: 70,
			speed: 1.5
		}, {
			x: 1200,
			y: 370,
			r: 32,
			ax: 80,
			ay: 70,
			speed: 1.5
		}],
		checkpoints: [{
			x: 890,
			y: 410
		}],
		hint: "Dairesel dönen çift testere: tam merkezdeki güvenli eğriyi çiz."
	},
	{
		id: 96,
		world: 13,
		name: "BULUT KÖPRÜSÜ",
		width: 1900,
		gravity: .85,
		ink: 1300,
		starInk: 840,
		starTime: 46,
		start: {
			x: 70,
			y: 380
		},
		door: {
			x: 1780,
			y: 460
		},
		ground: [G$1(0, 420, 200, 180), G$1(1600, 460, 300, 140)],
		fallers: [
			G$1(450, 440, 100, 22),
			G$1(850, 440, 100, 22),
			G$1(1250, 440, 100, 22)
		],
		spikes: [G$1(200, 560, 1400, 40)],
		checkpoints: [{
			x: 900,
			y: 410
		}],
		hint: "Hafif yerçekiminde bulutlar çökerken durmadan süzül."
	},
	{
		id: 97,
		world: 13,
		name: "İKİZ TESTERE KALESİ",
		width: 1950,
		gravity: 1,
		ink: 1350,
		starInk: 860,
		starTime: 48,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1820,
			y: 220
		},
		ground: [
			G$1(0, 470, 200, 130),
			G$1(700, 450, 70, 150),
			G$1(1250, 330, 70, 270),
			G$1(1650, 220, 300, 380)
		],
		saws: [
			{
				x: 450,
				y: 380,
				r: 32,
				ay: 100,
				speed: 1.7
			},
			{
				x: 980,
				y: 360,
				r: 32,
				ax: 90,
				speed: 1.6
			},
			{
				x: 1450,
				y: 280,
				r: 32,
				ay: 90,
				speed: 1.8
			}
		],
		checkpoints: [{
			x: 735,
			y: 420
		}, {
			x: 1285,
			y: 300
		}],
		hint: "Üç kale kapısını koruyan testerelerin altından ustalıkla sıyrıl."
	},
	{
		id: 98,
		world: 13,
		name: "LABİRENT ŞAFTI",
		width: 2e3,
		gravity: .95,
		ink: 1400,
		starInk: 880,
		starTime: 52,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1880,
			y: 160
		},
		ground: [
			G$1(0, 470, 200, 130),
			G$1(500, 400, 60, 200),
			G$1(900, 320, 60, 280),
			G$1(1350, 240, 60, 360),
			G$1(1700, 160, 300, 440)
		],
		movers: [{
			x: 700,
			y: 360,
			w: 100,
			h: 22,
			ay: 60,
			speed: 1.2
		}, {
			x: 1120,
			y: 280,
			w: 100,
			h: 22,
			ay: 60,
			speed: 1.2
		}],
		saws: [{
			x: 1520,
			y: 220,
			r: 30,
			ay: 70,
			speed: 1.6
		}],
		checkpoints: [{
			x: 930,
			y: 290
		}],
		hint: "Adım adım göğe yükselen karmaşık kuleyi köprülerle fethet."
	},
	{
		id: 99,
		world: 13,
		name: "BÜYÜK SINAV",
		width: 2100,
		gravity: .95,
		ink: 1450,
		starInk: 920,
		starTime: 55,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 1980,
			y: 200
		},
		ground: [
			G$1(0, 470, 200, 130),
			G$1(650, 450, 70, 150),
			G$1(1150, 360, 70, 240),
			G$1(1550, 280, 70, 320),
			G$1(1820, 200, 280, 400)
		],
		ice: [G$1(200, 470, 300, 30)],
		spikes: [
			G$1(500, 560, 150, 40),
			G$1(720, 560, 430, 40),
			G$1(1220, 560, 330, 40),
			G$1(1620, 560, 200, 40)
		],
		saws: [
			{
				x: 400,
				y: 370,
				r: 30,
				ay: 80,
				speed: 1.6
			},
			{
				x: 920,
				y: 380,
				r: 30,
				ax: 80,
				speed: 1.5
			},
			{
				x: 1350,
				y: 320,
				r: 30,
				ay: 80,
				speed: 1.7
			}
		],
		movers: [{
			x: 1400,
			y: 420,
			w: 100,
			h: 22,
			ax: 60,
			speed: 1.1
		}],
		checkpoints: [{
			x: 685,
			y: 420
		}, {
			x: 1185,
			y: 330
		}],
		hint: "Finalden önceki büyük sınav: buz, hareketli taşlar ve testereler bir arada."
	},
	{
		id: 100,
		world: 13,
		name: "SONSUZ ÇİZGİ",
		width: 2400,
		gravity: .95,
		ink: 1600,
		starInk: 1050,
		starTime: 65,
		start: {
			x: 70,
			y: 430
		},
		door: {
			x: 2280,
			y: 150
		},
		ground: [
			G$1(0, 470, 220, 130),
			G$1(600, 460, 80, 140),
			G$1(1150, 380, 80, 220),
			G$1(1650, 270, 80, 330),
			G$1(2050, 150, 350, 450)
		],
		ice: [G$1(220, 470, 250, 28)],
		fallers: [G$1(850, 430, 110, 24)],
		spikes: [
			G$1(470, 560, 130, 40),
			G$1(680, 560, 470, 40),
			G$1(1230, 560, 420, 40),
			G$1(1730, 560, 320, 40)
		],
		saws: [
			{
				x: 380,
				y: 370,
				r: 30,
				ay: 80,
				speed: 1.5
			},
			{
				x: 980,
				y: 350,
				r: 32,
				ax: 80,
				speed: 1.6
			},
			{
				x: 1450,
				y: 300,
				r: 32,
				ay: 90,
				speed: 1.7
			},
			{
				x: 1880,
				y: 200,
				r: 34,
				ay: 80,
				speed: 1.8
			}
		],
		movers: [{
			x: 1350,
			y: 340,
			w: 120,
			h: 22,
			ay: 70,
			speed: 1.2
		}, {
			x: 1850,
			y: 220,
			w: 110,
			h: 22,
			ax: 80,
			speed: 1.2
		}],
		checkpoints: [
			{
				x: 640,
				y: 430
			},
			{
				x: 1190,
				y: 350
			},
			{
				x: 1690,
				y: 240
			}
		],
		hint: "Yolculuğun sonu: 100. bölümde sonsuz çizgiyi sen çiz ve efsaneni tamamla!"
	}
];
var G = (x, y, w, h) => ({
	x,
	y,
	w,
	h
});
var WORLDS = [
	{
		id: 1,
		name: "DAĞ YOLU",
		accent: "mountain",
		levels: [1, 5]
	},
	{
		id: 2,
		name: "UZAY",
		accent: "space",
		levels: [6, 10]
	},
	{
		id: 3,
		name: "ŞEHİR",
		accent: "city",
		levels: [11, 15]
	},
	{
		id: 4,
		name: "LABİRENT",
		accent: "maze",
		levels: [16, 20]
	},
	{
		id: 5,
		name: "TEHLİKELİ DÜNYA",
		accent: "danger",
		levels: [21, 25]
	},
	{
		id: 6,
		name: "SENİN DÜNYAN",
		accent: "yours",
		levels: [26, 30]
	},
	{
		id: 7,
		name: "RÜZGÂR TEPESİ",
		accent: "wind",
		levels: [31, 40]
	},
	{
		id: 8,
		name: "LAV VADİSİ",
		accent: "lava",
		levels: [41, 50]
	},
	{
		id: 9,
		name: "DONMUŞ YOL",
		accent: "ice",
		levels: [51, 60]
	},
	{
		id: 10,
		name: "YERALTI MAĞARASI",
		accent: "cave",
		levels: [61, 70]
	},
	{
		id: 11,
		name: "MEKANİK FABRİKA",
		accent: "factory",
		levels: [71, 80]
	},
	{
		id: 12,
		name: "GÖLGELER DİYARI",
		accent: "shadow",
		levels: [81, 90]
	},
	{
		id: 13,
		name: "SONSUZ ZİRVE",
		accent: "summit",
		levels: [91, 100]
	}
];
var LEVELS = [
	...[
		{
			id: 1,
			world: 1,
			name: "İLK ÇİZGİ",
			width: 1e3,
			gravity: 1,
			ink: 800,
			starInk: 420,
			starTime: 16,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 880,
				y: 470
			},
			ground: [G(0, 470, 330, 130), G(620, 470, 380, 130)],
			hint: "Uçurumun üzerine düz bir çizgi çiz."
		},
		{
			id: 2,
			world: 1,
			name: "KÖPRÜ",
			width: 1200,
			gravity: 1,
			ink: 900,
			starInk: 520,
			starTime: 18,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1090,
				y: 470
			},
			ground: [G(0, 470, 280, 130), G(830, 470, 370, 130)],
			hint: "Boşluk büyüdü. Uzun ama sağlam bir köprü çiz."
		},
		{
			id: 3,
			world: 1,
			name: "RAMPA",
			width: 1200,
			gravity: 1,
			ink: 900,
			starInk: 500,
			starTime: 20,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1060,
				y: 320
			},
			ground: [G(0, 470, 320, 130), G(700, 320, 500, 280)],
			hint: "Yukarı çıkmak için eğimli bir rampa çiz."
		},
		{
			id: 4,
			world: 1,
			name: "DÜŞEN YOL",
			width: 1300,
			gravity: 1,
			ink: 950,
			starInk: 560,
			starTime: 22,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1190,
				y: 470
			},
			ground: [G(0, 470, 300, 130), G(940, 470, 360, 130)],
			fallers: [G(520, 470, 130, 26)],
			checkpoints: [{
				x: 585,
				y: 460
			}],
			hint: "Ortadaki platform kalıcı değil, kendi yolunu çiz."
		},
		{
			id: 5,
			world: 1,
			name: "İKİ ÇİZGİ",
			width: 1400,
			gravity: 1,
			ink: 1e3,
			starInk: 640,
			starTime: 26,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1290,
				y: 250
			},
			ground: [
				G(0, 470, 280, 130),
				G(620, 430, 200, 170),
				G(1050, 250, 350, 350)
			],
			hint: "Tek çizgi yetmez: önce köprü, sonra rampa."
		},
		{
			id: 6,
			world: 2,
			name: "DUVAR",
			width: 1300,
			gravity: .55,
			ink: 950,
			starInk: 560,
			starTime: 24,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1180,
				y: 470
			},
			ground: [
				G(0, 470, 560, 130),
				G(560, 250, 60, 350),
				G(800, 470, 500, 130)
			],
			hint: "Düşük yer çekimi. Duvarı aşmak için rampa çiz."
		},
		{
			id: 7,
			world: 2,
			name: "ZIPLAMA",
			width: 1500,
			gravity: .5,
			ink: 900,
			starInk: 520,
			starTime: 24,
			start: {
				x: 70,
				y: 400
			},
			door: {
				x: 1380,
				y: 300
			},
			ground: [
				G(0, 440, 300, 160),
				G(700, 470, 160, 130),
				G(1150, 300, 350, 300)
			],
			hint: "Uzayda zıplama uzundur. Sıçrama rampası çiz."
		},
		{
			id: 8,
			world: 2,
			name: "DİKENLER",
			width: 1400,
			gravity: .6,
			ink: 900,
			starInk: 540,
			starTime: 26,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1300,
				y: 470
			},
			ground: [
				G(0, 470, 320, 130),
				G(320, 520, 640, 80),
				G(960, 470, 440, 130)
			],
			spikes: [G(340, 495, 600, 26)],
			hint: "Dikenlere değme. Üstlerinden geçen bir köprü çiz."
		},
		{
			id: 9,
			world: 2,
			name: "HAREKETLİ ENGEL",
			width: 1500,
			gravity: .6,
			ink: 1e3,
			starInk: 620,
			starTime: 30,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1390,
				y: 470
			},
			ground: [G(0, 470, 330, 130), G(1080, 470, 420, 130)],
			saws: [{
				x: 700,
				y: 380,
				r: 34,
				ay: 110,
				speed: 1.1
			}],
			checkpoints: [{
				x: 620,
				y: 400
			}],
			hint: "Testere iner çıkar. Zamanlamanı çizginle ayarla."
		},
		{
			id: 10,
			world: 2,
			name: "ZAMAN",
			width: 1500,
			gravity: .6,
			ink: 1e3,
			starInk: 620,
			starTime: 22,
			timeLimit: 40,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1400,
				y: 380
			},
			ground: [
				G(0, 470, 300, 130),
				G(650, 470, 180, 130),
				G(1150, 380, 350, 220)
			],
			hint: "Süren sınırlı. Hızlı düşün, hızlı çiz."
		},
		{
			id: 11,
			world: 3,
			name: "ÇATILAR",
			width: 1600,
			gravity: 1,
			ink: 1e3,
			starInk: 620,
			starTime: 28,
			start: {
				x: 70,
				y: 380
			},
			door: {
				x: 1500,
				y: 300
			},
			ground: [
				G(0, 420, 260, 180),
				G(520, 350, 200, 250),
				G(980, 470, 200, 130),
				G(1330, 300, 270, 300)
			],
			hint: "Çatıdan çatıya kendi yolunu çiz."
		},
		{
			id: 12,
			world: 3,
			name: "ASANSÖR",
			width: 1500,
			gravity: 1,
			ink: 1e3,
			starInk: 600,
			starTime: 30,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1400,
				y: 230
			},
			ground: [G(0, 470, 300, 130), G(1150, 230, 350, 370)],
			movers: [{
				x: 620,
				y: 470,
				w: 160,
				h: 24,
				ay: 130,
				speed: .9
			}],
			hint: "Asansör platformunu yakala, gerisini sen çiz."
		},
		{
			id: 13,
			world: 3,
			name: "KAYGAN ÇATI",
			width: 1500,
			gravity: 1,
			ink: 1e3,
			starInk: 620,
			starTime: 28,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1390,
				y: 470
			},
			ground: [G(0, 470, 300, 130), G(1080, 470, 420, 130)],
			ice: [G(520, 430, 340, 24)],
			hint: "Buz kaygan: hız kazanmak için kullan."
		},
		{
			id: 14,
			world: 3,
			name: "TRAFİK",
			width: 1600,
			gravity: 1,
			ink: 1050,
			starInk: 650,
			starTime: 32,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1500,
				y: 470
			},
			ground: [
				G(0, 470, 320, 130),
				G(700, 470, 200, 130),
				G(1200, 470, 400, 130)
			],
			saws: [{
				x: 520,
				y: 400,
				r: 30,
				ax: 120,
				speed: 1.4
			}, {
				x: 1050,
				y: 400,
				r: 30,
				ax: 120,
				speed: 1.8
			}],
			checkpoints: [{
				x: 760,
				y: 440
			}],
			hint: "İki hareketli tehlike. Aralarından geç."
		},
		{
			id: 15,
			world: 3,
			name: "GÖKDELEN",
			width: 1500,
			gravity: 1,
			ink: 1100,
			starInk: 700,
			starTime: 34,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1380,
				y: 170
			},
			ground: [
				G(0, 470, 280, 130),
				G(560, 380, 160, 220),
				G(900, 280, 160, 320),
				G(1240, 170, 260, 430)
			],
			hint: "Basamak basamak yukarı çiz."
		},
		{
			id: 16,
			world: 4,
			name: "DAR GEÇİT",
			width: 1400,
			gravity: 1,
			ink: 1e3,
			starInk: 600,
			starTime: 28,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1300,
				y: 470
			},
			ground: [
				G(0, 470, 300, 130),
				G(600, 0, 60, 330),
				G(900, 470, 500, 130)
			],
			spikes: [G(320, 560, 560, 30)],
			hint: "Tavandaki duvarın altından geçmelisin."
		},
		{
			id: 17,
			world: 4,
			name: "ÇIKMAZ",
			width: 1500,
			gravity: 1,
			ink: 1050,
			starInk: 640,
			starTime: 32,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1400,
				y: 250
			},
			ground: [
				G(0, 470, 320, 130),
				G(700, 470, 120, 130),
				G(700, 0, 120, 300),
				G(1150, 250, 350, 350)
			],
			hint: "Duvarların arasındaki boşluğu bul ve oradan geç."
		},
		{
			id: 18,
			world: 4,
			name: "İKİ KAT",
			width: 1600,
			gravity: 1,
			ink: 1100,
			starInk: 680,
			starTime: 34,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1500,
				y: 200
			},
			ground: [
				G(0, 470, 300, 130),
				G(560, 470, 400, 40),
				G(900, 200, 300, 40),
				G(1330, 200, 270, 400)
			],
			spikes: [G(300, 570, 260, 30)],
			hint: "Alt kattan üst kata geçmelisin."
		},
		{
			id: 19,
			world: 4,
			name: "SARKAÇ",
			width: 1600,
			gravity: 1,
			ink: 1100,
			starInk: 680,
			starTime: 36,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1500,
				y: 400
			},
			ground: [
				G(0, 470, 300, 130),
				G(760, 430, 180, 40),
				G(1250, 470, 350, 130)
			],
			saws: [{
				x: 1050,
				y: 330,
				r: 32,
				ax: 90,
				ay: 90,
				speed: 1.3
			}],
			checkpoints: [{
				x: 840,
				y: 400
			}],
			hint: "Çapraz hareket eden testereyi izle."
		},
		{
			id: 20,
			world: 4,
			name: "LABİRENT SONU",
			width: 1700,
			gravity: 1,
			ink: 1150,
			starInk: 720,
			starTime: 40,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1600,
				y: 160
			},
			ground: [
				G(0, 470, 300, 130),
				G(520, 0, 60, 300),
				G(760, 470, 400, 40),
				G(1100, 160, 60, 260),
				G(1400, 160, 300, 440)
			],
			checkpoints: [{
				x: 820,
				y: 430
			}],
			hint: "Alçal, ilerle, sonra yüksel."
		},
		{
			id: 21,
			world: 5,
			name: "DİKEN TARLASI",
			width: 1600,
			gravity: 1,
			ink: 1050,
			starInk: 640,
			starTime: 30,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1500,
				y: 470
			},
			ground: [
				G(0, 470, 300, 130),
				G(300, 540, 900, 60),
				G(1200, 470, 400, 130)
			],
			spikes: [G(320, 515, 400, 26), G(800, 515, 380, 26)],
			checkpoints: [{
				x: 760,
				y: 500
			}],
			hint: "İki diken sırası. Aralarına in, sonra yeniden çık."
		},
		{
			id: 22,
			world: 5,
			name: "TESTERE HATTI",
			width: 1700,
			gravity: 1,
			ink: 1100,
			starInk: 680,
			starTime: 34,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1600,
				y: 470
			},
			ground: [
				G(0, 470, 300, 130),
				G(760, 470, 200, 130),
				G(1300, 470, 400, 130)
			],
			saws: [{
				x: 520,
				y: 400,
				r: 30,
				ay: 120,
				speed: 1.5
			}, {
				x: 1120,
				y: 400,
				r: 30,
				ay: 120,
				speed: 1.1
			}],
			checkpoints: [{
				x: 820,
				y: 440
			}],
			hint: "Zamanlama her şeydir."
		},
		{
			id: 23,
			world: 5,
			name: "DÜŞEN TUZAK",
			width: 1700,
			gravity: 1,
			ink: 1150,
			starInk: 700,
			starTime: 36,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1600,
				y: 400
			},
			ground: [G(0, 470, 300, 130), G(1350, 400, 350, 200)],
			fallers: [G(600, 460, 140, 24), G(950, 440, 140, 24)],
			spikes: [G(300, 570, 1040, 30)],
			hint: "Platformlar dayanmaz. Kendi köprünü çiz."
		},
		{
			id: 24,
			world: 5,
			name: "KAYGAN TEHLİKE",
			width: 1700,
			gravity: 1,
			ink: 1150,
			starInk: 720,
			starTime: 36,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1600,
				y: 300
			},
			ground: [
				G(0, 470, 300, 130),
				G(700, 470, 300, 130),
				G(1300, 300, 400, 300)
			],
			ice: [G(700, 446, 300, 24)],
			spikes: [G(1010, 560, 280, 30)],
			saws: [{
				x: 1150,
				y: 380,
				r: 30,
				ay: 100,
				speed: 1.6
			}],
			checkpoints: [{
				x: 740,
				y: 430
			}],
			hint: "Buzda durmak zor. Rampanı iyi hesapla."
		},
		{
			id: 25,
			world: 5,
			name: "KAOS",
			width: 1800,
			gravity: 1,
			ink: 1200,
			starInk: 760,
			starTime: 42,
			timeLimit: 70,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1700,
				y: 470
			},
			ground: [
				G(0, 470, 300, 130),
				G(760, 500, 200, 100),
				G(1400, 470, 400, 130)
			],
			spikes: [G(770, 475, 180, 26)],
			saws: [{
				x: 520,
				y: 380,
				r: 28,
				ay: 130,
				speed: 1.7
			}, {
				x: 1180,
				y: 380,
				r: 28,
				ax: 130,
				speed: 1.4
			}],
			movers: [{
				x: 1050,
				y: 470,
				w: 140,
				h: 24,
				ay: 120,
				speed: 1
			}],
			checkpoints: [{
				x: 800,
				y: 470
			}],
			hint: "Her şey aynı anda. Sakin ol ve çiz."
		},
		{
			id: 26,
			world: 6,
			name: "BOŞ SAYFA",
			width: 1700,
			gravity: .9,
			ink: 1200,
			starInk: 760,
			starTime: 34,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1600,
				y: 260
			},
			ground: [G(0, 470, 260, 130), G(1400, 260, 300, 340)],
			hint: "Aradaki her şeyi sen çizeceksin."
		},
		{
			id: 27,
			world: 6,
			name: "UÇURUM",
			width: 1800,
			gravity: .9,
			ink: 1250,
			starInk: 780,
			starTime: 38,
			start: {
				x: 70,
				y: 300
			},
			door: {
				x: 1700,
				y: 470
			},
			ground: [
				G(0, 340, 260, 260),
				G(900, 470, 200, 130),
				G(1450, 470, 350, 130)
			],
			spikes: [G(1100, 570, 350, 30)],
			checkpoints: [{
				x: 950,
				y: 440
			}],
			hint: "Yukarıdan aşağı: iniş de bir sanattır."
		},
		{
			id: 28,
			world: 6,
			name: "ZİKZAK",
			width: 1800,
			gravity: .9,
			ink: 1250,
			starInk: 800,
			starTime: 42,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1700,
				y: 180
			},
			ground: [
				G(0, 470, 260, 130),
				G(600, 380, 60, 220),
				G(1050, 260, 60, 340),
				G(1500, 180, 300, 420)
			],
			saws: [{
				x: 850,
				y: 300,
				r: 28,
				ay: 110,
				speed: 1.5
			}],
			checkpoints: [{
				x: 630,
				y: 350
			}],
			hint: "Basamaklar dar. Rampalarını sırayla çiz."
		},
		{
			id: 29,
			world: 6,
			name: "SON ENGEL",
			width: 1900,
			gravity: .9,
			ink: 1300,
			starInk: 820,
			starTime: 46,
			timeLimit: 80,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1800,
				y: 300
			},
			ground: [
				G(0, 470, 260, 130),
				G(700, 470, 180, 130),
				G(1200, 470, 60, 130),
				G(1550, 300, 350, 300)
			],
			spikes: [G(880, 560, 320, 30)],
			saws: [{
				x: 480,
				y: 380,
				r: 30,
				ay: 120,
				speed: 1.6
			}, {
				x: 1380,
				y: 360,
				r: 30,
				ax: 110,
				speed: 1.5
			}],
			movers: [{
				x: 1e3,
				y: 430,
				w: 130,
				h: 22,
				ax: 120,
				speed: 1.1
			}],
			checkpoints: [{
				x: 740,
				y: 440
			}],
			hint: "Öğrendiğin her şeyi kullan."
		},
		{
			id: 30,
			world: 6,
			name: "SON ÇİZGİ",
			width: 2e3,
			gravity: .9,
			ink: 1400,
			starInk: 900,
			starTime: 55,
			start: {
				x: 70,
				y: 430
			},
			door: {
				x: 1900,
				y: 200
			},
			ground: [
				G(0, 470, 260, 130),
				G(760, 520, 240, 80),
				G(1300, 380, 60, 220),
				G(1650, 200, 350, 400)
			],
			spikes: [G(770, 495, 220, 26), G(1e3, 570, 300, 30)],
			saws: [
				{
					x: 520,
					y: 380,
					r: 30,
					ay: 130,
					speed: 1.7
				},
				{
					x: 1150,
					y: 330,
					r: 30,
					ax: 120,
					ay: 80,
					speed: 1.4
				},
				{
					x: 1500,
					y: 300,
					r: 30,
					ay: 120,
					speed: 1.9
				}
			],
			movers: [{
				x: 1420,
				y: 460,
				w: 140,
				h: 22,
				ay: 130,
				speed: 1
			}],
			checkpoints: [{
				x: 800,
				y: 500
			}],
			hint: "Son çizgiyi sen çiz."
		}
	],
	...LEVELS_31_50,
	...LEVELS_51_70,
	...LEVELS_71_90,
	...LEVELS_91_100
];
//#endregion
export { WORLDS as n, LEVELS as t };
