import type { Difficulty, WordEntry } from '../types/game'

type Root = readonly [word: string, hint: string]
type Variant = readonly [suffix: string, extraHint: string, difficulty: Difficulty]
type WordGroup = { category: string; roots: readonly Root[]; variants: readonly Variant[] }

const commonVariants = (
  items: readonly [string, string][],
): Variant[] => items.map(([suffix, hint], index) => [suffix, hint, index < 3 ? 'easy' : index < 7 ? 'medium' : 'hard'])

export const WORD_GROUPS: readonly WordGroup[] = [
  {
    category: 'Ushqime',
    roots: [
      ['bukë', 'Piqet me miell dhe hahet pothuajse çdo ditë'], ['supë', 'Gatim i lëngshëm që shërbehet me lugë'],
      ['makarona', 'Brumëra me forma të ndryshme që zihen'], ['oriz', 'Kokrra të vogla që shoqërojnë shumë gatime'],
      ['pica', 'Gatim i rrumbullakët me shtresa sipër'], ['sanduiç', 'Dy feta që mbajnë mbushjen në mes'],
      ['omëletë', 'Vezë të rrahura të pjekura në tigan'], ['sallatë', 'Përzierje e freskët që zakonisht nuk piqet'],
      ['hamburger', 'Bukë e rrumbullakët me mbushje në mes'], ['patatina', 'Feta krokante që hahen si snack'],
      ['çokollatë', 'Ëmbëlsirë nga kakaoja'], ['akullore', 'Ëmbëlsirë e ngrirë që shkrihet shpejt'],
      ['biskotë', 'Ëmbëlsirë e vogël dhe krokante'], ['tortë', 'Ëmbëlsirë me shtresa për raste të veçanta'],
      ['qull', 'Gatim i butë me drithëra ose miell'], ['pite', 'Brumë i pjekur me mbushje brenda'],
    ],
    variants: commonVariants([
      ['', 'Mendo për një gjë që hahet'], ['në shtëpi', 'Përgatitet larg lokalit'], ['sipas traditës', 'Recetë e trashëguar'],
      ['me erëza', 'Ka aromë më të theksuar'], ['me perime', 'Përfshin produkte nga kopshti'], ['për mëngjes', 'Hahet në fillim të ditës'],
      ['për darkë', 'Hahet në fund të ditës'], ['në restorant', 'Porositet nga menuja'], ['për piknik', 'Merret me vete jashtë'],
      ['në festë', 'Shërbehet kur mblidhen shumë njerëz'],
    ]),
  },
  {
    category: 'Fruta dhe perime',
    roots: [
      ['mollë', 'Frut i rrumbullakët që mund të jetë i kuq ose i gjelbër'], ['banane', 'Frut i gjatë me lëvore të verdhë'],
      ['shalqi', 'Frut i madh veror me shumë ujë'], ['portokall', 'Agrume e rrumbullakët me ngjyrë të ndezur'],
      ['dardhë', 'Frut më i gjerë poshtë se sipër'], ['rrush', 'Kokrra që rriten në vile'],
      ['luleshtrydhe', 'Frut i kuq me fara në sipërfaqe'], ['qershi', 'Frut i vogël i kuq me bisht'],
      ['domate', 'Produkt i kuq që përdoret shumë në sallatë'], ['patate', 'Zhardhok që mund të skuqet ose zihet'],
      ['karotë', 'Rrënjë portokalli dhe krokante'], ['kastravec', 'Perime e gjatë me shumë ujë'],
      ['spec', 'Perime që mund të jetë e ëmbël ose djegëse'], ['qepë', 'Perime me shtresa që të përlot kur pritet'],
      ['lakër', 'Perime me shumë gjethe të mbledhura'], ['kungull', 'Perime e madhe që përdoret edhe në ëmbëlsira'],
    ],
    variants: commonVariants([
      ['', 'Kërkoje mes prodhimeve të freskëta'], ['në treg', 'Shitet në tezga'], ['në frigorifer', 'Ruhet në të ftohtë'],
      ['për sallatë', 'Pritet bashkë me përbërës të tjerë'], ['për lëng', 'Mund të shtrydhet ose bluhet'], ['nga kopshti', 'Rritet afër shtëpisë'],
      ['në shportë', 'Mund të bartet me prodhime të tjera'], ['gjatë verës', 'Lidhet me stinën e nxehtë'], ['për piknik', 'Merret si ushqim jashtë'],
      ['nga sezoni', 'Është më e mirë në kohën e vet'],
    ]),
  },
  {
    category: 'Kafshë',
    roots: [
      ['qen', 'Shoqërues besnik që leh'], ['mace', 'Kafshë shtëpie që gërhet'], ['luan', 'Grabitqar me krifë'],
      ['tigër', 'Mace e madhe me vija'], ['elefant', 'Gjitar shumë i madh me feçkë të gjatë'], ['ari', 'Gjitar i fuqishëm që fle gjatë dimrit'],
      ['ujk', 'Grabitqar që jeton dhe gjuan në tufë'], ['dhelpër', 'Kafshë e njohur për dinakëri'], ['kalë', 'Kafshë që përdoret për hipizëm dhe transport'],
      ['lopë', 'Kafshë ferme që jep qumësht'], ['dele', 'Kafshë ferme me lesh'], ['dhi', 'Kafshë që ngjitet lehtë në terren të pjerrët'],
      ['majmun', 'Gjitar shumë i shkathët që kap degët'], ['zebër', 'Kafshë afrikane me vija bardh e zi'], ['gjirafë', 'Gjitar me qafë shumë të gjatë'],
      ['lepur', 'Kafshë e shpejtë me veshë të gjatë'],
    ],
    variants: commonVariants([
      ['', 'Është një krijesë e gjallë'], ['në fotografi', 'Është kapur nga kamera'], ['në film', 'Shfaqet në ekran'],
      ['në libër', 'Gjendet mes faqeve'], ['në vizatim', 'Është paraqitur me laps ose ngjyra'], ['si lodër', 'Është version për fëmijë'],
      ['në dokumentar', 'Tregohet në habitatin e vet'], ['në ëndërr', 'Shfaqet gjatë gjumit'], ['në muze', 'Mund të shihet si model ose skelet'],
      ['në përrallë', 'Ka rol në një tregim fantastik'],
    ]),
  },
  {
    category: 'Shtëpi',
    roots: [
      ['tavolinë', 'Sipërfaqe me këmbë ku hahet ose punohet'], ['karrige', 'Mobilie ku ulet një person'],
      ['frigorifer', 'Pajisje që mban ushqimin të ftohtë'], ['jastëk', 'Mbështet kokën gjatë gjumit'],
      ['llambë', 'Burim drite për një hapësirë'], ['pasqyrë', 'Sipërfaqe ku shikon reflektimin'],
      ['divan', 'Ulëse e gjatë për disa persona'], ['dollap', 'Mobilie me dyer për ruajtje'],
      ['krevat', 'Mobilie kryesore për të fjetur'], ['perde', 'Copë që mbulon dritaren'],
      ['tapet', 'Shtresë tekstili që vendoset në dysheme'], ['fshesë', 'Mjet për mbledhjen e pluhurit'],
      ['tenxhere', 'Enë e thellë për gatim'], ['tigan', 'Enë e cekët për skuqje'],
      ['lugë', 'Mjet ngrënieje me pjesë të thelluar'], ['pirun', 'Mjet ngrënieje me dhëmbëza'],
    ],
    variants: commonVariants([
      ['', 'Gjendet shpesh brenda një banese'], ['në kuzhinë', 'Ndodhet aty ku gatuhet'], ['në dhomë', 'Ndodhet në një hapësirë private'],
      ['në sallon', 'Ndodhet aty ku priten mysafirët'], ['në shtëpi të re', 'Është pjesë e arredimit të freskët'], ['për mysafirë', 'Përdoret kur vijnë vizitorë'],
      ['pranë dritares', 'Vendoset afër dritës natyrore'], ['në dyqan', 'Pret të blihet'], ['gjatë pastrimit', 'Lëvizet ose përdoret për rregull'],
      ['në apartament', 'Gjendet në një banesë në ndërtesë'],
    ]),
  },
  {
    category: 'Teknologji',
    roots: [
      ['telefon', 'Pajisje që mbahet në xhep për komunikim'], ['laptop', 'Kompjuter që paloset dhe bartet'],
      ['televizor', 'Ekran i madh për programe dhe filma'], ['tablet', 'Ekran me prekje më i madh se celulari'],
      ['kamerë', 'Pajisje që regjistron pamje'], ['kufje', 'Vendosen në veshë për të dëgjuar'],
      ['mikrofon', 'Kap zërin dhe e dërgon te pajisjet'], ['printer', 'Nxjerr dokumente nga ekrani në letër'],
      ['ruter', 'Shpërndan lidhjen në një hapësirë'], ['tastierë', 'Ka taste për të shkruar'],
      ['mi kompjuteri', 'Lëviz shigjetën në ekran'], ['monitor', 'Shfaq pamjen e kompjuterit'],
      ['dron', 'Pajisje fluturuese pa pilot brenda'], ['robot', 'Makinë që kryen detyra automatikisht'],
      ['orë inteligjente', 'Pajisje në kyç që lidhet me celularin'], ['konsolë lojërash', 'Pajisje e dedikuar për argëtim interaktiv'],
    ],
    variants: commonVariants([
      ['', 'Punon me energji ose kod'], ['për punë', 'Përdoret për detyra profesionale'], ['për lojëra', 'Shërben për argëtim interaktiv'],
      ['në zyrë', 'Është pjesë e ambientit profesional'], ['në udhëtim', 'Merret me vete larg shtëpisë'], ['pa internet', 'Funksionon edhe jashtë rrjetit'],
      ['me bateri', 'Merr energji nga një burim portativ'], ['në laborator', 'Përdoret për testim ose kërkim'], ['për krijimtari', 'Ndihmon të prodhosh diçka të re'],
      ['në të ardhmen', 'Lidhet me një version më modern'],
    ]),
  },
  {
    category: 'Profesione',
    roots: [
      ['dentist', 'Kujdeset për dhëmbët'], ['mësues', 'Ndihmon nxënësit të mësojnë'], ['polic', 'Mbron rendin publik'],
      ['arkitekt', 'Projekton ndërtesa dhe hapësira'], ['mjek', 'Diagnostikon dhe trajton sëmundje'], ['infermier', 'Kujdeset për pacientët nga afër'],
      ['kuzhinier', 'Përgatit ushqim profesionalisht'], ['pilot', 'Drejton mjet në ajër'], ['zjarrfikës', 'Ndërhyn kur ka flakë dhe rrezik'],
      ['avokat', 'Mbron çështje përpara ligjit'], ['gazetar', 'Mbledh dhe raporton lajme'], ['fotograf', 'Krijon pamje me aparat'],
      ['programues', 'Shkruan udhëzime për kompjuterë'], ['mekanik', 'Rregullon makina dhe pajisje'], ['fermer', 'Punon tokën dhe rrit prodhime'],
      ['aktor', 'Luan role para publikut ose kamerës'],
    ],
    variants: commonVariants([
      ['', 'Është një punë që bëhet me aftësi'], ['në qytet', 'Punon në zonë urbane'], ['në turn nate', 'Punon kur të tjerët flenë'],
      ['me përvojë', 'E njeh mirë zanatin'], ['në ditën e parë', 'Sapo ka nisur vendin e punës'], ['gjatë emergjencës', 'Duhet të reagojë shpejt'],
      ['në televizion', 'Shfaqet ose përmendet në ekran'], ['në shkollë', 'Ka lidhje me institucionin arsimor'], ['jashtë vendit', 'E ushtron zanatin larg shtëpisë'],
      ['në të ardhmen', 'Puna e tij mund të ndryshojë me kohën'],
    ]),
  },
  {
    category: 'Sport',
    roots: [
      ['futboll', 'Lojë me top dhe dy porta'], ['basketboll', 'Lojë ku topi hidhet në kosh'], ['volejboll', 'Lojë me rrjetë dhe top pa kapje'],
      ['tenis', 'Sport me raketë dhe një rrjetë'], ['not', 'Lëvizje sportive në ujë'], ['vrapim', 'Lëvizje e shpejtë me këmbë'],
      ['çiklizëm', 'Sport mbi mjet me dy rrota dhe pedale'], ['boks', 'Ndeshje me doreza në ring'], ['ski', 'Rrëshqitje sportive mbi borë'],
      ['shah', 'Lojë strategjike me figura bardh e zi'], ['hendboll', 'Lojë me duar dhe porta'], ['pingpong', 'Lojë e shpejtë mbi tavolinë'],
      ['gjimnastikë', 'Sport me lëvizje të kontrolluara të trupit'], ['mundje', 'Përballje trup më trup me rregulla'], ['golf', 'Sport ku topi futet në vrima larg'],
      ['karate', 'Art luftarak me goditje të kontrolluara'],
    ],
    variants: commonVariants([
      ['', 'Ka rregulla dhe kërkon stërvitje'], ['me shokë', 'Luhet në shoqëri'], ['në kampionat', 'Ka renditje dhe fitues'],
      ['për fëmijë', 'Është përshtatur për moshë të re'], ['në fundjavë', 'Praktikohet kur ka më shumë kohë'], ['në televizion', 'Ndiqet nga publiku në ekran'],
      ['në nivel profesional', 'Bëhet si karrierë'], ['në olimpiadë', 'Lidhet me garën më të madhe ndërkombëtare'], ['pa publik', 'Zhvillohet pa tifozë pranë'],
      ['në shi', 'Kushtet e motit e bëjnë më të vështirë'],
    ]),
  },
  {
    category: 'Automjete',
    roots: [
      ['makinë', 'Mjet rrugor me katër rrota'], ['autobus', 'Transporton shumë pasagjerë në rrugë'], ['aeroplan', 'Fluturon me krahë dhe motorë'],
      ['biçikletë', 'Mjet me dy rrota që lëviz me pedale'], ['motoçikletë', 'Mjet i shpejtë me dy rrota dhe motor'], ['tren', 'Lëviz mbi shina me shumë vagona'],
      ['anije', 'Mjet i madh që udhëton në ujë'], ['taksi', 'Transport me pagesë për një udhëtim'], ['kamion', 'Bart ngarkesa të rënda në rrugë'],
      ['helikopter', 'Mjet ajror me helikë sipër'], ['skuter', 'Mjet i vogël me platformë për këmbët'], ['tramvaj', 'Transport urban që lëviz mbi shina'],
      ['metro', 'Tren urban që shpesh kalon nën tokë'], ['ambulancë', 'Mjet emergjence për pacientë'], ['traktor', 'Mjet pune për tokë bujqësore'],
      ['varkë', 'Mjet i vogël për lëvizje mbi ujë'],
    ],
    variants: commonVariants([
      ['', 'Shërben për të lëvizur nga një vend në tjetrin'], ['në qytet', 'Lëviz mes rrugëve urbane'], ['për udhëtim', 'Përdoret për rrugë më të gjatë'],
      ['me qira', 'Merret përkohësisht kundrejt pagesës'], ['në shi', 'Lëviz në mot të lagësht'], ['gjatë natës', 'Udhëton kur është errët'],
      ['në trafik', 'Është mes shumë mjeteve të tjera'], ['për emergjencë', 'Duhet të arrijë shpejt'], ['në garë', 'Synon të mbërrijë i pari'],
      ['pa karburant', 'Ka mbetur pa burimin kryesor të lëvizjes'],
    ]),
  },
  {
    category: 'Veshje',
    roots: [
      ['këmishë', 'Veshje e sipërme me kopsa'], ['pantallona', 'Veshje që mbulon të dyja këmbët veçmas'], ['fustan', 'Veshje njëpjesëshe që zbret poshtë belit'],
      ['xhaketë', 'Veshje e sipërme që hapet përpara'], ['kapelë', 'Mbahet mbi kokë'], ['këpucë', 'Mbrojnë këmbët gjatë ecjes'],
      ['çorape', 'Vishen mes këmbës dhe këpucës'], ['shall', 'Mbështillet rreth qafës'], ['doreza', 'Mbulon duart dhe gishtat'],
      ['pallto', 'Veshje e trashë e jashtme'], ['fund', 'Veshje që mbulon pjesën poshtë belit'], ['bluzë', 'Veshje e zakonshme për pjesën e sipërme'],
      ['kravatë', 'Copë e gjatë që lidhet nën jakë'], ['kostum', 'Komplet elegant me pjesë që kombinohen'], ['pizhame', 'Veshje e rehatshme për gjumë'],
      ['atlete', 'Këpucë të përshtatshme për lëvizje dhe sport'],
    ],
    variants: commonVariants([
      ['', 'Është diçka që vishet'], ['për dimër', 'Përshtatet me motin e ftohtë'], ['për verë', 'Përshtatet me motin e ngrohtë'],
      ['për sport', 'Lehtëson lëvizjen'], ['për festë', 'Zgjidhet për një rast të veçantë'], ['për punë', 'Përdoret në ambient profesional'],
      ['me ngjyrë të zezë', 'Ka tonin më të errët'], ['me ngjyrë të bardhë', 'Ka ton shumë të çelët'], ['në valixhe', 'Është paketuar për udhëtim'],
      ['në vitrinë', 'Ekspozohet për shitje'],
    ]),
  },
  {
    category: 'Vende dhe udhëtime',
    roots: [
      ['hotel', 'Vend ku paguan për të fjetur gjatë udhëtimit'], ['aeroport', 'Vend ku nisen dhe ulen fluturimet'], ['stacion', 'Pikë ku ndalon transporti publik'],
      ['muze', 'Ndërtesë që ruan dhe ekspozon histori ose art'], ['restorant', 'Vend ku porosit dhe ha ushqim'], ['bibliotekë', 'Vend i qetë me shumë libra'],
      ['park', 'Hapësirë e gjelbër publike për pushim'], ['plazh', 'Breg me rërë ose gurë pranë ujit'], ['kamping', 'Qëndrim jashtë zakonisht me tendë'],
      ['kështjellë', 'Ndërtesë historike e fortifikuar'], ['treg', 'Vend me tezga dhe shitës'], ['stadium', 'Hapësirë e madhe për ndeshje'],
      ['spital', 'Institucion ku trajtohen pacientët'], ['teatër', 'Sallë ku luhen shfaqje para publikut'], ['qendër tregtare', 'Ndërtesë me shumë dyqane'],
      ['shesh', 'Hapësirë e hapur në zemër të një vendbanimi'],
    ],
    variants: commonVariants([
      ['', 'Mund ta vizitosh ose të qëndrosh aty'], ['në mëngjes', 'Vizitohet herët gjatë ditës'], ['në mbrëmje', 'Ka atmosferë pas perëndimit'],
      ['me familjen', 'Vizitohet me njerëzit e afërt'], ['me shoqërinë', 'Është destinacion për grup'], ['gjatë verës', 'Vizitohet në stinën e nxehtë'],
      ['gjatë dimrit', 'Vizitohet në stinën e ftohtë'], ['pa rezervim', 'Shkohet pa planifikuar vend paraprakisht'], ['në një qytet të huaj', 'Ndodhet larg vendit tënd'],
      ['në fundjavë', 'Vizitohet gjatë pushimit javor'],
    ]),
  },
  {
    category: 'Natyrë',
    roots: [
      ['mal', 'Ngritje shumë e lartë e tokës'], ['lumë', 'Rrjedhë natyrore uji drejt detit ose liqenit'], ['liqen', 'Sipërfaqe e madhe uji e rrethuar me tokë'],
      ['det', 'Hapësirë e madhe me ujë të kripur'], ['pyll', 'Zonë e gjerë e mbuluar me pemë'], ['ujëvarë', 'Ujë që bie nga një lartësi'],
      ['shpellë', 'Hapësirë natyrore brenda shkëmbit'], ['ishull', 'Tokë e rrethuar nga ujë në çdo anë'], ['luginë', 'Zonë e ulët mes maleve ose kodrave'],
      ['shkretëtirë', 'Zonë shumë e thatë me pak bimësi'], ['akullnajë', 'Masë e madhe akulli që lëviz ngadalë'], ['vullkan', 'Mal që mund të nxjerrë llavë'],
      ['ylber', 'Hark me ngjyra që shfaqet pas shiut'], ['re', 'Masë avulli që shihet në qiell'], ['stuhi', 'Mot i fortë me erë dhe reshje'],
      ['burim', 'Vend ku uji del natyrshëm nga toka'],
    ],
    variants: commonVariants([
      ['', 'Është pjesë e botës natyrore'], ['në lindje të diellit', 'Shihet kur dita sapo fillon'], ['në perëndim të diellit', 'Merr ngjyra në fund të ditës'],
      ['pas shiut', 'Shfaqet ose ndryshon kur mbarojnë reshjet'], ['në dimër', 'Ndikohet nga i ftohti'], ['në verë', 'Ndikohet nga nxehtësia'],
      ['nga larg', 'Dallohet pa iu afruar'], ['në fotografi', 'Është kapur si peizazh'], ['në një dokumentar', 'Shpjegohet nga narratorët'],
      ['nën dritën e hënës', 'Shihet gjatë natës'],
    ]),
  },
  {
    category: 'Shkollë dhe universitet',
    roots: [
      ['laps', 'Mjet shkrimi që mund të fshihet'], ['fletore', 'Fletë të lidhura ku shkruhen shënime'], ['libër', 'Faqe të lidhura me tekst ose figura'],
      ['çantë shkolle', 'Mban mjetet e nxënësit'], ['dërrasë', 'Sipërfaqe e madhe ku shkruan mësuesi'], ['provim', 'Vlerësim i njohurive me pyetje'],
      ['diplomë', 'Dokument që vërteton përfundimin e studimeve'], ['laborator', 'Hapësirë për eksperimente'], ['bibliografi', 'Listë e burimeve të përdorura'],
      ['leksion', 'Shpjegim akademik para studentëve'], ['detyrë shtëpie', 'Punë që përfundon jashtë orës mësimore'], ['pushim i madh', 'Pauzë më e gjatë mes orëve'],
      ['notë', 'Vlerësim numerik ose me shkronjë'], ['bankë shkolle', 'Tavolinë ku ulet nxënësi'], ['uniformë', 'Veshje e njëjtë për anëtarët e institucionit'],
      ['prezantim', 'Shpjegim para grupit me materiale ndihmëse'],
    ],
    variants: commonVariants([
      ['', 'Lidhet me të nxënit'], ['në klasë', 'Ndodh mes nxënësve dhe mësuesit'], ['në universitet', 'Lidhet me studime të larta'],
      ['para pushimit', 'Ndodh pak para pauzës'], ['pas mësimit', 'Përdoret kur ora ka mbaruar'], ['në ditën e parë', 'Lidhet me një fillim të ri'],
      ['gjatë provimit', 'Ndodh në një situatë vlerësimi'], ['me shokun e bankës', 'Përfshin personin që ulet afër'], ['në bibliotekë', 'Ndodh në hapësirë të qetë me libra'],
      ['në diplomim', 'Lidhet me përfundimin e studimeve'],
    ]),
  },
  {
    category: 'Muzikë',
    roots: [
      ['kitarë', 'Instrument me tela që mbahet në duar'], ['piano', 'Instrument me taste të bardha e të zeza'], ['violinë', 'Instrument i vogël me hark'],
      ['daulle', 'Instrument ritmik që goditet'], ['fyell', 'Instrument frymor i vogël tradicional'], ['trompetë', 'Instrument metalik me tingull të fortë'],
      ['saksafon', 'Instrument frymor metalik i zakonshëm në xhaz'], ['harmonikë', 'Instrument i vogël që fryhet pranë gojës'], ['mikrofon skene', 'Kap zërin e këngëtarit para publikut'],
      ['orkestër', 'Grup i madh instrumentistësh'], ['kor', 'Grup njerëzish që këndojnë bashkë'], ['melodi', 'Varg tingujsh që mbahet mend'],
      ['ritëm', 'Modeli i rrahjeve në një këngë'], ['refren', 'Pjesa e këngës që përsëritet'], ['album', 'Përmbledhje këngësh nga një artist'],
      ['koncert', 'Shfaqje muzikore para publikut'],
    ],
    variants: commonVariants([
      ['', 'Lidhet me tinguj dhe dëgjim'], ['në skenë', 'Ndodh para publikut'], ['në dasmë', 'Dëgjohet gjatë një feste familjare'],
      ['në kufje', 'Përjetohet privatisht'], ['në studio', 'Krijohet ose regjistrohet profesionalisht'], ['gjatë provës', 'Ushtrohet para shfaqjes'],
      ['në rrugë', 'Dëgjohet jashtë sallës'], ['në festival', 'Është pjesë e një ngjarjeje të madhe'], ['pa energji elektrike', 'Realizohet vetëm me tingull natyror'],
      ['pas mesnate', 'Dëgjohet shumë vonë'],
    ]),
  },
  {
    category: 'Filma dhe argëtim',
    roots: [
      ['kinema', 'Sallë me ekran të madh për filma'], ['komedi', 'Vepër që synon të shkaktojë të qeshura'], ['dramë', 'Histori me konflikte dhe emocione të forta'],
      ['mister', 'Histori me sekret që duhet zbuluar'], ['film aksion', 'Histori me ndjekje dhe shumë lëvizje'], ['film vizatimor', 'Pamje të animuara për të treguar histori'],
      ['serial', 'Histori e ndarë në shumë episode'], ['episod', 'Një pjesë e vetme e një serie'], ['aktor kryesor', 'Personi me rolin qendror në histori'],
      ['regjisor', 'Udhëheq mënyrën si realizohet filmi'], ['skenar', 'Teksti që përshkruan ngjarjet dhe dialogun'], ['premierë', 'Shfaqja e parë publike e një vepre'],
      ['kokoshka', 'Snack krokant që hahet shpesh para ekranit'], ['biletë kinemaje', 'Të lejon të hysh në sallën e filmit'], ['trailer', 'Video e shkurtër që prezanton një film'],
      ['personazh', 'Figurë që merr pjesë në histori'],
    ],
    variants: commonVariants([
      ['', 'Lidhet me ekranin ose zbavitjen'], ['me shoqërinë', 'Përjetohet në grup'], ['në fundjavë', 'Zgjidhet kur ka kohë të lirë'],
      ['pas mesnate', 'Ndodh shumë vonë'], ['në festival', 'Prezantohet në një ngjarje të organizuar'], ['në shtëpi', 'Përjetohet pa dalë jashtë'],
      ['me fund të papritur', 'Historia ndryshon pritshmëritë'], ['pa zë', 'Pamja mbetet por audioja mungon'], ['në ekran të madh', 'Shfaqet në përmasa kinemaje'],
      ['nga një histori e vërtetë', 'Bazohet në ngjarje reale'],
    ]),
  },
  {
    category: 'Internet dhe rrjete sociale',
    roots: [
      ['mesazh', 'Tekst i shkurtër që i dërgohet dikujt'], ['video', 'Pamje lëvizëse me ose pa zë'], ['fotografi profili', 'Pamje që përfaqëson një llogari'],
      ['fjalëkalim', 'Kod sekret për hyrje'], ['koment', 'Mendim i shkruar poshtë një përmbajtjeje'], ['pëlqim', 'Reagim pozitiv me një prekje'],
      ['ndjekës', 'Person që merr përditësimet e një llogarie'], ['transmetim live', 'Video që shfaqet në kohë reale'], ['kërkim', 'Veprim për të gjetur informacion'],
      ['faqe interneti', 'Dokument që hapet në shfletues'], ['lidhje', 'Adresë që të çon te një faqe tjetër'], ['emoji', 'Figurë e vogël që shpreh ide ose emocion'],
      ['njoftim', 'Sinjal që tregon se ka diçka të re'], ['grup bisede', 'Hapësirë ku shkruajnë disa persona'], ['memë', 'Përmbajtje humoristike që shpërndahet shpejt'],
      ['histori 24-orëshe', 'Postim që zhduket pas një dite'],
    ],
    variants: commonVariants([
      ['', 'Shfaqet në pajisje të lidhura'], ['në telefon', 'Përdoret nga ekrani i vogël'], ['në kompjuter', 'Përdoret nga ekrani i madh'],
      ['në mesnatë', 'Mbërrin ose shfaqet shumë vonë'], ['pa internet', 'Nuk mund të ngarkohet si zakonisht'], ['me shumë reagime', 'Ka tërhequr vëmendjen e njerëzve'],
      ['në një llogari private', 'Shihet vetëm nga persona të lejuar'], ['që bëhet viral', 'Përhapet te shumë njerëz shpejt'], ['i fshirë gabimisht', 'Nuk gjendet më pas një prekjeje të gabuar'],
      ['nga një person i panjohur', 'Vjen prej dikujt që nuk e njeh'],
    ]),
  },
  {
    category: 'Emocione',
    roots: [
      ['gëzim', 'Ndjenjë e fortë pozitive'], ['trishtim', 'Ndjenjë që shoqëron humbjen ose zhgënjimin'], ['frikë', 'Reagim ndaj rrezikut'],
      ['zemërim', 'Ndjenjë e fortë kur diçka duket e padrejtë'], ['habi', 'Reagim kur ndodh diçka e papritur'], ['xhelozi', 'Shqetësim se dikush tjetër ka atë që dëshiron'],
      ['krenari', 'Kënaqësi nga një arritje'], ['turp', 'Siklet nga mënyra si dukesh para të tjerëve'], ['qetësi', 'Gjendje pa trazim'],
      ['mall', 'Dëshirë emocionale për dikë ose diçka larg'], ['shpresë', 'Besim se gjërat do të shkojnë mirë'], ['dyshim', 'Pasiguri nëse diçka është e vërtetë'],
      ['dashuri', 'Lidhje e thellë emocionale'], ['vetmi', 'Ndjesi e të qenit pa shoqëri'], ['entuziazëm', 'Energji e madhe për diçka që pritet'],
      ['lehtësim', 'Ndjenjë pozitive pasi largohet një shqetësim'],
    ],
    variants: commonVariants([
      ['', 'Është diçka që ndihet nga brenda'], ['pas një lajmi', 'Shfaqet si reagim ndaj informacionit'], ['në një festë', 'Përjetohet mes shumë njerëzve'],
      ['para provimit', 'Shfaqet kur pritet një vlerësim'], ['pas një fitoreje', 'Lidhet me suksesin'], ['gjatë një takimi', 'Përjetohet përballë dikujt tjetër'],
      ['pa e treguar', 'Fshihet nga të tjerët'], ['në fëmijëri', 'Lidhet me vitet e hershme'], ['pas një surprize', 'Vjen nga diçka e papritur'],
      ['kur je vetëm', 'Përjetohet pa njerëz pranë'],
    ]),
  },
  {
    category: 'Veprime',
    roots: [
      ['vrapoj', 'Lëviz shpejt me këmbë'], ['kërcej', 'Shkëputem nga toka ose lëviz me ritëm'], ['këndoj', 'Përdor zërin për melodi'],
      ['gatuaj', 'Përgatis ushqim'], ['vizatoj', 'Krijoj figura me vija'], ['lexoj', 'Kuptoj tekstin e shkruar'],
      ['shkruaj', 'Vendos fjalë në letër ose ekran'], ['fle', 'Pushoj me sy mbyllur'], ['qesh', 'Shpreh argëtim me fytyrë dhe zë'],
      ['noton', 'Lëviz në ujë pa prekur fundin'], ['ngas', 'Drejtoj një mjet transporti'], ['kërkoj', 'Përpiqem të gjej diçka'],
      ['ndërtoj', 'Krijoj diçka duke bashkuar pjesë'], ['fotografoj', 'Kap një çast me kamerë'], ['udhëtoj', 'Lëviz drejt një vendi tjetër'],
      ['vallëzoj', 'Lëviz trupin sipas muzikës'],
    ],
    variants: commonVariants([
      ['', 'Është diçka që bën një person'], ['në mëngjes', 'Bëhet në fillim të ditës'], ['me shokët', 'Bëhet në grup'],
      ['me kujdes', 'Kërkon vëmendje'], ['me shpejtësi', 'Bëhet pa humbur kohë'], ['në park', 'Bëhet në hapësirë të gjelbër'],
      ['në shtëpi', 'Bëhet brenda banesës'], ['gjatë fundjavës', 'Bëhet në kohën e lirë'], ['për herë të parë', 'Nuk është provuar më parë'],
      ['pa u vënë re', 'Bëhet fshehurazi'],
    ]),
  },
  {
    category: 'Kulturë shqiptare',
    roots: [
      ['plis', 'Mbulesë e bardhë tradicionale për kokën'], ['çifteli', 'Instrument tradicional me dy tela'], ['lahutë', 'Instrument i vjetër me një tel dhe hark'],
      ['valle', 'Lëvizje ritmike tradicionale në grup'], ['oda', 'Dhomë tradicionale ku priten mysafirët'], ['besa', 'Premtim i fortë moral dhe nderi'],
      ['kulla', 'Banesa e fortifikuar prej guri'], ['xhubletë', 'Veshje e lashtë me formë kambane'], ['iso-polifoni', 'Këndim shumëzërësh nga jugu'],
      ['arbëreshë', 'Komunitet shqiptar historik në Itali'], ['Kanuni', 'Përmbledhje e vjetër normash zakonore'], ['shqiponjë dykrenare', 'Simbol me dy koka në flamur'],
      ['Dita e Flamurit', 'Festë kombëtare në fund të nëntorit'], ['mikpritje', 'Traditë e respektit të madh ndaj mysafirit'], ['këngë kreshnike', 'Tregim epik i kënduar për heronj'],
      ['kostum popullor', 'Veshje karakteristike e një krahine'],
    ],
    variants: commonVariants([
      ['', 'Lidhet me trashëgiminë shqiptare'], ['në Kosovë', 'Shihet ose ruhet në hapësirën kosovare'], ['në Shqipëri', 'Shihet ose ruhet brenda vendit amë'],
      ['në diasporë', 'Ruhet larg trojeve shqiptare'], ['në muze', 'Ekspozohet si pjesë e trashëgimisë'], ['në dasmë', 'Shfaqet në një ceremoni familjare'],
      ['në festival folklorik', 'Prezantohet para publikut si traditë'], ['në një fotografi të vjetër', 'Dëshmohet nga një pamje historike'], ['në shkollë', 'Mësohet nga brezi i ri'],
      ['për brezat e ardhshëm', 'Ruhet që të mos harrohet'],
    ]),
  },
  {
    category: 'Kuzhinë shqiptare',
    roots: [
      ['flija', 'Shtresa brumi të pjekura njëra pas tjetrës'], ['tavë kosi', 'Gatim furre me mish dhe produkt qumështi'], ['byrek', 'Petë të holla me mbushje'],
      ['qebapa', 'Copëza mishi të pjekura në skarë'], ['speca të mbushur', 'Perime të mbushura me oriz ose mish'], ['fasule', 'Gatim me bishtajore që zihet ngadalë'],
      ['kaçamak', 'Gatim i trashë me miell misri'], ['petulla', 'Brumë i skuqur në copa të vogla'], ['bakllava', 'Ëmbëlsirë me petë dhe sherbet'],
      ['trileçe', 'Ëmbëlsirë e butë e lagur me tre lloje qumështi'], ['hallvë', 'Ëmbëlsirë e dendur me miell ose susam'], ['revani', 'Ëmbëlsirë e pjekur me sherbet'],
      ['sarma', 'Gjethe të mbështjella rreth mbushjes'], ['paçe', 'Gatim i ngrohtë me lëng të trashë'], ['japrak', 'Gjethe hardhie me mbushje brenda'],
      ['bukë misri', 'Brumë i pjekur nga një drithë i verdhë'],
    ],
    variants: commonVariants([
      ['', 'Është pjesë e tryezës vendase'], ['në sofrën familjare', 'Shërbehet kur mblidhet shtëpia'], ['për Bajram', 'Përgatitet në një festë fetare'],
      ['për Vitin e Ri', 'Përgatitet në ndërrimin e viteve'], ['nga gjyshja', 'Receta vjen nga brezi më i vjetër'], ['në fshat', 'Përgatitet në ambient rural'],
      ['në restorant tradicional', 'Porositet në një lokal me receta vendase'], ['me mysafirë', 'Shërbehet për të nderuar vizitorët'], ['në saç', 'Piqet me mënyrë tradicionale'],
      ['pas agjërimit', 'Hahet pasi ka kaluar një kohë pa ushqim'],
    ]),
  },
  {
    category: 'Festa dhe tradita',
    roots: [
      ['ditëlindje', 'Përvjetor i ditës kur lindi një person'], ['dasmë', 'Ceremoni ku martohet një çift'], ['fejesë', 'Premtim formal para martesës'],
      ['Bajram', 'Festë fetare myslimane'], ['Krishtlindje', 'Festë dimërore e krishterë'], ['Viti i Ri', 'Momenti kur ndryshon kalendari'],
      ['karnavale', 'Festë publike me maska dhe kostume'], ['piknik familjar', 'Vakt jashtë me njerëzit e afërt'], ['festë surprizë', 'Mbledhje që mbahet e fshehtë nga personi kryesor'],
      ['darka e maturës', 'Festë pas përfundimit të shkollës së mesme'], ['përvjetor', 'Datë që kujton një ngjarje të kaluar'], ['ceremoni diplomimi', 'Ngjarje që shënon përfundimin e studimeve'],
      ['festë lagjeje', 'Mbledhje e banorëve të një zone'], ['konak', 'Mbledhje tradicionale me biseda e mikpritje'], ['urim', 'Fjalë të mira për një rast të veçantë'],
      ['dhuratë', 'Diçka që jepet pa pagesë për të gëzuar dikë'],
    ],
    variants: commonVariants([
      ['', 'Lidhet me një rast të veçantë'], ['me familjen', 'Përjetohet me njerëzit e afërt'], ['me shoqërinë', 'Përjetohet mes miqsh'],
      ['në shtëpi', 'Organizohet në banesë'], ['në restorant', 'Organizohet në lokal'], ['me muzikë live', 'Ka interpretues që luajnë aty për aty'],
      ['pa fotografi', 'Nuk mbetet e dokumentuar me kamera'], ['në minutën e fundit', 'Organizohet pa shumë kohë'], ['me veshje tradicionale', 'Përfshin trashëgimi në veshje'],
      ['që zgjat deri në mëngjes', 'Vazhdon gjatë gjithë natës'],
    ]),
  },
  {
    category: 'Qytete dhe shtete',
    roots: [
      ['Prishtinë', 'Kryeqyteti i Kosovës'], ['Tiranë', 'Kryeqyteti i Shqipërisë'], ['Prizren', 'Qytet historik pranë maleve në jug të Kosovës'],
      ['Shkodër', 'Qytet verior pranë liqenit me të njëjtin emër'], ['Gjakovë', 'Qytet kosovar i njohur për çarshinë'], ['Berat', 'Qytet shqiptar i njohur për dritaret dhe lagjet historike'],
      ['Pejë', 'Qytet pranë Bjeshkëve të Nemuna'], ['Vlorë', 'Qytet bregdetar ku u shpall pavarësia'], ['Ohër', 'Qytet buzë një liqeni shumë të vjetër'],
      ['Sarajevë', 'Kryeqytet ballkanik i rrethuar me kodra'], ['Romë', 'Kryeqytet europian me Koloseun'], ['Paris', 'Kryeqytet i njohur për një kullë metalike'],
      ['Londër', 'Kryeqytet me autobusë të kuq dykatësh'], ['Athinë', 'Kryeqytet i lidhur me Akropolin'], ['Stamboll', 'Qytet i madh që shtrihet në dy kontinente'],
      ['Nju Jork', 'Metropol amerikan me një statujë të famshme në port'],
    ],
    variants: commonVariants([
      ['', 'Është një vend në hartë'], ['gjatë verës', 'Vizitohet në stinën e nxehtë'], ['gjatë dimrit', 'Vizitohet në stinën e ftohtë'],
      ['me autobus', 'Udhëtimi bëhet në rrugë me shumë pasagjerë'], ['me aeroplan', 'Udhëtimi bëhet nga ajri'], ['për një fundjavë', 'Vizita zgjat pak ditë'],
      ['në fotografi', 'Shihet përmes një pamjeje'], ['në një hartë të vjetër', 'Paraqitet me kufij ose emra historikë'], ['pa guidë turistike', 'Eksplorohet pa udhërrëfyes'],
      ['pas dhjetë vitesh', 'Mendohet si mund të ndryshojë në të ardhmen'],
    ]),
  },
  {
    category: 'Punë dhe biznes',
    roots: [
      ['mbledhje', 'Bisedë e organizuar mes disa personave'], ['email', 'Letër elektronike që dërgohet në internet'], ['kontratë', 'Marrëveshje e shkruar me detyrime'],
      ['afat', 'Koha e fundit kur duhet përfunduar diçka'], ['pagë', 'Shuma që merret për punën'], ['intervistë pune', 'Bisedë për të vlerësuar një kandidat'],
      ['zyrë', 'Hapësirë ku kryhen detyra profesionale'], ['projekt', 'Punë me objektiv dhe plan të caktuar'], ['prezantim biznesi', 'Shpjegim profesional para një audience'],
      ['pushim dreke', 'Pauzë në mes të ditës së punës'], ['faturë', 'Dokument që tregon shumën për pagesë'], ['klient', 'Person ose organizatë që blen shërbim'],
      ['shef', 'Person që drejton një ekip'], ['koleg', 'Person që punon në të njëjtin ambient'], ['kompani', 'Organizatë që ofron produkte ose shërbime'],
      ['orar pune', 'Kohët kur fillon dhe mbaron puna'],
    ],
    variants: commonVariants([
      ['', 'Lidhet me jetën profesionale'], ['të hënën', 'Ndodh në fillim të javës'], ['në distancë', 'Bëhet pa qenë në të njëjtin vend'],
      ['në zyrë', 'Ndodh në ambient pune'], ['me urgjencë', 'Duhet trajtuar shpejt'], ['para pushimeve', 'Duhet mbyllur para largimit'],
      ['me ekipin', 'Përfshin disa bashkëpunëtorë'], ['në një kompani të re', 'Ndodh në një organizatë që sapo ka nisur'], ['pa kafe', 'Bëhet pa pijen tipike të zyrës'],
      ['pas orarit', 'Ndodh kur dita zyrtare e punës ka mbaruar'],
    ]),
  },
  {
    category: 'Gjëra qesharake',
    roots: [
      ['selfie e turbullt', 'Foto e vetes që nuk doli qartë'], ['vallëzim pa muzikë', 'Lëvizje ritmike në heshtje'], ['çorape të ndryshme', 'Palë që nuk përputhet'],
      ['shaka e keqe', 'Përpjekje për humor që nuk funksionon'], ['teshtimë e zhurmshme', 'Reagim i papritur që dëgjohet nga të gjithë'], ['kapele tepër e madhe', 'Mbulesë koke që s’përshtatet në madhësi'],
      ['mesazh te personi gabim', 'Tekst që mbërrin te marrësi i padëshiruar'], ['rrëshqitje mbi banane', 'Skenë klasike humori fizik'], ['këngë në dush', 'Performancë private mes ujit dhe avullit'],
      ['qen me syze', 'Kafshë shtëpie me aksesor njerëzor'], ['mace në kuti', 'Kafshë që futet në hapësirë shumë të vogël'], ['alarmi në fundjavë', 'Zhurmë që të zgjon kur do të flesh gjatë'],
      ['fotobombë', 'Dikush hyn papritur në fotografinë e tjetrit'], ['emër i harruar', 'Moment kur nuk të kujtohet si quhet dikush'], ['mikrofon i hapur', 'Të tjerët dëgjojnë diçka që s’duhej'],
      ['duartrokitje në momentin gabim', 'Reagim publik që vjen para ose pas kohës së duhur'],
    ],
    variants: commonVariants([
      ['', 'Mund t’i bëjë njerëzit të qeshin'], ['në një festë', 'Ndodh para shumë njerëzve'], ['në punë', 'Ndodh në ambient serioz'],
      ['para kamerës', 'Momenti mbetet i regjistruar'], ['me shoqërinë', 'Kthehet në histori mes miqsh'], ['në ditën e parë', 'Ndodh kur ende nuk njeh askënd mirë'],
      ['pa dashje', 'Askush nuk e kishte planifikuar'], ['në heshtje të plotë', 'Bie edhe më shumë në sy'], ['para një personi të famshëm', 'Sikleti ndodh para dikujt të njohur'],
      ['që bëhet viral', 'Përhapet shpejt në internet'],
    ]),
  },
  {
    category: 'Koncepte të vështira',
    roots: [
      ['paradoks', 'Ide që duket kundërthënëse por mund të ketë kuptim'], ['algoritëm', 'Seri hapash të përcaktuar për zgjidhjen e një problemi'],
      ['metaforë', 'Krahasim i tërthortë pa përdorur fjalën si'], ['nostalgji', 'Ndjenjë për një kohë të kaluar'], ['gravitet', 'Forcë që tërheq trupat drejt njëri-tjetrit'],
      ['demokraci', 'Sistem ku qytetarët ndikojnë përmes votës'], ['intuitë', 'Kuptim i menjëhershëm pa arsyetim të dukshëm'], ['perspektivë', 'Mënyrë nga e cila shihet një çështje'],
      ['ironi', 'Shprehje ku synohet diçka ndryshe nga fjalët e drejtpërdrejta'], ['ekosistem', 'Rrjet i gjallesave dhe mjedisit të tyre'], ['identitet', 'Tërësia e tipareve që përcaktojnë dikë'],
      ['kompromis', 'Marrëveshje ku secila palë lëshon diçka'], ['probabilitet', 'Matje e mundësisë që të ndodhë diçka'], ['kriptografi', 'Mbrojtje e informacionit përmes kodeve'],
      ['empati', 'Aftësi për të kuptuar ndjenjat e tjetrit'], ['qëndrueshmëri', 'Aftësi për të vazhduar ose për të mos u dëmtuar me kohën'],
    ],
    variants: commonVariants([
      ['', 'Është një ide që kërkon pak mendim'], ['në filozofi', 'Diskutohet për kuptimin dhe arsyen'], ['në shkencë', 'Studiohet me metoda dhe prova'],
      ['në jetën e përditshme', 'Shfaqet edhe jashtë librave'], ['në një debat', 'Përdoret për të argumentuar'], ['në një film', 'Shpjegohet përmes historisë'],
      ['nga këndvështrimi i fëmijës', 'Shihet me mënyrë më të thjeshtë'], ['në të ardhmen', 'Mendohet si do të zhvillohet me kohën'], ['pa një përgjigje të qartë', 'Mbetet e hapur për interpretim'],
      ['që ndryshon shoqërinë', 'Ka ndikim te shumë njerëz'],
    ]),
  },
] as const

export function buildWordDatabase(): WordEntry[] {
  let id = 1
  return WORD_GROUPS.flatMap((group) =>
    group.roots.flatMap(([root, rootHint]) =>
      group.variants.map(([suffix, extraHint, difficulty]) => ({
        id: id++,
        word: suffix ? `${root} ${suffix}` : root,
        hint: suffix ? `${rootHint}. ${extraHint}.` : `${rootHint}.`,
        category: group.category,
        difficulty,
      })),
    ),
  )
}

export const WORD_DATABASE = buildWordDatabase()
export const CATEGORIES = WORD_GROUPS.map((group) => group.category)
