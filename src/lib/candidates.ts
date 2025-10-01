export interface Candidate {
  id: string;
  name: string;
  party: string;
  image: string;
  description?: string;
  fullDescription?: string;
  position?: string;
  votesIn2023?: string;
  swot?: {
    strengths: string[];
    weaknesses: string[];
    opportunities?: string[];
    threats?: string[];
  };
  keyStats?: {
    age?: string;
    experience?: string;
    region?: string;
    coalition?: string;
  };
}

export const presidentialCandidates: Candidate[] = [
  {
    id: 'bola-ahmed-tinubu',
    name: 'Bola Ahmed Tinubu',
    party: 'APC (All Progressives Congress)',
    image: '/candidates/tinubu.png',
    description: 'Incumbent President (2023–present), former Lagos Governor',
    fullDescription: 'Incumbent President (2023–present), former Lagos Governor (1999–2007), and APC national leader. Known as the "Jagaban," Tinubu won the 2023 election with 8.79 million votes (36.61%).',
    position: 'Incumbent President',
    votesIn2023: '8.79 million votes (36.61%)',
    keyStats: {
      age: '75 by 2027',
      experience: 'President (2023-present), Lagos Governor (1999-2007)',
      region: 'South-West',
      coalition: 'APC National Structure'
    },
    swot: {
      strengths: [
        'Incumbency Advantage: As the sitting president, Tinubu controls federal resources, patronage networks, and the APC\'s national structure, which dominates the North-West and South-West.',
        'Political Network: Tinubu\'s extensive alliances, built over decades, include loyalists like Kano Governor Abdullahi Ganduje, giving him a strong foothold in key voting regions.',
        'South-West Dominance: His Yoruba base and control of Lagos ensure a solid regional vote, with the APC\'s infrastructure amplifying his reach.',
        'Reform Initiatives: His administration\'s reforms (e.g., fuel subsidy removal, digital economy initiatives) are touted as long-term gains by supporters.'
      ],
      weaknesses: [
        'Economic Backlash: Tinubu\'s policies, like fuel subsidy removal and naira devaluation, have fueled inflation and hardship, alienating voters.',
        'Eroding Northern Support: His 2023 northern coalition is fraying due to unfulfilled promises and security challenges (e.g., banditry, kidnapping).',
        'Health and Age Concerns: At 75 by 2027, Tinubu\'s age and perceived health issues may deter voters seeking a younger, dynamic leader.',
        'Regional Grievances: A 2025 survey showed 90% distrust in political leaders, with Tinubu\'s ethnic-focused appointments deepening regional grievances.'
      ]
    }
  },
  {
    id: 'goodluck-jonathan',
    name: 'Goodluck Jonathan',
    party: 'PDP (Peoples Democratic Party)',
    image: '/candidates/goodluck.png',
    description: 'Former President (2010–2015), South-South leader',
    fullDescription: 'Former President (2010–2015), South-South leader, eligible for a single term due to a 2022 court ruling. His 2015 loss to Buhari was Nigeria\'s first incumbent defeat.',
    position: 'Former President',
    votesIn2023: 'Did not contest',
    keyStats: {
      age: '69 by 2027',
      experience: 'President (2010-2015), Vice President (2007-2010)',
      region: 'South-South',
      coalition: 'PDP Support Base'
    },
    swot: {
      strengths: [
        'National Appeal: Jonathan\'s presidency is viewed nostalgically by some, particularly in the South-South and Middle-Belt, for his inclusive governance and infrastructure projects.',
        'Northern Support: Unlike other southern candidates, Jonathan has backing from northern groups wary of another Fulani candidate, giving him an edge in the North-West and North-Central.',
        'Experience: His prior presidency offers proven executive experience, appealing to voters seeking stability in a crisis-ridden economy.',
        'Party Support: His 2024 PDP invitation reflects strong party support and potential unity.'
      ],
      weaknesses: [
        '2015 Baggage: Jonathan\'s defeat was tied to perceived weak leadership on security (e.g., Boko Haram) and corruption scandals, which opponents may revive.',
        'Hesitation: Reports suggest Jonathan is reluctant to run, which could weaken his campaign momentum and party cohesion if he delays a decision.',
        'Regional Competition: His South-South candidacy may split southern votes with Obi or Amaechi, complicating PDP\'s strategy against Tinubu\'s APC.',
        'Age Factor: Questions about energy and relevance for modern challenges may affect younger voter appeal.'
      ]
    }
  },
  {
    id: 'atiku-abubakar',
    name: 'Atiku Abubakar',
    party: 'ADC Coalition',
    image: '/candidates/atiku.png',
    description: 'Former Vice President (1999–2007), six-time presidential candidate',
    fullDescription: 'Former Vice President (1999–2007), six-time presidential candidate, and 2023 PDP runner-up (6.98 million votes). Recently joined the ADC coalition with Obi.',
    position: 'Former Vice President',
    votesIn2023: '6.98 million votes',
    keyStats: {
      age: '81 by 2027',
      experience: 'Vice President (1999-2007), 6-time Presidential Candidate',
      region: 'North-East',
      coalition: 'ADC Coalition with Obi'
    },
    swot: {
      strengths: [
        'National Reach: Atiku\'s PDP tenure and business empire give him a broad network across all six geopolitical zones, with a strong North-East base.',
        'Coalition Strategy: His leadership in the ADC coalition with Obi, El-Rufai, and others signals a unified opposition, potentially consolidating anti-APC votes.',
        'Policy Expertise: Atiku\'s "true federalism" platform resonates with regions seeking restructuring, particularly in the South-South and South-East.',
        'Campaign Experience: His 2023 performance showed resilience and organizational capability.'
      ],
      weaknesses: [
        'Perceived Opportunism: Atiku\'s frequent party switches and repeated candidacies fuel perceptions of desperation, alienating younger voters and PDP stalwarts.',
        'Northern Fatigue: As a Fulani, Atiku faces resistance from voters wary of northern dominance after Buhari\'s eight years, especially in the Middle-Belt and South.',
        'Coalition Tensions: Rivalries with Obi and others in the ADC may fracture the alliance, as their competing ambitions lack a shared vision.',
        'Advanced Age: At 81 by 2027, age concerns may significantly impact voter confidence.'
      ]
    }
  },
  {
    id: 'peter-obi',
    name: 'Peter Obi',
    party: 'ADC Coalition',
    image: '/candidates/obi.png',
    description: 'Former Anambra Governor (2006–2014), 2023 LP candidate',
    fullDescription: 'Former Anambra Governor (2006–2014), 2023 LP candidate (6.1 million votes). Known for youth appeal and frugality, Obi is part of the ADC coalition.',
    position: 'Former Governor',
    votesIn2023: '6.1 million votes',
    keyStats: {
      age: '66 by 2027',
      experience: 'Anambra Governor (2006-2014), Business Executive',
      region: 'South-East',
      coalition: 'ADC Coalition with Atiku'
    },
    swot: {
      strengths: [
        'Youth and Social Media Appeal: Obi\'s 2023 campaign galvanized Nigeria\'s youth (39.7% of 2023 voters), particularly in the South-East and South-South.',
        'Coalition Potential: His ADC alliance with Atiku and others could unify opposition votes, with some analysts suggesting an Obi-El-Rufai ticket could challenge Tinubu.',
        'Clean Image: Obi\'s reputation for accountability and modest governance in Anambra contrasts with Nigeria\'s corrupt political class, appealing to urban voters.',
        'Digital Campaign Mastery: Strong social media presence and grassroots mobilization capabilities.'
      ],
      weaknesses: [
        'Limited Structure: The LP\'s weak national presence, especially in the North, limits Obi\'s reach. His 2023 votes were concentrated in the South.',
        'Regional Perception: Seen as an Igbo candidate, Obi struggles to win northern trust, especially if Jonathan runs, rendering his candidacy "inconsequential" per some analysts.',
        'One-Term Pledge: Obi\'s promise of a single term may deter voters seeking long-term stability, particularly in a coalition with Atiku\'s longer ambitions.',
        'Coalition Disputes: Internal disagreements may dilute his base and message clarity.'
      ]
    }
  },
  {
    id: 'rabiu-musa-kwankwaso',
    name: 'Rabiu Musa Kwankwaso',
    party: 'NNPP (New Nigeria Peoples Party)',
    image: '/candidates/kwankwaso.png',
    description: 'Former Kano Governor (1999–2003, 2011–2015), 2023 NNPP candidate',
    fullDescription: 'Former Kano Governor (1999–2003, 2011–2015), 2023 NNPP candidate (1.5 million votes). Leads the Kwankwasiyya movement with strong North-West influence.',
    position: 'Former Governor',
    votesIn2023: '1.5 million votes',
    keyStats: {
      age: '71 by 2027',
      experience: 'Kano Governor (1999-2003, 2011-2015), Senator',
      region: 'North-West',
      coalition: 'Kwankwasiyya Movement'
    },
    swot: {
      strengths: [
        'Kano Stronghold: Kwankwaso\'s cult-like following in Kano, Nigeria\'s vote-richest state, ensures significant ballots. His 2023 performance split northern votes.',
        'Grassroots Movement: The Kwankwasiyya\'s 24 retired military officers and youth base bolster his regional clout, potentially extending to Jigawa and Katsina.',
        'Strategic Alliances: Talks of a South-West running mate could broaden his appeal, addressing his 2023 weakness outside the North-West.',
        'Educational Legacy: His focus on education and youth development resonates with his base.'
      ],
      weaknesses: [
        'Limited National Reach: Kwankwaso\'s influence is confined to the North-West, with minimal traction in the South or North-Central, making him a regional rather than national contender.',
        'Coalition Absence: Unlike Atiku and Obi, Kwankwaso has not joined the ADC coalition, isolating him from broader opposition strategies.',
        'Security Critique: His silence on northern security challenges (e.g., banditry) weakens his appeal in a region desperate for solutions.',
        'Structural Limitations: NNPP lacks the national infrastructure needed for a successful presidential campaign.'
      ]
    }
  },
  {
    id: 'seyi-makinde',
    name: 'Seyi Makinde',
    party: 'PDP (Peoples Democratic Party)',
    image: '/candidates/makinde.png',
    description: 'Current Oyo State Governor (2019–present), rising PDP star',
    fullDescription: 'Current Oyo State Governor (2019–present), seen as a rising PDP star with strong South-West credentials and youth appeal.',
    position: 'Current Governor',
    votesIn2023: 'Did not contest',
    keyStats: {
      age: '60 by 2027',
      experience: 'Oyo Governor (2019-present), Business Executive',
      region: 'South-West',
      coalition: 'PDP Rising Star'
    },
    swot: {
      strengths: [
        'Governance Record: Makinde\'s infrastructure and education reforms in Oyo have earned him praise as a competent administrator, appealing to voters seeking results.',
        'South-West Appeal: As a Yoruba governor, he could challenge Tinubu\'s regional dominance while bridging generational gaps with his relatively youthful image.',
        'PDP Support: PDP insiders view him as a viable southern candidate, aligning with the zoning formula, potentially unifying the party post-Atiku.',
        'Fresh Face: Represents new generation leadership without the baggage of older politicians.'
      ],
      weaknesses: [
        'National Visibility: Makinde lacks the national stature of Tinubu, Atiku, or Obi, limiting his recognition outside the South-West.',
        'Party Rivalries: PDP\'s internal crises, including Wike\'s influence and Atiku\'s ambitions, could sideline Makinde\'s candidacy in primaries.',
        'Experience Gap: Compared to former presidents or governors with longer national exposure, Makinde\'s resume is relatively thin, risking perceptions of inexperience.',
        'Resource Constraints: Limited access to the financial war chest needed for a national campaign.'
      ]
    }
  },
  {
    id: 'rotimi-amaechi',
    name: 'Rotimi Amaechi',
    party: 'Uncertain (APC/ADC)',
    image: '/candidates/rotimi.png',
    description: 'Former Rivers Governor (2007–2015) and Transportation Minister',
    fullDescription: 'Former Rivers Governor (2007–2015) and Transportation Minister (2015–2023). Ran for APC\'s 2023 nomination, losing to Tinubu.',
    position: 'Former Governor & Minister',
    votesIn2023: 'Lost APC Primary',
    keyStats: {
      age: '62 by 2027',
      experience: 'Rivers Governor (2007-2015), Transportation Minister (2015-2023)',
      region: 'South-South',
      coalition: 'Party Alignment Uncertain'
    },
    swot: {
      strengths: [
        'South-South Base: Amaechi\'s Rivers State influence and South-South roots offer a regional counterweight to Tinubu and Jonathan, with potential cross-party appeal.',
        'Administrative Experience: His tenure as governor and minister, overseeing projects like rail infrastructure, showcases competence, appealing to voters seeking delivery.',
        'Coalition Speculation: Media reports suggest Amaechi could join the ADC or another platform, potentially pairing with a northern candidate like El-Rufai.',
        'Infrastructure Legacy: His transportation ministry achievements provide concrete examples of delivery.'
      ],
      weaknesses: [
        'Party Uncertainty: Amaechi\'s unclear alignment (APC or ADC) risks alienating loyalists and weakening his campaign structure. His 2023 APC loss diminished his party clout.',
        'Regional Competition: He faces stiff competition from Jonathan and Obi in the South-South/South-East, limiting his southern vote share.',
        'Low Public Profile: Compared to Obi\'s youth appeal or Tinubu\'s dominance, Amaechi lacks a strong public persona, reducing his national traction.',
        'Political Baggage: His role in various political controversies may affect voter perception.'
      ]
    }
  },
  {
    id: 'bukola-saraki',
    name: 'Bukola Saraki',
    party: 'PDP (Peoples Democratic Party)',
    image: '/candidates/saraki.png',
    description: 'Former Senate President (2015–2019), Kwara Governor (2003–2011)',
    fullDescription: 'Former Senate President (2015–2019) and Kwara Governor (2003–2011). Experienced legislator with North-Central appeal.',
    position: 'Former Senate President',
    votesIn2023: 'Did not contest',
    keyStats: {
      age: '65 by 2027',
      experience: 'Senate President (2015-2019), Kwara Governor (2003-2011)',
      region: 'North-Central',
      coalition: 'PDP Establishment'
    },
    swot: {
      strengths: [
        'Legislative Experience: As former Senate President, Saraki understands the intricacies of governance and has built relationships across party lines.',
        'North-Central Appeal: His Kwara base provides a strategic middle-ground between North and South, appealing to voters seeking balance.',
        'Political Network: Years in the Senate and as governor have built extensive political connections across Nigeria.',
        'Moderate Image: Seen as a bridge-builder who can work across ethnic and religious divides.'
      ],
      weaknesses: [
        'Limited National Profile: While respected in political circles, Saraki lacks the mass appeal of other candidates among ordinary voters.',
        'Party Competition: Faces internal PDP competition from more prominent figures like Jonathan, Atiku, or Makinde.',
        'Regional Challenges: North-Central\'s relatively smaller voting population limits his electoral impact compared to other regions.',
        'Past Controversies: Previous legal challenges and political disputes may affect voter confidence.'
      ]
    }
  },
  {
    id: 'omoyele-sowore',
    name: 'Omoyele Sowore',
    party: 'AAC (African Action Congress)',
    image: '/candidates/sowore.jpg',
    description: 'Human rights activist, founder of Sahara Reporters, anti-corruption advocate',
    fullDescription: 'Human rights activist, founder of Sahara Reporters, and presidential candidate known for his anti-corruption stance and voice of dissent. Represents the African Action Congress (AAC) with strong activist credentials and appeal among youth and Nigerians disillusioned with the status quo.',
    position: 'Activist & Publisher',
    votesIn2023: 'Small vote share (AAC candidate)',
    keyStats: {
      age: '54 by 2027',
      experience: 'Founder of Sahara Reporters, Human Rights Activist, AAC Presidential Candidate',
      region: 'South-West',
      coalition: 'African Action Congress (AAC)'
    },
    swot: {
      strengths: [
        'Strong Activist Credentials: Well known for human rights activism, anti-corruption stance, and as a voice of dissent. Has credibility among youth and among Nigerians disillusioned with the status quo.',
        'Vision & Policy Clarity: Has presented ideas around combating corruption, improving service delivery, technology, and transparency.',
        'Consistency and Integrity: Refuses to compromise on certain principles (e.g., refusing coalitions with those he views as corrupt), which enhances his "authenticity" among some voters.',
        'Media Platform & Exposure: As founder of Sahara Reporters and a known figure in media and activism, he has visibility that many smaller politicians don\'t have.'
      ],
      weaknesses: [
        'Limited Political Structure: His party, the African Action Congress (AAC), has limited presence across many states, which weakens grassroots mobilization.',
        'Poor Electoral Performance: In previous elections (2019 and 2023) he has gotten very small vote shares, suggesting low penetration into the electorate at large beyond his base.',
        'Lack of Alliances: His refusal to work with some opposition figures or coalitions may isolate him politically, reducing his ability to bring a broad front.',
        'Resource Constraints: Campaigns require money, logistics, and local party structures. Sowore is weaker here compared to major party candidates. Criticisms over finance transparency may affect trust among some.'
      ],
      opportunities: [
        'Youth Discontent & Demand for Change: Nigeria has many young voters frustrated with corruption, infrastructure, jobs, and insecurity. If Sowore can tap this sentiment, he could expand his support.',
        'Principled Alternative Positioning: Many voters are tired of compromise and "same old politics." Sowore\'s strong anti-establishment, anti-corruption message could be his differentiator.',
        'Digital Organizing: With increasing internet penetration, even modest campaigns can have outsized visibility via digital platforms. Sowore\'s activist background helps here.',
        'Outsider Appeal: As disillusionment with "traditional" politicians grows, outsider candidates may become more viable. If he can expand beyond urban, online, activist circles into more rural states, that can shift the balance.'
      ],
      threats: [
        'Entrenched Political Establishment: Major parties and established politicians have deep resources, patronage networks, recognition, and can mobilize votes especially in rural areas.',
        'Electoral System Biases: Issues like vote-buying, uneven media access, influence of powerful elites, and regional/ethnic bias could limit his effectiveness. Security challenges in certain regions can limit campaigning.',
        'Public Perception Issues: While many see him as principled, some consider him radical or believe he lacks experience. Errors, misstatements, or controversies can damage credibility. His refusal to make alliances might be seen as stubbornness.',
        'Opposition Fragmentation: If opposition remains split, Sowore may remain marginal unless he can unite or align in some way. Risk of suppression or harassment by authorities given his history.'
      ]
    }
  },
  {
    id: 'other',
    name: 'Other Candidate',
    party: 'Other',
    image: '',
    description: 'Another presidential candidate not listed above',
    fullDescription: 'Represents other potential candidates who may emerge or are not yet prominently featured in the political landscape.',
    position: 'Various',
    votesIn2023: 'N/A',
    keyStats: {
      age: 'Various',
      experience: 'Various backgrounds',
      region: 'All regions',
      coalition: 'Independent or smaller parties'
    }
  },
  {
    id: 'undecided',
    name: 'Undecided',
    party: 'Undecided',
    image: '',
    description: 'Not yet decided on a candidate',
    fullDescription: 'Voters who have not yet made up their minds about which candidate to support in the 2027 election.',
    position: 'N/A',
    votesIn2023: 'N/A',
    keyStats: {
      age: 'N/A',
      experience: 'N/A',
      region: 'All regions',
      coalition: 'N/A'
    }
  }
];
