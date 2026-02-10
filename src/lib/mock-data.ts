import { Article, Category } from "./types";

const now = new Date().toISOString();

export const MOCK_ARTICLES: Record<Category, Article[]> = {
  global: [
    {
      id: "global-1",
      headline: "EU and African Union Reach Landmark Migration and Trade Agreement",
      summary:
        "After months of negotiations, European and African leaders have signed a comprehensive deal addressing migration flows, trade barriers, and climate investment across both continents.",
      body: `European Commission President and African Union Chairperson announced the agreement at a joint press conference in Brussels on Sunday, describing it as a "new chapter" in relations between the two continents. The deal covers migration management, tariff reductions, and a €45 billion climate adaptation fund.

Under the migration provisions, the EU will create 300,000 legal work visas annually for African nationals in sectors facing labor shortages, including healthcare, agriculture, and technology. In return, participating African nations have agreed to streamline the processing of returning migrants who do not qualify for asylum.

The trade component eliminates tariffs on 85% of goods flowing between the two blocs over a five-year period. Agricultural products, long a sticking point in negotiations, will see graduated tariff reductions with safeguards for smallholder farmers on both continents.

Critics on both sides have raised concerns. European labor unions worry about wage suppression, while some African civil society groups argue the migration provisions don't go far enough. "This is a starting framework, not the final word," said one senior EU diplomat who requested anonymity to discuss the negotiations.

The climate adaptation fund, financed jointly by EU member states and private sector commitments, will focus on renewable energy infrastructure, drought-resistant agriculture, and coastal protection in the most vulnerable African nations. Projects are expected to begin disbursement by late 2026.`,
      category: "global",
      sources: ["Reuters", "Al Jazeera", "Financial Times"],
      timestamp: now,
      isBreaking: true,
    },
    {
      id: "global-2",
      headline: "Japan Announces Major Defense Overhaul Amid Regional Tensions",
      summary:
        "Tokyo unveils its largest military restructuring since World War II, including expanded naval capabilities and a new cyber defense command, drawing mixed reactions from neighboring states.",
      body: `Japan's Prime Minister presented a sweeping defense reform package to parliament on Monday, proposing a 25% increase in military spending over the next three years and the creation of a unified cyber and space defense command. The plan represents the most significant shift in Japan's defense posture in decades.

The restructuring includes the acquisition of long-range cruise missiles capable of striking targets up to 1,500 kilometers away, a capability Japan has historically avoided. Defense officials emphasized these weapons are "exclusively defensive" and intended to deter potential threats in the region.

China's foreign ministry expressed "grave concern" over the announcement, calling it a departure from Japan's post-war pacifist constitution. South Korea's response was more measured, with Seoul noting the importance of "transparent communication" about military buildups in the region.

The United States welcomed the move, with the Pentagon describing it as "a positive step toward shared burden-bearing in the Indo-Pacific." The expanded capabilities are expected to integrate closely with existing U.S.-Japan alliance frameworks.

Domestic opinion in Japan remains divided. Polls show roughly 52% of Japanese citizens support increased defense spending, while significant opposition remains, particularly among older generations who remember the consequences of militarism. Constitutional scholars have questioned whether the long-range strike capability is compatible with Article 9 of Japan's constitution.`,
      category: "global",
      sources: ["Associated Press", "NHK", "South China Morning Post"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "global-3",
      headline: "WHO Declares End to Mpox Public Health Emergency in Central Africa",
      summary:
        "The World Health Organization has lifted its emergency designation for the mpox outbreak in the Democratic Republic of Congo and surrounding nations, citing successful vaccination campaigns.",
      body: `The World Health Organization announced Sunday that the mpox outbreak in Central Africa no longer constitutes a Public Health Emergency of International Concern, marking the end of an 18-month emergency period. The decision follows a dramatic decline in new cases across the affected region.

Vaccination campaigns, which reached over 12 million people in the Democratic Republic of Congo, Republic of Congo, and neighboring countries, were credited as the primary driver of the outbreak's containment. The WHO noted that case counts had fallen 94% from their peak.

"This is a testament to what the global health community can achieve when resources are mobilized quickly and equitably," said the WHO Director-General. However, he cautioned that surveillance must continue and that the virus remains endemic in parts of Central Africa.

Public health experts praised the response but noted lessons for future outbreaks. The initial vaccine rollout faced significant delays due to manufacturing bottlenecks and distribution challenges in remote areas. Several NGOs called for permanent investment in regional health infrastructure rather than emergency-only funding models.`,
      category: "global",
      sources: ["WHO", "BBC News", "The Lancet"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "global-4",
      headline: "Brazil's Supreme Court Rules on Landmark Indigenous Land Rights Case",
      summary:
        "In a closely watched decision, Brazil's highest court has upheld indigenous land claims in the Amazon, rejecting challenges from agricultural interests in a 7-4 ruling.",
      body: `Brazil's Supreme Federal Tribunal ruled on Friday that indigenous communities hold constitutional rights to ancestral lands they occupied prior to the 1988 constitution, rejecting the so-called "temporal framework" argument pushed by agricultural lobbies. The 7-4 decision is expected to affect dozens of pending land disputes.

The ruling affirms that indigenous land rights are "original rights" predating the formation of the Brazilian state, and cannot be limited by arbitrary cutoff dates. Chief Justice wrote in the majority opinion that the constitution "recognizes, rather than grants" these rights.

Agricultural industry groups expressed disappointment, warning the decision could affect food production in regions bordering indigenous territories. The Confederation of Agriculture estimated that up to 5 million hectares could be affected by pending demarcation claims.

Indigenous rights organizations celebrated the ruling as historic. Leaders from several Amazonian communities traveled to Brasília for the announcement. Environmental groups noted the decision could slow deforestation, as indigenous-managed lands have consistently shown lower deforestation rates than surrounding areas.

The ruling does not automatically resolve individual land disputes but establishes the legal framework under which they will be adjudicated. The government now faces the challenge of implementing demarcation processes while managing tensions between indigenous communities and established agricultural operations.`,
      category: "global",
      sources: ["Reuters", "Folha de São Paulo", "The Guardian"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "global-5",
      headline: "India and Pakistan Resume Diplomatic Talks After Two-Year Freeze",
      summary:
        "Senior diplomats from India and Pakistan met in a Gulf state for the first formal bilateral talks since 2024, discussing trade normalization and the disputed Kashmir region.",
      body: `Indian and Pakistani foreign secretaries held two days of talks in Muscat, Oman, marking the first formal diplomatic engagement between the nuclear-armed neighbors since relations broke down in early 2024. Both sides described the discussions as "constructive" without announcing concrete agreements.

The talks covered trade normalization, the status of diplomatic missions, and what officials described as "humanitarian matters" — widely understood to include prisoner exchanges and divided families. The more contentious issue of Kashmir was discussed but, as expected, produced no breakthrough.

Regional analysts characterized the resumption of dialogue as significant in itself. "The fact that both governments agreed to sit at the same table signals a recognition that the status quo is unsustainable," said a senior fellow at a New Delhi think tank.

Pakistan's foreign ministry emphasized the importance of addressing "core disputes" for lasting peace, while India's external affairs ministry focused on the need for "a terrorism-free environment" as a prerequisite for deeper engagement. Both sides agreed to continue discussions at a date to be determined.`,
      category: "global",
      sources: ["Associated Press", "Dawn", "The Hindu"],
      timestamp: now,
      isBreaking: false,
    },
  ],
  technology: [
    {
      id: "tech-1",
      headline: "OpenAI and Google DeepMind Both Announce Breakthroughs in Protein Engineering",
      summary:
        "In a remarkable week for computational biology, both AI labs published papers demonstrating AI systems that can design novel proteins with therapeutic potential, accelerating drug discovery timelines.",
      body: `Two of the world's leading AI research laboratories published papers within days of each other demonstrating significant advances in AI-driven protein engineering. The parallel breakthroughs suggest the field is entering a new era of computational drug design.

OpenAI's system, detailed in a paper published in Nature, demonstrated the ability to design proteins that bind to specific disease targets with a success rate of 78% in laboratory validation — up from roughly 15% with previous computational methods. The company said several designed proteins showed potential as treatments for autoimmune disorders.

Google DeepMind's contribution, published in Science, builds on its earlier AlphaFold work to not only predict protein structures but actively engineer proteins with desired properties. Their system successfully designed an enzyme that breaks down certain types of plastic waste 50 times faster than naturally occurring alternatives.

Pharmaceutical companies have responded with significant interest. Several major drug makers announced partnerships or expanded existing collaborations with both labs. Industry analysts estimate that AI-driven protein design could reduce early-stage drug development timelines from years to months.

Independent researchers praised both advances while noting important limitations. "These are remarkable engineering achievements, but we're still far from AI replacing the full drug development pipeline," cautioned a professor of computational biology at MIT. Clinical trials, regulatory approval, and manufacturing remain significant hurdles.

The dual announcements have also reignited debate about the concentration of AI research capabilities in a small number of well-funded labs, with academic researchers calling for greater openness and data sharing.`,
      category: "technology",
      sources: ["Nature", "Wired", "MIT Technology Review"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "tech-2",
      headline: "EU Digital Markets Act Enforcement Results in Major Changes at Apple and Meta",
      summary:
        "Apple will allow third-party app stores on iPhones in Europe starting next month, while Meta must offer ad-free versions of Facebook and Instagram, following enforcement actions under the DMA.",
      body: `The European Commission's enforcement of the Digital Markets Act reached a critical milestone this week as both Apple and Meta announced significant changes to comply with regulatory orders. The moves represent the most tangible impact yet of the landmark competition law.

Apple confirmed it will open the iPhone to third-party app stores across the European Economic Area beginning March 15, following a €1.8 billion fine for non-compliance. The company will allow alternative payment systems and reduce its commission on transactions from third-party stores to 10%, down from the current 15-30%.

Meta, facing its own enforcement action, announced that European users will be offered genuinely ad-free versions of Facebook and Instagram for €5.99 per month — roughly half the price of its previous offering, which regulators had deemed insufficiently accessible. The company will also provide more granular data portability tools.

Consumer advocacy groups offered cautious praise. "These are meaningful steps, but the devil is in the implementation details," said the director of a European digital rights organization. Concerns remain about whether Apple's technical implementation might still disadvantage third-party stores.

Tech industry observers noted the global implications. Similar regulations are under consideration in Japan, South Korea, and Brazil, and companies' compliance strategies in Europe are likely to set precedents for these markets.`,
      category: "technology",
      sources: ["The Verge", "European Commission", "Bloomberg"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "tech-3",
      headline: "Semiconductor Shortage Eases as New Fabrication Plants Come Online",
      summary:
        "Three major chip fabrication facilities in the US and Europe have begun production, marking a turning point in the global semiconductor supply chain that disrupted industries for years.",
      body: `The global semiconductor industry reached an inflection point this week as new fabrication plants operated by TSMC in Arizona, Intel in Ohio, and Samsung in Texas began commercial production. The facilities represent over $100 billion in combined investment and are expected to significantly reduce chip supply bottlenecks.

TSMC's Arizona facility, the most advanced of the three, is producing 4-nanometer chips — the first time such cutting-edge semiconductors have been manufactured on American soil. Intel's Ohio plant focuses on mature-node chips used in automobiles and industrial equipment, addressing the segment most affected by recent shortages.

The Biden-era CHIPS Act, which provided $52 billion in subsidies, was instrumental in attracting these investments. Administration officials toured the TSMC facility, calling it "a down payment on America's technological future."

Industry analysts project that the new capacity will bring chip supply and demand into balance by late 2026, after years of shortages that disrupted everything from automobile production to consumer electronics. However, some economists caution that the cyclical nature of the semiconductor industry could lead to oversupply in certain segments.

The geopolitical dimensions are significant. The new facilities reduce Western dependence on chip manufacturing concentrated in East Asia, particularly Taiwan. However, critics argue the subsidies amount to corporate welfare and question whether the plants can remain competitive without ongoing government support.`,
      category: "technology",
      sources: ["Reuters", "Semiconductor Engineering", "Financial Times"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "tech-4",
      headline: "Global Internet Outage Traced to BGP Configuration Error at Major Provider",
      summary:
        "A widespread internet disruption affecting millions of users across Asia and Europe was caused by a Border Gateway Protocol misconfiguration, raising questions about internet infrastructure resilience.",
      body: `A configuration error at a major internet backbone provider caused widespread connectivity issues across Asia and Europe for approximately four hours on Saturday, affecting an estimated 180 million users. The incident has renewed calls for reforms to the Border Gateway Protocol, a foundational but aging internet routing system.

The outage began at approximately 14:00 UTC when an engineer at the provider inadvertently propagated incorrect routing information, causing traffic destined for thousands of networks to be misdirected. Major cloud services, banking platforms, and communications tools were affected across 23 countries.

Service was gradually restored as network engineers worldwide manually corrected routing tables. The provider issued a statement accepting responsibility and pledging to implement additional safeguards, including expanded use of Resource Public Key Infrastructure (RPKI) to validate routing announcements.

Internet governance experts noted that similar incidents occur regularly on smaller scales. "BGP was designed in the 1980s for a much smaller, more trusted internet," explained a senior researcher at a major internet exchange point. "We've been patching it ever since, but fundamental vulnerabilities remain."

The incident is expected to accelerate adoption of RPKI and other security measures among internet service providers, though implementation has been slow due to complexity and cost.`,
      category: "technology",
      sources: ["Ars Technica", "Cloudflare Blog", "The Register"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "tech-5",
      headline: "Quantum Computing Startup Demonstrates Error-Corrected Qubit Milestone",
      summary:
        "A Boston-based quantum computing company has demonstrated a logical qubit with error rates low enough for practical computation, a long-sought milestone in the field.",
      body: `Quantum computing startup QubitCore announced on Thursday that it has demonstrated a logical qubit operating with an error rate below the threshold needed for practical quantum computation — a milestone that researchers have pursued for over two decades. The results have been submitted to a peer-reviewed journal.

The achievement involves encoding quantum information across multiple physical qubits in a way that allows errors to be detected and corrected in real time. QubitCore's system used 48 physical qubits to create a single logical qubit with an error rate of 10^-6, roughly 1,000 times better than the best individual physical qubits.

"This is the 'Wright brothers moment' for quantum computing," said the company's CEO, though she acknowledged that scaling from one logical qubit to the thousands needed for transformative applications remains a major engineering challenge.

Independent experts were cautiously optimistic. Leading quantum researchers at several universities confirmed the results were credible based on the preprint, while noting that reproducibility and scaling will be the true tests. Major quantum computing competitors IBM and Google declined to comment on the specific results but reaffirmed their own error-correction roadmaps.

The announcement sent QubitCore's stock up 34% in after-hours trading and boosted shares of other quantum computing companies. Analysts caution that commercially useful quantum computers likely remain 5-10 years away, but said the milestone validates the fundamental approach.`,
      category: "technology",
      sources: ["MIT Technology Review", "Nature Physics", "CNBC"],
      timestamp: now,
      isBreaking: false,
    },
  ],
  sports: [
    {
      id: "sports-1",
      headline: "Historic Upset at Australian Open as Unseeded Player Claims Title",
      summary:
        "World No. 47 Marco Bellini stunned the tennis world by defeating three-time champion Novak Djokovic in a five-set final, becoming the lowest-ranked player to win a Grand Slam since 2009.",
      body: `In one of the most remarkable Grand Slam finals in recent memory, Italian qualifier Marco Bellini defeated Novak Djokovic 6-7, 7-5, 4-6, 6-3, 7-5 in a grueling four-hour and 22-minute match at Melbourne Park. The 23-year-old became the lowest-ranked player to win a major title since Juan Martín del Potro's 2009 US Open victory.

Bellini, who entered the tournament having never advanced past the third round of a Grand Slam, showed remarkable composure throughout the match. He saved three championship points in the fifth set before breaking Djokovic's serve at 6-5 with a stunning backhand return winner.

"I don't have words. I keep thinking I'm going to wake up," Bellini said in an emotional on-court interview. Djokovic, gracious in defeat, praised his opponent: "He played incredible tennis today. The future of this sport is in good hands."

The victory caps an extraordinary fortnight for Bellini, who defeated three seeded players en route to the final, including world No. 5 Carlos Alcaraz in the semifinals. His aggressive baseline game and exceptional fitness were evident throughout the tournament.

Tennis analysts noted that Bellini's victory continues a trend of increasing competitiveness in men's tennis as the sport transitions beyond the dominance of the "Big Three" era. His ranking is projected to rise to approximately No. 8 when the new rankings are released.`,
      category: "sports",
      sources: ["ESPN", "Tennis Magazine", "BBC Sport"],
      timestamp: now,
      isBreaking: true,
    },
    {
      id: "sports-2",
      headline: "FIFA Confirms Expanded Club World Cup Format for 2027 Edition",
      summary:
        "Football's world governing body has approved a 48-team format for the 2027 Club World Cup, with increased revenue sharing for participating clubs and their domestic leagues.",
      body: `FIFA announced on Friday the approval of an expanded 48-team Club World Cup beginning in 2027, building on the 32-team format introduced in 2025. The decision came after months of negotiations with clubs, leagues, and player unions over scheduling, compensation, and player welfare.

The expanded tournament will feature 48 clubs across 12 groups, with matches played at venues across the host country over a five-week period in June and July. FIFA projected total revenue of $4.5 billion, with 50% allocated directly to participating clubs — a significant increase from the current distribution model.

European leagues had initially opposed the expansion, citing player fatigue and scheduling conflicts. The compromise includes mandatory rest periods for participating players and a commitment to reduce international match calendar congestion elsewhere. La Liga and the Premier League issued a joint statement describing the agreement as "workable but not ideal."

Player unions expressed ongoing concerns about the cumulative burden on elite athletes. "The calendar is being stretched to its limits," said a FIFPRO spokesperson. "We've secured important protections in this agreement, but the fundamental tension between commercial interests and player welfare remains."

The bidding process for the 2027 host country is expected to begin in the coming months, with Saudi Arabia, the United States, and China considered frontrunners.`,
      category: "sports",
      sources: ["BBC Sport", "The Athletic", "Marca"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "sports-3",
      headline: "WNBA Announces Record-Breaking Television Deal Worth $2.2 Billion",
      summary:
        "The Women's National Basketball Association has signed an 11-year media rights agreement that represents a tenfold increase over its previous deal, reflecting surging interest in women's professional basketball.",
      body: `The WNBA announced a landmark 11-year media rights deal worth $2.2 billion on Monday, a dramatic increase from the $60 million annual value of its previous contract. The agreement spans multiple broadcast and streaming partners and begins with the 2026 season.

The deal reflects explosive growth in the league's popularity, driven by a new generation of stars and increased cultural visibility. Average attendance rose 45% last season, while television viewership more than doubled. Commissioner Cathy Engelbert called it "a transformative moment for women's sports."

Under the new agreement, the WNBA salary cap is projected to increase significantly, with maximum player salaries potentially reaching $700,000 by the deal's final year — still well below NBA figures but a substantial improvement from current levels. The league also plans to expand from 13 to 16 teams by 2028.

Player advocacy played a significant role in the negotiations. The WNBA Players Association had pushed for a greater share of league revenue, and the new collective bargaining agreement is expected to increase the players' revenue share from approximately 9% to 20%.

Sports business analysts noted the deal validates the broader trend of increased investment in women's professional sports. "This isn't a charity case — it's a business case," said a sports media professor at NYU. "The audience is there, the engagement metrics are there, and now the money is following."`,
      category: "sports",
      sources: ["ESPN", "Sports Business Journal", "Associated Press"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "sports-4",
      headline: "Olympic Committee Adds Five New Sports for 2032 Brisbane Games",
      summary:
        "The IOC has approved cricket, flag football, squash, kickboxing, and drone racing as new sports for the Brisbane Olympics, aiming to attract younger global audiences.",
      body: `The International Olympic Committee voted on Saturday to include five new sports in the 2032 Brisbane Olympics: cricket (T20 format), flag football, squash, kickboxing, and drone racing. The additions reflect the IOC's ongoing effort to modernize the Games and expand their global appeal.

Cricket's inclusion is particularly significant, potentially bringing billions of fans from South Asia and other cricket-playing nations into closer engagement with the Olympic movement. The T20 format, with matches lasting approximately three hours, was chosen for its spectator-friendly pace.

Flag football's addition follows years of lobbying by the NFL and International Federation of American Football. The non-contact version of the sport has been growing rapidly worldwide, particularly in Europe and Asia. The NFL has committed to supporting grassroots development programs in 50 countries.

Drone racing, the most unconventional addition, represents the IOC's first foray into technology-driven competitive events. The sport involves pilots remotely navigating small quadcopters through obstacle courses at speeds exceeding 150 km/h. The Drone Racing League partnered with the bid.

Some traditional Olympic sports advocates expressed concern about the expanding program. "Every addition puts pressure on existing sports," noted a former IOC committee member. The total number of athletes at the 2032 Games is expected to remain capped at approximately 10,500, meaning some existing sports may see reduced participation quotas.`,
      category: "sports",
      sources: ["Olympic Channel", "BBC Sport", "Associated Press"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "sports-5",
      headline: "Formula 1 Confirms New Race in Rwanda as Africa Returns to Calendar",
      summary:
        "F1 has announced a street circuit race in Kigali starting in 2027, marking the first African Grand Prix since South Africa hosted in 1993 and expanding the sport's global footprint.",
      body: `Formula 1 confirmed on Wednesday that Kigali, Rwanda will host an African Grand Prix beginning in 2027, ending a 34-year absence of the continent from the racing calendar. The race will take place on a purpose-built street circuit in the Rwandan capital, with the government committing $300 million in infrastructure investment.

The announcement was made jointly by F1 CEO Stefano Domenicali and Rwandan President Paul Kagame. The circuit will wind through central Kigali, incorporating views of the city's distinctive hills and modern skyline. The race is scheduled for September, taking advantage of the dry season.

F1's decision follows years of interest from multiple African nations, including South Africa, Nigeria, and Morocco. Rwanda's selection was attributed to its modern infrastructure, political stability, and the government's aggressive pursuit of international sporting events.

The move has been broadly welcomed in the motorsport community. Lewis Hamilton, who has long advocated for an African Grand Prix, called it "one of the most important moments in our sport's history." However, some human rights organizations have raised concerns about Rwanda's political freedoms, echoing criticisms leveled at other F1 host nations.

Commercial partners have responded enthusiastically, with several major sponsors reportedly increasing their F1 commitments in anticipation of the expanded African market. The continent's young and rapidly growing population represents a significant commercial opportunity for the sport.`,
      category: "sports",
      sources: ["Autosport", "BBC Sport", "The New York Times"],
      timestamp: now,
      isBreaking: false,
    },
  ],
  entertainment: [
    {
      id: "ent-1",
      headline: "Cannes Film Festival Unveils 2026 Lineup with Record Number of Female Directors",
      summary:
        "The 79th Cannes Film Festival has announced its official selection, featuring 11 films directed by women out of 21 competition slots — a record for the world's most prestigious film event.",
      body: `The Cannes Film Festival announced its 2026 Official Selection on Thursday, with a competition lineup that includes 11 films directed by women — the highest proportion in the festival's 79-year history. Festival president Iris Knobloch described the selection as reflecting "the reality of cinema today."

Among the most anticipated entries are Greta Gerwig's adaptation of C.S. Lewis's "The Chronicles of Narnia," Chloé Zhao's sci-fi epic "Wanderers," and a return to competition for Jane Campion with "The Inland Sea." Denis Villeneuve and Park Chan-wook also feature in the lineup with new works.

The selection drew praise from industry groups who have long pushed for greater representation at major festivals. Women in Film called it "a milestone that should become the norm." However, some critics cautioned against treating the numbers as evidence that systemic barriers have been dismantled.

The festival will also debut a new section dedicated to AI-assisted filmmaking, showcasing five short films created in collaboration between human directors and AI tools. The decision is controversial, with some filmmakers' guilds arguing it legitimizes a technology they see as threatening creative jobs.

Cannes runs from May 12-23, and ticket demand is reportedly at an all-time high. The festival's economic impact on the Riviera region is estimated at €250 million annually.`,
      category: "entertainment",
      sources: ["Variety", "Screen Daily", "The Hollywood Reporter"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "ent-2",
      headline: "Beyoncé Announces Global Stadium Tour with Immersive AR Experience",
      summary:
        "The Grammy-winning artist revealed a 58-date world tour incorporating augmented reality technology that transforms each venue with visual effects visible through a companion smartphone app.",
      body: `Beyoncé announced on Sunday a 58-date global stadium tour beginning in September 2026, featuring what producers describe as the most technologically ambitious live concert experience ever attempted. The tour will incorporate real-time augmented reality visual effects visible through attendees' smartphones.

The AR technology, developed in partnership with a major tech company, will overlay digital visual effects onto the stadium environment in real time, synchronized with the live performance. Each venue will feature unique visual narratives, meaning no two shows will look identical through the AR layer.

Ticket prices range from $85 for upper-level seats to $850 for floor access, with a new "community access" tier reserving 5% of seats at $35 for lottery winners. The pricing structure attempts to address criticism of escalating concert ticket costs that has plagued the live entertainment industry.

The tour will visit 30 cities across North America, Europe, Asia, Africa, and South America, including first-time stops in Lagos, Mumbai, and Bangkok. Promoter Live Nation estimated total gross revenue could exceed $2 billion, which would set a new touring record.

Music industry analysts noted the tour's implications for the future of live entertainment. "This could redefine what audiences expect from a concert," said a Billboard senior editor. "But it also raises questions about whether technology enhances or distracts from the human connection that makes live music special."`,
      category: "entertainment",
      sources: ["Billboard", "Rolling Stone", "The New York Times"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "ent-3",
      headline: "Streaming Platforms Report First-Ever Decline in Global Subscriber Growth",
      summary:
        "Combined subscriber numbers across major streaming services dipped for the first time in Q4 2025, signaling market maturation and intensifying competition for viewer attention.",
      body: `For the first time since the launch of the modern streaming era, the combined global subscriber base of the five largest streaming platforms — Netflix, Disney+, Amazon Prime Video, Apple TV+, and Max — declined in the fourth quarter of 2025, according to industry data published this week. Total subscribers fell by approximately 2.3 million to 1.12 billion.

Netflix, long the industry leader, maintained its subscriber base but reported its slowest growth in company history. Disney+ saw the largest decline, losing 4.1 million subscribers following a price increase and the removal of several popular library titles. Amazon and Apple showed modest gains that partially offset the overall decline.

Industry analysts attribute the shift to market saturation, subscriber fatigue, and the cumulative impact of price increases across platforms. "Consumers have a finite entertainment budget," said a media analyst at MoffettNathanson. "When every service raises prices simultaneously, some subscribers inevitably make choices."

The platforms are responding with divergent strategies. Netflix is doubling down on live programming, including sports and events. Disney is exploring bundling more aggressively with its other properties. Meanwhile, smaller services are considering mergers or niche repositioning.

The data doesn't necessarily signal the beginning of a streaming decline, analysts cautioned, but rather the end of the pandemic-driven growth era. The industry is expected to stabilize around current levels, with growth shifting to emerging markets in Africa, Southeast Asia, and Latin America.`,
      category: "entertainment",
      sources: ["Variety", "The Wall Street Journal", "Bloomberg"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "ent-4",
      headline: "British Museum Reaches Agreement to Return Parthenon Marbles to Greece",
      summary:
        "After decades of diplomatic tension, the British Museum and Greek government have announced a deal that will see the Elgin Marbles returned to Athens in exchange for a rotating loan of Greek antiquities.",
      body: `The British Museum and the Greek government announced a landmark agreement on Friday to return the Parthenon Marbles to Athens, resolving one of the longest-running cultural heritage disputes in the world. The sculptures, removed from the Parthenon by Lord Elgin in the early 19th century, will be transferred over a two-year period beginning in 2027.

In exchange, Greece has agreed to a 25-year rolling loan arrangement providing the British Museum with access to significant Greek antiquities that have never been displayed outside the country. The agreement also includes a joint archaeological research program and shared digitization initiative.

British Prime Minister expressed support for the agreement, describing it as "a partnership, not a surrender." Greek Prime Minister called it "a moment of justice and reconciliation" at a joint press conference at the Acropolis Museum.

The deal has divided opinion in the UK. Museum professionals and cultural commentators are split between those who see it as a progressive model for resolving repatriation disputes and those who worry it sets a precedent that could empty Western museums. "Where does this end?" asked a prominent British art historian.

The agreement specifically states it does not establish a legal precedent for other repatriation claims and is characterized as a voluntary bilateral arrangement. Nevertheless, officials in Nigeria, Egypt, and Ethiopia have already cited the deal as they pursue the return of artifacts held by European institutions.`,
      category: "entertainment",
      sources: ["The Guardian", "BBC News", "Kathimerini"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "ent-5",
      headline: "Video Game Industry Revenue Surpasses Film and Music Combined for Third Year",
      summary:
        "Global video game revenue reached $227 billion in 2025, exceeding the combined revenue of the film box office and recorded music industry, with mobile gaming driving the majority of growth.",
      body: `The global video game industry generated $227 billion in revenue in 2025, according to data released by Newzoo this week. The figure surpasses the combined revenue of the global box office ($34 billion) and recorded music industry ($31 billion) by a factor of nearly 3.5.

Mobile gaming continued to dominate, accounting for 49% of total revenue at $111 billion. Console gaming generated $56 billion, while PC gaming contributed $42 billion. Cloud gaming, though still a small segment, showed the fastest growth at 38% year-over-year.

The industry's growth was driven by several factors, including the continued expansion of gaming in emerging markets, particularly India and Southeast Asia, and the growing overlap between gaming and social media. Live service games — ongoing titles that generate revenue through regular content updates — accounted for 72% of all gaming revenue.

Labor challenges persist in the industry. Major layoffs affected approximately 16,000 gaming workers in 2025, even as overall revenue grew. Workers' advocacy groups described the simultaneous growth and job cuts as "a fundamental disconnect between industry prosperity and worker welfare."

Looking ahead, analysts project continued but slower growth, with revenue expected to reach $250 billion by 2028. The integration of AI tools in game development is expected to be the most significant technological shift, with potential to both reduce development costs and further displace workers.`,
      category: "entertainment",
      sources: ["Newzoo", "IGN", "Financial Times"],
      timestamp: now,
      isBreaking: false,
    },
  ],
  business: [
    {
      id: "biz-1",
      headline: "Federal Reserve Signals Potential Rate Cut as Inflation Returns to Target",
      summary:
        "Fed Chair Jerome Powell indicated that interest rate reductions could begin as early as next quarter, following data showing inflation has stabilized at the 2% target for three consecutive months.",
      body: `Federal Reserve Chair Jerome Powell signaled on Wednesday that the central bank is prepared to begin lowering interest rates, following three consecutive months of inflation data at or near the Fed's 2% target. Speaking at a press conference after the Federal Open Market Committee meeting, Powell described the economic outlook as "increasingly favorable."

The committee voted unanimously to hold rates steady at the current range of 4.25-4.50%, but the accompanying statement noted that "the risks to achieving the Committee's employment and inflation goals are roughly in balance" — language widely interpreted as laying the groundwork for cuts.

Financial markets responded positively, with the S&P 500 rising 1.8% and bond yields falling sharply. Market pricing now implies a 92% probability of a rate cut at the June meeting, with expectations of two to three total reductions in 2026.

Not all economists share the optimism. Some analysts warned that persistent strength in the labor market and housing costs could reignite inflationary pressures if rates are cut too aggressively. "The last mile of disinflation was the hardest, and there's no guarantee it stays conquered," said the chief economist at a major Wall Street bank.

The potential rate cuts would provide relief to mortgage borrowers and businesses with variable-rate debt, and could stimulate housing market activity that has been subdued by elevated borrowing costs. However, savers and retirees who have benefited from higher yields on fixed-income investments would see returns diminish.`,
      category: "business",
      sources: ["Financial Times", "Bloomberg", "The Wall Street Journal"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "biz-2",
      headline: "Amazon Acquires Major Healthcare Chain in $28 Billion Deal",
      summary:
        "Amazon announced the acquisition of a national healthcare provider with over 600 clinics, significantly expanding its push into healthcare services and raising antitrust concerns.",
      body: `Amazon announced on Monday a $28 billion agreement to acquire MedFirst Health, a national chain of over 600 walk-in clinics and urgent care centers, in what would be the company's largest acquisition since Whole Foods. The deal deepens Amazon's aggressive expansion into healthcare services.

The acquisition would give Amazon a physical healthcare presence in 42 states, complementing its existing online pharmacy, telehealth, and health data services. Amazon Health chief said the deal will enable "seamless integration between in-person care, virtual visits, and home delivery of medications."

Antitrust scrutiny is expected to be intense. The Federal Trade Commission is already reviewing Amazon's healthcare activities, and consumer advocacy groups have called for the deal to be blocked. "Amazon is building a vertically integrated healthcare empire that will give it unprecedented power over both providers and patients," said a director at the Open Markets Institute.

Healthcare industry analysts are divided. Some see Amazon's entry as potentially beneficial, arguing that its technology and logistics expertise could reduce costs and improve access, particularly in underserved areas. Others worry about the commodification of healthcare and the implications of Amazon's data collection practices in medical settings.

Amazon's stock rose 3.2% on the news, while shares of competing healthcare chains and pharmacy companies declined. The deal requires regulatory approval and is expected to close in late 2026 or early 2027 if approved.`,
      category: "business",
      sources: ["CNBC", "The Wall Street Journal", "Reuters"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "biz-3",
      headline: "Global Shipping Costs Surge 40% as Red Sea Disruptions Enter Second Year",
      summary:
        "Container shipping rates have spiked sharply as attacks on commercial vessels in the Red Sea continue to force lengthy detours around Africa, adding costs and delays to global supply chains.",
      body: `Global container shipping costs have surged approximately 40% since the start of 2026, as ongoing security threats in the Red Sea continue to force commercial vessels onto longer routes around the Cape of Good Hope. The disruptions, now entering their second year, are adding an estimated $1 million in fuel costs per voyage and 10-14 days of transit time.

The Shanghai Containerized Freight Index, a benchmark for shipping costs, reached its highest level since the post-pandemic supply chain crisis of 2022. Routes between Asia and Europe have been most severely affected, with costs on some lanes tripling from pre-disruption levels.

Major retailers and manufacturers are warning of potential price increases and delivery delays. Several large European importers have begun rebuilding inventories as a precaution, a pattern reminiscent of the "bullwhip effect" that amplified supply chain disruptions during the pandemic.

Shipping companies have benefited from the higher rates, with Maersk, MSC, and CMA CGM all reporting strong financial results. However, industry leaders have expressed frustration at the security situation, calling for more robust international naval protection of commercial shipping lanes.

Economists estimate the disruptions are adding 0.3-0.5 percentage points to goods inflation in Europe and 0.1-0.2 points in the United States. Central bankers have acknowledged the impact but described it as a "supply shock" rather than a reason to alter monetary policy trajectories.`,
      category: "business",
      sources: ["Financial Times", "Lloyd's List", "Bloomberg"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "biz-4",
      headline: "Four-Day Work Week Becomes Law in Belgium, Results Exceed Expectations",
      summary:
        "Belgium's pioneering four-day work week legislation has completed its first full year, with government data showing productivity gains and reduced absenteeism across participating companies.",
      body: `The Belgian government released comprehensive data on its four-day work week policy on Thursday, one year after the legislation took full effect. The results show that participating companies experienced a 4.2% increase in productivity per hour worked, a 27% decrease in short-term sick leave, and improved employee satisfaction scores.

Under the Belgian model, employees may compress their standard 38-hour work week into four days rather than five, without any reduction in total hours or pay. Approximately 31% of eligible workers have adopted the arrangement, with the highest uptake in technology, financial services, and professional services sectors.

The government characterized the results as "exceeding expectations," though officials noted that the data varies significantly by industry. Manufacturing and customer-facing service sectors showed lower adoption rates and less clear productivity benefits. Some employers reported challenges with scheduling and client expectations.

The Belgian experience has attracted attention from policymakers across Europe. The Netherlands and Spain are considering similar legislation, while Germany's largest trade union has made a four-day week a key negotiating demand. In the UK, a large-scale trial produced similarly positive results, though legislation has not followed.

Business groups remain divided. Some employers' associations have embraced the flexibility, while others argue it's inappropriate for the government to dictate work schedules. "The right arrangement varies by company and role," said the head of Belgium's main employers' federation. "Legislation is too blunt an instrument for something this nuanced."`,
      category: "business",
      sources: ["Reuters", "The Economist", "Politico Europe"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "biz-5",
      headline: "Bitcoin Surpasses $150,000 as Institutional Adoption Accelerates",
      summary:
        "Bitcoin reached a new all-time high above $150,000, driven by sovereign wealth fund investments and the approval of spot Bitcoin ETFs in several new major markets.",
      body: `Bitcoin crossed the $150,000 mark for the first time on Tuesday, extending a rally that has seen the cryptocurrency double in value over the past six months. The milestone was driven by several institutional catalysts, including the disclosure that Norway's sovereign wealth fund has taken a significant position.

Norway's Government Pension Fund Global, the world's largest sovereign wealth fund with $1.7 trillion in assets, confirmed a 1.5% allocation to Bitcoin — representing approximately $25 billion. The fund's CEO described it as "a prudent diversification in an evolving monetary landscape." The move follows similar, smaller allocations by sovereign funds in Singapore and Abu Dhabi.

Spot Bitcoin ETFs, first approved in the United States in 2024, have now been greenlit in Japan, South Korea, and Brazil, opening the cryptocurrency to new pools of retail and institutional capital. Combined ETF assets under management have surpassed $200 billion globally.

Skeptics caution that the rally bears hallmarks of previous speculative cycles. "The fundamentals haven't changed — Bitcoin remains a volatile, speculative asset with no intrinsic cash flows," said a Nobel laureate economist. Others worry about the environmental impact of Bitcoin mining, though the industry has made progress in transitioning to renewable energy sources.

Regulatory frameworks continue to evolve. The EU's Markets in Crypto-Assets regulation is now fully in effect, providing clearer rules for institutional participation. In the US, ongoing regulatory uncertainty under the current administration has been a source of both risk and opportunity for the industry.`,
      category: "business",
      sources: ["Bloomberg", "CoinDesk", "Financial Times"],
      timestamp: now,
      isBreaking: false,
    },
  ],
};
