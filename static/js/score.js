var guessButton = document.querySelector('.guess-btn');
var nextRoundButton = document.querySelector('.next-round');
var playButton = document.querySelector('.play');

var images = [
{
    imageUrl: 'randommap/1.png',
    lat: -52.784217647288315, // Example latitude assigned beforehand
    lng: -43.33419442176821, // Example longitude assigned beforehand
    currentLocation: "Master Control Zone",
},
{
    imageUrl: 'randommap/2.png',
    lat: -38.20779273881535, // Example latitude assigned beforehand
    lng: -35.846315338022, // Example longitude assigned beforehand
    currentLocation: "Master Control Zone",
},
{
    imageUrl: 'randommap/3.png',
    lat: 49.85775686236894, // Example latitude assigned beforehand
    lng: 0.025180578231811527, // Example longitude assigned beforehand
    currentLocation: "Master Control Zone",
},
{
    imageUrl: 'randommap/4.png',
    lat: 8.999990334313432, // Example latitude assigned beforehand
    lng: 20.10067139638987, // Example longitude assigned beforehand
    currentLocation: "Master Control Zone",
},
{
    imageUrl: 'randommap/5.png',
    lat: -52.67777197485139,
    lng: 10.249789953231826,
    currentLocation: "Master Control Zone",
},
{
    imageUrl: 'randommap/6.png',
    lat: -65.6214572532182,
    lng: 98.02322745323181,
    currentLocation: "Master Control Zone",
},
{
    imageUrl: 'randommap/7.png',
    lat: -60.64021983575442,
    lng: -84.99207849088639,
    currentLocation: "Master Control Zone",
},
{
    imageUrl: 'randommap/8.png',
    lat: 20.687489687323254,
    lng: 18.00559478034203,
    currentLocation: "Master Control Zone",
},
{
    imageUrl: 'randommap/9.png',
    lat: 59.23627314941806,
    lng: 52.24891841411593,
    currentLocation: "Base Zone",
},
{
    imageUrl: 'randommap/10.png',
    lat: 5.062444398588828,
    lng: -1.4669018983840878,
    currentLocation: "Base Zone",
},
{
    imageUrl: 'randommap/11.png',
    lat: 77.01999919166653,
    lng: -32.52364754676819,
    currentLocation: "Base Zone",
},
{
    imageUrl: 'randommap/12.png',
    lat: -2.7375792765186855,
    lng: -28.571025556035735,
    currentLocation: "Base Zone",
},
{
    imageUrl: 'randommap/13.png',
    lat: -7.061532431999891,
    lng: 17.75016751443934,
    currentLocation: "Base Zone",
},
{
    imageUrl: 'randommap/14.png',
    lat: -30.637322771834707,
    lng: -1.8770581483840945,
    currentLocation: "Base Zone",
},
{
    imageUrl: 'randommap/15.png',
    lat: -75.44035402936733,
    lng: 5.889826764819378,
    currentLocation: "Base Zone",
},
{
    imageUrl: 'randommap/16.png',
    lat: -67.42893540805736,
    lng: -1.8832325935363772,
    currentLocation: "Base Zone",
},
{
    imageUrl: 'randommap/17.png',
    lat: -25.571914322416273,
    lng: -132.5773989897143,
    currentLocation: "Storage Zone - B1",
},
{
    imageUrl: 'randommap/18.png',
    lat: 0.1731944026012125,
    lng: -98.81749035496823,
    currentLocation: "Storage Zone - B1",
},
{
    imageUrl: 'randommap/19.png',
    lat: -21.836707117729134,
    lng: -134.4131934799682,
    currentLocation: "Storage Zone - F1",
},
{
    imageUrl: 'randommap/20.png',
    lat: 8.611343143910357,
    lng: -78.37325677580749,
    currentLocation: "Storage Zone - F1",
},
{
    imageUrl: 'randommap/21.png',
    lat: -28.096619203395605,
    lng: -62.435756921768196,
    currentLocation: "Storage Zone - F1",
},
{
    imageUrl: 'randommap/22.png',
    lat: 13.326817719081692,
    lng: 20.65018057823184,
    currentLocation: "Storage Zone - F1",
},
{
    imageUrl: 'randommap/23.png',
    lat: -7.041385284408406,
    lng: 69.28299307823183,
    currentLocation: "Storage Zone - F1",
},
{
    imageUrl: 'randommap/24.png',
    lat: -38.02308335117713,
    lng: 95.185439350436,
    currentLocation: "Storage Zone - F1",
},
{
    imageUrl: 'randommap/25.png',
    lat: -44.149698366967904,
    lng: 145.89432120323187,
    currentLocation: "Storage Zone - F1",
},
{
    imageUrl: 'randommap/26.png',
    lat: 30.146311645513244,
    lng: -74.8283350467682,
    currentLocation: "Storage Zone - F1",
},
{
    imageUrl: 'randommap/27.png',
    lat: -44.170715787372586,
    lng: -6.360164880752551,
    currentLocation: "Storage Zone - F2",
},
{
    imageUrl: 'randommap/28.png',
    lat: 11.352139643098683,
    lng: 38.108829259872465,
    currentLocation: "Storage Zone - F2",
},
{
    imageUrl: 'randommap/29.png',
    lat: -8.918460508833506,
    lng: -28.512022510598623,
    currentLocation: "Storage Zone - F2",
},
{
    imageUrl: 'randommap/30.png',
    lat: 26.40621743793929,
    lng: 48.128360509872465,
    currentLocation: "Storage Zone - F2",
},
{
    imageUrl: 'randommap/31.png',
    lat: -37.531875774977195,
    lng: 66.73553824424745,
    currentLocation: "Storage Zone - F2",
},
{
    imageUrl: 'randommap/32.png',
    lat: -45.489406297446884,
    lng: 43.095925948816536,
    currentLocation: "Storage Zone - F2",
},
{
    imageUrl: 'randommap/33.png',
    lat: -22.400196960319015,
    lng: -42.78624773025512,
    currentLocation: "Supply Zone - F1",
},
{
    imageUrl: 'randommap/34.png',
    lat: -3.5550910548497585,
    lng: -101.46148324012756,
    currentLocation: "Supply Zone - F1",
},
{
    imageUrl: 'randommap/35.png',
    lat: 16.918001478364722,
    lng: -40.758358240127556,
    currentLocation: "Supply Zone - F2",
},
{
    imageUrl: 'randommap/36.png',
    lat: 36.410596674662024,
    lng: -59.36187386512756,
    currentLocation: "Supply Zone - F2",
},
{
    imageUrl: 'randommap/37.png',
    lat: -4.913103442817133,
    lng: -141.75109148025513,
    currentLocation: "Supply Zone - F2",
},
{
    imageUrl: 'randommap/38.png',
    lat: 48.65131111604312,
    lng: -137.64952898025516,
    currentLocation: "Supply Zone - F2",
},
{
    imageUrl: 'randommap/39.png',
    lat: -41.06939865150142,
    lng: -144.09484148025513,
    currentLocation: "Supply Zone - F2",
},
{
    imageUrl: 'randommap/40.png',
    lat: 9.768156439944173,
    lng: -8.912655115127578,
    currentLocation: "Supply Zone - F2",
},
{
    imageUrl: 'randommap/41.png',
    lat: -2.2246336167699585,
    lng: -9.967342615127558,
    currentLocation: "Supply Zone - F2",
},
{
    imageUrl: 'randommap/42.png',
    lat: 50.12145631546137,
    lng: 31.10687613487244,
    currentLocation: "Supply Zone - F2",
},
{
    imageUrl: 'randommap/43.png',
    lat: 42.337903948379996,
    lng: 42.679141759872465,
    currentLocation: "Supply Zone - F2",
},
{
    imageUrl: 'randommap/44.png',
    lat: 20.931799753305228,
    lng: 36.84398698608634,
    currentLocation: "Supply Zone - F2",
},
{
    imageUrl: 'randommap/45.png',
    lat: -6.683434667049421,
    lng: 26.5565019384532,
    currentLocation: "Supply Zone - F2",
},
{
    imageUrl: 'randommap/46.png',
    lat: -7.884330783217611,
    lng: 52.58544266049624,
    currentLocation: "Supply Zone - F2",
},
{
    imageUrl: 'randommap/47.png',
    lat: 9.102772971744097,
    lng: 117.79953181743622,
    currentLocation: "Supply Zone - F2",
},
{
    imageUrl: 'randommap/48.png',
    lat: -7.042064975992389,
    lng: 132.36007869243625,
    currentLocation: "Supply Zone - F2",
},
{
    imageUrl: 'randommap/49.png',
    lat: -30.171773975798445,
    lng: 118.53766986543292,
    currentLocation: "Supply Zone - F2",
},
{
    imageUrl: 'randommap/50.png',
    lat: -8.033234239949975,
    lng: 109.98549598086582,
    currentLocation: "Supply Zone - F2",
},
{
    imageUrl: 'randommap/51.png',
    lat: -9.158595737398278,
    lng: 23.40546011924744,
    currentLocation: "Administrative District - B1",
},
{
    imageUrl: 'randommap/52.png',
    lat: 16.34188280935449,
    lng: 5.5192583799362325,
    currentLocation: "Administrative District - B1",
},
{
    imageUrl: 'randommap/53.png',
    lat: 0.5886665727339253,
    lng: -24.27062273025513,
    currentLocation: "Administrative District - F1",
},
{
    imageUrl: 'randommap/54.png',
    lat: 12.213857626859353,
    lng: 4.440314769744861,
    currentLocation: "Administrative District - F1",
},
{
    imageUrl: 'randommap/55.png',
    lat: -18.339321611520532,
    lng: 17.68890738487245,
    currentLocation: "Administrative District - F1",
},
{
    imageUrl: 'randommap/56.png',
    lat: 20.112248327491276,
    lng: 16.25336050987244,
    currentLocation: "Administrative District - F1",
},
{
    imageUrl: 'randommap/57.png',
    lat: 31.858695142420004,
    lng: 11.744627935580853,
    currentLocation: "Administrative District - F1",
},
{
    imageUrl: 'randommap/58.png',
    lat: 41.39981605018618,
    lng: 11.390079259872424,
    currentLocation: "Administrative District - F1",
},
{
    imageUrl: 'randommap/59.png',
    lat: 77.02657795103241,
    lng: 2.83539175987245,
    currentLocation: "Administrative District - F1",
},
{
    imageUrl: 'randommap/60.png',
    lat: 81.06161875416375,
    lng: -11.490823514147849,
    currentLocation: "Administrative District - F1",
},
{
    imageUrl: 'randommap/61.png',
    lat: 73.40372889353195,
    lng: 33.77284836085216,
    currentLocation: "Administrative District - F1",
},
{
    imageUrl: 'randommap/62.png',
    lat: 75.70150725704902,
    lng: 21.175192110852144,
    currentLocation: "Administrative District - F1",
},
{
    imageUrl: 'randommap/63.png',
    lat: 74.50460814302929,
    lng: -0.03570199012755682,
    currentLocation: "Administrative District - F1",
},
{
    imageUrl: 'randommap/64.png',
    lat: 70.9505843017091,
    lng: 4.06586050987245,
    currentLocation: "Administrative District - F1",
},
{
    imageUrl: 'randommap/65.png',
    lat: 12.32702957377287,
    lng: 24.72015738487245,
    currentLocation: "Administrative District - F1",
},
{
    imageUrl: 'randommap/66.png',
    lat: -18.28369491159254,
    lng: 46.28265738487243,
    currentLocation: "Administrative District - F1",
},
{
    imageUrl: 'randommap/67.png',
    lat: -42.672582574356255,
    lng: 31.89868908353122,
    currentLocation: "Administrative District - F1",
},
{
    imageUrl: 'randommap/68.png',
    lat: -70.51467049266009,
    lng: 56.88812613487246,
    currentLocation: "Administrative District - F1",
},
{
    imageUrl: 'randommap/69.png',
    lat: -58.52424394269064,
    lng: -4.2382565908544905,
    currentLocation: "Administrative District - F1",
  },
  {
    imageUrl: 'randommap/70.png',
    lat: -67.03312005888803,
    lng: 20.51760278414552,
    currentLocation: "Administrative District - F1",
  },
  {
    imageUrl: 'randommap/71.png',
    lat: -67.22186725350943,
    lng: 54.84752332547792,
    currentLocation: "Administrative District - F1",
  },
  {
    imageUrl: 'randommap/72.png',
    lat: 21.889803964475316,
    lng: 48.655724664675716,
    currentLocation: "Administrative District - F1",
  },
  {
    imageUrl: 'randommap/73.png',
    lat: 17.896260646901275,
    lng: 50.413537164675716,
    currentLocation: "Administrative District - F1",
  },
  {
    imageUrl: 'randommap/74.png',
    lat: -65.17015553643031,
    lng: 39.280704259872444,
    currentLocation: "Administrative District - F1",
  },
  {
    imageUrl: 'randommap/75.png',
    lat: -6.663247101355723,
    lng: 137.39960074424746,
    currentLocation: "Outlying Snow Plains",
  },
  {
    imageUrl: 'randommap/76.png',
    lat: -6.168320985132103,
    lng: 105.63812613487245,
    currentLocation: "Outlying Snow Plains",
  },
  {
    imageUrl: 'randommap/77.png',
    lat: -54.29861871024962,
    lng: 61.634234354548596,
    currentLocation: "Outlying Snow Plains",
  },
  {
    imageUrl: 'randommap/78.png',
    lat: 6.410450721097361,
    lng: 77.50073573474454,
    currentLocation: "Outlying Snow Plains",
  },
  {
    imageUrl: 'randommap/79.png',
    lat: 27.801142504121824,
    lng: 40.74365896948907,
    currentLocation: "Outlying Snow Plains",
  },
  {
    imageUrl: 'randommap/80.png',
    lat: 22.790846277552294,
    lng: -6.703722433100769,
    currentLocation: "Outlying Snow Plains",
  },
  {
    imageUrl: 'randommap/81.png',
    lat: 51.0857840042465,
    lng: -70.40522760425728,
    currentLocation: "Outlying Snow Plains",
  },
  {
    imageUrl: 'randommap/82.png',
    lat: -50.29953059001753,
    lng: -29.020973177128635,
    currentLocation: "Backwater Pass",
  },
  {
    imageUrl: 'randommap/83.png',
    lat: -50.435232975791436,
    lng: -12.320154155316049,
    currentLocation: "Backwater Pass",
  },
  {
    imageUrl: 'randommap/84.png',
    lat: -59.235222221717656,
    lng: 24.310001134872426,
    currentLocation: "Backwater Pass",
  },
  {
    imageUrl: 'randommap/85.png',
    lat: -65.52453544129283,
    lng: 52.58148550987246,
    currentLocation: "Backwater Pass",
  },
  {
    imageUrl: 'randommap/86.png',
    lat: -69.45701016599833,
    lng: 76.52472659127969,
    currentLocation: "Backwater Pass",
  },
  {
    imageUrl: 'randommap/87.png',
    lat: -49.43935251154197,
    lng: 37.377496465659846,
    currentLocation: "Backwater Pass",
  },
  {
    imageUrl: 'randommap/88.png',
    lat: 25.29892047283829,
    lng: 49.50531363487246,
    currentLocation: "Backwater Pass",
  },
  {
    imageUrl: 'randommap/89.png',
    lat: 35.93184475729444,
    lng: 32.06587309326768,
    currentLocation: "Backwater Pass",
  },
  {
    imageUrl: 'randommap/90.png',
    lat: 61.77375455984338,
    lng: 26.12640593063624,
    currentLocation: "Backwater Pass",
  },
  {
    imageUrl: 'randommap/91.png',
    lat: 72.0153914734914,
    lng: 34.366095737129385,
    currentLocation: "Backwater Pass",
  },
  {
    imageUrl: 'randommap/92.png',
    lat: 77.98325986459763,
    lng: 23.459785881941656,
    currentLocation: "Backwater Pass",
  },
  {
    imageUrl: 'randommap/93.png',
    lat: 79.1792682981513,
    lng: -1.7825948375370106,
    currentLocation: "Backwater Pass",
  },
  {
    imageUrl: 'randommap/94.png',
    lat: -80.10323415887105,
    lng: -3.2876551151275573,
    currentLocation: "Silvermane Guards Restricted Zone",
    },
    {
    imageUrl: 'randommap/95.png',
    lat: -68.57058931981494,
    lng: 11.71234488487245,
    currentLocation: "Silvermane Guards Restricted Zone",
    },
    {
    imageUrl: 'randommap/96.png',
    lat: -61.59957317713825,
    lng: -2.6407915254758323,
    currentLocation: "Silvermane Guards Restricted Zone",
    },
    {
    imageUrl: 'randommap/97.png',
    lat: -73.96260772383846,
    lng: -22.857967615127563,
    currentLocation: "Silvermane Guards Restricted Zone",
    },
    {
    imageUrl: 'randommap/98.png',
    lat: -69.22402515926848,
    lng: -48.52843523025513,
    currentLocation: "Silvermane Guards Restricted Zone",
    },
    {
    imageUrl: 'randommap/99.png',
    lat: -59.443682442765166,
    lng: -106.47765398025514,
    currentLocation: "Silvermane Guards Restricted Zone",
    },
    {
    imageUrl: 'randommap/100.png',
    lat: -30.748923495464506,
    lng: -3.1768727302551274,
    currentLocation: "Silvermane Guards Restricted Zone",
    },
    {
    imageUrl: 'randommap/101.png',
    lat: 0.1771506810778137,
    lng: 108.86078238487244,
    currentLocation: "Silvermane Guards Restricted Zone",
    },
    {
    imageUrl: 'randommap/102.png',
    lat: 0.8503034715380198,
    lng: 32.1323089723232,
    currentLocation: "Silvermane Guards Restricted Zone",
    },
    {
    imageUrl: 'randommap/103.png',
    lat: 27.65288197375239,
    lng: 5.43475590019135,
    currentLocation: "Silvermane Guards Restricted Zone",
    },
    {
    imageUrl: 'randommap/104.png',
    lat: 0.7058465748421238,
    lng: -17.297966480255116,
    currentLocation: "Silvermane Guards Restricted Zone",
    },
    {
    imageUrl: 'randommap/105.png',
    lat: 1.2229228559528373,
    lng: -68.93380287985141,
    currentLocation: "Silvermane Guards Restricted Zone",
    },
    {
    imageUrl: 'randommap/106.png',
    lat: 24.688196933132616,
    lng: -77.78960824012758,
    currentLocation: "Silvermane Guards Restricted Zone",
    },
    {
    imageUrl: 'randommap/107.png',
    lat: 0.5353371334776911,
    lng: -99.4399988651276,
    currentLocation: "Silvermane Guards Restricted Zone",
    },
    {
      imageUrl: 'randommap/108.png',
      lat: -74.1956594982485,
      lng: 37.76092886924745,
      currentLocation: "Corridor of Fading Echoes",
    },
    {
      imageUrl: 'randommap/109.png',
      lat: -75.96611836973955,
      lng: 20.237735509872454,
      currentLocation: "Corridor of Fading Echoes",
    },
    {
      imageUrl: 'randommap/110.png',
      lat: -73.44473686586149,
      lng: -12.955623865127558,
      currentLocation: "Corridor of Fading Echoes",
    },
    {
      imageUrl: 'randommap/111.png',
      lat: -77.81066876549549,
      lng: -22.916561365127553,
      currentLocation: "Corridor of Fading Echoes",
    },
    {
      imageUrl: 'randommap/112.png',
      lat: -80.49321338002174,
      lng: -38.70757699012757,
      currentLocation: "Corridor of Fading Echoes",
    },
    {
      imageUrl: 'randommap/113.png',
      lat: -80.84934375968567,
      lng: -39.29351449012757,
      currentLocation: "Corridor of Fading Echoes",
    },
    {
      imageUrl: 'randommap/114.png',
      lat: -80.51738509410636,
      lng: -44.42300103806011,
      currentLocation: "Corridor of Fading Echoes",
    },
    {
      imageUrl: 'randommap/115.png',
      lat: -79.72013377718896,
      lng: -67.70251370329652,
      currentLocation: "Corridor of Fading Echoes",
  },
  {
      imageUrl: 'randommap/116.png',
      lat: -78.44540847338533,
      lng: -66.23766995329652,
      currentLocation: "Corridor of Fading Echoes",
  },
  {
      imageUrl: 'randommap/117.png',
      lat: -73.23762217249289,
      lng: -64.62634182829652,
      currentLocation: "Corridor of Fading Echoes",
  },
  {
      imageUrl: 'randommap/118.png',
      lat: -78.82069593269736,
      lng: -80.15368557829653,
      currentLocation: "Corridor of Fading Echoes",
  },
  {
      imageUrl: 'randommap/119.png',
      lat: -75.07521560182755,
      lng: -67.84899807829652,
      currentLocation: "Corridor of Fading Echoes",
  },
  {
      imageUrl: 'randommap/120.png',
      lat: -73.22793528741663,
      lng: -55.003600601648266,
      currentLocation: "Corridor of Fading Echoes",
  },
  {
      imageUrl: 'randommap/121.png',
      lat: -70.27223576884194,
      lng: -13.181029328296512,
      currentLocation: "Corridor of Fading Echoes",
  },
  {
      imageUrl: 'randommap/122.png',
      lat: -31.327444883024157,
      lng: -7.857967615127557,
      currentLocation: "Corridor of Fading Echoes",
  },
  {
      imageUrl: 'randommap/123.png',
      lat: -40.032571300477635,
      lng: -22.89217781115661,
      currentLocation: "Corridor of Fading Echoes",
  },
  {
      imageUrl: 'randommap/124.png',
      lat: -5.418795849824008,
      lng: -8.19071309023262,
      currentLocation: "Corridor of Fading Echoes",
  },
  {
      imageUrl: 'randommap/125.png',
      lat: 18.70305165083484,
      lng: -13.775936365127551,
      currentLocation: "Corridor of Fading Echoes",
  },
  {
    imageUrl: 'randommap/126.png',
    lat: 51.40091472545985,
    lng: 29.7528147697449,
    currentLocation: "Corridor of Fading Echoes",
},
{
    imageUrl: 'randommap/127.png',
    lat: 22.676111191304823,
    lng: 27.005313634872454,
    currentLocation: "Corridor of Fading Echoes",
},
{
    imageUrl: 'randommap/128.png',
    lat: 27.748972863353487,
    lng: 9.04953181743622,
    currentLocation: "Corridor of Fading Echoes",
},
{
    imageUrl: 'randommap/129.png',
    lat: 64.06639300859513,
    lng: 55.83343863487246,
    currentLocation: "Corridor of Fading Echoes",
},
{
    imageUrl: 'randommap/130.png',
    lat: 77.31282076932264,
    lng: 57.415469884872465,
    currentLocation: "Corridor of Fading Echoes",
},
{
    imageUrl: 'randommap/131.png',
    lat: 74.26805536460787,
    lng: 30.901798009872426,
    currentLocation: "Corridor of Fading Echoes",
},
{
    imageUrl: 'randommap/132.png',
    lat: -33.136404239662504,
    lng: -32.906795740127556,
    currentLocation: "Everwinter Hill",
},
{
    imageUrl: 'randommap/133.png',
    lat: 12.441490244247813,
    lng: -40.52398324012757,
    currentLocation: "Everwinter Hill",
},
{
    imageUrl: 'randommap/134.png',
    lat: 42.207834739894246,
    lng: -13.68804574012757,
    currentLocation: "Everwinter Hill",
},
{
    imageUrl: 'randommap/135.png',
    lat: 25.00721397274995,
    lng: 58.49945425987247,
    currentLocation: "Everwinter Hill",
},
{
    imageUrl: 'randommap/136.png',
    lat: 31.32978490166211,
    lng: 42.82562613487246,
    currentLocation: "Everwinter Hill",
},
{
    imageUrl: 'randommap/137.png',
    lat: 5.908836605293363,
    lng: 44.58343863487246,
    currentLocation: "Everwinter Hill",
},
{
    imageUrl: 'randommap/138.png',
    lat: -9.447710693857495,
    lng: 29.993594884872454,
    currentLocation: "Everwinter Hill",
},
{
    imageUrl: 'randommap/139.png',
    lat: -14.858526490509993,
    lng: -15.592342615127558,
    currentLocation: "Everwinter Hill",
},
{
    imageUrl: 'randommap/140.png',
    lat: 0.762381109618355,
    lng: -12.923124432563784,
    currentLocation: "Everwinter Hill",
},
{
    imageUrl: 'randommap/141.png',
    lat: 40.61032053298558,
    lng: -89.24438856121033,
    currentLocation: "Pillars of Creation",
},
{
    imageUrl: 'randommap/142.png',
    lat: 26.387583953099238,
    lng: -65.51391981121033,
    currentLocation: "Pillars of Creation",
},
{
    imageUrl: 'randommap/143.png',
    lat: -1.8147330408773048,
    lng: 22.93304800987244,
    currentLocation: "Pillars of Creation",
},
{
    imageUrl: 'randommap/144.png',
    lat: -49.95033857194149,
    lng: 40.950626134872444,
    currentLocation: "Pillars of Creation",
},
{
    imageUrl: 'randommap/145.png',
    lat: -49.81334029465826,
    lng: 22.214818023998827,
    currentLocation: "Pillars of Creation",
},
{
    imageUrl: 'randommap/146.png',
    lat: -59.14694206940307,
    lng: 58.3587005445012,
    currentLocation: "Pillars of Creation",
},
{
  imageUrl: 'randommap/147.png',
  lat: -63.78188091195873,
  lng: 38.050235509872444,
  currentLocation: "Pillars of Creation",
},
{
  imageUrl: 'randommap/148.png',
  lat: -69.94992814049907,
  lng: 3.0697667598724365,
  currentLocation: "Old Weapon Testing Ground - F2",
},
{
  imageUrl: 'randommap/149.png',
  lat: -57.13549604520973,
  lng: 0.9603917598724366,
  currentLocation: "Old Weapon Testing Ground - F2",
},
{
  imageUrl: 'randommap/150.png',
  lat: -36.80304381119128,
  lng: 13.99989179566526,
  currentLocation: "Old Weapon Testing Ground - F2",
},
{
  imageUrl: 'randommap/151.png',
  lat: -48.97510096401923,
  lng: -6.80088945433473,
  currentLocation: "Old Weapon Testing Ground - F2",
},
{
  imageUrl: 'randommap/152.png',
  lat: -39.158097311606404,
  lng: 13.64832929566526,
  currentLocation: "Old Weapon Testing Ground - F2",
},
{
  imageUrl: 'randommap/153.png',
  lat: -35.071582737134875,
  lng: -8.03135820433473,
  currentLocation: "Old Weapon Testing Ground - F2",
},
{
  imageUrl: 'randommap/154.png',
  lat: -23.744695289283534,
  lng: 0.02528242066525799,
  currentLocation: "Old Weapon Testing Ground - F1",
},
{
  imageUrl: 'randommap/155.png',
  lat: -3.3718008780584783,
  lng: 0.6372326611486835,
  currentLocation: "Old Weapon Testing Ground - F1",
},
{
  imageUrl: 'randommap/156.png',
  lat: 28.17653912977964,
  lng: 1.0189855098724634,
  currentLocation: "Old Weapon Testing Ground - F1",
},
{
  imageUrl: 'randommap/157.png',
  lat: 43.22314284742881,
  lng: -21.05025025835104,
  currentLocation: "Old Weapon Testing Ground - F1",
},
{
  imageUrl: 'randommap/158.png',
  lat: 38.34663050328888,
  lng: 18.35404661664896,
  currentLocation: "Old Weapon Testing Ground - F1",
}
// ... Add more images and their assigned coordinates here
];

var currentImage = null;

var customIcon = L.icon({
    iconUrl: 'static/media/icons/z-marker2.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

var correctMarker = null;
playButton.addEventListener('click', function() {
    if (currentImage) {
        correctMarker = L.marker([currentImage.lat, currentImage.lng], { icon: customIcon }).addTo(resultMap);
        correctMarker.bindTooltip("Correct location: " + currentMapLocation, {className: 'guess-tooltip', maxWidth: 200});
    }
});

guessButton.addEventListener('click', function() {
    if (currentImage) {
        correctMarker = L.marker([currentImage.lat, currentImage.lng], { icon: customIcon }).addTo(resultMap);
        correctMarker.bindTooltip("Correct location: " + currentMapLocation, {className: 'guess-tooltip', maxWidth: 200});
    }
});
nextRoundButton.addEventListener('click', function() {
    if (currentImage) {
        resultMap.removeLayer(correctMarker);
    }
});

var uniqueRandomNumbers;

playButton.addEventListener('click', function () {
// seed system (v1.0.24)
    var inputElement = document.getElementById('Input');
    // Get the value of the input
    var seedValue = inputElement.value.trim();
    // Check if the input is blank
    if (seedValue === '') {
        // Generate a random seed with a maximum of 16 digits
        var randomSeed = Math.floor(Math.random() * (Math.pow(10, 16)));
        seed = randomSeed;
        // Use the random seed value
        console.log('Random Seed:', randomSeed);
    } else {
        // Convert the provided seed value to a number if it's a string
        var parsedSeed = parseInt(seedValue, 10); // Ensure to specify the radix (base) as 10 for decimal numbers
    if (!isNaN(parsedSeed)) {
        seed = parsedSeed;
        // Use the parsed seed value
        console.log('Provided Seed:', parsedSeed);
    } else {
        // Convert the string into a seed
        var stringSeed = 0; // You can use any specific value for string seeds
        for (var i = 0; i < seedValue.length; i++) {
            stringSeed += seedValue.charCodeAt(i); // Sum the character codes to create a seed from the string
        }
        seed = stringSeed;
        console.log('String Seed:', stringSeed);
        }
    }

    function generateUniqueRandomNumbers(seed, roundElement) {
      var uniqueNumbers = new Set(); // Use a Set to store unique numbers
      var seedRandom = function(seed) {
        var x = Math.sin(seed) * 10000;
        return Math.abs(x - Math.floor(x));
      };
    
      while (uniqueNumbers.size < roundElement) {
        var randomNumber = Math.floor(seedRandom(seed) * 150); // Adjust the range as needed
        uniqueNumbers.add(randomNumber);
        seed++; // Increase the seed for the next number
      }
    
      return Array.from(uniqueNumbers); // Convert the Set to an Array and return
    }
    var roundElement = parseInt(document.getElementById('Round').innerText);
    uniqueRandomNumbers = generateUniqueRandomNumbers(seed, roundElement);
    
    // Log the unique random numbers to the console
    console.log("Unique Random Numbers:", uniqueRandomNumbers);

    // Choose a random image
    randomIndex = uniqueRandomNumbers[currentRound - 1];
    currentImage = images[randomIndex];
    currentMapLocation = images[randomIndex].currentLocation;
    // console.log('Current map location:', currentMapLocation);

    // Display the image
    var imageElement = document.createElement('img');
    imageElement.src = currentImage.imageUrl;
    imageElement.classList.add('random-image');
    document.body.appendChild(imageElement);

});

function getRandomImageIndex(mapId) {
  if (mapId === 0) {
    // Randomize among all images
    return Math.floor(Math.random() * images.length);
  } else if (mapId === 1) {
    return Math.floor(Math.random() * 50);
  } else if (mapId === 2) {
      return Math.floor(Math.random() * 108) + 51;
  } else if (mapId === 3) {
      return Math.floor(Math.random() * 108) + 1;
  } else {
    // Handle other mapId values or fallback to randomize among all images
    return Math.floor(Math.random() * images.length);
  }
}

function playNextRound() {
  guessOverlay.style.display = 'none';
  guessResult.textContent = '';
  startCountdown();
  startSCountdown();
// Choose a random image
randomIndex = uniqueRandomNumbers[currentRound - 1];
currentImage = images[randomIndex];
currentMapLocation = images[randomIndex].currentLocation;
// console.log('Current map location:', currentMapLocation);
// Reset marker class
guessButton.classList.remove('has-marker');

// Remove existing image
var existingImage = document.querySelector('.random-image');
if (existingImage) {
  existingImage.remove();
}


// Display the new image
var imageElement = document.createElement('img');
imageElement.src = currentImage.imageUrl;
imageElement.classList.add('random-image');
document.body.appendChild(imageElement);

// Hide the next round button
nextRoundButton.style.display = 'none';
if (starrailMarker) {
starrailMap.removeLayer(starrailMarker);
}
var resultMap = document.querySelector('#resultmap');
  resultMap.style.opacity = '0';
  resultMap.style.pointerEvents = 'none';
}


var guessButton = document.getElementById('guessButton');
var guessOverlay = document.getElementById('guessOverlay');
var score = null;

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 50; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
}

// Function to convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

guessButton.addEventListener('click', function() {
    if (guessButton.classList.contains('has-marker')) {
      if (currentMap === currentMapLocation) {
        var resultMap = document.querySelector('#resultmap');
        resultMap.style.opacity = '1';
        resultMap.style.pointerEvents = 'auto';

    if (starrailMarker) {
        var playerMarker = starrailMarker.getLatLng();
        var distance = calculateDistance(
        playerMarker.lat,
        playerMarker.lng,
        currentImage.lat,
        currentImage.lng
        );

        var score;
        if (distance > 75) {
            score = Math.max(0, 5000 - distance * 50);
        } else if (distance > 50) {
            score = Math.max(0, 5000 - distance * 40);
        } else if (distance > 40) {
        score = Math.max(0, 5000 - distance * 30);
        } else if (distance > 30) {
        score = Math.max(0, 5000 - distance * 25);
        } else if (distance > 20) {
        score = Math.max(0, 5000 - distance * 20);
        } else if (distance > 10) {
        score = Math.max(0, 5000 - distance * 15);
        } else if (distance > 5) {
        score = Math.max(0, 5000 - distance * 10);
        } else if (distance < 2) {
            score = 5000
        } else {
        score = Math.max(0, 5000 - distance);
        }
        score = Math.ceil(score); // Round up the score to the nearest whole number
        updateScore();


        function updateScore() {
            // Calculate the score based on distance or any other relevant logic
            score = Math.ceil(score); // Round up the score to the nearest whole number
            currentScore += score;
          }

        var displayElement = document.getElementById("countdown-text");
        displayElement.style.display = "none";
        var displaySElement = document.getElementById("countdown-s-text");
        displaySElement.style.display = "none";

        
        // Create the text string
        var resultText = `Your guess was <span style='color: rgb(255, 228, 107)'>${distance.toFixed(2)}m</span> away from the correct location. <br><span style='color: rgb(255, 228, 107); font-size: 80px; display: block; text-align: center'>${score}</span></br>`;

        var guessResult = document.getElementById('guessResult');
        guessResult.insertAdjacentHTML('beforeend', resultText);

        console.log('Image Latitude:', currentImage.lat);
        console.log('Image Longitude:', currentImage.lng);
        console.log('Distance:', distance);
        console.log('Score:', score);
    } else {
        console.log('Marker not set');
    }
    guessOverlay.style.display = 'block';
    nextRoundButton.style.display = 'block';
    stopCountdown();
    stopSCountdown();
      } else {
        var resultMap = document.querySelector('#resultmap');
        resultMap.style.opacity = '1';
        resultMap.style.pointerEvents = 'auto';

    if (starrailMarker) {
        var playerMarker = starrailMarker.getLatLng();
        var distance = calculateDistance(
        playerMarker.lat,
        playerMarker.lng,
        currentImage.lat,
        currentImage.lng
        );

        score = 0;
        updateScore();


        function updateScore() {
            // Calculate the score based on distance or any other relevant logic
            score = Math.ceil(score); // Round up the score to the nearest whole number
            currentScore += score;
          }

        var displayElement = document.getElementById("countdown-text");
        displayElement.style.display = "none";
        var displaySElement = document.getElementById("countdown-s-text");
        displaySElement.style.display = "none";

        
        // Create the text string
        var resultText = `Your guess was incorrect! The correct location is <span style='color: rgb(255, 228, 107)'>${currentMapLocation}</span>. <br><span style='color: rgb(255, 228, 107); font-size: 80px; display: block; text-align: center'>${score}</span></br>`;

        var guessResult = document.getElementById('guessResult');
        guessResult.insertAdjacentHTML('beforeend', resultText);

        console.log('Image Latitude:', currentImage.lat);
        console.log('Image Longitude:', currentImage.lng);
        console.log('Distance:', distance);
        console.log('Score:', score);
    } else {
        console.log('Marker not set');
    }
    guessOverlay.style.display = 'block';
    nextRoundButton.style.display = 'block';
    stopCountdown();
    stopSCountdown();
      }
    }
});

currentRound = 1;
round = parseInt(slider3.value);
currentScore = 0;
finalScore = 0;

document.querySelector(".play").addEventListener("click", function() {
  currentRound = 1;
  currentScore = 0;
  finalScore = 0;
  updateRoundInfo();
  console.log("Round: " + currentRound + "/" + round);
  console.log("Current Score: " + currentScore);
  console.log("Final Score: " + finalScore);
});

var nextRoundButton = document.querySelector(".next-round");

function updateNextRoundButton() {
  if (currentRound == round) {
    nextRoundButton.classList.add('view-result');
    nextRoundButton.innerText = 'View Result';
  } else {
    nextRoundButton.classList.remove('view-result');
    nextRoundButton.innerText = 'Next Round';
  }
}

document.querySelectorAll(".has-marker").forEach(function(button) {
  button.addEventListener("click", function() {
    if (currentRound == round) {
      finalScore = currentScore;
      updateRoundInfo();  
  }
    updateNextRoundButton();
  });
});

document.querySelector(".next-round").addEventListener("click", function() {
  if (nextRoundButton.classList.contains('view-result')) {
    updateRoundInfo(); 
    // Handle logic for the "View Result" button
    nextRoundButton.style.display = 'none';
    var displayTimeUp = document.getElementById("countdown-timeup");
    displayTimeUp.style.display = 'none';
    guessResult.textContent = '';
    guessResult.style.display = 'none';
    var finalTextElement = document.getElementById("finaltext");
    finalTextElement.style.display = "block"
    var resultMap = document.querySelector('#resultmap');
                resultMap.style.opacity = '0';
                resultMap.style.pointerEvents = 'none';
    finalScore = currentScore;
    displayFinalScore();

     var backMenu = document.getElementById('menu-btn');
     backMenu.style.display = 'block';
     backMenu.addEventListener('click', function() {
      location.reload();
     })

  } else {
    // Handle logic for the "Next Round" button
    if (currentRound < round) {
      currentRound++;
      updateRoundInfo();
      console.log("Round: " + currentRound + "/" + round);
      console.log("Current Score: " + currentScore);
      console.log("Final Score: " + finalScore);
    }
    playNextRound();
  }
  updateNextRoundButton();
});


updateNextRoundButton();

function updateRoundInfo() {
  var roundInfoElement = document.getElementById("round-info");
  roundInfoElement.textContent = "Round: " + currentRound + "/" + round;
  var roundScoreElement = document.getElementById("score-info");
  roundScoreElement.textContent = "Score: " + currentScore
}

function displayFinalScore() {
  var finalScoreElement = document.getElementById("final-score");
  finalScoreElement.textContent = finalScore;
  console.log("Final Score: " + finalScore);
  finalScoreElement.style.display = "block";
  stopCountdown();
  stopSCountdown();
  
}

slider3.oninput = function() {
  round = parseInt(this.value);
  output3.innerHTML = round;
  updateRoundInfo();
};

// Call updateRoundInfo initially to display the initial round value
updateRoundInfo();


