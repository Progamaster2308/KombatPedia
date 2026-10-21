/**
 * Base de datos de los Reinos de Mortal Kombat, Reglas Sagradas del Torneo
 * y la Cronología de las 4 entregas principales (MK9 a MK12).
 */

export interface RealmInfo {
  id: string;
  name: string;
  guardian: string;
  ruler: string;
  status: 'Protegido' | 'En Guerra' | 'Conquistado' | 'Restaurado' | 'Caótico';
  description: string;
  environment: string;
  notableLocations: string[];
  nativeSpecies: string[];
}

export interface TournamentRule {
  ruleNumber: number;
  title: string;
  decree: string;
  elderGodMandate: string;
}

export interface TimelineEra {
  gameKey: 'mk8' | 'mk9' | 'mkx' | 'mk11' | 'mk12';
  title: string;
  subtitle: string;
  year: number;
  summary: string;
  keyEvents: string[];
}

export const REALMS_DATA: RealmInfo[] = [
  {
    id: 'earthrealm',
    name: 'Earthrealm (La Tierra)',
    guardian: 'Raiden (anteriormente) / Fire God Liu Kang',
    ruler: 'Consejo de Naciones / Protectores Shaolin y Fuerzas Especiales',
    status: 'Protegido',
    description: 'El reino madre de la humanidad y el corazón de la creación. Debido a su inmensa energía vital (el Jinsei), Earthrealm ha sido el objetivo primordial de conquista para los emperadores de Outworld durante milenios.',
    environment: 'Megaciudades modernas, templos ancestrales en montañas nevadas, costas tropicales y dimensiones de bolsillo.',
    notableLocations: ['Cámara del Jinsei', 'Templo Shaolin de la Luz', 'Academia Wu Shi', 'Base Subterránea de las Fuerzas Especiales', 'Jardines de Fuego'],
    nativeSpecies: ['Humanos', 'Criomantes', 'Cultos ancestrales', 'Dioses protectores']
  },
  {
    id: 'outworld',
    name: 'Outworld (El Mundo Exterior)',
    guardian: 'Anteriormente Onaga el Rey Dragón',
    ruler: 'Emperatriz Sindel / Kitana Kahn / General Shao (militar)',
    status: 'En Guerra',
    description: 'Un imperio colosal y desolado formado a lo largo de eones mediante la anexión y absorción forzada de innumerables reinos conquistados por la fuerza bruta de sus emperadores.',
    environment: 'Páramos de roca volcánica, fosas de almas incandescentes, junglas venenosas de Kuatan y coliseos imperiales de piedra.',
    notableLocations: ['Coliseo de Shao Kahn', 'Fosas de Almas (Soul Pits)', 'Bosque Viviente (Living Forest)', 'Páramos de Wastelands', 'Fortaleza Imperial'],
    nativeSpecies: ['Outworlders', 'Tarkatanos', 'Shokan (4 brazos)', 'Centauros', 'Osh-Tekk', 'Kytinn']
  },
  {
    id: 'netherrealm',
    name: 'Netherrealm (El Infierno / Sub-Mundo)',
    guardian: 'Lucifer (desterrado) / Dios Caído Shinnok',
    ruler: 'Quan Chi / Reyes Retornados (Liu Kang & Kitana) / Noob Saibot',
    status: 'Conquistado',
    description: 'La dimensión más oscura y tortuosa del multiverso de Mortal Kombat. Hogar de almas corruptas, espectros no-muertos (Revenants), demonios y nigromantes que sirven al Dios Caído Shinnok.',
    environment: 'Ríos de lava sulfúrica, acantilados de calaveras, ciudadelas de hierro oxidado y tormentas de ceniza sin fin.',
    notableLocations: ['Trono de Huesos de Shinnok', 'Foso de las Almas Malditas', 'Laboratorio Nigromántico de Quan Chi', 'Pira de las Sombras'],
    nativeSpecies: ['Espectros y Retornados', 'Demonios Menores (Oni)', 'Nigromantes de la Hermandad de la Sombra']
  },
  {
    id: 'edenia',
    name: 'Edenia (El Paraíso Restaurado)',
    guardian: 'Argus y Delia',
    ruler: 'Reina Sindel / Princesa Kitana',
    status: 'Restaurado',
    description: 'Un reino de belleza paradisíaca, magia desbordante y longevidad milenaria. Tras perder 10 torneos seguidos hace 10,000 años, fue anexado por Shao Kahn y liberado finalmente por Kitana.',
    environment: 'Palacios de mármol blanco, cascadas de agua cristalina, cielos violetas y jardines botánicos mágicos.',
    notableLocations: ['Palacio Real de Edenia', 'Pirámide de Argus', 'Santuario de Jade', 'Jardines de la Serenidad'],
    nativeSpecies: ['Edenianos (humanoides mágicos longevos)']
  },
  {
    id: 'chaosrealm',
    name: 'Chaosrealm (El Reino del Caos)',
    guardian: 'Havik el Clérigo del Caos',
    ruler: 'Ninguno (La anarquía es ley suprema)',
    status: 'Caótico',
    description: 'Un plano sin orden físico, moral ni temporal. La gravedad es inestable, los edificios flotan sin cimientos y sus habitantes adoran la entropía pura y la autodestrucción como la máxima virtud cósmica.',
    environment: 'Islas flotantes de piedra, vórtices de antimateria, cascadas que fluyen hacia arriba y estructuras fractales.',
    notableLocations: ['Templo del Clérigo Havik', 'Vórtice del Caos', 'Páramo Fracturado'],
    nativeSpecies: ['Chaosrealmers (inmunes al dolor, autoflagelantes)']
  },
  {
    id: 'orderrealm',
    name: 'Orderrealm / Seido (El Reino del Orden)',
    guardian: 'Hotaru y la Guardia Seidan',
    ruler: 'Senado de Seido',
    status: 'Protegido',
    description: 'El polo opuesto de Chaosrealm. Un reino de geometría perfecta, limpieza absoluta y leyes draconianas donde la menor infracción es castigada con cadena perpetua o ejecución.',
    environment: 'Ciudades flotantes simétricas de cristal y titanio, jardines zen perfectos y cárceles de alta seguridad.',
    notableLocations: ['Plaza de Seido', 'Cámara de las Leyes Absolutas', 'Prisión del Horizonte'],
    nativeSpecies: ['Seidans (guardianes estrictos del orden cósmico)']
  }
];

export const TOURNAMENT_RULES: TournamentRule[] = [
  {
    ruleNumber: 1,
    title: 'El Sagrado Mandato de los Dioses Antiguos',
    decree: 'Ningún reino puede invadir o anexar a otro reino soberano a través de una guerra unilateral o fuerza militar sin haber prevalecido primero en el torneo sagrado.',
    elderGodMandate: 'Decreto Antiguo Artículo I'
  },
  {
    ruleNumber: 2,
    title: 'La Regla de las Diez Victorias Consecutivas',
    decree: 'Para reclamar el derecho de conquista, el reino invasor debe triunfar en diez (10) ediciones consecutivas del torneo Mortal Kombat, celebrado una vez cada 50 años terrestres.',
    elderGodMandate: 'Decreto Antiguo Artículo V'
  },
  {
    ruleNumber: 3,
    title: 'El Combate Mortal y la Ejecución (Fatality)',
    decree: 'Los kombatientes tienen el derecho sagrado de terminar la vida de sus rivales caídos. La muerte en la arena es definitiva y vinculante ante los ojos del cosmos.',
    elderGodMandate: 'Decreto Antiguo Artículo IX'
  },
  {
    ruleNumber: 4,
    title: 'Protección de los Dioses Guardianes',
    decree: 'Los Dioses Protectores (como Raiden o Fujin) tienen prohibido intervenir directamente con su poder ilimitado en los combates; solo pueden aconsejar y seleccionar a los campeones mortales.',
    elderGodMandate: 'Decreto Antiguo Artículo XIV'
  }
];

export const TIMELINE_ERAS: TimelineEra[] = [
  {
    gameKey: 'mk8',
    title: 'Mortal Kombat vs. DC Universe',
    subtitle: 'El Choque Interdimensional (2008 · VIII)',
    year: 2008,
    summary: 'La derrota simultánea de Shao Kahn y Darkseid crea una brecha en el Nexo del multiverso que fusiona a ambos tiranos en la monstruosidad cósmica Dark Kahn. Los kombatientes de Mortal Kombat y los superhéroes y villanos de DC Comics colisionan consumidos por la Ira Dimensional.',
    keyEvents: [
      'Aparición de portales cósmicos entre Metropolis, Gotham City y Outworld',
      'Fusión anómala de Shao Kahn y Darkseid en Dark Kahn',
      'Duelos entre Scorpion vs Batman y Raiden vs Superman',
      'Despertar de la Ira Dimensional y el combate en caída libre (Free-Fall)',
      'Alianza final entre Raiden y Superman para restaurar los universos'
    ]
  },
  {
    gameKey: 'mk9',
    title: 'Mortal Kombat 9',
    subtitle: 'El Reinicio del Destino (2011)',
    year: 2011,
    summary: 'A punto de ser aniquilado por Shao Kahn en la cima de la Pirámide de Argus, Raiden envía un mensaje telepático al pasado a su yo del primer torneo: "He must win". Esto reescribe la historia de los torneos 1, 2 y 3 con consecuencias sangrientas imprevistas.',
    keyEvents: [
      'Victoria de Liu Kang sobre Shang Tsung y Goro',
      'Muerte de Bi-Han y nacimiento de Noob Saibot',
      'Masacre de los guerreros de Earthrealm a manos de Sindel potenciada',
      'Muerte accidental de Liu Kang a manos de Raiden',
      'Invasión fallida de Shao Kahn y castigo de los Elder Gods'
    ]
  },
  {
    gameKey: 'mkx',
    title: 'Mortal Kombat X',
    subtitle: 'La Siguiente Generación (2015)',
    year: 2015,
    summary: 'Veinticinco años después de MK9, el Dios Mayor Caído Shinnok desata una invasión con su ejército de Retornados (los héroes caídos convertidos en espectros). Una nueva generación de héroes (Cassie Cage, Jacqui Briggs, Takeda y Kung Jin) debe asumir la defensa de la Tierra.',
    keyEvents: [
      'Guerra civil de Outworld entre Kotal Kahn y Mileena',
      'Paz histórica entre los clanes Shirai Ryu (Scorpion) y Lin Kuei (Sub-Zero)',
      'Despertar del poder ancestral de Cassie Cage y derrota de Corrupted Shinnok',
      'Surgimiento de Dark Raiden con el amuleto corrupto'
    ]
  },
  {
    gameKey: 'mk11',
    title: 'Mortal Kombat 11',
    subtitle: 'El Colapso de las Líneas Temporales (2019)',
    year: 2019,
    summary: 'Kronika, la Titán y Guardiana del Tiempo, decide borrar la línea temporal actual debido a las constantes alteraciones de Raiden. Colisiona el pasado con el presente, obligando a los héroes a enfrentarse a sus versiones jóvenes y espectrales.',
    keyEvents: [
      'Colisión temporal de épocas del primer torneo con el presente',
      'Kitana derrota a Shao Kahn y es coronada Kitana Kahn de Outworld',
      'Fusión de Raiden y Liu Kang en el Dios del Fuego Liu Kang',
      'Derrota de Kronika y control del Reloj de Arena Cósmico',
      'Shang Tsung en Aftermath engaña a los héroes antes de la batalla final'
    ]
  },
  {
    gameKey: 'mk12',
    title: 'Mortal Kombat 1 (12)',
    subtitle: 'La Nueva Era del Dios del Fuego (2023)',
    year: 2023,
    summary: 'Habiendo derrotado a Kronika y Shang Tsung, el Dios del Fuego Liu Kang reinicia el universo desde cero, moldeando una Nueva Era donde todos los seres tienen la oportunidad de vivir en paz. Sin embargo, fuerzas multidimensionales amenazan el nuevo orden.',
    keyEvents: [
      'Creación de una era de armonía entre Earthrealm y Outworld',
      'Raiden renace como mortal virtuoso y Scorpion/Sub-Zero como hermanos Lin Kuei',
      'Infiltración del misterioso Titan Shang Tsung de una línea temporal paralela',
      'Batalla climática en la Pirámide del Tiempo multiversal'
    ]
  }
];
