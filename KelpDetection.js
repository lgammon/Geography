
var AOI = 
    /* color: #b00b1e */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-120.70759843361449, 34.2487081752943],
          [-120.70759843361449, 33.85502594046338],
          [-119.08162187111446, 33.85502594046338],
          [-119.08162187111446, 34.2487081752943]]], null, false),
    imageCollection = ee.ImageCollection("COPERNICUS/S2_HARMONIZED"),
    cloudscore = ee.ImageCollection("GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED"),
    water = /* color: #d63000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-119.65111425288244, 33.897453904712904]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.4018810070699, 34.015155159173226]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.19109444427919, 34.13230847840077]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.53167061615419, 34.139696923103024]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.565316246037, 34.177765585117875]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.52377419281434, 34.19537363502556]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.51450447845887, 34.18088986218058]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.38846538875049, 34.05429238240215]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.38125561091846, 34.066522652802014]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.37679241511768, 34.06282531532721]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.4111246905083, 34.02356671210047]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.29405163142627, 34.03366758168126]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.26653366332712, 33.97163987892569]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.16576224723192, 34.01581696853871]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.99272757926317, 34.018662665371735]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.12671531116398, 33.995717888037994]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.2873903599921, 33.94788460898501]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.87241233264835, 33.90800299539924]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.33521140491398, 33.938770458017096]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.6661745396796, 33.96041497310412]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.6332155553046, 34.18564565541257]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.50961936389835, 34.193597390274114]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.37366355335148, 34.207227191420216]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.17453635608585, 34.194733291196144]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.25693381702335, 34.157240483287666]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.14020408069523, 34.129962525692655]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.0399538365546, 34.12427850942414]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.94382346546085, 34.21858367566032]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.87653220569523, 34.170876158996755]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.62933982288273, 34.11518328853333]),
            {
              "landcover": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.78314841663273, 34.11518328853333]),
            {
              "landcover": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.73370994007023, 34.21290562485065]),
            {
              "landcover": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.35056174671085, 34.14132941165609]),
            {
              "landcover": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.6554323521796, 33.98091522466469]),
            {
              "landcover": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.6554323521796, 33.98091522466469]),
            {
              "landcover": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.28302634632023, 33.89432500122404]),
            {
              "landcover": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.6387087193671, 34.07651768840224]),
            {
              "landcover": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.46042502796085, 33.91939964754556]),
            {
              "landcover": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.11984885608585, 33.88292499670204]),
            {
              "landcover": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.43958152210148, 33.88634515802808]),
            {
              "landcover": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.67441428577335, 33.8897651822404]),
            {
              "landcover": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.75705588733585, 33.87038323219766]),
            {
              "landcover": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.6883913365546, 34.15383122025069]),
            {
              "landcover": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.62957021537177, 33.90889999293286]),
            {
              "landcover": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.63238677317105, 33.913316330025786]),
            {
              "landcover": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.63633498484097, 33.92456983175365]),
            {
              "landcover": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.63049849802456, 33.92741858374981]),
            {
              "landcover": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.61161574655972, 33.91203419121882]),
            {
              "landcover": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.60337600046597, 33.895792096907385]),
            {
              "landcover": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.60680922800503, 33.88724238341163]),
            {
              "landcover": 1,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.11868224354602, 34.035815540095115]),
            {
              "landcover": 1,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.1887200853429, 34.04918633383065]),
            {
              "landcover": 1,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.33119902821399, 34.06824318217415]),
            {
              "landcover": 1,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.148036339005, 34.07933400134726]),
            {
              "landcover": 1,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.20640120716907, 34.05757756366951]),
            {
              "landcover": 1,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.20296797963, 34.05060863463435]),
            {
              "landcover": 1,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.18030867787219, 34.04826182551361]),
            {
              "landcover": 1,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.26053527993598, 34.045557531704176]),
            {
              "landcover": 1,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.52778264341872, 34.016418229668595]),
            {
              "landcover": 1,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.60056706724684, 34.06506616628739]),
            {
              "landcover": 1,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.61936398802321, 34.02452815670525]),
            {
              "landcover": 1,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.6571294909529, 34.03562469581943]),
            {
              "landcover": 1,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.61661740599196, 34.033490858696844]),
            {
              "landcover": 1,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.61344167051833, 34.025061677369685]),
            {
              "landcover": 1,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.62442799864333, 34.02868952893614]),
            {
              "landcover": 1,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.61348458586257, 34.03256617927557]),
            {
              "landcover": 1,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.61035176573317, 34.02897405975457]),
            {
              "landcover": 1,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.60726186094801, 34.03249504967185]),
            {
              "landcover": 1,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.6276466494612, 34.02289200575335]),
            {
              "landcover": 1,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.63052197752516, 34.027586963003024]),
            {
              "landcover": 1,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.64232369719069, 34.02029544058315]),
            {
              "landcover": 1,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.65279504118483, 34.027586963003024]),
            {
              "landcover": 1,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.64034959135573, 34.02996991010547]),
            {
              "landcover": 1,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.66774860963443, 34.02472579449874]),
            {
              "landcover": 1,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.68582901382213, 34.03038899235375]),
            {
              "landcover": 1,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.68085083389049, 34.02903748500599]),
            {
              "landcover": 1,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.8418421895146, 33.969727502255324]),
            {
              "landcover": 1,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.83900977679487, 33.969727502255324]),
            {
              "landcover": 1,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.82081367083784, 33.957198509746185]),
            {
              "landcover": 1,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.963735894321, 33.9428966434615]),
            {
              "landcover": 1,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.05866463577608, 34.04252477916112]),
            {
              "landcover": 1,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.10055001175265, 34.033278516134416]),
            {
              "landcover": 1,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.1585715571628, 34.03072027749227]),
            {
              "landcover": 1,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.20869667923311, 34.01193958352841]),
            {
              "landcover": 1,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.26105339920382, 34.008382165885656]),
            {
              "landcover": 1,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.29830391800265, 34.00212074886156]),
            {
              "landcover": 1,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.28216774856905, 33.99329705956439]),
            {
              "landcover": 1,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.23393090164522, 34.03171610734824]),
            {
              "landcover": 1,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.337271050571, 33.99443565161701]),
            {
              "landcover": 1,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.2315965925856, 33.95511740626309]),
            {
              "landcover": 1,
              "system:index": "89"
            })]),
    kelp = /* color: #98ff00 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-120.21565656319031, 33.9735414929155]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.21647195473084, 33.971406095443264]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.21085004463562, 33.96944860065246]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.22089223518738, 33.974822705658276]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.22444437308883, 33.97877299008059]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.22208402915572, 33.97806124067788]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.22178362174606, 33.98069468370287]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.2267618016777, 33.98236723353293]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.21936745385787, 33.978665664037415]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.22583763427566, 33.98608155643774]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.22871296233963, 33.98625947755854]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.22819797820877, 33.98882150039809]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.22965709991287, 33.98914174782223]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.23051540679764, 33.98896383273559]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.24129867440315, 33.99452415592814]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.23795127755257, 33.99157090433141]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.24828461975478, 34.00344293920886]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.24764088959121, 33.99928032929914]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.24189023346328, 34.00783728603682]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.2392294821205, 34.00808631172088]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.23124722809219, 34.01022078762796]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.22300748199844, 34.01029193590082]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.22146252960586, 34.01199947656476]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.19237298812965, 34.00576388243303]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.20593423690894, 34.005941762339084]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.2127148612986, 34.007471514151135]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.21554727401832, 34.008503191674606]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.21936673965553, 34.009997323108]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.21125573959449, 34.00700903395128]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.19434709396461, 34.004945630066416]),
            {
              "landcover": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.4003248023365, 34.05154784810926]),
            {
              "landcover": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.41861199734669, 34.05490850023131]),
            {
              "landcover": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.41869782803516, 34.0544462785317]),
            {
              "landcover": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.42474889157276, 34.05249069729968]),
            {
              "landcover": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.42668008206348, 34.05330849130287]),
            {
              "landcover": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.43380402920704, 34.045165755794585]),
            {
              "landcover": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.44315957425098, 34.04286621716573]),
            {
              "landcover": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.43822430966358, 34.04176383547367]),
            {
              "landcover": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.44367455838184, 34.04041250933573]),
            {
              "landcover": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.44444703457813, 34.04076812356476]),
            {
              "landcover": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.4423870980547, 34.04002133196167]),
            {
              "landcover": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.4432883202837, 34.038314355034906]),
            {
              "landcover": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.45084296646161, 34.036339979737804]),
            {
              "landcover": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.45230208816571, 34.035273076881644]),
            {
              "landcover": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.4513703382546, 34.032642057514]),
            {
              "landcover": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.188207582331, 33.93294034542048]),
            {
              "landcover": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.18923755059272, 33.936500920573664]),
            {
              "landcover": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.1922416246894, 33.941414269786115]),
            {
              "landcover": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.19644732842475, 33.94755246989555]),
            {
              "landcover": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.19129748711616, 33.93964881745663]),
            {
              "landcover": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.20108218560249, 33.95267877097376]),
            {
              "landcover": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.13373904868065, 33.90043873770429]),
            {
              "landcover": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.14240794821679, 33.90435685643536]),
            {
              "landcover": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.12240939780175, 33.8940981277926]),
            {
              "landcover": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.12395435019432, 33.89466808954095]),
            {
              "landcover": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.07329319025253, 33.90646756724363]),
            {
              "landcover": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.3323572808773, 34.01849010248928]),
            {
              "landcover": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.32669245543785, 34.017920969597306]),
            {
              "landcover": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.34913718047447, 34.01913037243162]),
            {
              "landcover": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.35076796355553, 34.018418961086454]),
            {
              "landcover": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.31085669341392, 34.01760083066867]),
            {
              "landcover": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.35385016833446, 34.016262645775114]),
            {
              "landcover": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.06784419058884, 33.910908911217625]),
            {
              "landcover": 2,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.06522635459031, 33.910908911217625]),
            {
              "landcover": 2,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.17043809345552, 33.91599448497252]),
            {
              "landcover": 2,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.1673911040146, 33.914427473057586]),
            {
              "landcover": 2,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.155537856991, 33.91028897449365]),
            {
              "landcover": 2,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.15442205804081, 33.90900679014374]),
            {
              "landcover": 2,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.15176130669803, 33.90875747428032]),
            {
              "landcover": 2,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.15038801568241, 33.90783143754583]),
            {
              "landcover": 2,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.14418011720966, 33.90560761377091]),
            {
              "landcover": 2,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.1056724343035, 33.90194475395077]),
            {
              "landcover": 2,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.15942221610462, 34.01702193604424]),
            {
              "landcover": 2,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.16002303092395, 34.01723536358625]),
            {
              "landcover": 2,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.16251212088977, 34.01542121237536]),
            {
              "landcover": 2,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.17010813681995, 34.01172164663537]),
            {
              "landcover": 2,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.16174761894857, 34.019980912146515]),
            {
              "landcover": 2,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.13615615698032, 34.02725456510948]),
            {
              "landcover": 2,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.04489122694557, 34.038083406623585]),
            {
              "landcover": 2,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.04534183806007, 34.03733659138256]),
            {
              "landcover": 2,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.0429171211106, 34.03701652569503]),
            {
              "landcover": 2,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.04703699415748, 34.03819009397843]),
            {
              "landcover": 2,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.04712282484596, 34.03918583615259]),
            {
              "landcover": 2,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.0473241136767, 34.019064120944314]),
            {
              "landcover": 2,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.04749577505365, 34.018148177019036]),
            {
              "landcover": 2,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.04680912954584, 34.018752878971526]),
            {
              "landcover": 2,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.97700432348122, 33.96209634075174]),
            {
              "landcover": 2,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.97666100072732, 33.961028505027905]),
            {
              "landcover": 2,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.96998205782364, 33.95252518828009]),
            {
              "landcover": 2,
              "system:index": "88"
            })]),
    image = ee.Image("CGIAR/SRTM90_V4"),
    geometry = /* color: #98ff00 */ee.FeatureCollection([]);


// Function to process Sentinel-2 images and compute histograms
function processSentinel2(year, region, visualize) {
    // Define the date range for each year
    var startDate = ee.Date(year + "-07-01");
    var endDate = ee.Date(year + "-07-31");

    // Cloud Score+ collection
    var csPlus = ee.ImageCollection('GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED');
    var QA_BAND = 'cs'; // Use 'cs' or 'cs_cdf'
    var CLEAR_THRESHOLD = 0.20; // Cloud masking threshold

    // Function to mask clouds using Cloud Score+
    function maskClouds(image) {
        var cloudMask = csPlus
            .filterBounds(image.geometry())
            .filterDate(image.date(), image.date().advance(1, 'day'))
            .median()
            .select(QA_BAND)
            .gte(CLEAR_THRESHOLD);
        
        return image.updateMask(cloudMask);
    }
    
    // Function to mask out values over 0.028 in Band 11 (B11)
    function maskB11(image) {
        var mask = image.select('B11').lte(1000); // Keep pixels where B11 <= 1000
        return image.updateMask(mask);
    }

    // Load Sentinel-2 image collection for the given year
    var imageCollection = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
        .filterDate(startDate, endDate) // Filter by date
        .filterBounds(region) // Filter by region
        .linkCollection(csPlus, [QA_BAND])
        .map(maskClouds) // Apply cloud mask
        .map(maskB11);

    // Create a composite of all cloud-free images over the AOI
    var composite = imageCollection.mean();
    
    if (visualize) {
        var NDVI = composite.expression(
            "(NIR - RED) / (NIR + RED)",
            {
                RED: composite.select("B4"),
                NIR: composite.select("B8")
            }
        );
        Map.addLayer(NDVI, {min: -0.5, max: 1, palette: ['white', 'yellow','green','red']}, year + " NDVI");
    
        var FAI = composite.expression(    
            '(B8 - (B4 + (B11 - B4) * ((0.833 - 0.665) / (1.612 - 0.665))))',
            {
                B8: composite.select('B8'),
                B4: composite.select('B4'),
                B11: composite.select('B11')
            }
        ).rename('FAI');
        Map.addLayer(FAI, {min: -1536, max: 4000, palette: ['white', 'blue', 'purple', 'red']},  year + " FAI");
    
        var KD = composite.expression(
            '(r6 - b4)',
            {
                b4: composite.select('B4'),
                r6: composite.select('B6')
            }
        ).rename('KD');
        Map.addLayer(KD, {min: -2304, max: 5000, palette: ['white', 'orange', 'blue', 'red']},  year + " KD");

    }
    
    return composite;
}

// Function to create a multi-year median composite for all indices
function createMultiYearComposite(years, region) {
    var composites = years.map(function(year) {
        return processSentinel2(year, region, false);
    });

    var multiYearComposite = ee.ImageCollection(composites).median();
    
        // Visualization parameters for true color and false color
    var trueColour = {
        bands: ["B4", "B3", "B2"],
        min: 0,
        max: 3000
    };

    // Add true color and false color composites to the map
    Map.addLayer(multiYearComposite, trueColour, " true-color image");
    
    // Compute and add NDVI, FAI, and KD only for the multi-year composite
    var NDVI = multiYearComposite.expression(
        "(NIR - RED) / (NIR + RED)",
        {
            RED: multiYearComposite.select("B4"),
            NIR: multiYearComposite.select("B8")
        }
    );
    Map.addLayer(NDVI, {min: -0.5, max: 1, palette: ['white', 'yellow','green','red']}, "Multi-Year Median NDVI");
  
  
    
    var FAI = multiYearComposite.expression(
        '(B8 - (B4 + (B11 - B4) * ((0.833 - 0.665) / (1.612 - 0.665))))',
        {
            B8: multiYearComposite.select('B8'),
            B4: multiYearComposite.select('B4'),
            B11: multiYearComposite.select('B11')
        }
    ).rename('FAI');
    Map.addLayer(FAI, {min: -1536, max: 4000, palette: ['white', 'blue', 'purple', 'red']}, "Multi-Year Median FAI");

    var KD = multiYearComposite.expression(
        '(r6 - b4)',
        {
            b4: multiYearComposite.select('B4'),
            r6: multiYearComposite.select('B6')
        }
    ).rename('KD');
    Map.addLayer(KD, {min: -2304, max: 5000, palette: ['white', 'orange', 'blue', 'red']}, "Multi-Year Median KD");

    return multiYearComposite;
}
// Set the area of interest
Map.centerObject(AOI,11);

// Example: Call the function for a single year visualization
//processSentinel2(2016, AOI, true);
//processSentinel2(2017, AOI, true);
//processSentinel2(2018, AOI, true);
//processSentinel2(2019, AOI, true);
//processSentinel2(2020, AOI, true);
//processSentinel2(2021, AOI, true);
//processSentinel2(2022, AOI, true);
//processSentinel2(2024, AOI, true);

// Example: Call the function for a multi-year median composite (2019-2021)
var multiYearComposite = createMultiYearComposite([2019, 2020, 2021], AOI);

//Merge into one FeatureCollection and print details to consloe
var classNames = water.merge(kelp);
print(classNames);

//Extract training data from select bands of the image, print to console
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8','B11'];
var training = multiYearComposite.select(bands).sampleRegions({
  collection: classNames,
  properties: ['landcover'],
  scale: 30
});
print(training);

//Train classifier - e.g. cart, randomForest, svm
var classifier = ee.Classifier.libsvm().train({
  features: training,
  classProperty: 'landcover',
  inputProperties: bands
});

//Run the classification
var classified = multiYearComposite.select(bands).classify(classifier);

//Centre the map on your training data coverage
//Map.centerObject(classNames, 11);
//Add the classification to the map view, specify colours for classes
Map.addLayer(classified,
{min: 0, max: 2, palette: ['blue', 'green']},
'classification');

var valNames = water.merge(kelp);

var validation = classified.sampleRegions({
  collection: valNames,
  properties: ['landcover'],
  scale: 10,
});
print(validation);

//Compare the landcover of your validation data against the classification result
var testAccuracy = validation.errorMatrix('landcover', 'classification');
//Print the error matrix to the console
print('Validation error matrix: ', testAccuracy);
//Print the overall accuracy to the console
print('Validation overall accuracy: ', testAccuracy.accuracy());

// Export the hillshade to the shared Google Drive folder
Export.image.toDrive({
  image: classified,
  //description: 'Hillshade_BC_Alaska2',
  description: 'classified',
  scale: 10,
  region: AOI,
  folder: '',
  fileFormat: 'GeoTIFF'
});

Export.image.toDrive({
  image: multiYearComposite,
  //description: 'Hillshade_BC_Alaska2',
  description: 'Hillshade_MissingBits2',
  scale: 10,
  region: AOI,
  folder: '',
  fileFormat: 'GeoTIFF'
});
