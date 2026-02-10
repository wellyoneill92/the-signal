import { Article, Category } from "./types";

const now = new Date().toISOString();

function slugify(headline: string): string {
  return headline
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

type RawArticle = Omit<Article, "slug">;

const RAW_ARTICLES: Record<Category, RawArticle[]> = {
  politics: [
    {
      id: "politics-1",
      headline: "Bipartisan Infrastructure Oversight Bill Clears Senate with Rare Supermajority",
      summary:
        "A bill creating an independent oversight board for federal infrastructure spending passed the Senate 78-19, drawing support from both parties amid concerns over project delays and cost overruns.",
      body: `The U.S. Senate passed the Infrastructure Accountability Act on Thursday with a 78-19 vote, establishing an independent oversight board to monitor the allocation and spending of federal infrastructure funds. The bill now heads to the House, where leadership has signaled support.

The legislation creates a 12-member board — six appointed by each party — with subpoena power to investigate project delays, cost overruns, and contracting irregularities. The board would publish quarterly public reports on spending progress across all major infrastructure categories, including roads, bridges, broadband, and clean energy projects.

Supporters from both parties framed the bill as a response to constituent frustration over the pace of infrastructure improvements. "People were promised better roads and bridges. They deserve to know where the money is going," said the bill's lead Republican sponsor. The Democratic co-sponsor emphasized that transparency "protects the investment taxpayers have made."

Opposition came from a small group of senators who argued the board represents unnecessary bureaucracy that could further slow project delivery. "We don't need another layer of government watching government," argued one dissenting senator. Several state governors have also expressed concern about federal oversight of projects managed at the state level.

The White House issued a statement supporting the bill, calling it "a commonsense step to ensure accountability." Political analysts noted the rare bipartisan cooperation, suggesting infrastructure oversight may be one of the few areas where cross-party legislation remains achievable in the current Congress.`,
      category: "politics",
      sources: ["Associated Press", "Politico", "The Hill"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "politics-2",
      headline: "Supreme Court Agrees to Hear Major Case on Federal Agency Rulemaking Power",
      summary:
        "The court will consider whether federal agencies can issue regulations with the force of law without explicit congressional authorization, a case that could reshape the regulatory landscape.",
      body: `The U.S. Supreme Court announced Monday it will hear a challenge to the Environmental Protection Agency's authority to set emissions standards for power plants, in a case that legal scholars say could fundamentally alter how federal agencies create and enforce regulations.

The case, brought by a coalition of states and energy companies, argues that the EPA exceeded its statutory authority by setting strict carbon emissions limits without explicit direction from Congress. The petitioners contend that regulations with major economic impact require clear legislative authorization — a principle known as the "major questions doctrine."

The Biden administration's solicitor general will defend the EPA's position, arguing that Congress delegated broad regulatory authority to the agency through the Clean Air Act. Environmental groups have filed amicus briefs warning that a ruling against the EPA could undermine decades of environmental protections.

Business groups see the case as an opportunity to curtail what they describe as regulatory overreach across multiple agencies. "This isn't just about the EPA — it's about whether unelected bureaucrats can make rules that reshape entire industries," said the president of a major business lobby.

Constitutional law experts note the case arrives as the court continues to reconsider the scope of federal regulatory power. A ruling is expected by June 2027, and could affect regulations across agencies including the FDA, SEC, and FTC.`,
      category: "politics",
      sources: ["SCOTUSblog", "The Washington Post", "Reuters"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "politics-3",
      headline: "Midterm Campaign Finance Reports Reveal Record Small-Dollar Donations",
      summary:
        "Federal Election Commission data shows small-dollar donations under $200 have surpassed large donations for the first time in a midterm cycle, reflecting shifts in how campaigns are funded.",
      body: `New campaign finance data released by the Federal Election Commission reveals that small-dollar donations — contributions under $200 — accounted for 54% of total individual contributions in the current midterm election cycle, surpassing large-dollar donations for the first time in a non-presidential year.

The shift reflects the growing effectiveness of digital fundraising platforms and social media-driven campaign appeals. Both parties have seen increases in small-dollar giving, though the trend is particularly pronounced among Democratic candidates and progressive challengers in competitive districts.

Republican strategists note that their party's small-dollar base has also grown significantly, driven by text-message fundraising and appeals tied to high-profile political controversies. "The grassroots fundraising revolution isn't owned by one party," said a senior GOP campaign consultant.

Campaign finance reform advocates offered mixed reactions. Some praised the democratization of political giving, arguing it reduces candidates' dependence on wealthy donors and corporate PACs. Others cautioned that small-dollar fundraising can be driven by polarizing rhetoric and outrage cycles rather than substantive policy engagement.

The data also showed that overall campaign spending is on pace to set a new midterm record, with total spending projected to exceed $9 billion. Super PAC spending remains substantial despite the small-dollar surge, accounting for approximately 30% of total election-related expenditures.`,
      category: "politics",
      sources: ["OpenSecrets", "The New York Times", "FEC"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "politics-4",
      headline: "Congress Passes Bipartisan Bill Restricting Government Use of Facial Recognition",
      summary:
        "New legislation limits federal law enforcement's use of facial recognition technology, requiring warrants for real-time surveillance and banning its use at protests and religious gatherings.",
      body: `Congress passed the Facial Recognition Accountability Act on Wednesday, sending to the President's desk a bill that imposes the first comprehensive federal restrictions on government use of facial recognition technology. The bill passed the House 291-140 and the Senate 67-30.

The legislation requires federal law enforcement agencies to obtain a warrant before using real-time facial recognition surveillance, prohibits its use at protests, religious gatherings, and polling places, and mandates annual accuracy audits with results published publicly. Agencies must also disclose when facial recognition evidence is used in criminal prosecutions.

Civil liberties organizations praised the bill as a long-overdue protection. "Facial recognition in the hands of government is a surveillance tool that disproportionately affects communities of color and threatens the right to anonymous free assembly," said a director at the ACLU.

Law enforcement groups offered qualified support for the warrant requirement but expressed concern that restrictions at protests could hinder investigations of criminal activity. The FBI director testified during committee hearings that facial recognition has been instrumental in identifying suspects in violent crimes and terrorism cases.

Technology companies that develop facial recognition systems were notably divided. Some supported the regulation as providing legal clarity, while others warned the accuracy audit requirements could be technically burdensome. The bill does not restrict private sector use of the technology, which advocates say should be addressed in separate legislation.`,
      category: "politics",
      sources: ["The Washington Post", "Wired", "Associated Press"],
      timestamp: now,
      isBreaking: true,
    },
    {
      id: "politics-5",
      headline: "Governors Form Bipartisan Coalition to Address Housing Affordability Crisis",
      summary:
        "Twelve governors from both parties announced a joint initiative to tackle housing costs, proposing model legislation to reduce zoning barriers, expand tax incentives, and streamline permitting.",
      body: `A coalition of twelve governors — seven Democrats and five Republicans — announced a joint housing affordability initiative on Tuesday, unveiling model legislation designed to be adapted and passed at the state level. The proposal addresses zoning reform, permitting delays, and incentives for workforce housing construction.

The model legislation includes provisions to allow multi-family housing by right in areas currently zoned exclusively for single-family homes, cap local permitting timelines at 90 days for qualifying projects, and create state-level tax credits for developers who build housing affordable to families earning less than 80% of area median income.

"Housing costs are the number one economic issue I hear about from constituents, regardless of party," said the Democratic governor leading the coalition. His Republican counterpart emphasized the market-based elements: "This isn't about government housing — it's about removing government barriers to building."

The initiative faces opposition from local government associations, which argue that zoning decisions should remain under municipal control. Some neighborhood groups have also pushed back against density increases in suburban areas.

Housing policy experts noted the significance of the bipartisan framing. "Housing affordability has historically been seen as a progressive issue, but the reality is that high housing costs affect red and blue states equally," said a researcher at a housing policy institute. The coalition plans to introduce legislation in participating states during the next legislative session.`,
      category: "politics",
      sources: ["Politico", "The Wall Street Journal", "NPR"],
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
  world: [
    {
      id: "world-1",
      headline: "EU and African Union Reach Landmark Migration and Trade Agreement",
      summary:
        "After months of negotiations, European and African leaders have signed a comprehensive deal addressing migration flows, trade barriers, and climate investment across both continents.",
      body: `European Commission President and African Union Chairperson announced the agreement at a joint press conference in Brussels on Sunday, describing it as a "new chapter" in relations between the two continents. The deal covers migration management, tariff reductions, and a €45 billion climate adaptation fund.

Under the migration provisions, the EU will create 300,000 legal work visas annually for African nationals in sectors facing labor shortages, including healthcare, agriculture, and technology. In return, participating African nations have agreed to streamline the processing of returning migrants who do not qualify for asylum.

The trade component eliminates tariffs on 85% of goods flowing between the two blocs over a five-year period. Agricultural products, long a sticking point in negotiations, will see graduated tariff reductions with safeguards for smallholder farmers on both continents.

Critics on both sides have raised concerns. European labor unions worry about wage suppression, while some African civil society groups argue the migration provisions don't go far enough. "This is a starting framework, not the final word," said one senior EU diplomat who requested anonymity to discuss the negotiations.

The climate adaptation fund, financed jointly by EU member states and private sector commitments, will focus on renewable energy infrastructure, drought-resistant agriculture, and coastal protection in the most vulnerable African nations. Projects are expected to begin disbursement by late 2026.`,
      category: "world",
      sources: ["Reuters", "Al Jazeera", "Financial Times"],
      timestamp: now,
      isBreaking: true,
    },
    {
      id: "world-2",
      headline: "Japan Announces Major Defense Overhaul Amid Regional Tensions",
      summary:
        "Tokyo unveils its largest military restructuring since World War II, including expanded naval capabilities and a new cyber defense command, drawing mixed reactions from neighboring states.",
      body: `Japan's Prime Minister presented a sweeping defense reform package to parliament on Monday, proposing a 25% increase in military spending over the next three years and the creation of a unified cyber and space defense command. The plan represents the most significant shift in Japan's defense posture in decades.

The restructuring includes the acquisition of long-range cruise missiles capable of striking targets up to 1,500 kilometers away, a capability Japan has historically avoided. Defense officials emphasized these weapons are "exclusively defensive" and intended to deter potential threats in the region.

China's foreign ministry expressed "grave concern" over the announcement, calling it a departure from Japan's post-war pacifist constitution. South Korea's response was more measured, with Seoul noting the importance of "transparent communication" about military buildups in the region.

The United States welcomed the move, with the Pentagon describing it as "a positive step toward shared burden-bearing in the Indo-Pacific." The expanded capabilities are expected to integrate closely with existing U.S.-Japan alliance frameworks.

Domestic opinion in Japan remains divided. Polls show roughly 52% of Japanese citizens support increased defense spending, while significant opposition remains, particularly among older generations who remember the consequences of militarism. Constitutional scholars have questioned whether the long-range strike capability is compatible with Article 9 of Japan's constitution.`,
      category: "world",
      sources: ["Associated Press", "NHK", "South China Morning Post"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "world-3",
      headline: "India and Pakistan Resume Diplomatic Talks After Two-Year Freeze",
      summary:
        "Senior diplomats from India and Pakistan met in a Gulf state for the first formal bilateral talks since 2024, discussing trade normalization and the disputed Kashmir region.",
      body: `Indian and Pakistani foreign secretaries held two days of talks in Muscat, Oman, marking the first formal diplomatic engagement between the nuclear-armed neighbors since relations broke down in early 2024. Both sides described the discussions as "constructive" without announcing concrete agreements.

The talks covered trade normalization, the status of diplomatic missions, and what officials described as "humanitarian matters" — widely understood to include prisoner exchanges and divided families. The more contentious issue of Kashmir was discussed but, as expected, produced no breakthrough.

Regional analysts characterized the resumption of dialogue as significant in itself. "The fact that both governments agreed to sit at the same table signals a recognition that the status quo is unsustainable," said a senior fellow at a New Delhi think tank.

Pakistan's foreign ministry emphasized the importance of addressing "core disputes" for lasting peace, while India's external affairs ministry focused on the need for "a terrorism-free environment" as a prerequisite for deeper engagement. Both sides agreed to continue discussions at a date to be determined.`,
      category: "world",
      sources: ["Associated Press", "Dawn", "The Hindu"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "world-4",
      headline: "Brazil's Supreme Court Rules on Landmark Indigenous Land Rights Case",
      summary:
        "In a closely watched decision, Brazil's highest court has upheld indigenous land claims in the Amazon, rejecting challenges from agricultural interests in a 7-4 ruling.",
      body: `Brazil's Supreme Federal Tribunal ruled on Friday that indigenous communities hold constitutional rights to ancestral lands they occupied prior to the 1988 constitution, rejecting the so-called "temporal framework" argument pushed by agricultural lobbies. The 7-4 decision is expected to affect dozens of pending land disputes.

The ruling affirms that indigenous land rights are "original rights" predating the formation of the Brazilian state, and cannot be limited by arbitrary cutoff dates. Chief Justice wrote in the majority opinion that the constitution "recognizes, rather than grants" these rights.

Agricultural industry groups expressed disappointment, warning the decision could affect food production in regions bordering indigenous territories. The Confederation of Agriculture estimated that up to 5 million hectares could be affected by pending demarcation claims.

Indigenous rights organizations celebrated the ruling as historic. Leaders from several Amazonian communities traveled to Brasília for the announcement. Environmental groups noted the decision could slow deforestation, as indigenous-managed lands have consistently shown lower deforestation rates than surrounding areas.

The ruling does not automatically resolve individual land disputes but establishes the legal framework under which they will be adjudicated. The government now faces the challenge of implementing demarcation processes while managing tensions between indigenous communities and established agricultural operations.`,
      category: "world",
      sources: ["Reuters", "Folha de São Paulo", "The Guardian"],
      timestamp: now,
      isBreaking: false,
    },
    {
      id: "world-5",
      headline: "WHO Declares End to Mpox Public Health Emergency in Central Africa",
      summary:
        "The World Health Organization has lifted its emergency designation for the mpox outbreak in the Democratic Republic of Congo and surrounding nations, citing successful vaccination campaigns.",
      body: `The World Health Organization announced Sunday that the mpox outbreak in Central Africa no longer constitutes a Public Health Emergency of International Concern, marking the end of an 18-month emergency period. The decision follows a dramatic decline in new cases across the affected region.

Vaccination campaigns, which reached over 12 million people in the Democratic Republic of Congo, Republic of Congo, and neighboring countries, were credited as the primary driver of the outbreak's containment. The WHO noted that case counts had fallen 94% from their peak.

"This is a testament to what the global health community can achieve when resources are mobilized quickly and equitably," said the WHO Director-General. However, he cautioned that surveillance must continue and that the virus remains endemic in parts of Central Africa.

Public health experts praised the response but noted lessons for future outbreaks. The initial vaccine rollout faced significant delays due to manufacturing bottlenecks and distribution challenges in remote areas. Several NGOs called for permanent investment in regional health infrastructure rather than emergency-only funding models.`,
      category: "world",
      sources: ["WHO", "BBC News", "The Lancet"],
      timestamp: now,
      isBreaking: false,
    },
  ],
};

// Add slugs to all mock articles
export const MOCK_ARTICLES: Record<Category, Article[]> = Object.fromEntries(
  Object.entries(RAW_ARTICLES).map(([cat, articles]) => [
    cat,
    articles.map((a) => ({ ...a, slug: slugify(a.headline) })),
  ])
) as Record<Category, Article[]>;
