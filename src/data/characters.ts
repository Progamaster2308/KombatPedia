/**
 * Kombatpedia: Base de datos exhaustiva canónica de Mortal Kombat
 * Abarca las entregas solicitadas:
 *  - MK vs DC Universe (MK8 · 2008)
 *  - MK9 (2011 · IX)
 *  - MKX / MKXL (MK10 · 2015 · X)
 *  - MK11 / Ultimate (2019 · XI)
 *  - MK1 / Khaos Reigns (MK12 · 2023/2024 · XII)
 *
 * Incluye la totalidad de la Plantilla Principal, Personajes Invitados / DLC,
 * Bando DC Universe, Sub-jefes / Jefes Fusionados y Luchadores Kameo.
 */

export type ConsoleNotation = 'universal' | 'playstation' | 'xbox' | 'switch';

export type FighterCategory =
  | 'Plantilla Principal'
  | 'Kameo Fighter'
  | 'Personaje Invitado/DLC'
  | 'Universo DC (MK vs DC)';

export type GameKey = 'mk8' | 'mk9' | 'mkx' | 'mk11' | 'mk1';

export interface MoveStep {
  universal: string; // ej: "B, F, FP"
  playstation: string; // ej: "⬅️ ➡️ 🔲"
  xbox: string; // ej: "⬅️ ➡️ 🇽"
  switch: string; // ej: "⬅️ ➡️ 🇾"
}

export interface DetailedMove {
  name: string;
  type: 'Especial' | 'Kombo' | 'Kombo Breaker' | 'Krushing Blow' | 'X-Ray / Fatal Blow' | 'Fatality' | 'Heroic Brutality' | 'Brutality';
  damage: string;
  distance?: 'Cerca' | 'Media' | 'Lejos' | 'Cualquiera' | 'Media / Lejos';
  steps: MoveStep;
  description: string;
}

export interface GameLoreAppearance {
  gameKey: GameKey;
  gameTitle: string;
  releaseYear: number;
  costumeAesthetic: string;
  modelDesignDescription: string;
  loreArc: string;
  signatureMechanic: string;
  iconicQuote: string;
}

export interface Character {
  id: string;
  name: string;
  alias: string;
  category: FighterCategory;
  gamesAppeared: GameKey[];
  originRealm: string;
  accentColor: string;
  bgGradient: string;
  image?: string;
  fallbackBadge: {
    initials: string;
    primaryColor: string;
    secondaryColor: string;
    iconSymbol: string;
  };
  bioSummary: string;
  combatRole: string;
  signatureWeapons: string[];
  kameoPartnerRecommendation?: string;
  evolution: GameLoreAppearance[];
  moveset: DetailedMove[];
}

export function formatMoveInput(steps: MoveStep, notation: ConsoleNotation): string {
  switch (notation) {
    case 'playstation':
      return steps.playstation;
    case 'xbox':
      return steps.xbox;
    case 'switch':
      return steps.switch;
    case 'universal':
    default:
      return steps.universal;
  }
}

export const CHARACTERS_DATA: Character[] = [
  // =========================================================================
  // PILARES HISTÓRICOS & PLANTILLA PRINCIPAL (MULTIENTREGA)
  // =========================================================================
  {
    id: 'scorpion',
    name: 'Scorpion',
    alias: 'Espectro del Shirai Ryu / Gran Maestro Kuai Liang (MK1)',
    category: 'Plantilla Principal',
    gamesAppeared: ['mk8', 'mk9', 'mkx', 'mk11', 'mk1'],
    originRealm: 'Netherrealm / Earthrealm',
    accentColor: '#eab308',
    bgGradient: 'from-amber-950 via-stone-900 to-black',
    image: '/src/assets/images/mk_scorpion_art_1792619478505.jpg',
    fallbackBadge: { initials: 'SC', primaryColor: '#eab308', secondaryColor: '#78350f', iconSymbol: '🦂' },
    bioSummary: 'Hanzo Hasashi fue el más temido guerrero ninja del clan Shirai Ryu. Resucitado por Quan Chi como un espectro ardiente consumido por la venganza, Scorpion es el rostro de la saga. En MK1, Kuai Liang encarna al guerrero del fuego y defiende la paz de la Tierra.',
    combatRole: 'Luchador ofensivo veloz con control de espacio a media y larga distancia mediante arpón y teletransporte.',
    signatureWeapons: ['Kunai con cadena (Spear)', 'Katanas duales gemelas', 'Fuego infernal'],
    kameoPartnerRecommendation: 'Sektor (Kameo) o Sub-Zero (Kameo)',
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Traje de cuero amarillo ocre con máscara de calavera dorada y caperuza.',
        modelDesignDescription: 'Modelo 3D pionero con rasgaduras y daño visible en la ropa durante la batalla (Klose Kombat).',
        loreArc: 'Atraído por la ira cósmica de Dark Kahn, rivaliza contra Batman en Gotham City.',
        signatureMechanic: 'Klose Kombat y Free-Fall Kombat entre rascacielos.',
        iconicQuote: 'My rage cannot be extinguished!'
      },
      {
        gameKey: 'mk9',
        gameTitle: 'Mortal Kombat 9 (2011)',
        releaseYear: 2011,
        costumeAesthetic: 'Traje de combate ninja con blindaje de cuero y placas de hierro con motivos de escorpión.',
        modelDesignDescription: 'Modelo 3D robusto de Unreal Engine 3, con máscara metálica afilada y ojos incandescentes.',
        loreArc: 'Espectro guiado por Quan Chi durante el primer torneo. Venga a su clan matando a Bi-Han, creando a Noob Saibot.',
        signatureMechanic: 'Medidor Super Meter de 3 barras y ataques X-Ray cinematográficos con daño a huesos.',
        iconicQuote: '¡GET OVER HERE!'
      },
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Atuendo tradicional de tela mostaza gastada, vendas de combate y espadas cruzadas a la espalda.',
        modelDesignDescription: 'Fotorrealismo temprano con renderizado PBR. Revela su rostro humano envejecido al recobrar su humanidad.',
        loreArc: 'Restaura el clan Shirai Ryu como humano viviente y sella la reconciliación con Kuai Liang.',
        signatureMechanic: 'Sistema de 3 Variaciones: Ninjutsu, Hellfire e Inferno.',
        iconicQuote: 'I am Hanzo Hasashi. And my vengeance will be satisfied!'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Armadura samurái refinada con placas laqueadas en oro y negro y telares finamente trenzados.',
        modelDesignDescription: 'Captura facial en 4K. Máscaras y katanas completamente personalizables con ranuras de gemas.',
        loreArc: 'El joven espectro del pasado confronta a su yo mayor y sabio del presente para romper el ciclo de odio.',
        signatureMechanic: 'Krushing Blows por contraataque y Fatal Blow disponible al caer por debajo del 30% de salud.',
        iconicQuote: 'You exist because I allow it. You will end because I demand it.'
      },
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Túnicas de seda oriental amarilla y dorada con bordados tradicionales del clan Lin Kuei.',
        modelDesignDescription: 'Motor Unreal Engine 5 con simulación de telas y sombras suaves. Aspecto juvenil y noble sin los rasgos cadavéricos.',
        loreArc: 'Kuai Liang es Scorpion, hermano leal de Bi-Han antes de la ruptura ideológica del Lin Kuei.',
        signatureMechanic: 'Kameo Fighter System (asistencia en kombos) y kombates aéreos prolongados.',
        iconicQuote: 'For the Lin Kuei and the peace of Earthrealm!'
      }
    ],
    moveset: [
      {
        name: 'Spear (¡Get Over Here!)',
        type: 'Especial',
        damage: '90 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, B, FP', playstation: '⬅️ ⬅️ 🔲', xbox: '⬅️ ⬅️ 🇽', switch: '⬅️ ⬅️ 🇾' },
        description: 'Lanza su arpón con cadena perforando el pecho del rival para atraerlo indefenso hacia él.'
      },
      {
        name: 'Hellfire Teleport Punch',
        type: 'Especial',
        damage: '105 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, B, FK', playstation: '⬇️ ⬅️ ❌', xbox: '⬇️ ⬅️ 🇦', switch: '⬇️ ⬅️ 🇧' },
        description: 'Se disuelve en llamas y aparece inmediatamente por la espalda del oponente propinando un golpe aéreo.'
      },
      {
        name: 'Krushing Blow: Demon Slam',
        type: 'Krushing Blow',
        damage: '210 pts',
        distance: 'Cerca',
        steps: { universal: 'D, B, FK + AMP (como contraataque)', playstation: '⬇️ ⬅️ ❌ + R2', xbox: '⬇️ ⬅️ 🇦 + RT', switch: '⬇️ ⬅️ 🇧 + ZR' },
        description: 'El impacto quiebra el cráneo del enemigo en cinemática de rayos X al castigar una recuperación rival.'
      },
      {
        name: 'Wrath of the Netherrealm',
        type: 'X-Ray / Fatal Blow',
        damage: '350 pts',
        distance: 'Media',
        steps: { universal: 'LT + RT (Vida < 30%)', playstation: 'L2 + R2', xbox: 'LT + RT', switch: 'ZL + ZR' },
        description: 'Clava ambos kunais en los ojos del enemigo, fractura su columna con una patada invertida y lo azota en llamas.'
      },
      {
        name: 'Toasty! / Eye-Popper',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Cerca',
        steps: { universal: 'D, D, U, BK', playstation: '⬇️ ⬇️ ⬆️ ⭕', xbox: '⬇️ ⬇️ ⬆️ 🇧', switch: '⬇️ ⬇️ ⬆️ 🇦' },
        description: 'Se quita la máscara revelando su cráneo en llamas y exhala un torrente abrasador que consume al rival.'
      }
    ]
  },
  {
    id: 'sub-zero',
    name: 'Sub-Zero',
    alias: 'Gran Maestro Kuai Liang / Bi-Han (MK1)',
    category: 'Plantilla Principal',
    gamesAppeared: ['mk8', 'mk9', 'mkx', 'mk11', 'mk1'],
    originRealm: 'Earthrealm',
    accentColor: '#38bdf8',
    bgGradient: 'from-sky-950 via-stone-900 to-black',
    image: '/src/assets/images/mk_subzero_art_1792619479111.jpg',
    fallbackBadge: { initials: 'SZ', primaryColor: '#38bdf8', secondaryColor: '#0369a1', iconSymbol: '❄️' },
    bioSummary: 'Heredero de la estirpe Cryomancer, Sub-Zero controla el frío absoluto. Kuai Liang reformó al clan Lin Kuei para proteger a la Tierra, mientras que en MK1 su hermano Bi-Han asume el liderazgo como un Gran Maestro implacable.',
    combatRole: 'Maestro del control del tiempo y congelación que paraliza a sus rivales para castigarlos con armas de hielo.',
    signatureWeapons: ['Kori Blade (espada de hielo)', 'Hachas de escarcha', 'Criomancia molecular'],
    kameoPartnerRecommendation: 'Sareena (Kameo) o Frost (Kameo)',
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Traje ninja azul gélido con protectores de antebrazo plateados y máscara tallada.',
        modelDesignDescription: 'Modelo 3D estilizado que combate cara a cara con Batman y Superman en la metrópolis.',
        loreArc: 'Kuai Liang lidera a los kombatientes para frenar la fusión entre Metropolis y Outworld.',
        signatureMechanic: 'Ice Clone y Free-Fall Kombat helado.',
        iconicQuote: 'Winter is here!'
      },
      {
        gameKey: 'mk9',
        gameTitle: 'Mortal Kombat 9 (2011)',
        releaseYear: 2011,
        costumeAesthetic: 'Tabardo azul celeste clásico con hombreras de acero forjado y máscara de respiración gélida.',
        modelDesignDescription: 'Diseño clásico con musculatura marcada y vapor helado emanando de los brazos.',
        loreArc: 'Kuai Liang busca al asesino de su hermano, pero es capturado y transformado en Cyber Sub-Zero.',
        signatureMechanic: 'Ice Clone que castiga a los agresores congelándolos al contacto físico.',
        iconicQuote: 'This fight will be your last!'
      },
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Túnica de combate azul marino desgastada por la intemperie siberiana y máscara de cuero reforzado.',
        modelDesignDescription: 'Aspecto maduro de Gran Maestro con barba plateada y cicatriz en el ojo derecho.',
        loreArc: 'Restaura y purifica al clan Lin Kuei desmantelando la fábrica cibernética.',
        signatureMechanic: 'Variaciones: Cryomancer, Grandmaster y Unbreakable.',
        iconicQuote: 'The Lin Kuei are reformed. We defend Earthrealm.'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Armadura pesada nórdica con placas de acero mate y guanteletes de escarcha perpetua.',
        modelDesignDescription: 'Fotorrealismo extremo en los cristales de hielo y carámbanos generados dinámicamente.',
        loreArc: 'Lucha hombro a hombro con Hanzo Hasashi para infiltrarse en la base de Kronika.',
        signatureMechanic: 'Slide amplificado con Krushing Blow y lanzamiento de doble hacha de escarcha.',
        iconicQuote: 'For the honor of the Lin Kuei!'
      },
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Seda ceremonial azul imperial con bordados de dragón acuático y máscara de bronce plateado.',
        modelDesignDescription: 'Bi-Han encarna una elegancia aristocrática fría y despiadada con animaciones ágiles.',
        loreArc: 'Bi-Han cree que el Lin Kuei debe gobernar los reinos en lugar de servir en las sombras.',
        signatureMechanic: 'Combos aéreos congelantes y asistencias de congelación cruzada con Kameos.',
        iconicQuote: 'The Lin Kuei will no longer serve. We will lead!'
      }
    ],
    moveset: [
      {
        name: 'Ice Blast (Congelación Total)',
        type: 'Especial',
        damage: '0 pts (Stun total)',
        distance: 'Cualquiera',
        steps: { universal: 'D, F, FP', playstation: '⬇️ ➡️ 🔲', xbox: '⬇️ ➡️ 🇽', switch: '⬇️ ➡️ 🇾' },
        description: 'Proyectil de escarcha pura que inmoviliza al oponente en un bloque de hielo sólido.'
      },
      {
        name: 'Ice Slide (Deslizamiento Helado)',
        type: 'Especial',
        damage: '95 pts',
        distance: 'Media / Lejos',
        steps: { universal: 'B, F, BK', playstation: '⬅️ ➡️ ⭕', xbox: '⬅️ ➡️ 🇧', switch: '⬅️ ➡️ 🇦' },
        description: 'Se desliza a ras del suelo a gran velocidad golpeando las piernas del adversario.'
      },
      {
        name: 'Spine Rip / Have an Ice Day',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Cerca',
        steps: { universal: 'D, D, D, BP', playstation: '⬇️ ⬇️ ⬇️ 🔺', xbox: '⬇️ ⬇️ ⬇️ 🇾', switch: '⬇️ ⬇️ ⬇️ 🇽' },
        description: 'Congela la pelvis de la víctima y arranca la cabeza con la columna vertebral congelada intacta.'
      }
    ]
  },
  {
    id: 'shao-kahn',
    name: 'Shao Kahn / General Shao',
    alias: 'Emperador Supremo de Outworld / General Supremo de Sindel (MK1)',
    category: 'Plantilla Principal',
    gamesAppeared: ['mk8', 'mk9', 'mk11', 'mk1'],
    originRealm: 'Outworld',
    accentColor: '#dc2626',
    bgGradient: 'from-red-950 via-stone-900 to-black',
    image: '/src/assets/images/mk_shao_kahn_art_1792621759863.jpg',
    fallbackBadge: { initials: 'SK', primaryColor: '#dc2626', secondaryColor: '#450a0a', iconSymbol: '🔨' },
    bioSummary: 'El conquistador más despiadado del cosmos. Gobernó Outworld mediante la conquista y absorción de reinos. En MK vs DC se fusiona con Darkseid formando a Dark Kahn. En MK11 regresa por Kronika y en MK1 es el formidable General Shao.',
    combatRole: 'Coloso imparable de golpes pesados con martillo de guerra/hacha y embestidas con armadura.',
    signatureWeapons: ['Wrath Hammer (Martillo de la Ira)', 'Hacha imperial de combate', 'Lanzas de energía roja'],
    kameoPartnerRecommendation: 'Motaro (Kameo) o Sub-Zero (Kameo)',
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Yelmo calavera con hombreras gigantescas y capa de terciopelo imperial.',
        modelDesignDescription: 'Jefe desbloqueable con golpes de martillo devastadores en Klose Kombat.',
        loreArc: 'Desterrado a través de un portal a Apokolips, fusionándose con Darkseid en la anomalía dimensional.',
        signatureMechanic: 'Golpe sísmico y burlas que potencian su daño.',
        iconicQuote: 'Bow before your true emperor!'
      },
      {
        gameKey: 'mk9',
        gameTitle: 'Mortal Kombat 9 (2011)',
        releaseYear: 2011,
        costumeAesthetic: 'Yelmo con cráneo humanoide y cuernos dorados, hombreras con púas y capa imperial carmesí.',
        modelDesignDescription: 'Jefe final intimidante con animaciones de burla y golpes de martillo que rompen guardia.',
        loreArc: 'Jefe supremo de los tres torneos clásicos. Invade la Tierra rompiendo las reglas sagradas antes de ser aniquilado por los Dioses Antiguos.',
        signatureMechanic: 'Ataques invulnerables de martillo y risa intimidante.',
        iconicQuote: 'You will never win!'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Piel con escamas de dragón, armadura de placas de hierro negro con detalles óseos y el icónico casco calavera.',
        modelDesignDescription: 'Modelo hiperrealista con detalles de venas ardientes y martillo Wrath Hammer tallado con runas.',
        loreArc: 'Regresa gracias al colapso temporal de Kronika para reclamar su trono; es derrotado y cegado por Kitana Kahn.',
        signatureMechanic: 'Krushing Blows brutales con el martillo de guerra y buff de taunt.',
        iconicQuote: 'Earthrealm is mine!'
      },
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Coraza ceremonial con grabados de batalla, cornamenta natural Shokan-Outworlder y hacha pesada.',
        modelDesignDescription: 'General militar con cuernos reales en su cabeza en vez de yelmo ornamental, musculatura titánica.',
        loreArc: 'General del ejército de Sindel, cree que la paz debilita a Outworld y trama una rebelión militar.',
        signatureMechanic: 'Modo Axe Stance que clava el hacha en el suelo para luchar a puño limpio con agarres de lucha libre.',
        iconicQuote: 'Strength is the only law!'
      }
    ],
    moveset: [
      {
        name: 'Wrath Hammer Smash',
        type: 'Especial',
        damage: '120 pts',
        distance: 'Media',
        steps: { universal: 'B, F, BP', playstation: '⬅️ ➡️ 🔺', xbox: '⬅️ ➡️ 🇾', switch: '⬅️ ➡️ 🇽' },
        description: 'Invoca su martillo místico y lo descarga con brutalidad aplastando al enemigo contra el piso.'
      },
      {
        name: 'Shoulder Charger',
        type: 'Especial',
        damage: '100 pts',
        distance: 'Cualquiera',
        steps: { universal: 'F, F, FK', playstation: '➡️ ➡️ ❌', xbox: '➡️ ➡️ 🇦', switch: '➡️ ➡️ 🇧' },
        description: 'Embiste con su hombrera acorazada atravesando proyectiles y enviando al rival por los aires.'
      },
      {
        name: 'Kahn\'s Execution',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Cerca',
        steps: { universal: 'B, D, D, BP', playstation: '⬅️ ⬇️ ⬇️ 🔺', xbox: '⬅️ ⬇️ ⬇️ 🇾', switch: '⬅️ ⬇️ ⬇️ 🇽' },
        description: 'Con su martillo batea al enemigo a la estratósfera para pulverizarlo a su caída.'
      }
    ]
  },
  {
    id: 'kitana',
    name: 'Kitana',
    alias: 'Princesa de Edenia / Kitana Kahn / Emperatriz de Outworld',
    category: 'Plantilla Principal',
    gamesAppeared: ['mk8', 'mk9', 'mkx', 'mk11', 'mk1'],
    originRealm: 'Edenia / Outworld',
    accentColor: '#0ea5e9',
    bgGradient: 'from-blue-950 via-stone-900 to-black',
    image: '/src/assets/images/mk_kitana_art_1792621760515.jpg',
    fallbackBadge: { initials: 'KT', primaryColor: '#0ea5e9', secondaryColor: '#0c4a6e', iconSymbol: '🪭' },
    bioSummary: 'Princesa edeniana con más de 10.000 años de edad. Durante eones creyó ser hija de Shao Kahn hasta descubrir la verdad. En MK11 unifica a Outworld y es coronada Kitana Kahn. En MK1 es la leal defensora de su hermana la Emperatriz Mileena.',
    combatRole: 'Luchadora ágil de control aéreo y zonificación mediante abanicos de acero flotantes.',
    signatureWeapons: ['Steel Fans (Abanicos de acero con navajas)', 'Sai de Mileena (Mournful)', 'Magia de viento edeniana'],
    kameoPartnerRecommendation: 'Kung Lao (Kameo) o Sub-Zero (Kameo)',
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Traje de seda azul eléctrico con botas altas y velo traslúcido.',
        modelDesignDescription: 'Diseño clásico estilizado con abanicos de hojas afiladas.',
        loreArc: 'Lucha contra Catwoman y Wonder Woman por la supervivencia de Edenia.',
        signatureMechanic: 'Fan Lift y Square Wave Punch.',
        iconicQuote: 'You will learn respect!'
      },
      {
        gameKey: 'mk9',
        gameTitle: 'Mortal Kombat 9 (2011)',
        releaseYear: 2011,
        costumeAesthetic: 'Atuendo de seda azul royal con tiara plateada y máscara estilizada.',
        modelDesignDescription: 'Modelo ágil con acrobacias aéreas y abanicos que reflejan proyectiles.',
        loreArc: 'Descubre en las Fosas de Carne a su clon monstruoso Mileena y se une a Liu Kang.',
        signatureMechanic: 'Fan Lift prolongado para extender kombos aéreos.',
        iconicQuote: 'I am no assassin. I am a princess!'
      },
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Armadura oscura de Retornada con detalles azul gélido y venas de ceniza.',
        modelDesignDescription: 'Gobernante espectral del Netherrealm junto a Liu Kang con ojos incandescentes amarillos.',
        loreArc: 'Corrompida por Quan Chi, rige el inframundo planeando la invasión de otros reinos.',
        signatureMechanic: 'Variación Mournful usando el báculo y sais de Jade.',
        iconicQuote: 'The Netherrealm will conquer all.'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Armadura ceremonial de realeza edeniana con cota de malla y tiara enjoyada.',
        modelDesignDescription: 'Captura facial ultrarrealista. Corona de emperatriz tras cegar a Shao Kahn.',
        loreArc: 'Une a los Tarkatanos y Shokan para derrocar a Shao Kahn, convirtiéndose en Kitana Kahn.',
        signatureMechanic: 'Krushing Blows con abanicos cortantes y patadas torbellino.',
        iconicQuote: 'Outworld stands united!'
      },
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Túnicas imperiales de corte moderno en azul cobalto con adornos de oro bruñido.',
        modelDesignDescription: 'Elegancia imperial con rostro sereno y abanicos mecánicos con gemas brillantes.',
        loreArc: 'Princesa protectora que apoya incondicionalmente a Mileena en el trono de Outworld.',
        signatureMechanic: 'Fan Toss aéreo en múltiples ángulos y flotación sostenida.',
        iconicQuote: 'I protect the throne and my sister.'
      }
    ],
    moveset: [
      {
        name: 'Fan Lift (Elevación por Torbellino)',
        type: 'Especial',
        damage: '0 pts (Pop-up)',
        distance: 'Media',
        steps: { universal: 'B, B, FP', playstation: '⬅️ ⬅️ 🔲', xbox: '⬅️ ⬅️ 🇽', switch: '⬅️ ⬅️ 🇾' },
        description: 'Agita sus abanicos creando una corriente de viento que levanta al rival dejándolo a merced de un combo.'
      },
      {
        name: 'Fan Toss (Lanzamiento de Abanicos)',
        type: 'Especial',
        damage: '85 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, F, FP', playstation: '⬇️ ➡️ 🔲', xbox: '⬇️ ➡️ 🇽', switch: '⬇️ ➡️ 🇾' },
        description: 'Lanza velozmente dos abanicos de acero afilado cortando el pecho del rival.'
      },
      {
        name: 'Royal Execution',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Media',
        steps: { universal: 'D, B, D, FK', playstation: '⬇️ ⬅️ ⬇️ ❌', xbox: '⬇️ ⬅️ ⬇️ 🇦', switch: '⬇️ ⬅️ ⬇️ 🇧' },
        description: 'Lanza sus abanicos decapitando a la víctima y la hace trizas con un vórtice cortante.'
      }
    ]
  },
  {
    id: 'mileena',
    name: 'Mileena',
    alias: 'Clon Tarkatano de Kitana / Emperatriz Legítima de Outworld (MK1)',
    category: 'Plantilla Principal',
    gamesAppeared: ['mk9', 'mkx', 'mk11', 'mk1'],
    originRealm: 'Outworld (Fosas de Carne de Shang Tsung)',
    accentColor: '#ec4899',
    bgGradient: 'from-fuchsia-950 via-stone-900 to-black',
    image: '/src/assets/images/mk_mileena_art_1792621760650.jpg',
    fallbackBadge: { initials: 'ML', primaryColor: '#ec4899', secondaryColor: '#831843', iconSymbol: '🦷' },
    bioSummary: 'Creada en las Fosas de Carne por Shang Tsung mezclando sangre edeniana con ferocidad tarkatana. Posee la belleza letal de Kitana y las fauces caníbales de un monstruo. En MK1 es la heredera del trono imperial que contrae la plaga Tarkat.',
    combatRole: 'Asesina frenética con teletransporte de rodillo, mordiscos brutales y lanzamiento de sais perforantes.',
    signatureWeapons: ['Sais dobles afilados', 'Fauces Tarkatanas', 'Magia de teletransporte rosa'],
    kameoPartnerRecommendation: 'Sareena (Kameo) o Scorpion (Kameo)',
    evolution: [
      {
        gameKey: 'mk9',
        gameTitle: 'Mortal Kombat 9 (2011)',
        releaseYear: 2011,
        costumeAesthetic: 'Traje magenta mínimo con vendas y máscara que oculta sus colmillos monstruosos.',
        modelDesignDescription: 'Modelo 3D perturbador con risa maníaca y dientes tarkatanos gigantes.',
        loreArc: 'Presentada por Shao Kahn como su verdadera hija perfecta ante la traición de Kitana.',
        signatureMechanic: 'Ball Roll (rodillo terrestre) y Teleport Drop aéreo.',
        iconicQuote: 'Was it good for you too?'
      },
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Capa andrajosa de emperatriz rebelde con vendajes y armadura de cuero morada.',
        modelDesignDescription: 'Rediseño facial con labios humanos y colmillos en las mejillas para articular palabras.',
        loreArc: 'Lidera la rebelión contra el usurpador Kotal Kahn armada con el Amuleto de Shinnok antes de su trágica ejecución.',
        signatureMechanic: 'Variaciones: Ravenous, Piercing y Ethereal.',
        iconicQuote: 'I am the true heir to Shao Kahn!'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Traje de combate tarkatano refinado con cuero magenta oscuro y guantes con garras.',
        modelDesignDescription: 'Retorno de las fauces tarkatanas completas sin labios humanos. Fotorrealismo extremo en la saliva y sangre.',
        loreArc: 'Traída del pasado por Kronika para sembrar el caos y devorar a sus detractores.',
        signatureMechanic: 'Krushing Blows por mordiscos y teletransporte invisible.',
        iconicQuote: 'Let us feast!'
      },
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Vestimentas de seda imperial magenta y oro de la corte real de Outworld.',
        modelDesignDescription: 'Rostro noble y bello que se deforma en grotescos colmillos al manifestar la infección del virus Tarkat.',
        loreArc: 'Emperatriz legítima de Outworld que lucha por controlar la plaga en su sangre con la ayuda de Tanya.',
        signatureMechanic: 'Transformaciones instantáneas a estado Tarkat salvaje.',
        iconicQuote: 'I am your Empress, and I will be obeyed!'
      }
    ],
    moveset: [
      {
        name: 'Ball Roll (Rodillo de Choque)',
        type: 'Especial',
        damage: '95 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, D, BK', playstation: '⬅️ ⬇️ ⭕', xbox: '⬅️ ⬇️ 🇧', switch: '⬅️ ⬇️ 🇦' },
        description: 'Se hace una bola a ras del suelo rodando a máxima velocidad para derribar al oponente.'
      },
      {
        name: 'Teleport Drop',
        type: 'Especial',
        damage: '100 pts',
        distance: 'Cualquiera',
        steps: { universal: 'F, D, FK', playstation: '➡️ ⬇️ ❌', xbox: '➡️ ⬇️ 🇦', switch: '➡️ ⬇️ 🇧' },
        description: 'Cae desde un portal por encima del rival clavando ambos sais en sus hombros.'
      },
      {
        name: 'Tasty Taste / Feast',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Cerca',
        steps: { universal: 'B, D, D, BP', playstation: '⬅️ ⬇️ ⬇️ 🔺', xbox: '⬅️ ⬇️ ⬇️ 🇾', switch: '⬅️ ⬇️ ⬇️ 🇽' },
        description: 'Desgarra la garganta del rival con sus colmillos tarkatanos y devora su cerebro con placer macabro.'
      }
    ]
  },
  {
    id: 'liu-kang',
    name: 'Liu Kang / Fire God Liu Kang',
    alias: 'Campeón Supremo Shaolin / Dios del Fuego y Diseñador de la Nueva Era (MK1)',
    category: 'Plantilla Principal',
    gamesAppeared: ['mk8', 'mk9', 'mkx', 'mk11', 'mk1'],
    originRealm: 'Earthrealm / Cielos Divinos',
    accentColor: '#f97316',
    bgGradient: 'from-orange-950 via-stone-900 to-black',
    image: '/src/assets/images/mk_liukang_art_1792619479066.jpg',
    fallbackBadge: { initials: 'LK', primaryColor: '#f97316', secondaryColor: '#7c2d12', iconSymbol: '🐉' },
    bioSummary: 'El legendario monje Shaolin y cuádruple campeón de Mortal Kombat. Tras morir y transformarse en emperador retornador del Netherrealm en MKX, en MK11 fusiona su alma con el rayo de Raiden convirtiéndose en el Dios del Fuego. En MK1 es el creador supremo de la Nueva Era.',
    combatRole: 'Luchador supremo de presión marcial con patadas en ráfaga voladoras y dragones de fuego/rayo.',
    signatureWeapons: ['Dragón de fuego y rayo cósmico', 'Nunchakus incandescentes', 'Patada voladora de bicicleta'],
    kameoPartnerRecommendation: 'Kung Lao (Kameo) o Jax (Kameo)',
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Pantalones de seda roja y negra con cinta de combate Shaolin.',
        modelDesignDescription: 'Monje Shaolin clásico con patadas incandescentes y animaciones fluidas.',
        loreArc: 'Confronta al Capitán Marvel (Shazam) y The Flash para defender la realidad del Jinsei.',
        signatureMechanic: 'Bicycle Kick y Dragon Fire.',
        iconicQuote: 'For the Shaolin!'
      },
      {
        gameKey: 'mk9',
        gameTitle: 'Mortal Kombat 9 (2011)',
        releaseYear: 2011,
        costumeAesthetic: 'Pantalón rojo con dragón bordado, muñequeras de bronce y cinta de pelo carmesí.',
        modelDesignDescription: 'Modelo clásico de campeón del torneo con musculatura hercúlea y gritos característicos.',
        loreArc: 'Derrota a Shang Tsung y Shao Kahn, pero muere electrocutado al desafiar el juicio de Raiden.',
        signatureMechanic: 'Bicycle Kick y bola de fuego voladora.',
        iconicQuote: 'I am the champion of Mortal Kombat!'
      },
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Armadura oscura de Retornado con piel agrietada en lava negra y ojos amarillos espectrales.',
        modelDesignDescription: 'Líder espectral vengativo y soberbio en el trono del Netherrealm.',
        loreArc: 'Gobernante del inframundo consumido por el rencor hacia Raiden.',
        signatureMechanic: 'Variaciones: Dragon\'s Fire, Flame Fist y Dualist.',
        iconicQuote: 'You failed us, Raiden!'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Atuendo divino resplandeciente con ojos eléctricos celestes y llamas doradas danzando en sus puños.',
        modelDesignDescription: 'Transformación épica en Dios del Fuego Liu Kang tras absorber la esencia divina de Raiden.',
        loreArc: 'Derrota a Kronika en el fin de los tiempos y toma posesión del Reloj de Arena Cósmico.',
        signatureMechanic: 'Fuego divino y rayos celestiales con Krushing Blows de nunchaku.',
        iconicQuote: 'By the thunder and fire, darkness will fall!'
      },
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Túnicas de seda divina azul zafiro y blanco perla con dragones bordados en hilo de oro.',
        modelDesignDescription: 'Arquitecto de la realidad de serenidad absoluta. Sus ojos brillan con el poder de galaxias.',
        loreArc: 'Renuncia a su omnipotencia temporal para vigilar a los mortales como protector de la Nueva Era.',
        signatureMechanic: 'Invocación de dragones cósmicos colosales y teletransporte en espiral de fuego.',
        iconicQuote: 'In my New Era, all have a chance to find peace.'
      }
    ],
    moveset: [
      {
        name: 'Flying Dragon Kick',
        type: 'Especial',
        damage: '110 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, F, BK', playstation: '⬅️ ➡️ ⭕', xbox: '⬅️ ➡️ 🇧', switch: '⬅️ ➡️ 🇦' },
        description: 'Se impulsa en el aire atravesando la pantalla con una patada envuelta en dragones de fuego.'
      },
      {
        name: 'Bicycle Kick',
        type: 'Especial',
        damage: '125 pts',
        distance: 'Media',
        steps: { universal: 'F, F, FK', playstation: '➡️ ➡️ ❌', xbox: '➡️ ➡️ 🇦', switch: '➡️ ➡️ 🇧' },
        description: 'Ejecuta una ráfaga imparable de patadas en el aire con sus icónicos gritos de guerra.'
      },
      {
        name: 'Black Hole & Cosmic Dragon',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Media',
        steps: { universal: 'D, B, F, BP', playstation: '⬇️ ⬅️ ➡️ 🔺', xbox: '⬇️ ⬅️ ➡️ 🇾', switch: '⬇️ ⬅️ ➡️ 🇽' },
        description: 'Transporta al oponente a la inmensidad del espacio profundo y lo arroja dentro de un agujero negro supermasivo.'
      }
    ]
  },
  {
    id: 'raiden',
    name: 'Raiden',
    alias: 'Dios del Trueno y Protector de Earthrealm / Joven Campeón Shaolin (MK1)',
    category: 'Plantilla Principal',
    gamesAppeared: ['mk8', 'mk9', 'mkx', 'mk11', 'mk1'],
    originRealm: 'Cielos Divinos / Earthrealm',
    accentColor: '#3b82f6',
    bgGradient: 'from-blue-950 via-stone-900 to-black',
    image: '/src/assets/images/mk_raiden_art_1792619479445.jpg',
    fallbackBadge: { initials: 'RD', primaryColor: '#3b82f6', secondaryColor: '#1e3a8a', iconSymbol: '⚡' },
    bioSummary: 'El Dios del Trueno y guardián milenario de la Tierra. A lo largo de la saga consultó a los Dioses Antiguos para salvar la realidad. En MK1 renace como un joven campesino y monje Shaolin noble elegido por Liu Kang como campeón de la Tierra.',
    combatRole: 'Control de pantalla con relámpagos, teletransporte eléctrico y vuelo de torpedo "Superman".',
    signatureWeapons: ['Rayos divinos de tormenta', 'Báculo sagrado del trueno', 'Sombrero cónico protector'],
    kameoPartnerRecommendation: 'Kano (Kameo) o Sareena (Kameo)',
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Túnica blanca clásica con chaleco azul y sombrero cónico tradicional.',
        modelDesignDescription: 'Modelo 3D con ojos eléctricos que combate contra Superman para discernir la crisis del mundo.',
        loreArc: 'Une fuerzas con los campeones de DC para vencer la amenaza de Dark Kahn.',
        signatureMechanic: 'Torpedo Flight y Lightning Bolt.',
        iconicQuote: 'The thunder gods will strike you down!'
      },
      {
        gameKey: 'mk9',
        gameTitle: 'Mortal Kombat 9 (2011)',
        releaseYear: 2011,
        costumeAesthetic: 'Túnica de combate blanca con placas de hombro de bronce y sombrero de paja con aro metálico.',
        modelDesignDescription: 'Dios del trueno sabio y atormentado por visiones del futuro ("He must win").',
        loreArc: 'Intenta reescribir la línea temporal sacrificando inadvertidamente a la mayor parte de sus campeones.',
        signatureMechanic: 'Teleport detrás del oponente y proyectil eléctrico paralizante.',
        iconicQuote: 'I must consult with the Elder Gods!'
      },
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Dark Raiden: armadura de acero forjado negro con rayos rojos corruptos y capa rasgada.',
        modelDesignDescription: 'Corrompido por el Jinsei del Netherrealm, se vuelve despiadado y amenazante.',
        loreArc: 'Decapita a Shinnok y advierte a Liu Kang que no tendrá piedad ante ninguna agresión.',
        signatureMechanic: 'Variaciones: Displacer, Thunder God y Master of Storms.',
        iconicQuote: 'There are fates worse than death!'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Armadura samurái de rayos con báculo electrificado personalizable.',
        modelDesignDescription: 'Colisión entre su versión oscura corrupta y su yo noble del pasado.',
        loreArc: 'Entrega su inmortalidad y poder a Liu Kang para derrotar a Kronika.',
        signatureMechanic: 'Storm Cell trap y Krushing Blows con el báculo.',
        iconicQuote: 'By the gods, this cycle ends now!'
      },
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Ropa tradicional de campesino de seda azul y sombrero cónico tejido a mano.',
        modelDesignDescription: 'Joven mortal bondadoso y humilde dotado de un amuleto relámpago regalado por el Dios Liu Kang.',
        loreArc: 'Elegido por Liu Kang como campeón de Earthrealm tras ganar el torneo de selección Shaolin.',
        signatureMechanic: 'Kombos de rayos ultra rápidos y asistencias de proyectiles electrificados.',
        iconicQuote: 'I will not let Earthrealm down!'
      }
    ],
    moveset: [
      {
        name: 'Electric Fly (Torpedo "Superman")',
        type: 'Especial',
        damage: '105 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, F, FK', playstation: '⬅️ ➡️ ❌', xbox: '⬅️ ➡️ 🇦', switch: '⬅️ ➡️ 🇧' },
        description: 'Vuela horizontalmente a través de la pantalla empujando al oponente hasta azotarlo contra la pared.'
      },
      {
        name: 'Lightning Bolt',
        type: 'Especial',
        damage: '80 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, F, FP', playstation: '⬇️ ➡️ 🔲', xbox: '⬇️ ➡️ 🇽', switch: '⬇️ ➡️ 🇾' },
        description: 'Dispara una saeta de plasma eléctrico puro que impacta el pecho del rival.'
      },
      {
        name: 'Storming Decapitation',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Cerca',
        steps: { universal: 'D, F, D, BK', playstation: '⬇️ ➡️ ⬇️ ⭕', xbox: '⬇️ ➡️ ⬇️ 🇧', switch: '⬇️ ➡️ ⬇️ 🇦' },
        description: 'Canaliza millones de voltios en la cabeza del adversario hasta hacerla estallar en chispas de carne y hueso.'
      }
    ]
  },
  {
    id: 'johnny-cage',
    name: 'Johnny Cage',
    alias: 'Superestrella de Hollywood / Guardián Ancestral de Earthrealm',
    category: 'Plantilla Principal',
    gamesAppeared: ['mk9', 'mkx', 'mk11', 'mk1'],
    originRealm: 'Earthrealm',
    accentColor: '#10b981',
    bgGradient: 'from-emerald-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'JC', primaryColor: '#10b981', secondaryColor: '#064e3b', iconSymbol: '🕶️' },
    bioSummary: 'El actor de acción más famoso de Hollywood descubrió que sus poderes de sombra verde proceden de un culto ancestral guerrero del Mediterráneo. En MK1 es un actor en decadencia que recupera su honor y lidera la defensa del Reino de la Tierra.',
    combatRole: 'Luchador de presión a corta distancia con sombras verdes, Shadow Kick y el infame golpe a la entrepierna Nut Punch.',
    signatureWeapons: ['Energía mística de sombra verde', 'Gafas de sol de 500 dólares', 'Premio Óscar de oro'],
    kameoPartnerRecommendation: 'Janet Cage (Kameo) o Sonya (Kameo)',
    evolution: [
      {
        gameKey: 'mk9',
        gameTitle: 'Mortal Kombat 9 (2011)',
        releaseYear: 2011,
        costumeAesthetic: 'Pantalón de combate azul con tatuaje de su propio nombre "JOHNNY" en el pecho.',
        modelDesignDescription: 'Ego desmedido y estilo cómico de estrella de cine de artes marciales.',
        loreArc: 'Se une al torneo creyendo que es una película de efectos prácticos antes de luchar de verdad por su vida.',
        signatureMechanic: 'Shadow Kick y Nut Punch.',
        iconicQuote: 'Those were five hundred dollar sunglasses, asshole!'
      },
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Uniforme táctico de las Fuerzas Especiales con chaleco antibalas.',
        modelDesignDescription: 'Veterano maduro y padre protector de Cassie Cage.',
        loreArc: 'Despierta su poder ancestral verde para derrotar personalmente al Dios Mayor Shinnok.',
        signatureMechanic: 'Variaciones: A-List, Fisticuffs y Stunt Double.',
        iconicQuote: 'You just got Caged!'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Chaqueta de cuero roja retro ochentera con accesorios de gala de cine.',
        modelDesignDescription: 'Humor meta que rompe la cuarta pared con dobles de riesgo y cámaras cinematográficas.',
        loreArc: 'El Johnny inmaduro de los 90 conoce a su yo maduro veterano.',
        signatureMechanic: 'Hype Meter que permite cancelar kombos especiales sin coste.',
        iconicQuote: 'I make this look good!'
      },
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Traje de diseñador sin corbata o ropa deportiva de entrenamiento de élite en California.',
        modelDesignDescription: 'Captura facial y de voz inspirada en Jean-Claude Van Damme.',
        loreArc: 'Recupera su reputación combatiendo invasores interdimensionales y adopta la espada ancestral Sento.',
        signatureMechanic: 'Modo Hype con poses provocativas que desbloquean cancelaciones extremas.',
        iconicQuote: 'Lights, camera... Kombat!'
      }
    ],
    moveset: [
      {
        name: 'Shadow Kick',
        type: 'Especial',
        damage: '95 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, F, BK', playstation: '⬅️ ➡️ ⭕', xbox: '⬅️ ➡️ 🇧', switch: '⬅️ ➡️ 🇦' },
        description: 'Se desliza a velocidad supersónica dejando una estela verde brillante impactando el abdomen rival.'
      },
      {
        name: 'Nut Punch (Golpe a la Entrepierna)',
        type: 'Especial',
        damage: '90 pts',
        distance: 'Cerca',
        steps: { universal: 'B, D, FP', playstation: '⬅️ ⬇️ 🔲', xbox: '⬅️ ⬇️ 🇽', switch: '⬅️ ⬇️ 🇾' },
        description: 'Se abre de piernas en split y propina un golpe fulminante a los genitales del oponente dejándolo aturdido.'
      },
      {
        name: 'Who Hired This Guy? / Uppercut Retake',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Cerca',
        steps: { universal: 'F, D, B, BP', playstation: '➡️ ⬇️ ⬅️ 🔺', xbox: '➡️ ⬇️ ⬅️ 🇾', switch: '➡️ ⬇️ ⬅️ 🇽' },
        description: 'Decapita al oponente de un gancho, pero el director pide repetir la toma tres veces hasta que la cabeza sale volando a la cámara.'
      }
    ]
  },
  {
    id: 'shang-tsung',
    name: 'Shang Tsung',
    alias: 'Hechicero Ladrón de Almas / Gran Titán de la Línea Temporal (MK1)',
    category: 'Plantilla Principal',
    gamesAppeared: ['mk8', 'mk9', 'mk11', 'mk1'],
    originRealm: 'Earthrealm / Outworld',
    accentColor: '#10b981',
    bgGradient: 'from-emerald-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'ST', primaryColor: '#10b981', secondaryColor: '#064e3b', iconSymbol: '🐍' },
    bioSummary: 'El hechicero más taimado de la historia del kombate. Capaz de robar las almas y memorias de sus enemigos y adoptar su apariencia física y movimientos. En MK1 inicia como un curandero farsante hasta ser contactado por su contraparte Titán.',
    combatRole: 'Zonificador versátil con calaveras de fuego, trampas terrestres y metamorfosis total en el oponente.',
    signatureWeapons: ['Calaveras de fuego verde espectral', 'Garras hechiceras', 'Pociones alquímicas'],
    kameoPartnerRecommendation: 'Goro (Kameo) o Sub-Zero (Kameo)',
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Túnicas oscuras orientales con piel de reptil y calaveras enjoyadas.',
        modelDesignDescription: 'Hechicero maduro que se transforma en los héroes de DC y MK en tiempo real.',
        loreArc: 'Conspira con Lex Luthor para apoderarse de la energía interdimensional de la ira cósmica.',
        signatureMechanic: 'Soul Steal y Fire Skull Toss.',
        iconicQuote: 'Your soul is mine!'
      },
      {
        gameKey: 'mk9',
        gameTitle: 'Mortal Kombat 9 (2011)',
        releaseYear: 2011,
        costumeAesthetic: 'Versión anciana decrépita inicial que transmuta a su aspecto juvenil con túnica amarilla.',
        modelDesignDescription: 'Metamorfosis instantánea con efectos de partículas verdes espectrales.',
        loreArc: 'Anfitrión del primer torneo en su isla sagrada. Traicionado por Shao Kahn quien le arrebata el alma.',
        signatureMechanic: 'Transformación completa en el personaje rival copiando su lista entera de movimientos.',
        iconicQuote: 'Your soul is mine!'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Ropajes imperiales de cuero y seda de lujo interpretado magistralmente por Cary-Hiroyuki Tagawa.',
        modelDesignDescription: 'Escaneo facial fotorrealista del actor original de la película clásica de 1995.',
        loreArc: 'Protagonista de la expansión Aftermath, manipula a héroes y villanos para usurpar la Corona de Kronika.',
        signatureMechanic: 'Robo de alma que otorga Krushing Blows del enemigo y transformación en los ninjas clásicos (Rain, Reptile, Smoke, Ermac).',
        iconicQuote: 'It has begun!'
      },
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Atuendo de alquimista ambulante con frascos de veneno e inyectores dorados en las muñecas.',
        modelDesignDescription: 'Aspecto juvenil astuto con garras metálicas y elixires tóxicos.',
        loreArc: 'Manipulado por el Titan Shang Tsung de otra línea temporal para provocar la guerra entre los reinos.',
        signatureMechanic: 'Cambio de postura entre modo Joven (agilidad) y Viejo (alquimia y venenos).',
        iconicQuote: 'You underestimate the power of deception!'
      }
    ],
    moveset: [
      {
        name: 'Soul Steal (Robo de Alma)',
        type: 'Especial',
        damage: '60 pts + Copia',
        distance: 'Cualquiera',
        steps: { universal: 'F, D, B, FP', playstation: '➡️ ⬇️ ⬅️ 🔲', xbox: '➡️ ⬇️ ⬅️ 🇽', switch: '➡️ ⬇️ ⬅️ 🇾' },
        description: 'Extrae un fragmento del alma rival adoptando la apariencia y movimientos del adversario temporalmente.'
      },
      {
        name: 'Triple Ground Skull',
        type: 'Especial',
        damage: '115 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, B, BP', playstation: '⬇️ ⬅️ 🔺', xbox: '⬇️ ⬅️ 🇾', switch: '⬇️ ⬅️ 🇽' },
        description: 'Hace emerger tres calaveras de fuego espectral consecutivas desde el suelo quemando los pies del rival.'
      },
      {
        name: 'Your Soul Is Mine! / Visceral Feast',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Media',
        steps: { universal: 'B, D, F, FK', playstation: '⬅️ ⬇️ ➡️ ❌', xbox: '⬅️ ⬇️ ➡️ 🇦', switch: '⬅️ ⬇️ ➡️ 🇧' },
        description: 'Arranca el alma del pecho del enemigo envejeciéndolo hasta convertirlo en un esqueleto de polvo.'
      }
    ]
  },
  {
    id: 'baraka',
    name: 'Baraka',
    alias: 'Señor de la Guerra Tarkatano / Líder de los Afligidos por el Tarkat (MK1)',
    category: 'Plantilla Principal',
    gamesAppeared: ['mk8', 'mk9', 'mk11', 'mk1'],
    originRealm: 'Outworld',
    accentColor: '#b91c1c',
    bgGradient: 'from-red-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'BK', primaryColor: '#b91c1c', secondaryColor: '#7f1d1d', iconSymbol: '⚔️' },
    bioSummary: 'Feroz guerrero tarkatano dotado de largas cuchillas retráctiles de hueso en los antebrazos y una dentadura monstruosa. En MK1, la raza tarkatana es recontextualizada como víctimas de una plaga terminal degenerativa que Baraka protege con honor.',
    combatRole: 'Luchador ofensivo de ráfagas cortantes con cuchillas óseas y chispas a distancia.',
    signatureWeapons: ['Cuchillas retráctiles de antebrazo (Arm Blades)', 'Dientes Tarkatanos'],
    kameoPartnerRecommendation: 'Cyrax (Kameo) o Kano (Kameo)',
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Pantalón desgarrado con protectores de antebrazo para sus cuchillas de hueso.',
        modelDesignDescription: 'Tarkatano feroz que combate contra Deathstroke y Batman en combates brutales.',
        loreArc: 'Lucha por la supremacía de Outworld en la crisis dimensional.',
        signatureMechanic: 'Blade Spark y Chop Chop.',
        iconicQuote: 'Tarkata forever!'
      },
      {
        gameKey: 'mk9',
        gameTitle: 'Mortal Kombat 9 (2011)',
        releaseYear: 2011,
        costumeAesthetic: 'Atuendo tribal tarkatano con correas de cuero y cráneos.',
        modelDesignDescription: 'Modelo salvaje con chispas metálicas brotando de las cuchillas.',
        loreArc: 'General leal a Shao Kahn que lidera el asalto al Templo Shaolin.',
        signatureMechanic: 'Blade Spin y Chop Chop.',
        iconicQuote: 'We will feast on your bones!'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Piel con escamas y armadura con huesos afilados y estandartes tribales.',
        modelDesignDescription: 'Texturas orgánicas ultra detalladas en los dientes y cicatrices de combate.',
        loreArc: 'Aliado crucial de Kitana Kahn a cambio de la liberación y dignidad de su pueblo.',
        signatureMechanic: 'Krushing Blows con desgarro de carne y estandarte de guerra de daño aumentado.',
        iconicQuote: 'My tribe will not be slaves!'
      },
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Túnicas rasgadas de comerciante con vendajes para ocultar la mutación de la peste.',
        modelDesignDescription: 'Un líder trágico y noble que cuida de la colonia de enfermos marginados en las afueras de Sun Do.',
        loreArc: 'Fue un respetado comerciante de Outworld antes de contraer el virus Tarkat. Defiende a su pueblo con su vida.',
        signatureMechanic: 'Combos aéreos con cuchillas y cortes en ráfaga sostenida.',
        iconicQuote: 'We are afflicted, not monsters!'
      }
    ],
    moveset: [
      {
        name: 'Chop Chop (Cortes en Ráfaga)',
        type: 'Especial',
        damage: '110 pts',
        distance: 'Cerca',
        steps: { universal: 'B, B, FP', playstation: '⬅️ ⬅️ 🔲', xbox: '⬅️ ⬅️ 🇽', switch: '⬅️ ⬅️ 🇾' },
        description: 'Apuñala a hipervelocidad el torso del enemigo con decenas de estocadas de sus cuchillas de hueso.'
      },
      {
        name: 'Blade Spark',
        type: 'Especial',
        damage: '80 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, B, BP', playstation: '⬇️ ⬅️ 🔺', xbox: '⬇️ ⬅️ 🇾', switch: '⬇️ ⬅️ 🇽' },
        description: 'Choca ambas cuchillas de antebrazo emitiendo una llamarada de chispas afiladas.'
      },
      {
        name: 'Food For Thought / Tarkatan Feast',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Cerca',
        steps: { universal: 'B, D, B, BP', playstation: '⬅️ ⬇️ ⬅️ 🔺', xbox: '⬅️ ⬇️ ⬅️ 🇾', switch: '⬅️ ⬇️ ⬅️ 🇽' },
        description: 'Corta el rostro del oponente con sus cuchillas y le arranca el cerebro para comérselo a mordiscos.'
      }
    ]
  },
  {
    id: 'jax-briggs',
    name: 'Jax Briggs',
    alias: 'Mayor Jackson Briggs / Comandante de las Fuerzas Especiales',
    category: 'Plantilla Principal',
    gamesAppeared: ['mk8', 'mk9', 'mkx', 'mk11'],
    originRealm: 'Earthrealm',
    accentColor: '#64748b',
    bgGradient: 'from-slate-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'JX', primaryColor: '#64748b', secondaryColor: '#1e293b', iconSymbol: '🦾' },
    bioSummary: 'Líder condecorado de las Fuerzas Especiales. Tras perder sus brazos originales ante Ermac en MK9, fue equipado con implantes biónicos cibernéticos de alta potencia. En MK11 lucha contra el estrés postraumático y por el futuro de su hija Jacqui.',
    combatRole: 'Grappler de alto impacto con golpes sísmicos de brazos biónicos y medidor de calor creciente.',
    signatureWeapons: ['Brazos biónicos de titanio y calor', 'Lanzagranadas de combate', 'Golpe al suelo Ground Pound'],
    kameoPartnerRecommendation: 'Sonya (Kameo) o Kano (Kameo)',
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Pantalón militar con boina verde y brazos cibernéticos pulidos.',
        modelDesignDescription: 'Soldado formidable que mide fuerzas de impacto contra Lex Luthor y Superman.',
        loreArc: 'Investiga la anomalía espacial que fusiona las bases militares de Earthrealm con Metrópolis.',
        signatureMechanic: 'Ground Pound y bionic punch.',
        iconicQuote: 'Gotcha!'
      },
      {
        gameKey: 'mk9',
        gameTitle: 'Mortal Kombat 9 (2011)',
        releaseYear: 2011,
        costumeAesthetic: 'Uniforme militar de camuflaje urbano con brazos biónicos recién instalados.',
        modelDesignDescription: 'Momento icónico donde Ermac telequinéticamente le arranca ambos brazos.',
        loreArc: 'Protege a Sonya Blade durante la invasión de Outworld antes de caer ante Sindel.',
        signatureMechanic: 'Gotcha Grab con golpes rítmicos.',
        iconicQuote: 'Bring it on!'
      },
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Ropa de granjero retirado con chaleco de cuero y brazos cibernéticos oscurecidos.',
        modelDesignDescription: 'Veterano marcado psicológicamente por su periodo como retornado espectral.',
        loreArc: 'Regresa del retiro para ayudar a Sonya y proteger a su hija Jacqui en la lucha contra Shinnok.',
        signatureMechanic: 'Variaciones: Heavy Weapons, Pumped Up y Wrestler.',
        iconicQuote: 'I fought for my life, and I\'ll fight for hers!'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Chaqueta militar contemporánea con brazos biónicos mecánicos de calor.',
        modelDesignDescription: 'Mecánica de calor: sus brazos se calientan al rojo vivo aumentando su daño y velocidad.',
        loreArc: 'Manipulado temporalmente por Kronika con la promesa de borrar sus traumas pasados.',
        signatureMechanic: 'Arm Heat Gauge con Krushing Blows automáticos al llegar a temperatura máxima.',
        iconicQuote: 'These arms ain\'t just for show!'
      }
    ],
    moveset: [
      {
        name: 'Gotcha Grab',
        type: 'Especial',
        damage: '100 pts',
        distance: 'Cerca',
        steps: { universal: 'D, B, FP', playstation: '⬇️ ⬅️ 🔲', xbox: '⬇️ ⬅️ 🇽', switch: '⬇️ ⬅️ 🇾' },
        description: 'Agarra al rival del cuello y le propina hasta 5 puñetazos de titanio en el rostro gritando "Gotcha!".'
      },
      {
        name: 'Ground Pound',
        type: 'Especial',
        damage: '85 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, D, FK', playstation: '⬇️ ⬇️ ❌', xbox: '⬇️ ⬇️ 🇦', switch: '⬇️ ⬇️ 🇧' },
        description: 'Golpea el suelo con ambos brazos biónicos creando una onda sísmica imparable.'
      },
      {
        name: 'Coming In Hot',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Cerca',
        steps: { universal: 'F, D, D, BK', playstation: '➡️ ⬇️ ⬇️ ⭕', xbox: '➡️ ⬇️ ⬇️ 🇧', switch: '➡️ ⬇️ ⬇️ 🇦' },
        description: 'Calienta sus brazos biónicos hasta el blanco térmico y aplasta la cabeza del enemigo como un cenicero humeante.'
      }
    ]
  },
  {
    id: 'kano',
    name: 'Kano',
    alias: 'Líder del Black Dragon / Mercenario Cibernético',
    category: 'Plantilla Principal',
    gamesAppeared: ['mk8', 'mk9', 'mkx', 'mk11'],
    originRealm: 'Earthrealm (Australia)',
    accentColor: '#dc2626',
    bgGradient: 'from-red-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'KN', primaryColor: '#dc2626', secondaryColor: '#7f1d1d', iconSymbol: '🔴' },
    bioSummary: 'Líder amoral del clan de contrabandistas Black Dragon. Posee un ojo cibernético que dispara rayos láser infrarrojos y un núcleo cardíaco cibernético. Es el archienemigo personal de Sonya Blade y Jax Briggs.',
    combatRole: 'Luchador callejero agresivo con lanzamiento de cuchillos, rodillo Kano Ball y rayo ocular.',
    signatureWeapons: ['Ojo biónico con láser rojo', 'Cuchillos gemelos de mariposa', 'Núcleo cibernético'],
    kameoPartnerRecommendation: 'Kano (Kameo) o Stryker (Kameo)',
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Pantalones de cuero con arnés cruzado y ojo biónico plateado.',
        modelDesignDescription: 'Mercenario rudo que combate contra The Joker y Deathstroke por el control del tráfico de armas.',
        loreArc: 'Aprovecha la fusión dimensional para vender armas avanzadas al mejor postor.',
        signatureMechanic: 'Kano Ball y Eye Laser.',
        iconicQuote: 'No worries, mate!'
      },
      {
        gameKey: 'mk9',
        gameTitle: 'Mortal Kombat 9 (2011)',
        releaseYear: 2011,
        costumeAesthetic: 'Camiseta sin mangas con cartucheras y ojo biónico rojo incandescente.',
        modelDesignDescription: 'Traficante despiadado que abastece a las tropas de Shao Kahn con armamento militar terrestre.',
        loreArc: 'Provee al ejército de Outworld de armas de fuego y tortura a Sonya.',
        signatureMechanic: 'Kano Ball aéreo y Heart Rip.',
        iconicQuote: 'You want a bit of this?'
      },
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Barba canosa con implante cibernético cibernético en el pecho que cambia de color según la variación.',
        modelDesignDescription: 'Aspecto envejecido pero letal con tecnología del Black Dragon actualizada.',
        loreArc: 'Roba el amuleto de Shinnok para venderlo a Mileena en la guerra civil de Outworld.',
        signatureMechanic: 'Variaciones: Cutthroat, Cybernetic y Commando.',
        iconicQuote: 'I\'m an opportunist, mate.'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Atuendo militar callejero con cuchillos de combate y botella de cerveza en mano.',
        modelDesignDescription: 'Carisma salvaje con animaciones llenas de escupitajos, burlas y brutalidad callejera.',
        loreArc: 'Se une a Kronika para revitalizar el Black Dragon antes de ser ejecutado por Sonya.',
        signatureMechanic: 'Eye Laser amplificado con quemadura continua y Krushing Blows de cabeza.',
        iconicQuote: 'Fifty years old and still a ripper!'
      }
    ],
    moveset: [
      {
        name: 'Kano Ball',
        type: 'Especial',
        damage: '95 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, F, FK', playstation: '⬅️ ➡️ ❌', xbox: '⬅️ ➡️ 🇦', switch: '⬅️ ➡️ 🇧' },
        description: 'Se enrolla como una esfera metálica y sale disparado como una bala de cañón.'
      },
      {
        name: 'Optic Laser',
        type: 'Especial',
        damage: '85 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, F, FP', playstation: '⬅️ ➡️ 🔲', xbox: '⬅️ ➡️ 🇽', switch: '⬅️ ➡️ 🇾' },
        description: 'Dispara un haz láser rojo abrasador desde su ojo cibernético.'
      },
      {
        name: 'Last Dance / Face Dance',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Cerca',
        steps: { universal: 'F, D, D, FP', playstation: '➡️ ⬇️ ⬇️ 🔲', xbox: '➡️ ⬇️ ⬇️ 🇽', switch: '➡️ ⬇️ ⬇️ 🇾' },
        description: 'Baila un vals burlón con el rival antes de clavarle un cuchillo en el ojo y romperle el cuello.'
      }
    ]
  },
  {
    id: 'sonya-blade',
    name: 'Sonya Blade',
    alias: 'General Sonya Blade / Comandante de las Fuerzas Especiales',
    category: 'Plantilla Principal',
    gamesAppeared: ['mk8', 'mk9', 'mkx', 'mk11'],
    originRealm: 'Earthrealm',
    accentColor: '#10b981',
    bgGradient: 'from-emerald-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'SB', primaryColor: '#10b981', secondaryColor: '#064e3b', iconSymbol: '🎖️' },
    bioSummary: 'La primera mujer combatiente de Mortal Kombat y general al mando de las Fuerzas Especiales de los Estados Unidos. Madre de Cassie Cage y esposa de Johnny Cage. Dedicó su vida a cazar a Kano y repeler las invasiones extradimensionales.',
    combatRole: 'Luchadora veloz de artes marciales con aros de energía de muñeca, llaves de piernas y dron táctico.',
    signatureWeapons: ['Aros de plasma Energy Rings', 'Dron militar asistido K.A.T.', 'Llave de piernas Leg Grab'],
    kameoPartnerRecommendation: 'Jax (Kameo) o Sonya (Kameo)',
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Top verde militar con pantalones tácticos y brazaletes de plasma.',
        modelDesignDescription: 'Agente tenaz que confronta a Catwoman y Green Lantern.',
        loreArc: 'Coordina la defensa del planeta Tierra contra la invasión de Metrópolis.',
        signatureMechanic: 'Energy Rings y Leg Grab.',
        iconicQuote: 'Target neutralized.'
      },
      {
        gameKey: 'mk9',
        gameTitle: 'Mortal Kombat 9 (2011)',
        releaseYear: 2011,
        costumeAesthetic: 'Chaleco militar con gorra de campaña y guantes de combate.',
        modelDesignDescription: 'Determinada a rescatar a su compañero Jax de las garras de Shang Tsung.',
        loreArc: 'Sobrevive a la masacre de Sindel gracias a su agilidad y coraje.',
        signatureMechanic: 'Kiss of Death y Leg Grab.',
        iconicQuote: 'I don\'t back down from anyone.'
      },
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Uniforme de General con placas antibalas, boina y radio de campo.',
        modelDesignDescription: 'Madre severa y líder inflexible de la base de operaciones especiales.',
        loreArc: 'Comanda el asalto contra las fuerzas del inframundo de Shinnok.',
        signatureMechanic: 'Variaciones: Covert Ops, Demolition y Special Forces.',
        iconicQuote: 'Failure is not an option.'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Armadura táctica de asalto con dron aerotransportado y voz de Ronda Rousey.',
        modelDesignDescription: 'Comandante heroica que se sacrifica detonando los cimientos del templo del Netherrealm.',
        loreArc: 'Su versión joven es traída del pasado para presenciar su propio heroísmo futuro.',
        signatureMechanic: 'Asistencias de metralla con dron K.A.T. y Krushing Blows de Energy Ring.',
        iconicQuote: 'For the Special Forces!'
      }
    ],
    moveset: [
      {
        name: 'Energy Rings (Aros de Plasma)',
        type: 'Especial',
        damage: '80 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, F, FP', playstation: '⬅️ ➡️ 🔲', xbox: '⬅️ ➡️ 🇽', switch: '⬅️ ➡️ 🇾' },
        description: 'Dispara aros gemelos de energía concentrada desde sus guanteletes de muñeca.'
      },
      {
        name: 'Leg Grab (Tijera Voladora)',
        type: 'Especial',
        damage: '95 pts',
        distance: 'Cerca',
        steps: { universal: 'D, B, BK', playstation: '⬇️ ⬅️ ⭕', xbox: '⬇️ ⬅️ 🇧', switch: '⬇️ ⬅️ 🇦' },
        description: 'Se lanza haciendo el pino atrapando el cuello del enemigo con sus piernas para azotarlo en el suelo.'
      },
      {
        name: 'To The Choppa!',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Media',
        steps: { universal: 'D, F, B, BP', playstation: '⬇️ ➡️ ⬅️ 🔺', xbox: '⬇️ ➡️ ⬅️ 🇾', switch: '⬇️ ➡️ ⬅️ 🇽' },
        description: 'Llama por radio a un helicóptero artillado que vuela al ras despedazando al rival en sus hélices rotatorias.'
      }
    ]
  },

  // =========================================================================
  // BANDO DC COMICS & JEFES (MORTAL KOMBAT VS DC UNIVERSE · MK8)
  // =========================================================================
  {
    id: 'batman',
    name: 'Batman',
    alias: 'Bruce Wayne / El Caballero Oscuro de Gotham City',
    category: 'Universo DC (MK vs DC)',
    gamesAppeared: ['mk8'],
    originRealm: 'Gotham City (Universo DC)',
    accentColor: '#475569',
    bgGradient: 'from-slate-950 via-stone-900 to-black',
    image: '/src/assets/images/mk_batman_art_1792623255926.jpg',
    fallbackBadge: { initials: 'BM', primaryColor: '#475569', secondaryColor: '#1e293b', iconSymbol: '🦇' },
    bioSummary: 'El cruzado de la capa y estratega supremo de la Liga de la Justicia. Tras percibir la distorsión dimensional causada por Dark Kahn, lidera a los héroes de DC contra los guerreros de Mortal Kombat.',
    combatRole: 'Luchador táctico con batarangs, bombas de humo, capa de planeo y ganchos de agarre.',
    signatureWeapons: ['Batarangs de titanio', 'Gancho Grapnel Gun', 'Bomba de humo aturdidora'],
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Bati-traje blindado gris y negro con capa oscura y cinturón dorado táctico.',
        modelDesignDescription: 'Modelo 3D con daño progresivo de batalla, rasgaduras en la capa y textura de kevlar.',
        loreArc: 'Investiga la aparición de portales místicos y la desaparición de villanos en Gotham City.',
        signatureMechanic: 'Klose Kombat técnico y Heroic Brutality sin matar a sus adversarios.',
        iconicQuote: 'I am vengeance. I am the night. I am Batman!'
      }
    ],
    moveset: [
      {
        name: 'Batarang Toss',
        type: 'Especial',
        damage: '75 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, B, FP', playstation: '⬇️ ⬅️ 🔲', xbox: '⬇️ ⬅️ 🇽', switch: '⬇️ ⬅️ 🇾' },
        description: 'Lanza velozmente un batarang afilado que aturde al rival.'
      },
      {
        name: 'Smoke Escape',
        type: 'Especial',
        damage: '0 pts (Evasión)',
        distance: 'Cualquiera',
        steps: { universal: 'D, B, BP', playstation: '⬇️ ⬅️ 🔺', xbox: '⬇️ ⬅️ 🇾', switch: '⬇️ ⬅️ 🇽' },
        description: 'Lanza una cápsula de humo y desaparece reapareciendo tras el contrincante.'
      },
      {
        name: 'Bat Swarm / Heroic Brutality',
        type: 'Heroic Brutality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Cerca',
        steps: { universal: 'D, D, D, U, FK', playstation: '⬇️ ⬇️ ⬇️ ⬆️ ❌', xbox: '⬇️ ⬇️ ⬇️ ⬆️ 🇦', switch: '⬇️ ⬇️ ⬇️ ⬆️ 🇧' },
        description: 'Invoca una bandada ensordecedora de murciélagos que cubre al rival mientras descarga una serie fulminante de golpes de judo.'
      }
    ]
  },
  {
    id: 'superman',
    name: 'Superman',
    alias: 'Kal-El / Clark Kent / El Hombre de Acero',
    category: 'Universo DC (MK vs DC)',
    gamesAppeared: ['mk8'],
    originRealm: 'Metropolis / Krypton (Universo DC)',
    accentColor: '#2563eb',
    bgGradient: 'from-blue-950 via-stone-900 to-black',
    image: '/src/assets/images/mk_superman_art_1792623361020.jpg',
    fallbackBadge: { initials: 'SM', primaryColor: '#2563eb', secondaryColor: '#1d4ed8', iconSymbol: '🦸' },
    bioSummary: 'El protector supremo de Metropolis y el héroe más poderoso de la Tierra de DC. En MK vs DC se ve afectado por la rabia cósmica de Dark Kahn y la magia de los reinos, lo que lo vuelve vulnerable pero imparable.',
    combatRole: 'Titán aéreo de fuerza colosal con visión calorífica, aliento congelante y puñetazos meteóricos.',
    signatureWeapons: ['Visión térmica calorífica', 'Aliento ártico congelante', 'Fuerza kryptoniana'],
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Traje kryptoniano azul cobalto con escudo de la "S" y capa roja imperial.',
        modelDesignDescription: 'Modelo 3D imponente con ojos que brillan al rojo vivo al usar la visión térmica.',
        loreArc: 'Lucha contra Raiden en las ruinas de Metropolis antes de darse cuenta del engaño de Dark Kahn.',
        signatureMechanic: 'Free-Fall Kombat con puñetazos en caída libre desde la atmósfera.',
        iconicQuote: 'This madness ends now!'
      }
    ],
    moveset: [
      {
        name: 'Heat Vision (Visión Calorífica)',
        type: 'Especial',
        damage: '90 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, B, FP', playstation: '⬅️ ⬅️ 🔲', xbox: '⬅️ ⬅️ 🇽', switch: '⬅️ ⬅️ 🇾' },
        description: 'Dispara dos rayos láser térmicos carmesí continuos desde sus pupilas quemando al adversario.'
      },
      {
        name: 'Freeze Breath (Aliento Ártico)',
        type: 'Especial',
        damage: '0 pts (Congelación)',
        distance: 'Media',
        steps: { universal: 'D, B, BP', playstation: '⬇️ ⬅️ 🔺', xbox: '⬇️ ⬅️ 🇾', switch: '⬇️ ⬅️ 🇽' },
        description: 'Exhala una ráfaga glacial que inmoviliza al rival en hielo.'
      },
      {
        name: 'Ground Slam & Beatdown',
        type: 'Heroic Brutality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Cerca',
        steps: { universal: 'D, D, F, F, BP', playstation: '⬇️ ⬇️ ➡️ ➡️ 🔺', xbox: '⬇️ ⬇️ ➡️ ➡️ 🇾', switch: '⬇️ ⬇️ ➡️ ➡️ 🇽' },
        description: 'Entierra al rival en el asfalto de un golpe colosal y lo deja noqueado con un gancho que cimbra la tierra.'
      }
    ]
  },
  {
    id: 'the-joker',
    name: 'The Joker',
    alias: 'El Príncipe Payaso del Crimen de Gotham',
    category: 'Universo DC (MK vs DC)',
    gamesAppeared: ['mk8', 'mk11'],
    originRealm: 'Gotham City (DC) / Caos',
    accentColor: '#9333ea',
    bgGradient: 'from-purple-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'JK', primaryColor: '#9333ea', secondaryColor: '#581c87', iconSymbol: '🃏' },
    bioSummary: 'El psicópata más infame de Gotham City. Su locura absoluta y arsenal homicida de payasadas letales lo llevaron de MK vs DC a ser invitado estelar en Mortal Kombat 11.',
    combatRole: 'Zonificador impredecible con cajas sorpresa, muñecos bomba, bastón de payaso y pistola trampa.',
    signatureWeapons: ['Bastón de truco', 'Pistola con bandera "BANG!"', 'Caja de sorpresas con guante boxeador'],
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Traje de tres piezas morado con corbatín naranja y flor ácida.',
        modelDesignDescription: 'Diseño cómico pero perturbador con risa continua y naipes afilados.',
        loreArc: 'Fascinado por la brutalidad de Mortal Kombat, busca sembrar la anarquía entre los reinos.',
        signatureMechanic: 'Joker\'s Laugh y Fake Gun.',
        iconicQuote: 'Why so serious?'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Traje de gala morado ensangrentado con guantes blancos y maquillaje agrietado.',
        modelDesignDescription: 'Modelo hiperrealista con sonrisas desquiciadas, muñeco ventrílocuo de Batman y cuchillos.',
        loreArc: 'Aparición estelar DLC con diálogos hilarantes contra Scorpion, Sub-Zero y Shang Tsung.',
        signatureMechanic: 'Bouncing Batman doll y Krushing Blows con el bastón.',
        iconicQuote: 'Now that\'s a punchline!'
      }
    ],
    moveset: [
      {
        name: 'Trick Pistol (Broma Mortal)',
        type: 'Especial',
        damage: '85 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, F, FP', playstation: '⬅️ ➡️ 🔲', xbox: '⬅️ ➡️ 🇽', switch: '⬅️ ➡️ 🇾' },
        description: 'Dispara una bandera de broma y de inmediato jala un segundo gatillo con una bala real.'
      },
      {
        name: 'Pop Goes The Mortal',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Media',
        steps: { universal: 'D, D, B, BK', playstation: '⬇️ ⬇️ ⬅️ ⭕', xbox: '⬇️ ⬇️ ⬅️ 🇧', switch: '⬇️ ⬇️ ⬅️ 🇦' },
        description: 'Regala un pastel sorpresa al contrincante que explota en confeti de sangre y vísceras.'
      }
    ]
  },
  {
    id: 'dark-kahn',
    name: 'Dark Kahn',
    alias: 'Fusión Cósmica de Shao Kahn y Darkseid / Entidad de la Furia',
    category: 'Universo DC (MK vs DC)',
    gamesAppeared: ['mk8'],
    originRealm: 'Anomalía Dimensional del Nexo',
    accentColor: '#f59e0b',
    bgGradient: 'from-amber-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'DK', primaryColor: '#f59e0b', secondaryColor: '#78350f', iconSymbol: '💥' },
    bioSummary: 'El monstruoso jefe final nacido de la colisión simultánea de portales: cuando Raiden derriba a Shao Kahn y Superman empuja a Darkseid, ambos tiranos se funden en el Nexo cósmico en Dark Kahn.',
    combatRole: 'Jefe supremo colosal con Rayos Omega en zigzag, martillo de la ira y ondas sísmicas de furia pura.',
    signatureWeapons: ['Efecto Omega destructor', 'Wrath Hammer de roca espacial', 'Ira dimensional'],
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Cuerpo de roca volcánica ardiente de Darkseid con la coraza y el casco calavera de Shao Kahn.',
        modelDesignDescription: 'Jefe final titánico rodeado de relámpagos ámbar y una voz dual distorsionada.',
        loreArc: 'Intenta consumir ambos universos en una guerra eterna de furia cósmica.',
        signatureMechanic: 'Super Armadura ininterrumpible y Rayos Omega zigzagueantes.',
        iconicQuote: 'I am all power! I am Dark Kahn!'
      }
    ],
    moveset: [
      {
        name: 'Omega Wrath Beam',
        type: 'Especial',
        damage: '150 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, F, BP', playstation: '⬅️ ➡️ 🔺', xbox: '⬅️ ➡️ 🇾', switch: '⬅️ ➡️ 🇽' },
        description: 'Dispara un rayo omega carmesí en ángulo que persigue al oponente y lo azota.'
      },
      {
        name: 'Cosmic Shockwave',
        type: 'Especial',
        damage: '130 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, D, BK', playstation: '⬇️ ⬇️ ⭕', xbox: '⬇️ ⬇️ 🇧', switch: '⬇️ ⬇️ 🇦' },
        description: 'Golpea el suelo desatando una onda de fuego cósmico que consume todo el escenario.'
      }
    ]
  },
  {
    id: 'green-lantern',
    name: 'Green Lantern (Hal Jordan)',
    alias: 'Hal Jordan / Caballero Esmeralda del Sector 2814',
    category: 'Universo DC (MK vs DC)',
    gamesAppeared: ['mk8'],
    originRealm: 'Coast City (DC) / Oa',
    accentColor: '#22c55e',
    bgGradient: 'from-green-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'GL', primaryColor: '#22c55e', secondaryColor: '#14532d', iconSymbol: '💍' },
    bioSummary: 'El más legendario de los Green Lantern Corps. Armado con el anillo de poder de voluntad esmeralda capaz de materializar cualquier constructo imaginable. En MK vs DC enfrenta a los guerreros de Outworld.',
    combatRole: 'Zonificador con constructos de energía sólida verde (muros, puños gigantes y misiles de luz).',
    signatureWeapons: ['Anillo de poder de voluntad de Oa', 'Batería de energía esmeralda'],
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Traje esmeralda de linterna con guantes blancos y el símbolo de la batería en el pecho.',
        modelDesignDescription: 'Efectos de brillo verde neón en cada golpe y constructo.',
        loreArc: 'Defiende Coast City de las invasiones de criaturas tarkatanas y esbirros del Netherrealm.',
        signatureMechanic: 'Ring Shield y Emerald Hammer.',
        iconicQuote: 'In brightest day, in blackest night!'
      }
    ],
    moveset: [
      {
        name: 'Emerald Fist Slam',
        type: 'Especial',
        damage: '90 pts',
        distance: 'Media',
        steps: { universal: 'B, F, FP', playstation: '⬅️ ➡️ 🔲', xbox: '⬅️ ➡️ 🇽', switch: '⬅️ ➡️ 🇾' },
        description: 'Materializa un puño colosal de luz sólida verde que estampa al rival contra la pared.'
      },
      {
        name: 'Ring Shield (Escudo Esmeralda)',
        type: 'Especial',
        damage: '0 pts (Refleja)',
        distance: 'Cerca',
        steps: { universal: 'D, B, BP', playstation: '⬇️ ⬅️ 🔺', xbox: '⬇️ ⬅️ 🇾', switch: '⬇️ ⬅️ 🇽' },
        description: 'Levanta una barrera de energía de voluntad que absorbe y devuelve proyectiles.'
      }
    ]
  },
  {
    id: 'the-flash',
    name: 'The Flash',
    alias: 'Barry Allen / El Hombre más Rápido del Mundo',
    category: 'Universo DC (MK vs DC)',
    gamesAppeared: ['mk8'],
    originRealm: 'Central City (DC) / Speed Force',
    accentColor: '#ef4444',
    bgGradient: 'from-red-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'FL', primaryColor: '#ef4444', secondaryColor: '#991b1b', iconSymbol: '⚡' },
    bioSummary: 'El velocista escarlata conectado a la Speed Force. Capaz de moverse y golpear a velocidades superiores a la luz. En MK vs DC rivaliza con Liu Kang y Scorpion en veloces duelos acrobáticos.',
    combatRole: 'Luchador de movilidad extrema con carrera infinita, ráfagas de puñetazos supersónicos y tornados.',
    signatureWeapons: ['Speed Force (Fuerza de la Velocidad)', 'Rayos cinéticos'],
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Traje rojo carmesí ceñido con relámpagos dorados y alas en las orejas.',
        modelDesignDescription: 'Estelas de luz roja y amarilla acompañan cada una de sus animaciones de movimiento.',
        loreArc: 'Cruza dimensiones accidentalmente corriendo a través de la anomalía de Dark Kahn.',
        signatureMechanic: 'Speed Punch Flurry y Tornado Spin.',
        iconicQuote: 'Don\'t blink, or you\'ll miss it!'
      }
    ],
    moveset: [
      {
        name: 'Supersonic Flurry (Ráfaga Relámpago)',
        type: 'Especial',
        damage: '100 pts',
        distance: 'Cerca',
        steps: { universal: 'B, F, FP', playstation: '⬅️ ➡️ 🔲', xbox: '⬅️ ➡️ 🇽', switch: '⬅️ ➡️ 🇾' },
        description: 'Conecta 50 puñetazos a hipervelocidad en menos de un segundo.'
      },
      {
        name: 'Speed Tornado',
        type: 'Especial',
        damage: '85 pts',
        distance: 'Media',
        steps: { universal: 'D, B, FK', playstation: '⬇️ ⬅️ ❌', xbox: '⬇️ ⬅️ 🇦', switch: '⬇️ ⬅️ 🇧' },
        description: 'Gira en círculos creando un embudo de viento que eleva al rival por los aires.'
      }
    ]
  },
  {
    id: 'wonder-woman',
    name: 'Wonder Woman',
    alias: 'Diana Prince / Princesa de Themyscira',
    category: 'Universo DC (MK vs DC)',
    gamesAppeared: ['mk8'],
    originRealm: 'Themyscira (DC)',
    accentColor: '#e11d48',
    bgGradient: 'from-rose-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'WW', primaryColor: '#e11d48', secondaryColor: '#881337', iconSymbol: '👑' },
    bioSummary: 'La princesa amazona bendecida por los dioses del Olimpo con fuerza titánica y habilidades guerreras sin igual. En MK vs DC se bate en duelo con Kitana y Sonya en combate cuerpo a cuerpo.',
    combatRole: 'Guerrera disciplinada de combate cerrado con Lazo de la Verdad, tiara bumerán y brazaletes reflectores.',
    signatureWeapons: ['Lasso of Truth (Lazo de la Verdad)', 'Brazaletes de sumisión de Aegis', 'Tiara dorada'],
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Coraza amazona roja y azul con águila dorada y falda de combate con estrellas.',
        modelDesignDescription: 'Modelo estilizado con animaciones acrobáticas de lucha grecorromana.',
        loreArc: 'Defiende Themyscira de las incursiones de asesinos edenianos y hechiceros.',
        signatureMechanic: 'Bracelets Deflect y Lasso Slam.',
        iconicQuote: 'By the gods of Olympus!'
      }
    ],
    moveset: [
      {
        name: 'Lasso of Truth Grab',
        type: 'Especial',
        damage: '95 pts',
        distance: 'Media',
        steps: { universal: 'B, F, FP', playstation: '⬅️ ➡️ 🔲', xbox: '⬅️ ➡️ 🇽', switch: '⬅️ ➡️ 🇾' },
        description: 'Lanza su lazo dorado enredando al rival para azotarlo fuertemente contra el piso.'
      },
      {
        name: 'Bracelets of Aegis (Reflect)',
        type: 'Especial',
        damage: '0 pts (Refleja)',
        distance: 'Cerca',
        steps: { universal: 'D, B, BP', playstation: '⬇️ ⬅️ 🔺', xbox: '⬇️ ⬅️ 🇾', switch: '⬇️ ⬅️ 🇽' },
        description: 'Choca sus brazaletes amazónicos produciendo una onda de choque luminosa que repele ataques.'
      }
    ]
  },
  {
    id: 'deathstroke',
    name: 'Deathstroke',
    alias: 'Slade Wilson / El Asesino Más Letal del Mundo',
    category: 'Universo DC (MK vs DC)',
    gamesAppeared: ['mk8'],
    originRealm: 'Gotham City / Universo DC',
    accentColor: '#ea580c',
    bgGradient: 'from-orange-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'DS', primaryColor: '#ea580c', secondaryColor: '#7c2d12', iconSymbol: '🎯' },
    bioSummary: 'El mercenario de élite con reflejos mejorados por suero militar, maestro en artes marciales y armas de fuego. En MK vs DC se enfrenta a Scorpion y Baraka en brutales duelos con espadas.',
    combatRole: 'Tirador y duelista letal con rifles de asalto, pistolas duales y espada de titanio.',
    signatureWeapons: ['Espada ancha de titanio', 'Rifle de asalto de combate', 'Pistolas duales'],
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Máscara bicolor naranja y negra con armadura de malla de escamas y cartucheras.',
        modelDesignDescription: 'Asesino táctico implacable con animaciones de disparo rápido.',
        loreArc: 'Contratado por Lex Luthor para infiltrarse en Outworld y eliminar a los líderes del torneo.',
        signatureMechanic: 'Pistol Shots y Sword Flip.',
        iconicQuote: 'Consider yourself terminated.'
      }
    ],
    moveset: [
      {
        name: 'Twin Pistols Fire',
        type: 'Especial',
        damage: '85 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, F, FP', playstation: '⬅️ ➡️ 🔲', xbox: '⬅️ ➡️ 🇽', switch: '⬅️ ➡️ 🇾' },
        description: 'Dispara una ráfaga certera con ambas pistolas hacia el torso del oponente.'
      },
      {
        name: 'Broadsword Slash',
        type: 'Especial',
        damage: '100 pts',
        distance: 'Media',
        steps: { universal: 'D, F, BP', playstation: '⬇️ ➡️ 🔺', xbox: '⬇️ ➡️ 🇾', switch: '⬇️ ➡️ 🇽' },
        description: 'Desenvaina su espada ejecutando un corte ascendente giratorio.'
      }
    ]
  },
  {
    id: 'catwoman',
    name: 'Catwoman',
    alias: 'Selina Kyle / La Ladrona Más Hábil de Gotham',
    category: 'Universo DC (MK vs DC)',
    gamesAppeared: ['mk8'],
    originRealm: 'Gotham City (DC)',
    accentColor: '#7c3aed',
    bgGradient: 'from-violet-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'CW', primaryColor: '#7c3aed', secondaryColor: '#4c1d95', iconSymbol: '🐾' },
    bioSummary: 'Ladrona de guante blanco y acróbata magistral de Gotham City. En MK vs DC se ve arrastrada al conflicto interdimensional donde mide garras y látigo contra Sonya Blade y Kitana.',
    combatRole: 'Luchadora ágil con ataques aéreos de látigo de cuero, arañazos con garras y volteretas evasivas.',
    signatureWeapons: ['Látigo de combate', 'Garras afiladas de diamantes'],
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Catsuit de cuero negro ajustado con gafas de visión nocturna en la capucha.',
        modelDesignDescription: 'Acrobacias felinas de alta velocidad en combates cerrados.',
        loreArc: 'Intenta robar gemas arcanas de Outworld antes de verse envuelta en la guerra de Dark Kahn.',
        signatureMechanic: 'Whip Stride y Cat Claw.',
        iconicQuote: 'Purr-fect.'
      }
    ],
    moveset: [
      {
        name: 'Bullwhip Strike',
        type: 'Especial',
        damage: '80 pts',
        distance: 'Media / Lejos',
        steps: { universal: 'B, F, FP', playstation: '⬅️ ➡️ 🔲', xbox: '⬅️ ➡️ 🇽', switch: '⬅️ ➡️ 🇾' },
        description: 'Chasquea su látigo atrapando la pierna del rival para jalarlo y derribarlo.'
      }
    ]
  },
  {
    id: 'lex-luthor',
    name: 'Lex Luthor',
    alias: 'Alexander Joseph Luthor / Genio Multimillonario de LexCorp',
    category: 'Universo DC (MK vs DC)',
    gamesAppeared: ['mk8'],
    originRealm: 'Metropolis (DC)',
    accentColor: '#16a34a',
    bgGradient: 'from-emerald-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'LL', primaryColor: '#16a34a', secondaryColor: '#14532d', iconSymbol: '🧪' },
    bioSummary: 'El brillante magnate científico y archienemigo de Superman. En MK vs DC pilota su armadura de guerra de kryptonita de última generación y pacta una alianza temporal con Shang Tsung y Quan Chi.',
    combatRole: 'Blindado pesado con misiles teledirigidos, campos de fuerza y guanteletes de energía de kryptonita.',
    signatureWeapons: ['Armadura Warsuit de titanio y kryptonita', 'Misiles de muñeca teledirigidos'],
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Armadura pesada de combate verde y morada con reactores en la espalda.',
        modelDesignDescription: 'Modelo blindado imponente con cañones de muñeca y propulsores.',
        loreArc: 'Conspira con Shang Tsung para aprovechar la ira cósmica y destruir a Superman.',
        signatureMechanic: 'Warsuit Rockets y Force Field.',
        iconicQuote: 'I am the pinnacle of human intellect!'
      }
    ],
    moveset: [
      {
        name: 'Warsuit Rocket Barrage',
        type: 'Especial',
        damage: '95 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, B, FP', playstation: '⬇️ ⬅️ 🔲', xbox: '⬇️ ⬅️ 🇽', switch: '⬇️ ⬅️ 🇾' },
        description: 'Dispara una andanada de mini-misiles balísticos que impactan en el pecho del rival.'
      }
    ]
  },
  {
    id: 'shazam',
    name: 'Capitán Marvel (Shazam)',
    alias: 'Billy Batson / El Mortal Más Poderoso de la Tierra',
    category: 'Universo DC (MK vs DC)',
    gamesAppeared: ['mk8'],
    originRealm: 'Fawcett City (DC) / Roca de la Eternidad',
    accentColor: '#f59e0b',
    bgGradient: 'from-amber-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'SH', primaryColor: '#f59e0b', secondaryColor: '#78350f', iconSymbol: '⚡' },
    bioSummary: 'Al pronunciar la palabra mágica "¡SHAZAM!", el joven Billy Batson es investido con los poderes de Salomón, Hércules, Atlas, Zeus, Aquiles y Mercurio. En MK vs DC su magia lo hace rival natural del Dios del Trueno Raiden.',
    combatRole: 'Luchador mágico de impacto pesado con relámpagos divinos de Zeus y embestidas supersónicas.',
    signatureWeapons: ['Rayo místico de Zeus', 'Fuerza sobrehumana de Hércules'],
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Traje rojo brillante con rayo dorado en el pecho y capa corta blanca con ribetes de oro.',
        modelDesignDescription: 'Modelo 3D fornido con relámpagos mágicos que brotan de su pecho.',
        loreArc: 'Enfrenta a Raiden en un choque épico de deidades del relámpago.',
        signatureMechanic: 'Thunder Strike y Power of Zeus.',
        iconicQuote: '¡SHAZAM!'
      }
    ],
    moveset: [
      {
        name: 'Zeus Lightning Call',
        type: 'Especial',
        damage: '100 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, B, FP', playstation: '⬇️ ⬅️ 🔲', xbox: '⬇️ ⬅️ 🇽', switch: '⬇️ ⬅️ 🇾' },
        description: 'Invoca un relámpago sagrado que cae desde el cielo electrocutando al adversario.'
      }
    ]
  },
  {
    id: 'darkseid',
    name: 'Darkseid',
    alias: 'Señor Supremo de Apokolips / Dios del Mal',
    category: 'Universo DC (MK vs DC)',
    gamesAppeared: ['mk8'],
    originRealm: 'Apokolips (DC)',
    accentColor: '#6b7280',
    bgGradient: 'from-stone-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'DS', primaryColor: '#6b7280', secondaryColor: '#374151', iconSymbol: '👁️' },
    bioSummary: 'El tirano cósmico de Apokolips que busca la Ecuación Anti-Vida para doblegar toda la voluntad del universo. En MK vs DC es empujado al portal de Boom Tube donde se fusiona con Shao Kahn creando a Dark Kahn.',
    combatRole: 'Monolito de piedra cósmica con Rayos Omega teledirigidos imposibles de esquivar y puñetazos aplastantes.',
    signatureWeapons: ['Efecto Omega / Omega Beams', 'Fuerza divina de los Nuevos Dioses'],
    evolution: [
      {
        gameKey: 'mk8',
        gameTitle: 'Mortal Kombat vs. DC Universe (2008)',
        releaseYear: 2008,
        costumeAesthetic: 'Cuerpo de piedra gris agrietada con túnica azul oscura y cinturón Omega.',
        modelDesignDescription: 'Jefe desbloqueable temible con postura señorial con los brazos cruzados tras la espalda.',
        loreArc: 'Intenta conquistar la Tierra y Outworld simultáneamente.',
        signatureMechanic: 'Omega Beam que viaja en ángulos rectos persiguiendo al enemigo.',
        iconicQuote: 'I am the end of all things!'
      }
    ],
    moveset: [
      {
        name: 'Omega Effect Ray',
        type: 'Especial',
        damage: '120 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, F, BP', playstation: '⬅️ ➡️ 🔺', xbox: '⬅️ ➡️ 🇾', switch: '⬅️ ➡️ 🇽' },
        description: 'Dispara rayos carmesí zigzagueantes desde sus ojos que persiguen al enemigo por toda la pantalla.'
      }
    ]
  },

  // =========================================================================
  // MORTAL KOMBAT X / XL (MK10 · 2015) - PLANTILLA, JEFES & INVITADOS
  // =========================================================================
  {
    id: 'cassie-cage',
    name: 'Cassie Cage',
    alias: 'Sargento Cassandra Carlton Cage / Comandante de la Unidad Kombat',
    category: 'Plantilla Principal',
    gamesAppeared: ['mkx', 'mk11'],
    originRealm: 'Earthrealm',
    accentColor: '#06b6d4',
    bgGradient: 'from-cyan-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'CC', primaryColor: '#06b6d4', secondaryColor: '#0e7490', iconSymbol: '🔫' },
    bioSummary: 'Hija de Johnny Cage y Sonya Blade. Combina el sarcasmo y el poder ancestral de sombra verde de su padre con el entrenamiento militar táctico de élite de su madre. En MKX salva al mundo derrotando a Corrupted Shinnok.',
    combatRole: 'Luchadora veloz con pistolas gemelas, bastón de aturdimiento, drones y sombra verde de agarre Nut Kick.',
    signatureWeapons: ['Pistolas gemelas semiautomáticas', 'Poder de sombra verde ancestral', 'Dron militar'],
    kameoPartnerRecommendation: 'Sonya (Kameo) o Stryker (Kameo)',
    evolution: [
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Traje táctico ceñido con armadura de pecho y auriculares de combate.',
        modelDesignDescription: 'Líder de la nueva generación con chicle en la boca y selfies en sus Fatalities.',
        loreArc: 'Despierta su poder verde heredado para derrotar al Dios Mayor Corrupted Shinnok en el Jinsei.',
        signatureMechanic: 'Variaciones: Hollywood, Brawler y Spec Ops.',
        iconicQuote: 'You just got Cage\'d. Like father, like daughter!'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Armadura futurista de combate con dron asistido y gafas de sol.',
        modelDesignDescription: 'Comandante condecorada que asume el liderazgo total tras la muerte de su madre Sonya.',
        loreArc: 'Lidera la invasión a la fortaleza de Kronika para defender el legado de su familia.',
        signatureMechanic: 'Drone Burst y Glow Kick con sombra verde.',
        iconicQuote: 'Officer on deck!'
      }
    ],
    moveset: [
      {
        name: 'Glow Kick',
        type: 'Especial',
        damage: '95 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, F, FK', playstation: '⬅️ ➡️ ❌', xbox: '⬅️ ➡️ 🇦', switch: '⬅️ ➡️ 🇧' },
        description: 'Patada voladora envuelta en la energía verde ancestral de su padre Johnny Cage.'
      },
      {
        name: 'Nut Buster (Nut Kick)',
        type: 'Especial',
        damage: '90 pts',
        distance: 'Cerca',
        steps: { universal: 'B, D, FP', playstation: '⬅️ ⬇️ 🔲', xbox: '⬅️ ⬇️ 🇽', switch: '⬅️ ⬇️ 🇾' },
        description: 'Patea con fuerza demoledora los genitales del oponente provocando un colapso instantáneo.'
      },
      {
        name: 'Selfie Fatality',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Media',
        steps: { universal: 'D, D, B, F, FP', playstation: '⬇️ ⬇️ ⬅️ ➡️ 🔲', xbox: '⬇️ ⬇️ ⬅️ ➡️ 🇽', switch: '⬇️ ⬇️ ⬅️ ➡️ 🇾' },
        description: 'Parte la mandíbula del rival de un puñetazo, se toma una selfie con el cadáver y la sube a Friendbook.'
      }
    ]
  },
  {
    id: 'kotal-kahn',
    name: 'Kotal Kahn',
    alias: 'Ko\'atal / Dios de la Guerra Osh-Tekk / Emperador de Outworld',
    category: 'Plantilla Principal',
    gamesAppeared: ['mkx', 'mk11'],
    originRealm: 'Osh-Tekk / Outworld',
    accentColor: '#14b8a6',
    bgGradient: 'from-teal-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'KK', primaryColor: '#14b8a6', secondaryColor: '#0f766e', iconSymbol: '☀️' },
    bioSummary: 'Noble guerrero de la raza Osh-Tekk venerado en la antigua Tierra como el dios solar Buluc. Derrocó a Mileena para convertirse en el nuevo emperador de Outworld, instaurando un código de justicia y honor militar.',
    combatRole: 'Guerrero pesado de alcance medio con espada Macuahuitl azteca, rayos de sol ardientes y transformación en jaguar.',
    signatureWeapons: ['Gran espada Macuahuitl con dientes de obsidiana', 'Rayos de luz solar mística', 'Tótem de sangre'],
    evolution: [
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Piel azulada con pintura corporal verde y dorada, penacho azteca con plumas de quetzal.',
        modelDesignDescription: 'Diseño solemne y majestuoso con espada Macuahuitl de gran escala.',
        loreArc: 'Gobierna Outworld en una sangrienta guerra civil contra la rebelión de Mileena.',
        signatureMechanic: 'Variaciones: War God, Sun God y Blood God.',
        iconicQuote: 'I fight for the survival of Outworld!'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Armadura imperial de oro puro y cuero trenzado, con capa carmesí.',
        modelDesignDescription: 'Modelo hiperrealista con transformación completa en jaguar negro y tótem de sacrificio.',
        loreArc: 'Lucha contra el renacido Shao Kahn; queda paralizado tras un brutal choque de columnas vertebrales y cede el trono a Kitana.',
        signatureMechanic: 'Rayos de sol curativos y daño de tótem acumulable.',
        iconicQuote: 'By the light of the Osh-Tekk!'
      }
    ],
    moveset: [
      {
        name: 'Sun Beam (Rayo Solar Devastador)',
        type: 'Especial',
        damage: '90 pts (Curación / Daño)',
        distance: 'Cualquiera',
        steps: { universal: 'D, F, BK', playstation: '⬇️ ➡️ ⭕', xbox: '⬇️ ➡️ 🇧', switch: '⬇️ ➡️ 🇦' },
        description: 'Hace descender un rayo de sol ardiente que quema al rival si está adentro o cura a Kotal.'
      },
      {
        name: 'Macuahuitl Slash',
        type: 'Especial',
        damage: '105 pts',
        distance: 'Media',
        steps: { universal: 'D, B, BP', playstation: '⬇️ ⬅️ 🔺', xbox: '⬇️ ⬅️ 🇾', switch: '⬇️ ⬅️ 🇽' },
        description: 'Blandiendo su espada azteca parte el pecho del adversario en una descarga pesada.'
      }
    ]
  },
  {
    id: 'dvorah',
    name: 'D\'Vorah',
    alias: 'Primera Ministra Kytinn / El Enjambre Viviente',
    category: 'Plantilla Principal',
    gamesAppeared: ['mkx', 'mk11'],
    originRealm: 'Arnyek / Outworld',
    accentColor: '#eab308',
    bgGradient: 'from-yellow-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'DV', primaryColor: '#eab308', secondaryColor: '#713f12', iconSymbol: '🦟' },
    bioSummary: 'Perteneciente a la raza insectoide Kytinn. No tiene lealtad individual, solo obedece a la supervivencia de su Enjambre (The Hive). Responsable de asesinar a Mileena en MKX y a Scorpion (Hanzo Hasashi) en MK11.',
    combatRole: 'Zonificadora y trampera grotesca con aguijones retráctiles en la espalda (ovipositores), insectos parásitos y charcos de ácido.',
    signatureWeapons: ['Cuatro ovipositores afilados en la espalda', 'Larvas y avispas devoradoras', 'Venenos corrosivos'],
    evolution: [
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Cuerpo quitinoso amarillo con capucha de tela andrajosa y capullos larvarios.',
        modelDesignDescription: 'Modelo bizarro con voz zumbante en tercera persona ("This One").',
        loreArc: 'Finge servir a Kotal Kahn mientras conspira en secreto para liberar a Shinnok.',
        signatureMechanic: 'Variaciones: Brood Mother, Swarm Queen y Venomous.',
        iconicQuote: 'This One serves only the Hive.'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Carcasa de exoesqueleto endurecido con alas membranosas traslúcidas.',
        modelDesignDescription: 'Fotorrealismo extremo en los fluidos verdes insectoides y larvas parásitas.',
        loreArc: 'Se alía con Kronika y asesina mortalmente con su veneno al gran maestro Hanzo Hasashi.',
        signatureMechanic: 'Resurgimiento en forma de larva jugable tras ser derrotada.',
        iconicQuote: 'The Hive survives!'
      }
    ],
    moveset: [
      {
        name: 'Ovipositor Strike',
        type: 'Especial',
        damage: '95 pts',
        distance: 'Media',
        steps: { universal: 'B, F, BP', playstation: '⬅️ ➡️ 🔺', xbox: '⬅️ ➡️ 🇾', switch: '⬅️ ➡️ 🇽' },
        description: 'Despliega los 4 aguijones gigantes desde su columna atravesando el torso del rival.'
      },
      {
        name: 'Bug Puddle (Charco de Larvas)',
        type: 'Especial',
        damage: '80 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, B, FP', playstation: '⬇️ ⬅️ 🔲', xbox: '⬇️ ⬅️ 🇽', switch: '⬇️ ⬅️ 🇾' },
        description: 'Vomita un charco viscoso del que emergen voraces insectos que atrapan al oponente.'
      }
    ]
  },
  {
    id: 'erron-black',
    name: 'Erron Black',
    alias: 'Pistolero Mercenario de Outworld / Forajido del Lejano Oeste',
    category: 'Plantilla Principal',
    gamesAppeared: ['mkx', 'mk11'],
    originRealm: 'Earthrealm (Texas) / Outworld',
    accentColor: '#b45309',
    bgGradient: 'from-amber-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'EB', primaryColor: '#b45309', secondaryColor: '#451a03', iconSymbol: '🤠' },
    bioSummary: 'Nativo de Texas del siglo XIX cuya longevidad fue extendida mágicamente por Shang Tsung. Llegó a Outworld para ofrecer sus servicios como el mejor tirador mercenario del cosmos, sirviendo a Kotal Kahn y luego al Black Dragon.',
    combatRole: 'Zonificador de disparos con revólveres de calibre pesado, rifle de palanca, monedas que rebotan balas y botellas de ácido.',
    signatureWeapons: ['Revólveres gemelos .44 Magnum', 'Rifle de repetición Winchester', 'Dinamita y botellas de ácido zaterrano'],
    evolution: [
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Poncho andrajoso del oeste, sombrero de vaquero de ala ancha y máscara de bandido.',
        modelDesignDescription: 'Forajido implacable con cartucheras de cuero y munición grabada con el nombre del rival.',
        loreArc: 'Guardaespaldas implacable de Kotal Kahn durante la guerra civil.',
        signatureMechanic: 'Variaciones: Gunslinger, Outlaw y Marksman.',
        iconicQuote: 'Just business. Nothing personal.'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Traje de forajido de época refinado con chaleco de cuero, espuelas de plata y rifle al hombro.',
        modelDesignDescription: 'Física realista en los casquillos de bala expulsados y trucos giratorios con los revólveres.',
        loreArc: 'Su versión joven se alía con Kano y el Black Dragon, mientras que su versión mayor lucha como cazarrecompensas.',
        signatureMechanic: 'Disparo a monedas en el aire para redirigir proyectiles a ángulos impredecibles.',
        iconicQuote: 'Six bullets. More than enough to kill anything that moves.'
      }
    ],
    moveset: [
      {
        name: 'Trick Shot (Disparo con Moneda)',
        type: 'Especial',
        damage: '90 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, B, FP', playstation: '⬇️ ⬅️ 🔲', xbox: '⬇️ ⬅️ 🇽', switch: '⬇️ ⬅️ 🇾' },
        description: 'Lanza una moneda al aire y le dispara haciendo rebotar el proyectil directamente a la nuca del rival.'
      },
      {
        name: 'Zaterran Acid Spill',
        type: 'Especial',
        damage: '70 pts (Daño por segundo)',
        distance: 'Media',
        steps: { universal: 'D, B, FK', playstation: '⬇️ ⬅️ ❌', xbox: '⬇️ ⬅️ 🇦', switch: '⬇️ ⬅️ 🇧' },
        description: 'Arroja una botella de ácido corrosivo de reptil que genera un charco que consume la salud del enemigo.'
      }
    ]
  },
  {
    id: 'shinnok',
    name: 'Shinnok / Corrupted Shinnok',
    alias: 'Dios Antiguo Caído / Señor de la Oscuridad del Netherrealm',
    category: 'Plantilla Principal',
    gamesAppeared: ['mkx'],
    originRealm: 'Netherrealm / Cielos Divinos',
    accentColor: '#dc2626',
    bgGradient: 'from-red-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'SH', primaryColor: '#dc2626', secondaryColor: '#450a0a', iconSymbol: '💀' },
    bioSummary: 'El Dios Mayor que traicionó al panteón divino buscando la dominación absoluta de Earthrealm. Encerrado en el Netherrealm durante eones, regresa en MKX liderando a los Retornados. Al absorber el Jinsei se transforma en el colosal Corrupted Shinnok.',
    combatRole: 'Invocador de magia nigromántica con manos óseas gigantes que brotan del suelo y robo de poderes.',
    signatureWeapons: ['Amuleto sagrado de Shinnok', 'Manos esqueléticas gigantes', 'Báculo de hechicería oscura'],
    evolution: [
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Corona dorada puntiaguda con túnica escarlata de emperador caído.',
        modelDesignDescription: 'Forma base como hechicero arrogante y forma final Corrupted Shinnok con piel ígnea y cuernos.',
        loreArc: 'Jefe final de MKX que corrompe la fuente de vida de la Tierra hasta ser neutralizado por Cassie Cage.',
        signatureMechanic: 'Judgement Fist y transformación en Corrupted Shinnok en la batalla culminante.',
        iconicQuote: 'There are no gods here. Only me!'
      }
    ],
    moveset: [
      {
        name: 'Judgement Fist (Puño Óseo Gigante)',
        type: 'Especial',
        damage: '110 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, B, FP', playstation: '⬇️ ⬅️ 🔲', xbox: '⬇️ ⬅️ 🇽', switch: '⬇️ ⬅️ 🇾' },
        description: 'Hace surgir una mano esquelética colosal desde la tierra que aplasta o eleva al adversario.'
      },
      {
        name: 'Amulet Fire Blast',
        type: 'Especial',
        damage: '95 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, F, BP', playstation: '⬅️ ➡️ 🔺', xbox: '⬅️ ➡️ 🇾', switch: '⬅️ ➡️ 🇽' },
        description: 'Canaliza la energía corrupta de su amuleto místico lanzando un torrente de fuego carmesí.'
      }
    ]
  },
  {
    id: 'jason-voorhees',
    name: 'Jason Voorhees',
    alias: 'El Asesino Silencioso de Crystal Lake',
    category: 'Personaje Invitado/DLC',
    gamesAppeared: ['mkx'],
    originRealm: 'Crystal Lake (Earthrealm / Slasher)',
    accentColor: '#15803d',
    bgGradient: 'from-emerald-950 via-stone-900 to-black',
    image: '/src/assets/images/mk_jason_art_1792623257485.jpg',
    fallbackBadge: { initials: 'JV', primaryColor: '#15803d', secondaryColor: '#14532d', iconSymbol: '🔪' },
    bioSummary: 'El imparable titán del cine de terror (Viernes 13). Reanimado como un espectro mudo indestructible que masacra a cualquiera con su machete oxidado. En MKX es una de las apariciones invitadas más brutales de la saga.',
    combatRole: 'Coloso imparable con hiper-armadura que ignora golpes, agarres brutales y resurrección tras la muerte.',
    signatureWeapons: ['Machete oxidado de tala', 'Fuerza no-muerta imparable', 'Hacha de campamento'],
    evolution: [
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Chaqueta de campo andrajosa con máscara clásica de hockey ensangrentada.',
        modelDesignDescription: 'Modelo corpulento imponente que no emite un solo sonido salvo su respiración siniestra.',
        loreArc: 'Llega a los reinos de Mortal Kombat persiguiendo víctimas para su sed insaciable de sangre.',
        signatureMechanic: 'Variación Relentless con inversión de controles del rival y Unstoppable con resurrección automática.',
        iconicQuote: '... (Respira siniestramente tras la máscara de hockey)'
      }
    ],
    moveset: [
      {
        name: 'Machete Cleave',
        type: 'Especial',
        damage: '110 pts',
        distance: 'Media',
        steps: { universal: 'D, F, BP', playstation: '⬇️ ➡️ 🔺', xbox: '⬇️ ➡️ 🇾', switch: '⬇️ ➡️ 🇽' },
        description: 'Descarga un machetazo descomunal sobre el hombro del rival partiéndole la clavícula.'
      },
      {
        name: 'Choke Grab & Slam',
        type: 'Especial',
        damage: '120 pts',
        distance: 'Cerca',
        steps: { universal: 'D, B, FP', playstation: '⬇️ ⬅️ 🔲', xbox: '⬇️ ⬅️ 🇽', switch: '⬇️ ⬅️ 🇾' },
        description: 'Toma del cuello al enemigo con una sola mano levantándolo antes de azotarlo contra el suelo con brutalidad.'
      },
      {
        name: 'Sleeping Bag Slam Fatality',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Media',
        steps: { universal: 'D, B, F, BK', playstation: '⬇️ ⬅️ ➡️ ⭕', xbox: '⬇️ ⬅️ ➡️ 🇧', switch: '⬇️ ⬅️ ➡️ 🇦' },
        description: 'Mete a la víctima dentro de un saco de dormir y la estrella repetidas veces contra el piso hasta hacerla pedazos.'
      }
    ]
  },
  {
    id: 'predator',
    name: 'Predator (Yautja)',
    alias: 'Cazador de Élite Yautja / El Cazador Supremo',
    category: 'Personaje Invitado/DLC',
    gamesAppeared: ['mkx'],
    originRealm: 'Yautja Prime (Espacio Profundo)',
    accentColor: '#059669',
    bgGradient: 'from-emerald-950 via-stone-900 to-black',
    image: '/src/assets/images/mk_predator_art_1792623258183.jpg',
    fallbackBadge: { initials: 'PR', primaryColor: '#059669', secondaryColor: '#064e3b', iconSymbol: '👽' },
    bioSummary: 'El cazador extraterrestre definitivo de la galaxia. Viaja a los reinos de Mortal Kombat buscando los trofeos más peligrosos del multiverso: los cráneos de dioses, emperadores y espectros ninjas.',
    combatRole: 'Cazador versátil con cañón de plasma de hombro, camuflaje óptico invisible, garras de muñeca y trampas láser.',
    signatureWeapons: ['Cañón de hombro Plasmacaster', 'Cuchillas dobles de muñeca', 'Disco de corte Smart Disc'],
    evolution: [
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Bio-máscara cromada con rastas alienígenas y armadura de malla con cráneos como trofeos.',
        modelDesignDescription: 'Diseño asombroso con visor térmico de tres puntos láser y mandíbulas caníbales al quitarse la máscara.',
        loreArc: 'Desciende en Outworld considerando a los kombatientes como la presa más noble de la creación.',
        signatureMechanic: 'Variaciones: Hunter (trampas médicas), Warrior y Hish-Qu-Ten con disparos de plasma dirigidos.',
        iconicQuote: '(Rugido gutural extraterrestre y risa grabada distorsionada)'
      }
    ],
    moveset: [
      {
        name: 'Plasmacaster Shot',
        type: 'Especial',
        damage: '100 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, B, FP', playstation: '⬇️ ⬅️ 🔲', xbox: '⬇️ ⬅️ 🇽', switch: '⬇️ ⬅️ 🇾' },
        description: 'Apunta con su mira láser triple y dispara un proyectil de plasma fulminante desde su hombro.'
      },
      {
        name: 'Wrist Blades Scythe',
        type: 'Especial',
        damage: '95 pts',
        distance: 'Cerca',
        steps: { universal: 'B, F, BP', playstation: '⬅️ ➡️ 🔺', xbox: '⬅️ ➡️ 🇾', switch: '⬅️ ➡️ 🇽' },
        description: 'Extiende sus cuchillas gemelas de muñeca desgarrando el abdomen del oponente.'
      },
      {
        name: 'Spine Trophy Fatality',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Cerca',
        steps: { universal: 'D, D, B, F, FP', playstation: '⬇️ ⬇️ ⬅️ ➡️ 🔲', xbox: '⬇️ ⬇️ ⬅️ ➡️ 🇽', switch: '⬇️ ⬇️ ⬅️ ➡️ 🇾' },
        description: 'Clava sus garras en la nuca y arranca la cabeza con la columna vertebral intacta como trofeo de caza de élite.'
      }
    ]
  },
  {
    id: 'leatherface',
    name: 'Leatherface',
    alias: 'Bubba Sawyer / El Caníbal de la Motosierra',
    category: 'Personaje Invitado/DLC',
    gamesAppeared: ['mkx'],
    originRealm: 'Texas (Earthrealm / Terror)',
    accentColor: '#d97706',
    bgGradient: 'from-amber-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'LF', primaryColor: '#d97706', secondaryColor: '#78350f', iconSymbol: '🪚' },
    bioSummary: 'El aterrador asesino de La Masacre de Texas. Empuña una motosierra industrial rugiente y viste una máscara hecha con la piel curtida de sus víctimas para proteger a su familia caníbal.',
    combatRole: 'Asesino de gran alcance con giros de motosierra continua, embestidas con mazo y posturas frenéticas.',
    signatureWeapons: ['Motosierra de gasolina Poulan 245A', 'Mazo de herrero', 'Máscaras de piel humana'],
    evolution: [
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Delantal de carnicero manchado de sangre y máscara de piel cosida con hilo grueso.',
        modelDesignDescription: 'Animaciones de paranoia, chillidos histéricos y el sonido ensordecedor del motor a dos tiempos.',
        loreArc: 'Llega accidentalmente a través de un portal a los reinos buscando carne fresca para sus hermanos.',
        signatureMechanic: 'Variaciones: Killer, Butcher y Pretty Lady (lanzamiento de motosierra).',
        iconicQuote: '(Gritos histéricos de cerdo mientras alza la motosierra al cielo)'
      }
    ],
    moveset: [
      {
        name: 'Chainsaw Charge',
        type: 'Especial',
        damage: '115 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, F, BP', playstation: '⬅️ ➡️ 🔺', xbox: '⬅️ ➡️ 🇾', switch: '⬅️ ➡️ 🇽' },
        description: 'Corre hacia adelante agitando la motosierra encendida cortando todo a su paso.'
      }
    ]
  },
  {
    id: 'xenomorph',
    name: 'Xenomorph (Alien)',
    alias: 'El Organismo Perfecto / Engendro de Baraka',
    category: 'Personaje Invitado/DLC',
    gamesAppeared: ['mkx'],
    originRealm: 'LV-426 / Outworld (Colonia Tarkatana)',
    accentColor: '#475569',
    bgGradient: 'from-slate-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'XM', primaryColor: '#475569', secondaryColor: '#1e293b', iconSymbol: '🩸' },
    bioSummary: 'El organismo parasitario extraterrestre más letal de la galaxia. En MKX, un Facehugger fecunda a un guerrero tarkatano, dando origen a una variante híbrida con cuchillas óseas en los brazos y sangre de ácido molecular.',
    combatRole: 'Depredador ágil de suelo y techo con cola prensil con arpón, saltos acrobáticos y escupitajos de ácido.',
    signatureWeapons: ['Cola con púa de hueso', 'Mandíbula retráctil interna', 'Sangre ácida molecular corrosiva'],
    evolution: [
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Cúpula craneal negra pulida, exoesqueleto biomecánico y cuchillas tarkatanas en antebrazos.',
        modelDesignDescription: 'Fusión biomecánica de H.R. Giger con los rasgos afilados de Baraka.',
        loreArc: 'Plaga alienígena que amenaza con consumir la totalidad de los habitantes de Outworld.',
        signatureMechanic: 'Variaciones: Acidic, Tarkatan (con cuchillas) y Konjurer (invocación de Facehuggers).',
        iconicQuote: '(Siseo metálico visceral y goteo de saliva ácida)'
      }
    ],
    moveset: [
      {
        name: 'Tail Snag & Throw',
        type: 'Especial',
        damage: '95 pts',
        distance: 'Media',
        steps: { universal: 'D, B, FP', playstation: '⬇️ ⬅️ 🔲', xbox: '⬇️ ⬅️ 🇽', switch: '⬇️ ⬅️ 🇾' },
        description: 'Empala al rival con su cola biónica y lo azota contra el piso por detrás.'
      }
    ]
  },
  {
    id: 'triborg',
    name: 'Triborg',
    alias: 'La Iniciativa Cibernética Completa (Cyrax / Sektor / Smoke / Cyber Sub-Zero)',
    category: 'Personaje Invitado/DLC',
    gamesAppeared: ['mkx'],
    originRealm: 'Earthrealm (Fábrica Lin Kuei)',
    accentColor: '#3b82f6',
    bgGradient: 'from-blue-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'TB', primaryColor: '#3b82f6', secondaryColor: '#1e3a8a', iconSymbol: '🤖' },
    bioSummary: 'Un ciborg avanzado que recopiló en su memoria de procesamiento los patrones de combate de Cyrax (LK-4D4), Sektor (LK-9T9), Smoke (LK-7T2) y Cyber Sub-Zero (LK-52O). Representa el ápice de la Iniciativa Cibernética Lin Kuei.',
    combatRole: 'Luchador cuádruple en uno: redes de plasma (Cyrax), misiles y lanzallamas (Sektor), arpones de humo (Smoke) y bombas congelantes.',
    signatureWeapons: ['Red de plasma verde', 'Misiles térmicos teledirigidos', 'Drones congelantes y humo'],
    evolution: [
      {
        gameKey: 'mkx',
        gameTitle: 'Mortal Kombat X (2015)',
        releaseYear: 2015,
        costumeAesthetic: 'Chasis cibernético de última generación con luces LED configurables según el ninja emulado.',
        modelDesignDescription: 'Modelo modular altamente detallado con compuertas en el pecho y propulsores.',
        loreArc: 'Recolectó los datos biometrónicos de los cuatro ciborgs para fundar el clan cibernético Tekunin.',
        signatureMechanic: '4 Variaciones distintas: LK-9T9 (Sektor), LK-4D4 (Cyrax), LK-7T2 (Smoke) y Cyber Sub-Zero.',
        iconicQuote: 'Tekunin systems online. Eliminating targets.'
      }
    ],
    moveset: [
      {
        name: 'Chest Missile',
        type: 'Especial',
        damage: '90 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, B, FP', playstation: '⬇️ ⬅️ 🔲', xbox: '⬇️ ⬅️ 🇽', switch: '⬇️ ⬅️ 🇾' },
        description: 'Abre las placas pectorales y dispara un misil balístico teledirigido.'
      }
    ]
  },

  // =========================================================================
  // MORTAL KOMBAT 11 / ULTIMATE (MK11 · 2019) - ROSTER & INVITADOS
  // =========================================================================
  {
    id: 'spawn',
    name: 'Spawn',
    alias: 'Al Simmons / El Engendro del Infierno',
    category: 'Personaje Invitado/DLC',
    gamesAppeared: ['mk11'],
    originRealm: 'Earthrealm / Octavo Círculo del Infierno',
    accentColor: '#10b981',
    bgGradient: 'from-emerald-950 via-stone-900 to-black',
    image: '/src/assets/images/mk_spawn_art_1792621760887.jpg',
    fallbackBadge: { initials: 'SP', primaryColor: '#10b981', secondaryColor: '#064e3b', iconSymbol: '⛓️' },
    bioSummary: 'El teniente coronel Al Simmons fue traicionado y asesinado por su propio gobierno. Tras vender su alma al demonio Malebolgia para volver a ver a su esposa, renace como el Hellspawn dotado de necroplasma, cadenas simbióticas y una capa viviente.',
    combatRole: 'Luchador pesado de medio alcance con cadenas cortantes, vuelo con capa, hacha necroplásmica y arsenal militar.',
    signatureWeapons: ['Capa simbiótica viviente Leetha', 'Cadenas de necroplasma infernal', 'Metralleta de asalto y hacha'],
    evolution: [
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Traje de necroplasma negro y blanco con capa roja gigante andrajosa y cadenas de púas.',
        modelDesignDescription: 'Obra maestra visual con la voz legendaria de Keith David. Capa con física reactiva completa.',
        loreArc: 'Llega arrastrado por el colapso del tiempo de Kronika, listo para purgar el Netherrealm de demonios.',
        signatureMechanic: 'Soul Forfeit para desbloquear Krushing Blows fáciles y medidor de necroplasma.',
        iconicQuote: 'You\'re in my world now. And in my world, I\'m God!'
      }
    ],
    moveset: [
      {
        name: 'Unholy Veil (Capa Cortante)',
        type: 'Especial',
        damage: '95 pts',
        distance: 'Media',
        steps: { universal: 'D, B, FP', playstation: '⬇️ ⬅️ 🔲', xbox: '⬇️ ⬅️ 🇽', switch: '⬇️ ⬅️ 🇾' },
        description: 'Extiende su capa simbiótica convirtiéndola en cuchillas gigantes que rebanan al rival.'
      },
      {
        name: 'Soul Shatter (Disparo Necroplásmico)',
        type: 'Especial',
        damage: '110 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, F, BP', playstation: '⬇️ ➡️ 🔺', xbox: '⬇️ ➡️ 🇾', switch: '⬇️ ➡️ 🇽' },
        description: 'Dispara una esfera verde de energía infernal que consume las entrañas del enemigo.'
      },
      {
        name: 'Rest in Pieces Fatality',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Media',
        steps: { universal: 'F, B, D, D, FK', playstation: '➡️ ⬅️ ⬇️ ⬇️ ❌', xbox: '➡️ ⬅️ ⬇️ ⬇️ 🇦', switch: '➡️ ⬅️ ⬇️ ⬇️ 🇧' },
        description: 'Su capa envuelve al rival en un capullo místico y sus cadenas penetran la carne desgarrándolo en pedazos.'
      }
    ]
  },
  {
    id: 'terminator',
    name: 'Terminator T-800',
    alias: 'Cyberdyne Systems Modelo 101',
    category: 'Personaje Invitado/DLC',
    gamesAppeared: ['mk11'],
    originRealm: 'Futuro Post-Apocalíptico (2029 / Skynet)',
    accentColor: '#ef4444',
    bgGradient: 'from-red-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'T8', primaryColor: '#ef4444', secondaryColor: '#991b1b', iconSymbol: '🤖' },
    bioSummary: 'El androide asesino infiltrador enviado a través del tiempo por Skynet. Cuenta con tejido vivo sobre un endoesqueleto de titanio blindado. Con el rostro y fisonomía oficial de Arnold Schwarzenegger.',
    combatRole: 'Coloso implacable con escopeta recortada Winchester, granadas de aturdimiento y transformación en endoesqueleto metálico con armadura infinita.',
    signatureWeapons: ['Escopeta Winchester 1887', 'Rifle de plasma Westinghouse', 'Endoesqueleto cibernético'],
    evolution: [
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Chaqueta de cuero de motociclista negra, camiseta gris desgastada y gafas de sol oscuras.',
        modelDesignDescription: 'Escaneo 3D facial oficial de Arnold Schwarzenegger con endoesqueleto metálico expuesto bajo heridas.',
        loreArc: 'Atrapado en el pasado de Mortal Kombat, cataloga a los luchadores como amenazas a neutralizar.',
        signatureMechanic: 'Terminate: activa armadura infinita sin retroceso que le permite avanzar implacablemente.',
        iconicQuote: 'Hasta la vista, baby.'
      }
    ],
    moveset: [
      {
        name: 'Shotgun Blast',
        type: 'Especial',
        damage: '105 pts',
        distance: 'Media',
        steps: { universal: 'D, B, FP', playstation: '⬇️ ⬅️ 🔲', xbox: '⬇️ ⬅️ 🇽', switch: '⬇️ ⬅️ 🇾' },
        description: 'Dispara su escopeta de repetición con una sola mano derribando al oponente.'
      },
      {
        name: 'You Won\'t Be Back Fatality',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Media',
        steps: { universal: 'B, F, B, FP', playstation: '⬅️ ➡️ ⬅️ 🔲', xbox: '⬅️ ➡️ ⬅️ 🇽', switch: '⬅️ ➡️ ⬅️ 🇾' },
        description: 'Dispara a las rodillas de la víctima, activa una esfera temporal y la envía al futuro donde una tropa de T-800 la desintegra con rifles láser.'
      }
    ]
  },
  {
    id: 'robocop',
    name: 'RoboCop',
    alias: 'Oficial Alex J. Murphy / El Defensor del Orden de Detroit',
    category: 'Personaje Invitado/DLC',
    gamesAppeared: ['mk11'],
    originRealm: 'Detroit (Earthrealm / OCP)',
    accentColor: '#38bdf8',
    bgGradient: 'from-sky-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'RC', primaryColor: '#38bdf8', secondaryColor: '#0284c7', iconSymbol: '🛡️' },
    bioSummary: 'El oficial de policía de Detroit Alex Murphy, brutalmente asesinado en acto de servicio y reconstruido por Omni Consumer Products (OCP) como un cíborg imparable que hace cumplir las directivas primarias de la ley.',
    combatRole: 'Zonificador implacable con pistola Auto-9 de ráfaga, cañón de hombro con misiles, escudo antidisturbios y asistencia del droide ED-209.',
    signatureWeapons: ['Pistola Auto-9 en funda de muslo retráctil', 'Rifle de asalto Cobra Assault Cannon', 'Droide blindado ED-209'],
    evolution: [
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Blindaje de titanio pulido gris plata o azul metálico con visor oscuro y voz original de Peter Weller.',
        modelDesignDescription: 'Modelo nostálgico hiperdetallado con apertura hidráulica del muslo para desenvainar la Auto-9.',
        loreArc: 'Asignado para erradicar las organizaciones criminales del Black Dragon y Kano en todas las líneas temporales.',
        signatureMechanic: 'Rifle Cobra antitanque y despliegue del colosal droide bípedo ED-209.',
        iconicQuote: 'Dead or alive, you\'re coming with me.'
      }
    ],
    moveset: [
      {
        name: 'Auto-9 Burst',
        type: 'Especial',
        damage: '90 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, F, FP', playstation: '⬅️ ➡️ 🔲', xbox: '⬅️ ➡️ 🇽', switch: '⬅️ ➡️ 🇾' },
        description: 'Dispara una ráfaga de tres disparos de alta precisión con su mítica pistola automática.'
      },
      {
        name: 'Dead Or Alive Fatality',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Media',
        steps: { universal: 'B, F, D, D, BP', playstation: '⬅️ ➡️ ⬇️ ⬇️ 🔺', xbox: '⬅️ ➡️ ⬇️ ⬇️ 🇾', switch: '⬅️ ➡️ ⬇️ ⬇️ 🇽' },
        description: 'Dispara con la Auto-9 al entrecejo del rival y llama a ED-209 para que lo pulverice con ametralladoras pesadas y misiles.'
      }
    ]
  },
  {
    id: 'rambo',
    name: 'John Rambo',
    alias: 'Veterano Boinas Verdes del Ejército de EE.UU.',
    category: 'Personaje Invitado/DLC',
    gamesAppeared: ['mk11'],
    originRealm: 'Earthrealm (Vietnam / Hope, Washington)',
    accentColor: '#84cc16',
    bgGradient: 'from-lime-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'RB', primaryColor: '#84cc16', secondaryColor: '#3f6212', iconSymbol: '🏹' },
    bioSummary: 'El soldado de supervivencia definitivo de la cultura cinematográfica. Condecorado con la Medalla de Honor, experto en tácticas de guerrilla, combate en la jungla y emboscadas con trampas artesanales mortíferas. Interpretado por Sylvester Stallone.',
    combatRole: 'Trampero táctico con arco compuesto con flechas explosivas, cuchillo de supervivencia y ametralladora pesada M60.',
    signatureWeapons: ['Cuchillo de combate con filo de sierra', 'Arco compuesto con flechas explosivas', 'Ametralladora ligera M60'],
    evolution: [
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Cinta roja en la frente, camiseta sin mangas verde oliva y cartuchera con munición de alto calibre.',
        modelDesignDescription: 'Escaneo facial fotorrealista y voz oficial grabada por Sylvester Stallone.',
        loreArc: 'Se adentra en las arenas de kombate tratando a los invasores extradimensionales como objetivos de guerra en la jungla.',
        signatureMechanic: 'Trampas de foso con estacas punji y rastreo agachado bajo proyectiles.',
        iconicQuote: 'To survive a war, you gotta become war.'
      }
    ],
    moveset: [
      {
        name: 'Compound Bow Shot',
        type: 'Especial',
        damage: '95 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, F, FP', playstation: '⬅️ ➡️ 🔲', xbox: '⬅️ ➡️ 🇽', switch: '⬅️ ➡️ 🇾' },
        description: 'Tensa su arco de poleas disparando una flecha que detona al impactar contra el pecho rival.'
      },
      {
        name: 'M60 Suppression Fire',
        type: 'Especial',
        damage: '110 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, B, BP', playstation: '⬇️ ⬅️ 🔺', xbox: '⬇️ ⬅️ 🇾', switch: '⬇️ ⬅️ 🇽' },
        description: 'Dispara desde la cadera su ametralladora pesada M60 barriendo toda la arena de combate.'
      }
    ]
  },
  {
    id: 'noob-saibot',
    name: 'Noob Saibot',
    alias: 'Bi-Han / La Sombra Espectral del Lin Kuei',
    category: 'Plantilla Principal',
    gamesAppeared: ['mk9', 'mk11', 'mk1'],
    originRealm: 'Netherrealm / Earthrealm',
    accentColor: '#1e293b',
    bgGradient: 'from-slate-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'NS', primaryColor: '#1e293b', secondaryColor: '#0f172a', iconSymbol: '🌑' },
    bioSummary: 'El Sub-Zero original (Bi-Han) asesinado por Scorpion en el primer torneo. Resucitado por Quan Chi en el Netherrealm despojado de toda compasión, manipula las sombras y posee un clon espectral gemelo que ataca sincronizado con él.',
    combatRole: 'Luchador de control con clon sombrío desmontable, teletransporte con azote vertical y portales negros.',
    signatureWeapons: ['Clon sombrío independiente Saibot', 'Hoz de combate campesina', 'Magia de oscuridad espectral'],
    evolution: [
      {
        gameKey: 'mk9',
        gameTitle: 'Mortal Kombat 9 (2011)',
        releaseYear: 2011,
        costumeAesthetic: 'Traje ninja negro carbón con ojos blancos desprovistos de iris.',
        modelDesignDescription: 'Modelo oscuro con vapor negro emanando constantemente de su cuerpo.',
        loreArc: 'Sirve a Shao Kahn y Quan Chi en la invasión terrenal antes de ser arrojado al Soulnado.',
        signatureMechanic: 'Teleport Slam y Shadow Charge.',
        iconicQuote: 'Fear me!'
      },
      {
        gameKey: 'mk11',
        gameTitle: 'Mortal Kombat 11 (2019)',
        releaseYear: 2019,
        costumeAesthetic: 'Armadura medieval oscura de segador con máscara con colmillos afilados y hoz de guerra.',
        modelDesignDescription: 'Voz cavernosa ultratumba y una física fluida en el clon sombrío que ataca desde el interior de la víctima.',
        loreArc: 'Confronta a su hermano Kuai Liang (Sub-Zero) y a Hanzo Hasashi con desprecio absoluto.',
        signatureMechanic: 'Ghostball que anula el bloqueo del oponente y Krushing Blows con la hoz.',
        iconicQuote: 'We are many. You are one.'
      },
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Armadura caótica verde y negra corrompida por la hechicería de Havik en Khaos Reigns.',
        modelDesignDescription: 'Bi-Han transformado a la fuerza en Noob Saibot por las energías del Reino del Caos.',
        loreArc: 'Secuestrado y transmutado por Titan Havik para sembrar la discordia entre los Lin Kuei.',
        signatureMechanic: 'Magia de sombra caótica con agarres aéreos.',
        iconicQuote: 'Death is my rebirth!'
      }
    ],
    moveset: [
      {
        name: 'Teleport Slam',
        type: 'Especial',
        damage: '100 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, U', playstation: '⬇️ ⬆️', xbox: '⬇️ ⬆️', switch: '⬇️ ⬆️' },
        description: 'Se hunde en un portal negro bajo el suelo y cae desde el cielo azotando al rival contra el asfalto.'
      },
      {
        name: 'Shadow Tackle',
        type: 'Especial',
        damage: '85 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, F, FP', playstation: '⬅️ ➡️ 🔲', xbox: '⬅️ ➡️ 🇽', switch: '⬅️ ➡️ 🇾' },
        description: 'Envía a su clon sombrío a toda velocidad para embestir y derribar al oponente.'
      },
      {
        name: 'Double Trouble Fatality',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Media',
        steps: { universal: 'B, F, B, F, BK', playstation: '⬅️ ➡️ ⬅️ ➡️ ⭕', xbox: '⬅️ ➡️ ⬅️ ➡️ 🇧', switch: '⬅️ ➡️ ⬅️ ➡️ 🇦' },
        description: 'Noob y su clon toman una pierna cada uno de la víctima y la parten por la mitad en dos partes simétricas.'
      }
    ]
  },

  // =========================================================================
  // MORTAL KOMBAT 1 (MK12 · 2023 / 2024) - PLANTILLA, DLCs & INVITADOS
  // =========================================================================
  {
    id: 'omni-man',
    name: 'Omni-Man',
    alias: 'Nolan Grayson / Conquistador del Imperio Viltrumita',
    category: 'Personaje Invitado/DLC',
    gamesAppeared: ['mk1'],
    originRealm: 'Viltrum (Invincible Universe)',
    accentColor: '#dc2626',
    bgGradient: 'from-red-950 via-stone-900 to-black',
    image: '/src/assets/images/mk_omniman_art_1792621760775.jpg',
    fallbackBadge: { initials: 'OM', primaryColor: '#dc2626', secondaryColor: '#7f1d1d', iconSymbol: '🪐' },
    bioSummary: 'El guerrero viltrumita supremo de la serie Invincible. Enviado a la Tierra para prepararla para la anexión al Imperio de Viltrum. Posee fuerza cósmica, vuelo a velocidad luz y una brutalidad implacable.',
    combatRole: 'Luchador aéreo de presión colosal con postura Viltrumite Stance, esquivas automáticas y embestidas supersónicas.',
    signatureWeapons: ['Fisiología Viltrumita invulnerable', 'Vuelo a velocidad luz', 'Puñetazos desgarradores'],
    kameoPartnerRecommendation: 'Kung Lao (Kameo) o Darrius (Kameo)',
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Traje blanco y rojo con la "O" estilizada en el pecho, capa carmesí y bigote icónico.',
        modelDesignDescription: 'Modelo hiperrealista con la voz y captura facial de J.K. Simmons en Unreal Engine 5.',
        loreArc: 'Llega al multiverso de MK considerando a todos los kombatientes como insectos ante el poderío de Viltrum.',
        signatureMechanic: 'Viltrumite Stance que permite esquivar proyectiles automáticamente mientras vuela.',
        iconicQuote: 'Earth isn\'t yours to conquer.'
      }
    ],
    moveset: [
      {
        name: 'Viltrumite Stance (Postura Aérea)',
        type: 'Especial',
        damage: '0 pts (Esquiva / Postura)',
        distance: 'Cualquiera',
        steps: { universal: 'D, B, BP', playstation: '⬇️ ⬅️ 🔺', xbox: '⬇️ ⬅️ 🇾', switch: '⬇️ ⬅️ 🇽' },
        description: 'Cruza los brazos flotando en el aire esquivando proyectiles con desdén.'
      },
      {
        name: 'Mega Dash Slam',
        type: 'Especial',
        damage: '120 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, F, FK', playstation: '⬅️ ➡️ ❌', xbox: '⬅️ ➡️ 🇦', switch: '⬅️ ➡️ 🇧' },
        description: 'Vuela a velocidad supersónica atravesando la pantalla estrellando al rival contra el piso.'
      },
      {
        name: 'Train Scene Fatality',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Media',
        steps: { universal: 'D, D, B, F, FK', playstation: '⬇️ ⬇️ ⬅️ ➡️ ❌', xbox: '⬇️ ⬇️ ⬅️ ➡️ 🇦', switch: '⬇️ ⬇️ ⬅️ ➡️ 🇧' },
        description: 'Sujeta la cabeza del oponente contra el parabrisas de un tren subterráneo a toda marcha partiendo en dos a los pasajeros.'
      }
    ]
  },
  {
    id: 'homelander',
    name: 'Homelander',
    alias: 'John Gillman / El Héroe Más Grande de Vought International',
    category: 'Personaje Invitado/DLC',
    gamesAppeared: ['mk1'],
    originRealm: 'Earthrealm (The Boys / Vought)',
    accentColor: '#2563eb',
    bgGradient: 'from-blue-950 via-stone-900 to-black',
    image: '/src/assets/images/mk_homelander_art_1792623373371.jpg',
    fallbackBadge: { initials: 'HL', primaryColor: '#2563eb', secondaryColor: '#1e3a8a', iconSymbol: '🦅' },
    bioSummary: 'El líder sociópata y narcisista de The Seven de la aclamada serie The Boys. Posee poderes que emulan a Superman (vuelo, fuerza extrema y visión láser), pero combinados con un desequilibrio mental total y desprecio por la vida humana.',
    combatRole: 'Zonificador aéreo intimidante con rayos láser oculares en tierra y aire, grito supersónico y agarres arrogantes.',
    signatureWeapons: ['Visión láser carmesí', 'Grito ensordecedor supersónico', 'Capa patriótica con águilas doradas'],
    kameoPartnerRecommendation: 'Janet Cage (Kameo) o Sareena (Kameo)',
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Traje azul texturizado con franjas patrióticas, capa de bandera desgastada y hombreras de águila.',
        modelDesignDescription: 'Modelo hiperrealista con la apariencia exacta de Antony Starr con sonrisas psicópatas y vaso de leche.',
        loreArc: 'Llega a la Nueva Era de Liu Kang con la intención de someter a todos los dioses y reinos bajo su bota.',
        signatureMechanic: 'Hover Stance que permite volar y disparar rayos térmicos en diagonales hacia el suelo.',
        iconicQuote: 'I can do whatever the fuck I want!'
      }
    ],
    moveset: [
      {
        name: 'Laser Eyes Sweep',
        type: 'Especial',
        damage: '100 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B, F, FP', playstation: '⬅️ ➡️ 🔲', xbox: '⬅️ ➡️ 🇽', switch: '⬅️ ➡️ 🇾' },
        description: 'Barre el escenario de lado a lado con un rayo láser al rojo vivo desde sus ojos.'
      },
      {
        name: 'Ear Shatter Scream',
        type: 'Especial',
        damage: '85 pts (Stun)',
        distance: 'Media',
        steps: { universal: 'D, B, BP', playstation: '⬇️ ⬅️ 🔺', xbox: '⬇️ ⬅️ 🇾', switch: '⬇️ ⬅️ 🇽' },
        description: 'Emite un alarido de alta frecuencia que hace sangrar los oídos del contrincante inmovilizándolo.'
      },
      {
        name: 'Plane Crash Fatality',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Media',
        steps: { universal: 'D, F, D, FK', playstation: '⬇️ ➡️ ⬇️ ❌', xbox: '⬇️ ➡️ ⬇️ 🇦', switch: '⬇️ ➡️ ⬇️ 🇧' },
        description: 'Lanza al contrincante a las turbinas de un avión comercial en pleno vuelo haciéndolo estallar en pedazos.'
      }
    ]
  },
  {
    id: 'peacemaker',
    name: 'Peacemaker',
    alias: 'Christopher Smith / El Pacificador de A.R.G.U.S.',
    category: 'Personaje Invitado/DLC',
    gamesAppeared: ['mk1'],
    originRealm: 'Earthrealm (DC / Escuadrón Suicida)',
    accentColor: '#dc2626',
    bgGradient: 'from-red-950 via-stone-900 to-black',
    image: '/src/assets/images/mk_peacemaker_art_1792623386218.jpg',
    fallbackBadge: { initials: 'PM', primaryColor: '#dc2626', secondaryColor: '#991b1b', iconSymbol: '🕊️' },
    bioSummary: 'Christopher Smith es un vigilante despiadado que ama tanto la paz que no le importa a cuántos hombres, mujeres y niños tenga que matar para conseguirla. Interpretado por John Cena.',
    combatRole: 'Luchador a media distancia con pistola Desert Eagle, cascos tecnológicos con habilidades sonoras/antigravedad y la asistencia de su águila Eagly.',
    signatureWeapons: ['Pistola Desert Eagle con cañón largo', 'Casco sónico Sonic Boom', 'Mascota Eagly el águila calva'],
    kameoPartnerRecommendation: 'Kano (Kameo) o Stryker (Kameo)',
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Camiseta roja y azul ajustada con la paloma de la paz y casco cromado brillante de titanio.',
        modelDesignDescription: 'Modelo 3D y doblaje oficial de John Cena con su característico baile y su leal águila Eagly.',
        loreArc: 'Transportado por un experimento de portal de Amanda Waller a los reinos de Mortal Kombat.',
        signatureMechanic: 'Forcefield del casco y ataques coordinados en picada con Eagly.',
        iconicQuote: 'I cherish peace with all my heart!'
      }
    ],
    moveset: [
      {
        name: 'Sonic Boom Helmet Blast',
        type: 'Especial',
        damage: '95 pts',
        distance: 'Media',
        steps: { universal: 'B, F, FP', playstation: '⬅️ ➡️ 🔲', xbox: '⬅️ ➡️ 🇽', switch: '⬅️ ➡️ 🇾' },
        description: 'Activa el comando de voz de su casco desatando una onda ultrasónica que pulveriza huesos.'
      },
      {
        name: 'Eagly Attack',
        type: 'Especial',
        damage: '80 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D, B, FK', playstation: '⬇️ ⬅️ ❌', xbox: '⬇️ ⬅️ 🇦', switch: '⬇️ ⬅️ 🇧' },
        description: 'Llama a su águila calva Eagly para que se lance en picada clavando sus garras en los ojos del oponente.'
      },
      {
        name: 'Pest Exterminator Fatality',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Media',
        steps: { universal: 'B, F, B, F, BP', playstation: '⬅️ ➡️ ⬅️ ➡️ 🔺', xbox: '⬅️ ➡️ ⬅️ ➡️ 🇾', switch: '⬅️ ➡️ ⬅️ ➡️ 🇽' },
        description: 'Vuela con un jetpack improvisado y desciende a toda velocidad atravesando el cuerpo del rival de lado a lado.'
      }
    ]
  },
  {
    id: 'ghostface',
    name: 'Ghostface',
    alias: 'El Asesino de Woodsboro (Khaos Reigns DLC)',
    category: 'Personaje Invitado/DLC',
    gamesAppeared: ['mk1'],
    originRealm: 'Earthrealm (Woodsboro / Scream)',
    accentColor: '#e2e8f0',
    bgGradient: 'from-stone-950 via-stone-900 to-black',
    image: '/src/assets/images/mk_ghostface_art_1792623257995.jpg',
    fallbackBadge: { initials: 'GF', primaryColor: '#e2e8f0', secondaryColor: '#475569', iconSymbol: '🔪' },
    bioSummary: 'El icónico asesino en serie del cine slasher Scream (Khaos Reigns). Equipado con su túnica negra con capucha, la máscara de espectro gritón, un teléfono con modulador de voz y un afilado cuchillo Buck 120.',
    combatRole: 'Asesino veloz e impredecible con cancelaciones acrobáticas, puñaladas al torso y la asistencia de un segundo Ghostface sorpresa.',
    signatureWeapons: ['Cuchillo de caza Buck 120 cromado', 'Teléfono móvil con distorsionador de voz', 'Túnica espectral'],
    kameoPartnerRecommendation: 'Sareena (Kameo) o Sub-Zero (Kameo)',
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023 / 2024)',
        releaseYear: 2024,
        costumeAesthetic: 'Túnica de tela negra brillante con capucha y la mítica máscara pálida de goma.',
        modelDesignDescription: 'Modelo estilizado con animaciones torpes pero letales que rinden tributo a las películas de Wes Craven.',
        loreArc: 'Llega a la Nueva Era de Liu Kang para hacer una sencilla pregunta: "¿Cuál es tu película de terror favorita?".',
        signatureMechanic: 'Mecánica de dos asesinos: un segundo Ghostface interviene desde el fondo de la pantalla para tender emboscadas.',
        iconicQuote: 'What\'s your favorite scary movie?'
      }
    ],
    moveset: [
      {
        name: 'Buck Knife Frenzy',
        type: 'Especial',
        damage: '105 pts',
        distance: 'Cerca',
        steps: { universal: 'B, F, FP', playstation: '⬅️ ➡️ 🔲', xbox: '⬅️ ➡️ 🇽', switch: '⬅️ ➡️ 🇾' },
        description: 'Se abalanza sobre el oponente propinando múltiples puñaladas consecutivas en el vientre.'
      },
      {
        name: 'Scary Call Stun',
        type: 'Especial',
        damage: '50 pts (Stun)',
        distance: 'Cualquiera',
        steps: { universal: 'D, B, BP', playstation: '⬇️ ⬅️ 🔺', xbox: '⬇️ ⬅️ 🇾', switch: '⬇️ ⬅️ 🇽' },
        description: 'Suena un teléfono en la arena y Ghostface distrae al oponente dejándolo congelado para un ataque sorpresa.'
      },
      {
        name: 'What\'s Your Favorite Movie? Fatality',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Cerca',
        steps: { universal: 'D, D, B, F, FP', playstation: '⬇️ ⬇️ ⬅️ ➡️ 🔲', xbox: '⬇️ ⬇️ ⬅️ ➡️ 🇽', switch: '⬇️ ⬇️ ⬅️ ➡️ 🇾' },
        description: 'Dos Ghostfaces acorralan a la víctima: uno le corta la garganta por la espalda mientras el otro le clava el cuchillo en el pecho.'
      }
    ]
  },
  {
    id: 't-1000',
    name: 'T-1000',
    alias: 'Prototipo Avanzado de Metal Líquido (Khaos Reigns DLC)',
    category: 'Personaje Invitado/DLC',
    gamesAppeared: ['mk1'],
    originRealm: 'Futuro Post-Apocalíptico (Skynet)',
    accentColor: '#94a3b8',
    bgGradient: 'from-slate-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'T1', primaryColor: '#94a3b8', secondaryColor: '#475569', iconSymbol: '💧' },
    bioSummary: 'El terrorífico asesino de metal líquido mimético de Terminator 2: Judgment Day. Capaz de transformar sus extremidades en cuchillas de metal sólido, deslizarse por el suelo como mercurio y adoptar la forma de cualquier humano. Con la imagen oficial de Robert Patrick.',
    combatRole: 'Luchador escurridizo con ganchos de metal líquido, extremidades de navaja y charcos de mercurio mimético.',
    signatureWeapons: ['Brazos de cuchilla y estilete de metal líquido', 'Pistola Beretta de policía', 'Morfología líquida mimética'],
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023 / 2024)',
        releaseYear: 2024,
        costumeAesthetic: 'Uniforme de policía de Los Ángeles con insignia y placa de metal pulido.',
        modelDesignDescription: 'Efectos avanzados de refracción y metal líquido hiperrealista de Unreal Engine 5 con el rostro de Robert Patrick.',
        loreArc: 'Enviado por Skynet a través de anomalías temporales para purgar el cosmos de kombatientes.',
        signatureMechanic: 'Liquid Morph que le permite disolverse en el suelo para esquivar kombos.',
        iconicQuote: 'Say, that\'s a nice bike.'
      }
    ],
    moveset: [
      {
        name: 'Liquid Blade Thrust',
        type: 'Especial',
        damage: '100 pts',
        distance: 'Media',
        steps: { universal: 'B, F, FP', playstation: '⬅️ ➡️ 🔲', xbox: '⬅️ ➡️ 🇽', switch: '⬅️ ➡️ 🇾' },
        description: 'Alarga su brazo en una aguja de metal líquido afilada que perfora el pecho del rival.'
      }
    ]
  },
  {
    id: 'conan',
    name: 'Conan el Bárbaro',
    alias: 'El Bárbaro Cimmerio / El Vencedor de Monstruos',
    category: 'Personaje Invitado/DLC',
    gamesAppeared: ['mk1'],
    originRealm: 'Cimmeria (Era Hiboria)',
    accentColor: '#b45309',
    bgGradient: 'from-amber-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'CB', primaryColor: '#b45309', secondaryColor: '#78350f', iconSymbol: '🗡️' },
    bioSummary: 'El mítico bárbaro cimmerio creado por Robert E. Howard e inmortalizado por Arnold Schwarzenegger. Un gigante de acero y voluntad inquebrantable que ha aplastado tronos, magos y monstruos en la Era Hiboria.',
    combatRole: 'Guerrero de peso pesado con la espada atlante de dos manos, cortes demoledores y patadas de fuerza bárbara.',
    signatureWeapons: ['Espada Atlante ancestral', 'Hacha de guerra de dos filos', 'Daga cimmeria'],
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023 / 2024)',
        releaseYear: 2024,
        costumeAesthetic: 'Taparrabos de pieles de lobo con botas de cuero curtido y espada Atlante al cinto.',
        modelDesignDescription: 'Físico hercúleo de fisicoculturista clásico con la mirada penetrante de Arnold Schwarzenegger.',
        loreArc: 'Traído por el dios Crom a la arena de Mortal Kombat para aplastar a los hechiceros y emperadores de los reinos.',
        signatureMechanic: 'Crom\'s Fury que otorga armadura dorada a sus estocadas pesadas de mandoble.',
        iconicQuote: 'To crush your enemies, see them driven before you, and hear the lamentations of their women!'
      }
    ],
    moveset: [
      {
        name: 'Atlantean Heavy Slash',
        type: 'Especial',
        damage: '120 pts',
        distance: 'Media',
        steps: { universal: 'D, F, BP', playstation: '⬇️ ➡️ 🔺', xbox: '⬇️ ➡️ 🇾', switch: '⬇️ ➡️ 🇽' },
        description: 'Blande su mandoble a dos manos en un arco descendente demoledor.'
      }
    ]
  },

  // =========================================================================
  // SISTEMA KAMEO FIGHTERS (LUCHADORES DE APOYO ASISTIDOS · MK1)
  // =========================================================================
  {
    id: 'sareena-kameo',
    name: 'Sareena (Kameo)',
    alias: 'Demonesa del Netherrealm / Redimida de Quan Chi',
    category: 'Kameo Fighter',
    gamesAppeared: ['mk1'],
    originRealm: 'Netherrealm',
    accentColor: '#9333ea',
    bgGradient: 'from-purple-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'SR', primaryColor: '#9333ea', secondaryColor: '#581c87', iconSymbol: '🔮' },
    bioSummary: 'Antigua asesina demoníaca al servicio de Quan Chi que se rebeló tras conocer a Bi-Han. En MK1 es una de las Kameo Fighters más populares y devastadoras del meta competitivo debido a sus proyectiles de boomerangs que drenan y congelan el medidor rival.',
    combatRole: 'Kameo de zonificación y extensión de kombos con boomerangs mágicos cuádruples y patada demoníaca.',
    signatureWeapons: ['Boomerangs demoníacos de energía oscura', 'Dagas rituales del Netherrealm'],
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Atuendo gótico rojo y negro con cabello azabache y marcas demoníacas en brazos.',
        modelDesignDescription: 'Modelo 3D de alta fidelidad que se transforma en su forma demoníaca al ejecutar Fatalities.',
        loreArc: 'Asistente leal que busca redimirse apoyando a los héroes de Earthrealm.',
        signatureMechanic: 'Kia\'s Blades: 4 proyectiles consecutivos que garantizan kombos prolongados.',
        iconicQuote: 'My soul is no longer Quan Chi\'s to control!'
      }
    ],
    moveset: [
      {
        name: 'Kia\'s Blades (Boomerangs de Cuchillas)',
        type: 'Especial',
        damage: '80 pts (Drenaje)',
        distance: 'Cualquiera',
        steps: { universal: 'B + Kameo', playstation: '⬅️ + R1', xbox: '⬅️ + RB', switch: '⬅️ + R' },
        description: 'Lanza dos dagas mágicas que van y vuelven drenando el medidor del rival y dejándolo aturdido.'
      },
      {
        name: 'Demon Rip (Kameo Fatality)',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Media',
        steps: { universal: 'B, D, D, Kameo', playstation: '⬅️ ⬇️ ⬇️ R1', xbox: '⬅️ ⬇️ ⬇️ RB', switch: '⬅️ ⬇️ ⬇️ R' },
        description: 'Revela su forma demoníaca monstruosa y arranca el corazón del oponente aplastándolo en su mano.'
      }
    ]
  },
  {
    id: 'kano-kameo',
    name: 'Kano (Kameo)',
    alias: 'Kano Clásico de la Era Arcade (MK1 1992)',
    category: 'Kameo Fighter',
    gamesAppeared: ['mk8', 'mk9', 'mkx', 'mk11', 'mk1'],
    originRealm: 'Earthrealm',
    accentColor: '#ef4444',
    bgGradient: 'from-red-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'KC', primaryColor: '#ef4444', secondaryColor: '#7f1d1d', iconSymbol: '🔴' },
    bioSummary: 'La versión arcade clásica de Kano de 1992. Asiste al kombatiente con su icónico lanzamiento de cuchillos, Kano Ball desde el aire y su láser ocular rojo.',
    combatRole: 'Kameo de cobertura de proyectiles y contraataques rápidos con Kano Ball y Eye Laser continuo.',
    signatureWeapons: ['Cuchillos de mariposa clásicos', 'Ojo biónico con láser rojo continuo'],
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Traje blanco clásico de Mortal Kombat 1 (1992) con fajín rojo y protector biónico cromado.',
        modelDesignDescription: 'Homenaje nostálgico al actor Richard Divizio del juego original digitalizado.',
        loreArc: 'Asistente mercenario que interviene en combate por un fajo de dinero.',
        signatureMechanic: 'Kano Ball para hacer segura la recuperación en bloqueo.',
        iconicQuote: 'Easy money, mate!'
      }
    ],
    moveset: [
      {
        name: 'Kano Ball Assist',
        type: 'Especial',
        damage: '90 pts',
        distance: 'Cualquiera',
        steps: { universal: 'F + Kameo', playstation: '➡️ + R1', xbox: '➡️ + RB', switch: '➡️ + R' },
        description: 'Entra rodando por la pantalla protegiendo al kombatiente principal de cualquier contraataque.'
      },
      {
        name: 'Heart Rip (Fatality Clásica 1992)',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Cerca',
        steps: { universal: 'B, D, F, Kameo', playstation: '⬅️ ⬇️ ➡️ R1', xbox: '⬅️ ⬇️ ➡️ RB', switch: '⬅️ ⬇️ ➡️ R' },
        description: 'Mete la mano en el pecho del rival y le arranca el corazón que aún late en su puño alzado al cielo.'
      }
    ]
  },
  {
    id: 'sonya-kameo',
    name: 'Sonya Blade (Kameo)',
    alias: 'Teniente Sonya Blade Clásica (MK1 1992)',
    category: 'Kameo Fighter',
    gamesAppeared: ['mk8', 'mk9', 'mkx', 'mk11', 'mk1'],
    originRealm: 'Earthrealm',
    accentColor: '#10b981',
    bgGradient: 'from-emerald-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'SK', primaryColor: '#10b981', secondaryColor: '#064e3b', iconSymbol: '🎖️' },
    bioSummary: 'La teniente Sonya Blade en su mítico atuendo deportivo verde de gimnasio de 1992. Asiste extendiendo kombos con su tiro de aros de energía y su elevación con tijera de piernas.',
    combatRole: 'Kameo ofensivo de extensión de kombos aéreos y zonificación de aros dobles.',
    signatureWeapons: ['Aros de plasma Energy Rings', 'Tijera de piernas voladora'],
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Top y mallas verdes fluorescentes clásicas de la era arcade digitalizada de 1992.',
        modelDesignDescription: 'Recreación en Unreal Engine 5 de la teniente original con coleta rubia y cinta en el pelo.',
        loreArc: 'Refuerzo táctico de las Fuerzas Especiales para salvar a los luchadores en apuros.',
        signatureMechanic: 'Leg Grab pop-up para iniciar combos aéreos.',
        iconicQuote: 'Covering your six!'
      }
    ],
    moveset: [
      {
        name: 'Energy Rings Assist',
        type: 'Especial',
        damage: '75 pts',
        distance: 'Cualquiera',
        steps: { universal: 'Kameo', playstation: 'R1', xbox: 'RB', switch: 'R' },
        description: 'Dispara dos aros de plasma a ras de suelo que golpean al rival.'
      },
      {
        name: 'Kiss of Death (Fatality Clásica)',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Media',
        steps: { universal: 'B, F, D, Kameo', playstation: '⬅️ ➡️ ⬇️ R1', xbox: '⬅️ ➡️ ⬇️ RB', switch: '⬅️ ➡️ ⬇️ R' },
        description: 'Lanza un beso místico que envuelve al oponente en una llamarada hasta incinerarlo en un esqueleto.'
      }
    ]
  },
  {
    id: 'goro-kameo',
    name: 'Goro (Kameo)',
    alias: 'Príncipe de los Shokan / El Campeón de Cuatro Brazos',
    category: 'Kameo Fighter',
    gamesAppeared: ['mk8', 'mk9', 'mkx', 'mk1'],
    originRealm: 'Kuatan (Outworld)',
    accentColor: '#d97706',
    bgGradient: 'from-amber-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'GR', primaryColor: '#d97706', secondaryColor: '#78350f', iconSymbol: '💪' },
    bioSummary: 'El legendario príncipe Shokan invicto durante 500 años en el torneo sagrado. En MK1 actúa como un colosal Kameo Fighter que proporciona agarres blindados y pisoteos desde el cielo.',
    combatRole: 'Kameo de fuerza bruta con agarre Raise, pisoteo Stomp inbloqueable y golpes de cuatro brazos.',
    signatureWeapons: ['Cuatro brazos Shokan descomunales', 'Golpe de suelo telúrico'],
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Taparrabos rojo de gladiador con cinturón de oro imperial y trenza oriental.',
        modelDesignDescription: 'Modelo hipermusculado de cuatro brazos con ojos feroces y colmillos sobresalientes.',
        loreArc: 'Protector de la realeza Shokan que asiste a sus aliados en combate.',
        signatureMechanic: 'Stomp inbloqueable que rompe guardias pasivas.',
        iconicQuote: 'None can withstand the might of Goro!'
      }
    ],
    moveset: [
      {
        name: 'Shokan Stomp',
        type: 'Especial',
        damage: '100 pts (Inbloqueable)',
        distance: 'Cualquiera',
        steps: { universal: 'D + Kameo', playstation: '⬇️ + R1', xbox: '⬇️ + RB', switch: '⬇️ + R' },
        description: 'Salta fuera de pantalla y cae con sus cuatro toneladas sobre la cabeza del contrincante.'
      },
      {
        name: 'Four-Arm Rip (Fatality Clásica)',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Cerca',
        steps: { universal: 'B, F, D, Kameo', playstation: '⬅️ ➡️ ⬇️ R1', xbox: '⬅️ ➡️ ⬇️ RB', switch: '⬅️ ➡️ ⬇️ R' },
        description: 'Toma cada extremidad del rival con sus cuatro brazos y las arranca todas simultáneamente.'
      }
    ]
  },
  {
    id: 'cyrax-kameo',
    name: 'Cyrax (Kameo)',
    alias: 'Ciborg Amarillo LK-4D4 Clásico',
    category: 'Kameo Fighter',
    gamesAppeared: ['mk9', 'mkx', 'mk1'],
    originRealm: 'Earthrealm (Lin Kuei)',
    accentColor: '#eab308',
    bgGradient: 'from-amber-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'CX', primaryColor: '#eab308', secondaryColor: '#713f12', iconSymbol: '🕸️' },
    bioSummary: 'El mítico asesino cibernético de armadura amarilla del Lin Kuei. En MK1 asiste con su indispensable Red de Plasma verde que atrapa al rival para kombos y su giro de helicóptero copter.',
    combatRole: 'Kameo de presión de espacio con red inmovilizadora y giro de helicóptero para mantener ventaja en bloqueo.',
    signatureWeapons: ['Red de plasma verde inmovilizadora', 'Bombas de fragmentación con temporizador'],
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Armadura cibernética amarilla clásica de la era arcade.',
        modelDesignDescription: 'Ciborg clásico con compartimento torácico que dispara bombas y redes.',
        loreArc: 'Asistente táctico del Lin Kuei en combate mecanizado.',
        signatureMechanic: 'Cyber Net y Spinner para atrapar a los rivales.',
        iconicQuote: 'Target acquired.'
      }
    ],
    moveset: [
      {
        name: 'Cyber Net (Red de Inmovilización)',
        type: 'Especial',
        damage: '0 pts (Stun total)',
        distance: 'Media / Lejos',
        steps: { universal: 'B + Kameo', playstation: '⬅️ + R1', xbox: '⬅️ + RB', switch: '⬅️ + R' },
        description: 'Dispara una red de plasma verde desde su pecho que inmoviliza al oponente.'
      },
      {
        name: 'Self-Destruct (Fatality Clásica)',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Media',
        steps: { universal: 'B, F, B, Kameo', playstation: '⬅️ ➡️ ⬅️ R1', xbox: '⬅️ ➡️ ⬅️ RB', switch: '⬅️ ➡️ ⬅️ R' },
        description: 'Activa su cuenta regresiva nuclear haciendo volar todo el escenario en pedazos.'
      }
    ]
  },
  {
    id: 'motaro-kameo',
    name: 'Motaro (Kameo)',
    alias: 'Centauro Comandante de Outworld',
    category: 'Kameo Fighter',
    gamesAppeared: ['mk9', 'mk1'],
    originRealm: 'Outworld',
    accentColor: '#b45309',
    bgGradient: 'from-amber-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'MT', primaryColor: '#b45309', secondaryColor: '#451a03', iconSymbol: '🐎' },
    bioSummary: 'El temible centauro con cola metálica de látigo y cuernos gigantes. En MK1 asiste reflejando proyectiles con un escudo místico y transportando al kombatiente.',
    combatRole: 'Kameo defensivo y de teletransporte con escudo reflector y cola de látigo.',
    signatureWeapons: ['Cola de látigo biónica', 'Escudo reflector'],
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Cuerpo de corcel oscuro con torso de gladiador con cuernos y cola cromada.',
        modelDesignDescription: 'El mítico subjefe de MK3 recreado en Unreal Engine 5.',
        loreArc: 'Líder de la raza de centauros rivales de los Shokan.',
        signatureMechanic: 'Reflect Shield y Teleport asistido.',
        iconicQuote: 'Kahn\'s will is my command!'
      }
    ],
    moveset: [
      {
        name: 'Centaur Reflect Shield',
        type: 'Especial',
        damage: '0 pts (Refleja)',
        distance: 'Cerca',
        steps: { universal: 'Kameo (Mantener)', playstation: 'R1 (Mantener)', xbox: 'RB (Mantener)', switch: 'R (Mantener)' },
        description: 'Levanta un escudo de energía que devuelve cualquier proyectil hacia el atacante.'
      },
      {
        name: 'Tail Impale (Kameo Fatality)',
        type: 'Fatality',
        damage: 'Mortal (FINISH HIM)',
        distance: 'Media',
        steps: { universal: 'F, D, D, Kameo', playstation: '➡️ ⬇️ ⬇️ R1', xbox: '➡️ ⬇️ ⬇️ RB', switch: '➡️ ⬇️ ⬇️ R' },
        description: 'Atraviesa el pecho del oponente con su cola metálica y lo levanta partiéndolo en dos.'
      }
    ]
  },
  {
    id: 'stryker-kameo',
    name: 'Kurtis Stryker (Kameo)',
    alias: 'Comandante SWAT de Represión Antidisturbios',
    category: 'Kameo Fighter',
    gamesAppeared: ['mk9', 'mk1'],
    originRealm: 'Earthrealm (Nueva York)',
    accentColor: '#3b82f6',
    bgGradient: 'from-blue-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'KS', primaryColor: '#3b82f6', secondaryColor: '#1d4ed8', iconSymbol: '👮' },
    bioSummary: 'El oficial de la policía SWAT de Nueva York. En MK1 apoya como Kameo Fighter con granadas aturdidoras, esposas inmovilizadoras y descargas de pistola taser.',
    combatRole: 'Kameo de control y aturdimiento con esposas policiales, granadas cegadoras y porra policial.',
    signatureWeapons: ['Esposas de titanio', 'Granadas cegadoras Stun Grenades', 'Taser de alto voltaje'],
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Gorra policial hacia atrás, chaleco antibalas azul y porra en la cintura (estilo MK3).',
        modelDesignDescription: 'Oficial de policía de los años 90 fielmente modelado en Unreal Engine 5.',
        loreArc: 'Protege las calles de la invasión interdimensional imponiendo la ley humana.',
        signatureMechanic: 'Arresto con esposas que deja al rival completamente vulnerable a kombos.',
        iconicQuote: 'Police brutality, coming up!'
      }
    ],
    moveset: [
      {
        name: 'Handcuffs Restraint (Esposas Policiales)',
        type: 'Especial',
        damage: '0 pts (Stun)',
        distance: 'Media',
        steps: { universal: 'B + Kameo', playstation: '⬅️ + R1', xbox: '⬅️ + RB', switch: '⬅️ + R' },
        description: 'Corre e inmoviliza las muñecas del enemigo con esposas de acero para permitir un combo libre.'
      }
    ]
  },
  {
    id: 'frost-kameo',
    name: 'Frost (Kameo)',
    alias: 'Aprendiz Rebelde de Criomancia / Asistente Lin Kuei',
    category: 'Kameo Fighter',
    gamesAppeared: ['mkx', 'mk11', 'mk1'],
    originRealm: 'Earthrealm',
    accentColor: '#38bdf8',
    bgGradient: 'from-sky-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'FR', primaryColor: '#38bdf8', secondaryColor: '#0284c7', iconSymbol: '🧊' },
    bioSummary: 'La impetuosa criomante aprendiz de Sub-Zero en su apariencia humana clásica. En MK1 asiste con congelación a ras de suelo (Ice Puddle) y carámbanos disparados desde el aire.',
    combatRole: 'Kameo de congelación baja inbloqueable con charco helado y proyectiles de escarcha aérea.',
    signatureWeapons: ['Dagas de hielo sólido', 'Charco congelante Ice Puddle'],
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Traje de combate azul Lin Kuei clásico con peinado puntiagudo de picos de hielo.',
        modelDesignDescription: 'Versión humana antes de su ciborgización en MK11, con escarcha emanando de sus manos.',
        loreArc: 'Guerrera del clan que busca demostrar su superioridad en criomancia.',
        signatureMechanic: 'Ice Puddle que congela los pies del rival al contacto.',
        iconicQuote: 'I will freeze you solid!'
      }
    ],
    moveset: [
      {
        name: 'Ice Puddle (Charco Gélido)',
        type: 'Especial',
        damage: '0 pts (Congelación baja)',
        distance: 'Cualquiera',
        steps: { universal: 'D + Kameo', playstation: '⬇️ + R1', xbox: '⬇️ + RB', switch: '⬇️ + R' },
        description: 'Crea un charco resbaladizo de hielo en el suelo que congela las piernas del rival indefenso.'
      }
    ]
  },
  {
    id: 'sektor-kameo',
    name: 'Sektor (Kameo)',
    alias: 'Ciborg Rojo LK-9T9 Clásico',
    category: 'Kameo Fighter',
    gamesAppeared: ['mk9', 'mkx', 'mk1'],
    originRealm: 'Earthrealm (Lin Kuei)',
    accentColor: '#dc2626',
    bgGradient: 'from-red-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'SK', primaryColor: '#dc2626', secondaryColor: '#7f1d1d', iconSymbol: '🚀' },
    bioSummary: 'El despiadado ciborg carmesí del Lin Kuei. En MK1 asiste con su letal misil hacia arriba Up-Missile que cae desde el cielo rompiendo guardias y su lanzallamas incinerador.',
    combatRole: 'Kameo de zonificación con misiles dirigidos, lanzallamas y teletransporte de puño ascendente.',
    signatureWeapons: ['Misiles teledirigidos desde el pecho', 'Lanzallamas incendiario de brazo'],
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Armadura roja de titanio con casco cibernético clásico de MK3.',
        modelDesignDescription: 'Modelo nostálgico con compuertas pectorales y visor visor óptico.',
        loreArc: 'Unidad de asalto mecanizada del Gran Maestro.',
        signatureMechanic: 'Up-Missile que cae verticalmente sobre el oponente.',
        iconicQuote: 'Target locked.'
      }
    ],
    moveset: [
      {
        name: 'Up-Missile Assist',
        type: 'Especial',
        damage: '90 pts',
        distance: 'Cualquiera',
        steps: { universal: 'U + Kameo', playstation: '⬆️ + R1', xbox: '⬆️ + RB', switch: '⬆️ + R' },
        description: 'Dispara un misil hacia el cielo que cae segundos después sobre la posición del rival forzando el bloqueo.'
      }
    ]
  },
  {
    id: 'darrius-kameo',
    name: 'Darrius (Kameo)',
    alias: 'Líder Revolucionario de Seido (Reino del Orden)',
    category: 'Kameo Fighter',
    gamesAppeared: ['mk1'],
    originRealm: 'Orderrealm (Seido)',
    accentColor: '#ea580c',
    bgGradient: 'from-orange-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'DA', primaryColor: '#ea580c', secondaryColor: '#7c2d12', iconSymbol: '🕶️' },
    bioSummary: 'El revolucionario líder terrorista de Seido que combate contra el régimen autoritario del Orden. En MK1 se luce como uno de los Kameos de mayor daño técnico gracias a su patada de inversión giratoria.',
    combatRole: 'Kameo de extensiones acrobáticas y derribos cruzados que cambian la posición de la pantalla.',
    signatureWeapons: ['Gafas de sol tácticas', 'Patadas circulares de Seido'],
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Traje de combate naranja y blanco de Seido con gafas de sol doradas.',
        modelDesignDescription: 'Retorno desde la era de MK Deception con animaciones marciales elegantes.',
        loreArc: 'Conspira para desestabilizar el Orden e instaurar una nueva revolución.',
        signatureMechanic: 'Twister Kick que permite continuaciones de combo en cualquier punto.',
        iconicQuote: 'Chaos will bring true freedom!'
      }
    ],
    moveset: [
      {
        name: 'Tornado Kick Assist',
        type: 'Especial',
        damage: '90 pts',
        distance: 'Media',
        steps: { universal: 'F + Kameo', playstation: '➡️ + R1', xbox: '➡️ + RB', switch: '➡️ + R' },
        description: 'Ejecuta una patada giratoria invertida que eleva al rival para prolongar el castigo.'
      }
    ]
  },
  {
    id: 'shujinko-kameo',
    name: 'Shujinko (Kameo)',
    alias: 'El Discípulo Errante / Maestro Copiador de Estilos',
    category: 'Kameo Fighter',
    gamesAppeared: ['mk1'],
    originRealm: 'Earthrealm / Outworld',
    accentColor: '#eab308',
    bgGradient: 'from-amber-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'SJ', primaryColor: '#eab308', secondaryColor: '#78350f', iconSymbol: '🥋' },
    bioSummary: 'El legendario maestro anciano que durante su juventud viajó por todos los reinos absorbiendo las técnicas de cada guerrero existente. En MK1 copia en tiempo real los movimientos clave del personaje rival que estás enfrentando.',
    combatRole: 'Kameo adaptativo capaz de meditar para cargar medidor y ejecutar los mejores movimientos especiales del rival.',
    signatureWeapons: ['Copias miméticas de artes marciales de todos los reinos', 'Báculo marcial'],
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Túnicas blancas tradicionales de maestro con barba y cejas largas plateadas.',
        modelDesignDescription: 'Modelo honorable de la era 3D (MK Deception) reimaginado con gestos de meditación.',
        loreArc: 'Sabio venerable que asiste a los campeones de Liu Kang.',
        signatureMechanic: 'Meditación para desbloquear los movimientos icónicos del contrincante.',
        iconicQuote: 'I have learned from the greatest warriors of all realms.'
      }
    ],
    moveset: [
      {
        name: 'Mimic Special Move',
        type: 'Especial',
        damage: 'Variable según rival',
        distance: 'Cualquiera',
        steps: { universal: 'Kameo (tras meditar)', playstation: 'R1', xbox: 'RB', switch: 'R' },
        description: 'Ejecuta el movimiento especial insignia del personaje rival que está en combate.'
      }
    ]
  },
  {
    id: 'tremor-kameo',
    name: 'Tremor (Kameo)',
    alias: 'Ninja Geomante del Black Dragon (DLC Kameo)',
    category: 'Kameo Fighter',
    gamesAppeared: ['mkx', 'mk1'],
    originRealm: 'Earthrealm',
    accentColor: '#78350f',
    bgGradient: 'from-amber-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'TR', primaryColor: '#78350f', secondaryColor: '#451a03', iconSymbol: '🪨' },
    bioSummary: 'El ninja mutante del Black Dragon capaz de controlar la roca, la lava y las ondas sísmicas de la tierra. En MK1 es un Kameo DLC que cambia dinámicamente de postura entre modo Roca (defensivo), Metálico (armadura) y Magma (ofensivo).',
    combatRole: 'Kameo de tres posturas elementales con ondas sísmicas, bolas de lava y armadura de piedra.',
    signatureWeapons: ['Roca ígnea', 'Lava volcánica fundida', 'Ondas sísmicas de tierra'],
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Ninja con armadura de placas de granito marrón y ojos resplandecientes como magma.',
        modelDesignDescription: 'Efectos de partículas de tierra y rocas orbitando su cuerpo en Unreal Engine 5.',
        loreArc: 'Fuerza telúrica mercenaria que vende su poder al mejor postor.',
        signatureMechanic: 'Cambio de posturas: Earth, Metallic y Crystal/Magma.',
        iconicQuote: 'The earth shakes beneath my feet!'
      }
    ],
    moveset: [
      {
        name: 'Earthquake Wave',
        type: 'Especial',
        damage: '90 pts',
        distance: 'Cualquiera',
        steps: { universal: 'D + Kameo', playstation: '⬇️ + R1', xbox: '⬇️ + RB', switch: '⬇️ + R' },
        description: 'Golpea el piso provocando una fisura sísmica que derriba al oponente desde cualquier distancia.'
      }
    ]
  },
  {
    id: 'khameleon-kameo',
    name: 'Khameleon (Kameo)',
    alias: 'La Última Hembra Zaterrana (DLC Kameo)',
    category: 'Kameo Fighter',
    gamesAppeared: ['mk1'],
    originRealm: 'Zaterra',
    accentColor: '#06b6d4',
    bgGradient: 'from-cyan-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'KM', primaryColor: '#06b6d4', secondaryColor: '#0e7490', iconSymbol: '🦎' },
    bioSummary: 'Perteneciente a la raza zaterrana (Saurian) al igual que Reptile. En MK1 rota cíclicamente entre los estilos y armas de las ninjas femeninas: los abanicos de Kitana (azul), los sais y rodillo de Mileena (magenta) y el báculo y glaive de Jade (verde).',
    combatRole: 'Kameo versátil con rotación automática de posturas ninja: abanicos voladores, rodillo terrestre y báculo de Jade.',
    signatureWeapons: ['Abanicos de acero (Kitana)', 'Sais gemelos (Mileena)', 'Báculo y glaive (Jade)'],
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Traje ninja traslúcido que cambia de color dinámicamente entre azul, fucsia y verde esmeralda.',
        modelDesignDescription: 'Modelo 3D elegante con piel escamosa reptiliana sutil y máscara plateada.',
        loreArc: 'Lucha por preservar la memoria y existencia de su reino extinto Zaterra.',
        signatureMechanic: 'Rotación periódica entre modos Kitana, Mileena y Jade.',
        iconicQuote: 'Zaterra will live again!'
      }
    ],
    moveset: [
      {
        name: 'Fan Lift / Roll / Glaive Toss',
        type: 'Especial',
        damage: '85 pts',
        distance: 'Media',
        steps: { universal: 'Kameo', playstation: 'R1', xbox: 'RB', switch: 'R' },
        description: 'Ejecuta el movimiento especial de la ninja correspondiente a su color de postura actual.'
      }
    ]
  },
  {
    id: 'janet-cage-kameo',
    name: 'Janet Cage (Kameo)',
    alias: 'Versión Multiversal de Johnny Cage (DLC Kameo)',
    category: 'Kameo Fighter',
    gamesAppeared: ['mk1'],
    originRealm: 'Línea Temporal Alternativa',
    accentColor: '#10b981',
    bgGradient: 'from-emerald-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'JC', primaryColor: '#10b981', secondaryColor: '#064e3b', iconSymbol: '⭐' },
    bioSummary: 'La contraparte femenina de Johnny Cage de una línea temporal alternativa del multiverso. Conserva el mismo carisma desbordante de estrella de Hollywood, los lentes de sol oscuros y los saltos acrobáticos de sombra verde.',
    combatRole: 'Kameo ofensivo de rebote y dobles de riesgo con patadas de sombra y marionetas de mimo.',
    signatureWeapons: ['Sombra verde ancestral', 'Gafas de sol de estrella de cine'],
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Ropa deportiva ochentera ceñida con coleta rubia y gafas de sol de diseñador.',
        modelDesignDescription: 'Versión estelar del capítulo final del multiverso de MK1.',
        loreArc: 'Heroína multiversal que apoya a los defensores de la línea temporal del Dios Liu Kang.',
        signatureMechanic: 'Stunt Double con combinaciones de acrobacias que rebotan al enemigo.',
        iconicQuote: 'Did you get my good side?'
      }
    ],
    moveset: [
      {
        name: 'Stunt Double Hop',
        type: 'Especial',
        damage: '85 pts',
        distance: 'Media',
        steps: { universal: 'F + Kameo', playstation: '➡️ + R1', xbox: '➡️ + RB', switch: '➡️ + R' },
        description: 'Se desliza en salto haciendo un split en el aire que rebota al enemigo para extender combos.'
      }
    ]
  },
  {
    id: 'mavado-kameo',
    name: 'Mavado (Kameo)',
    alias: 'Líder del Clan Mercenario Red Dragon (DLC Kameo)',
    category: 'Kameo Fighter',
    gamesAppeared: ['mk1'],
    originRealm: 'Earthrealm',
    accentColor: '#dc2626',
    bgGradient: 'from-red-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'MV', primaryColor: '#dc2626', secondaryColor: '#7f1d1d', iconSymbol: '🪢' },
    bioSummary: 'El calculador comandante del clan criminal Red Dragon (rivales mortales del Black Dragon de Kano). Empuña cuerdas elásticas de acero ganchudas para propulsarse por el escenario y espadas Hook Swords arrebatadas a Kabal.',
    combatRole: 'Kameo de alta movilidad con cuerdas elásticas Bungee que arrastran al rival o impulsan al kombatiente.',
    signatureWeapons: ['Cuerdas elásticas de acero Bungee Ropes', 'Espadas ganchudas Hook Swords'],
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Gabardina de cuero negro con hombreras rojas y arnés de cuerdas elásticas.',
        modelDesignDescription: 'Reinvención de su diseño de MK Deadly Alliance con física moderna de ganchos.',
        loreArc: 'Mercenario que interviene para asegurar los intereses de su organización secreta.',
        signatureMechanic: 'Bungee Escape y Hook Sword Trip.',
        iconicQuote: 'The Red Dragon will reign supreme!'
      }
    ],
    moveset: [
      {
        name: 'Bungee Rope Drop',
        type: 'Especial',
        damage: '90 pts',
        distance: 'Cualquiera',
        steps: { universal: 'B + Kameo', playstation: '⬅️ + R1', xbox: '⬅️ + RB', switch: '⬅️ + R' },
        description: 'Se dispara con sus cuerdas elásticas cayendo con una patada en picada sobre la cabeza del rival.'
      }
    ]
  },
  {
    id: 'ferra-kameo',
    name: 'Ferra (Kameo)',
    alias: 'La Feroz Jinete Simbiótica (DLC Kameo)',
    category: 'Kameo Fighter',
    gamesAppeared: ['mkx', 'mk1'],
    originRealm: 'Outworld',
    accentColor: '#ca8a04',
    bgGradient: 'from-yellow-950 via-stone-900 to-black',
    fallbackBadge: { initials: 'FR', primaryColor: '#ca8a04', secondaryColor: '#713f12', iconSymbol: '🐾' },
    bioSummary: 'La pequeña y salvaje jinete de la raza simbiótica de Outworld (anteriormente compañera de Torr en MKX). En MK1 se monta en la espalda de tu kombatiente principal, otorgándole saltos acrobáticos, cortes con garras y posturas montadas.',
    combatRole: 'Kameo de postura montada que altera la altura y velocidad de salto, con lanzamientos y arañazos.',
    signatureWeapons: ['Garras de acero afiladas', 'Casco óseo puntiagudo'],
    evolution: [
      {
        gameKey: 'mk1',
        gameTitle: 'Mortal Kombat 1 (12 / 2023)',
        releaseYear: 2023,
        costumeAesthetic: 'Pieles rasgadas de combate con máscara ósea y brazaletes de cuero con garras.',
        modelDesignDescription: 'Animaciones llenas de energía frenética montada sobre los hombros del luchador.',
        loreArc: 'Jovencita feroz que ayuda a sus aliados a destrozar a los rivales a mordiscos y arañazos.',
        signatureMechanic: 'Ride Stance: se sube a los hombros del luchador abriendo nuevas rutas de combo aéreo.',
        iconicQuote: 'Ferra slice and dice!'
      }
    ],
    moveset: [
      {
        name: 'Claw Drop Slash',
        type: 'Especial',
        damage: '85 pts',
        distance: 'Media',
        steps: { universal: 'F + Kameo', playstation: '➡️ + R1', xbox: '➡️ + RB', switch: '➡️ + R' },
        description: 'Se lanza desde el hombro del kombatiente cayendo con sus garras sobre el rostro del rival.'
      }
    ]
  }
];
