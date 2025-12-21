export interface DiaryAuthor {
  name: string
  avatar: string
  bio: string
  social: {
    twitter?: string
    instagram?: string
  }
}

export interface Diary {
  slug: string
  title: string
  subtitle: string
  excerpt: string
  coverImage: string
  images: string[]
  author: DiaryAuthor
  tags: string[]
  date: string
  readTime: number
  featured: boolean
  region: string
  body: string
}

export const diaryAuthors: Record<string, DiaryAuthor> = {
  priya: {
    name: "Priya Sharma",
    avatar: "/indian-woman-portrait-professional.jpg",
    bio: "Travel writer and photographer exploring the hidden gems of Himachal Pradesh for over 5 years.",
    social: {
      twitter: "https://twitter.com/priyasharma",
      instagram: "https://instagram.com/priyatravels",
    },
  },
  rahul: {
    name: "Rahul Verma",
    avatar: "/indian-man-professional-portrait.png",
    bio: "Adventure enthusiast and trekking guide based in Manali. Passionate about sustainable tourism.",
    social: {
      instagram: "https://instagram.com/rahulhikes",
    },
  },
  anita: {
    name: "Anita Kapoor",
    avatar: "/indian-woman-smiling.png",
    bio: "Spiritual seeker and wellness blogger documenting sacred journeys across the Himalayas.",
    social: {
      twitter: "https://twitter.com/anitakapoor",
      instagram: "https://instagram.com/anitaspirit",
    },
  },
}

export const diaries: Diary[] = [
  {
    slug: "spiti-valley-winter-expedition",
    title: "A Winter Expedition Through Spiti Valley",
    subtitle: "Surviving -30°C and discovering the frozen heart of the Himalayas",
    excerpt:
      "When I decided to visit Spiti Valley in January, everyone thought I was crazy. But the frozen landscapes, empty monasteries, and warm hospitality of the locals made it the most transformative journey of my life.",
    coverImage: "/spiti-valley-winter-snow-mountains-landscape.jpg",
    images: [
      "/key-monastery-spiti-winter-snow.jpg",
      "/frozen-spiti-river-winter-landscape.jpg",
      "/tibetan-village-spiti-winter.jpg",
      "/prayer-flags-snow-mountains-himalayas.jpg",
    ],
    author: diaryAuthors.priya,
    tags: ["trek", "spiritual", "adventure"],
    date: "2024-02-15",
    readTime: 12,
    featured: true,
    region: "Spiti",
    body: `
## The Decision to Go

When I told my friends I was planning a winter trip to Spiti Valley, the reactions ranged from concerned silence to outright laughter. "You know it's -30°C there, right?" my mother asked, her voice carrying that particular tone of maternal worry I've come to recognize.

But something had been calling me to this remote trans-Himalayan desert for months. I'd seen the summer photographs—the stark beauty of Kaza, the ancient monasteries perched on impossible cliffs, the prayer flags dancing against impossibly blue skies. Yet it was the winter images that haunted me. The frozen rivers, the snow-covered stupas, the complete and utter silence of a landscape untouched by time.

> "In winter, Spiti becomes what it truly is—a place where time stands still and the soul can finally breathe."

## The Journey Begins

The journey from Shimla to Kaza in winter is not for the faint-hearted. The usual route through Rohtang Pass is closed, so we took the longer path through Kinnaur, winding along the treacherous Hindustan-Tibet Highway.

![Kinnaur Valley](https://res.cloudinary.com/demo/image/upload/v1/diary_mountain.jpg)
*The Kinnaur Valley in winter—a study in white and granite*

Our driver, Tenzin, had been navigating these roads for twenty years. "The mountain teaches patience," he said as we waited for a landslide to be cleared. "In Spiti, we learn that time is not something to fight against."

### Highlights of the Journey:
- **Day 1-2:** Shimla to Sangla via Rampur
- **Day 3:** Sangla to Nako Lake
- **Day 4:** Nako to Tabo
- **Day 5-7:** Kaza and surrounding villages

## Key Monastery at Dawn

Nothing prepares you for the first sight of Key Monastery in winter. Rising from the snow-covered landscape like a medieval fortress, its whitewashed walls seemed to glow in the early morning light.

![Key Monastery](https://res.cloudinary.com/demo/image/upload/v1/diary_temple.jpg)
*Key Monastery at dawn—where heaven meets earth*

The monks welcomed us with butter tea, its salty warmth a revelation after the bone-chilling cold outside. I spent three days at the monastery, attending morning prayers and learning about the centuries-old traditions that have survived in this remote corner of the world.

## Tips for Winter Travelers

**Essential Gear:**
- Down jacket rated for -40°C
- Multiple layers of thermal wear
- Hand and toe warmers
- UV-protected sunglasses (snow blindness is real)

**Health Considerations:**
- Acclimatize properly (spend time in Kalpa or Sangla)
- Carry medication for altitude sickness
- Stay hydrated despite the cold

## The Unexpected Gift

On my last night in Kaza, a blizzard trapped us in our guesthouse. The power went out, and we gathered around a bukhari (traditional stove) with other stranded travelers—a German photographer, a Buddhist nun from Taiwan, and a retired schoolteacher from Delhi.

We shared stories, sang songs, and watched the snow fall. It was, perhaps, the most connected I've ever felt to strangers.

> "Travel is not about the places you visit, but the souls you meet along the way."

Spiti in winter isn't a destination; it's a transformation. I came seeking adventure and left with something far more valuable—the understanding that true warmth comes not from temperature, but from connection.
    `,
  },
  {
    slug: "triund-trek-first-timer-guide",
    title: "Triund Trek: A First-Timer's Complete Guide",
    subtitle: "Everything you need to know before your first Himalayan trek",
    excerpt:
      "Triund is often called the 'Queen of Treks' for beginners, and after completing it, I understand why. Here's my honest account of the 9km journey that changed how I see the mountains.",
    coverImage: "/triund-trek-camping-himalayas-sunset.jpg",
    images: [
      "/triund-hill-top-view-dhauladhar-range.jpg",
      "/mcleodganj-dharamshala-town-view-mountains.jpg",
      "/tent-camping-triund-night-stars.jpg",
      "/trekking-trail-forest-dharamshala.jpg",
    ],
    author: diaryAuthors.rahul,
    tags: ["trek", "adventure", "family"],
    date: "2024-03-20",
    readTime: 8,
    featured: false,
    region: "Dharamshala",
    body: `
## Why Triund?

Every trekker in India has heard of Triund. Located at 2,850 meters above sea level, this 9-kilometer trek from McLeodganj offers one of the most accessible gateways to the Himalayan experience.

I'd been putting off this trek for years, always planning more "challenging" expeditions. But when my cousin visited from Mumbai with zero trekking experience, Triund seemed like the perfect introduction.

## The Trek Begins

We started from Dharamkot at 6 AM, the morning mist still clinging to the deodar forests. The first few kilometers are gentle—a warm-up through Gallu Devi Temple and into the rhododendron forests.

![Forest Trail](https://res.cloudinary.com/demo/image/upload/v1/diary_trek.jpg)
*The magical forest trail in the early morning*

### Trail Breakdown:
- **Km 0-3:** Gradual ascent through forest
- **Km 3-6:** Moderate climb with tea stalls
- **Km 6-9:** Steep final stretch ("22 curves")

## The Infamous 22 Curves

Let me be honest—the last 3 kilometers are tough. Known locally as the "22 curves," this section is a series of steep switchbacks that will test your determination.

> "When your legs say stop, tell them to shut up and keep moving."

But here's the secret: take it slow. We saw people racing up and burning out, while others maintained a steady pace and enjoyed the journey. Every curve reveals a new view, a new reason to keep going.

## Reaching the Top

Nothing prepares you for the view from Triund. The Dhauladhar range spreads before you like a wall of white—so close you feel you could touch it.

We set up our tents as the sun began its descent, painting the mountains in shades of gold and pink. That night, with no light pollution, the Milky Way stretched across the sky like a river of stars.

## Practical Tips

**What to Pack:**
- 2-3 liters of water (refill at tea stalls)
- Energy bars and light snacks
- Rain jacket (weather changes fast)
- Headlamp for early starts or late descents
- Comfortable trekking shoes

**Best Time to Visit:**
- March-June: Clear skies, wildflowers
- September-November: Post-monsoon clarity
- Avoid: July-August (monsoon), December-February (snow, requires experience)

## The Descent

Coming down is faster but not easier—your knees will have opinions. We took our time, stopping at Magic View Café for chai and parathas, watching clouds roll through the valley below.

My cousin, who had never hiked more than a few kilometers, stood at the top of Triund with tears in her eyes. "I didn't know I could do this," she said.

That's the gift of Triund. It shows you that the mountains aren't as far away as you think—and neither are your own capabilities.
    `,
  },
  {
    slug: "manikaran-hot-springs-pilgrimage",
    title: "The Sacred Hot Springs of Manikaran",
    subtitle: "A spiritual journey to where Shiva found Parvati's lost earring",
    excerpt:
      "Manikaran is where geology and mythology merge. The natural hot springs that can boil rice, the ancient Sikh and Hindu temples, and the misty Parvati Valley create an experience that transcends ordinary travel.",
    coverImage: "/manikaran-hot-springs-temple-himachal.jpg",
    images: [
      "/manikaran-gurudwara-sahib-temple.jpg",
      "/parvati-river-valley-mountains.jpg",
      "/hot-spring-steam-bathing.jpg",
      "/placeholder.svg?height=600&width=800",
    ],
    author: diaryAuthors.anita,
    tags: ["spiritual", "family", "honeymoon"],
    date: "2024-01-10",
    readTime: 10,
    featured: false,
    region: "Kullu",
    body: `
## The Legend

According to Hindu mythology, Lord Shiva and Goddess Parvati wandered through these valleys for thousands of years. One day, Parvati's earring (mani) fell into the water and was carried away by Shesha, the serpent king.

When Shiva demanded its return, Shesha hissed in anger, and the earring shot up with hot water, creating the thermal springs that exist to this day.

Whether you believe the legend or the geological explanation (geothermal activity along the Parvati Valley fault line), the result is the same: water so hot it can cook food, emerging from the earth in the middle of the Himalayas.

## Arrival in the Parvati Valley

The journey from Bhuntar to Manikaran is one of the most beautiful drives in Himachal. The road hugs the Parvati River, passing through Kasol (the Israeli haven) and tiny villages where time seems to move differently.

![Parvati Valley](https://res.cloudinary.com/demo/image/upload/v1/diary_river.jpg)
*The sacred Parvati River flowing through the valley*

## The Gurudwara Experience

Manikaran Sahib Gurudwara is a masterpiece of Sikh architecture rising beside the river. Inside, the langar (community kitchen) serves thousands of pilgrims daily—and here's the miracle: the rice and dal are cooked entirely in the natural hot springs.

> "The water that heals also nourishes. This is the blessing of Manikaran."

I spent an afternoon helping in the langar, watching volunteers lower cloth bags of rice into the steaming pools. Twenty minutes later, perfectly cooked rice emerged, ready to feed the faithful.

## The Hindu Temples

Across the river, ancient Hindu temples honor Lord Shiva and the lost earring. The Raghunath Temple, with its hot water tank, offers a different but equally profound experience.

### Sacred Activities:
- **Hot spring bathing:** Separate pools for men and women
- **Temple darshan:** Both Gurudwara and Hindu temples
- **Langar seva:** Volunteer in the community kitchen
- **River meditation:** Find a quiet spot along the Parvati

## Beyond the Temples

While most visitors come for the religious sites, I found unexpected peace in the early mornings. Before the crowds arrived, I'd sit by the river, watching steam rise from the earth, listening to temple bells echo off the valley walls.

One morning, an elderly sadhu joined me. "The springs have been here for millennia," he said. "Long before the temples, before the legends. Perhaps the water remembers what we have forgotten."

## Practical Information

**Getting There:**
- Nearest airport: Bhuntar (35 km)
- From Manali: 75 km / 3 hours
- From Kasol: 4 km / 15 minutes

**Best Time:**
- March-June and September-November
- Winter visits require warm clothing but offer fewer crowds

**Etiquette:**
- Cover your head in the Gurudwara
- Remove shoes before entering any temple
- Dress modestly for the hot springs
- Don't swim in the main bathing areas

## The Departure

Leaving Manikaran, my bus passed through Kasol, and I understood why so many travelers get "stuck" in the Parvati Valley. There's something in these mountains that calls to the soul—perhaps the same thing that kept Shiva and Parvati wandering here for all those centuries.

I will return. The springs are waiting.
    `,
  },
  {
    slug: "paragliding-bir-billing-adventure",
    title: "Flying Over the Himalayas: Bir Billing Paragliding",
    subtitle: "My first tandem flight from the paragliding capital of India",
    excerpt:
      "They call Bir Billing the paragliding capital of India. Standing at 2,400 meters, looking down at the Kangra Valley, I understood why. This is my story of conquering fear and finding freedom in the sky.",
    coverImage: "/placeholder.svg?height=800&width=1200",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    author: diaryAuthors.rahul,
    tags: ["adventure", "trek"],
    date: "2024-04-05",
    readTime: 7,
    featured: true,
    region: "Kangra",
    body: `
## The Fear Factor

Let me start with a confession: I'm terrified of heights. The kind of terrified where my legs go weak at the edge of a balcony, where glass-floored observation decks are my personal nightmare.

So why did I come to Bir Billing to jump off a mountain? Because sometimes the only way past fear is through it.

![Takeoff Point](https://res.cloudinary.com/demo/image/upload/v1/diary_paragliding.jpg)
*The takeoff point at Billing—where courage meets sky*

## Understanding Bir Billing

Bir is the landing site—a peaceful Tibetan settlement with monasteries and cafes. Billing is the takeoff point, 14 kilometers up the mountain at 2,400 meters. The combination offers one of the longest and most scenic paragliding flights in Asia.

### Why Bir Billing is Special:
- **Altitude difference:** 800+ meters between takeoff and landing
- **Flight duration:** 15-30 minutes (sometimes longer)
- **Thermal currents:** World-class conditions for experienced pilots
- **Scenery:** Dhauladhar range, Kangra Valley, tea gardens

## The Morning Of

We drove up to Billing at dawn, the mountain road winding through pine forests. At the launch site, dozens of colorful parachutes were already being unpacked. Pilots checked wind conditions, discussed thermal patterns, and prepared their equipment with practiced efficiency.

My pilot, Vikram, had been flying for 15 years. "First time?" he asked, reading my pale face. "Don't worry. The mountains will take care of you."

## The Takeoff

There's no gentle introduction in paragliding. You stand at the edge, the harness connecting you to your pilot and the glider. You take three running steps toward the void. And then—

You're flying.

> "The moment your feet leave the ground, fear transforms into freedom. It's not gradual. It's instant."

The ground dropped away, and suddenly I was floating above the world. The villages below looked like toy sets, the roads like ribbons winding through green hills.

## In the Air

The flight lasted 25 minutes, though time became meaningless. Vikram guided us into thermals—columns of rising warm air—and we spiraled upward, gaining altitude. At one point, we were level with the snow-capped peaks of the Dhauladhar range.

### Sensations of Flight:
- Surprisingly stable (no turbulence sensation)
- Quiet, except for wind in the canopy
- Temperature drops noticeably at higher altitudes
- The world looks like a living map

## The Landing

Coming down is a controlled descent, using the same thermals we rode up. The landing at Bir is gentle—a few running steps, and you're back on earth.

But you're not the same person who took off.

## Practical Tips

**Choosing Your Operator:**
- Look for certified pilots with years of experience
- Ask about safety equipment and insurance
- Read reviews, but trust your instincts when you meet the pilot

**What to Expect:**
- Cost: ₹2,500-3,500 for tandem flight
- GoPro video: Usually ₹500-1,000 extra
- Best time: March-June, September-November
- Morning flights are usually smoother

**What to Wear:**
- Warm layers (it's cold up there)
- Closed shoes with ankle support
- Sunglasses
- Nothing loose that could get tangled

## The Aftermath

That evening, I sat at a rooftop cafe in Bir, watching other pilots come in for landing. The fear I'd carried up the mountain was gone, replaced by something I can only describe as expansion.

The Himalayas hadn't just given me a view; they'd given me a new understanding of what I'm capable of. Sometimes the scariest step is the one that sets you free.
    `,
  },
  {
    slug: "kullu-dussehra-festival-experience",
    title: "Witnessing Kullu Dussehra: The Divine Festival",
    subtitle: "When the gods descend from the mountains to celebrate victory",
    excerpt:
      "Unlike anywhere else in India, Kullu celebrates Dussehra for seven days after the rest of the country has finished. I spent a week among the deities, the devotees, and the ancient traditions that make this festival truly extraordinary.",
    coverImage: "/placeholder.svg?height=800&width=1200",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    author: diaryAuthors.anita,
    tags: ["spiritual", "family"],
    date: "2024-10-20",
    readTime: 11,
    featured: false,
    region: "Kullu",
    body: `
## The Legend of Kullu Dussehra

While the rest of India celebrates Dussehra on the tenth day of Navratri, Kullu's festival begins on that day and continues for seven more. The reason lies in a 17th-century legend.

King Jagat Singh of Kullu, plagued by guilt over a Brahmin's curse, was told to bring the idol of Lord Raghunath (Rama) from Ayodhya. When the deity arrived, the king placed it on his throne and declared himself merely a servant of the god.

Since then, Lord Raghunath has been the ruling deity of Kullu, and Dussehra his royal celebration.

## The Arrival of the Gods

What makes Kullu Dussehra unique is the gathering of over 300 deities from villages across the valley. Each village has its own kul devta (family deity), carried in elaborately decorated palanquins by devotees who sometimes walk for days through the mountains.

### The Procession:
- Deities arrive from villages throughout the week
- Each is carried on a ceremonial palanquin (rath)
- Devotees dance in trance, possessed by divine energy
- Traditional music fills the valley

Watching the procession is overwhelming. The sound of nagara drums, the brilliant colors of Himachali caps and shawls, the fervent devotion on every face—it's a sensory and spiritual immersion unlike anything else.

## The Rath Yatra

On the first day, Lord Raghunath's chariot is pulled through Kullu town from the Raghunath Temple to the Dhalpur maidan (fairground). This isn't a mechanical float—hundreds of devotees pull the rope, an honor they wait years to receive.

> "In Kullu, we don't watch the gods—we walk with them."

The chariot moves slowly, stopping at temples and homes along the route. Priests perform rituals, devotees offer prayers, and the line between sacred and secular dissolves entirely.

## The Festival Grounds

Dhalpur maidan transforms into a city within a city during Dussehra. Food stalls serve Himachali specialties—siddu, dham, babru. Artisans sell traditional crafts. Stages host folk performances through the night.

### Must-Experience at Dhalpur:
- **Nati dance:** Traditional group dance of Himachal (recognized as the largest folk dance by Guinness)
- **Local cuisine:** Try tudkiya bhath, aktori, and local sweetmeats
- **Night processions:** Deities return to their makeshift temples
- **Craft shopping:** Kullu shawls, Himachali caps, wooden artifacts

## The Final Day

On the seventh day, a symbolic pile of brush is set ablaze, representing the burning of Lanka. But this isn't the violent climax of other Dussehra celebrations—it's a quiet acknowledgment that even darkness must eventually yield to light.

The deities begin their journeys home, carried back to their villages through the mountains. Some won't return until next year. Others will stop at sacred sites along the way, extending their own pilgrimages.

## Practical Information

**When to Visit:**
- Usually October (check lunar calendar for exact dates)
- Book accommodation months in advance—the valley fills completely
- The entire week is worth attending, not just the first day

**Getting There:**
- Nearest airport: Bhuntar (10 km)
- Well-connected by road from Manali, Shimla, and Delhi

**Where to Stay:**
- Book early—hotels fill up fast
- Consider homestays in nearby villages for authentic experience
- Camping is possible at designated sites

**What to Wear:**
- Comfortable walking shoes (you'll be on your feet)
- Layers (mountain weather is unpredictable)
- A scarf or cap to cover your head during temple visits

## The Return

Leaving Kullu after Dussehra feels like emerging from a dream. The intensity of devotion, the colors, the music—everything seems slightly faded once you're back in the regular world.

But that's the gift of festival travel. For a week, I wasn't a tourist. I was a participant in something ancient and alive, a tradition that has survived for four centuries and shows no sign of fading.

The gods will descend again next year. Perhaps I'll be there to greet them.
    `,
  },
  {
    slug: "old-manali-hippie-trail-today",
    title: "Old Manali: Walking the Hippie Trail Today",
    subtitle: "From 1960s counterculture haven to backpacker's paradise",
    excerpt:
      "Old Manali was once a stop on the legendary hippie trail. Today, it's a fascinating blend of Israeli cafes, Tibetan momos, yoga retreats, and ancient temples. I spent a month exploring what remains of the counterculture dream.",
    coverImage: "/placeholder.svg?height=800&width=1200",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    author: diaryAuthors.priya,
    tags: ["honeymoon", "adventure"],
    date: "2024-05-12",
    readTime: 9,
    featured: false,
    region: "Manali",
    body: `
## The Two Manalis

There are two Manalis. New Manali is the one most tourists see—the mall road, the traffic, the hotels stacked like concrete dominoes up the hillside.

Old Manali is a 3-kilometer walk (or ₹100 auto ride) away, across the Manalsu stream, and it feels like a different world.

## A Brief History

In the 1960s and 70s, Manali was a stop on the legendary "hippie trail"—the overland route that brought Western counterculture seekers from Europe to India. They came for cheap living, spiritual seeking, and, yes, the locally grown charas.

Many of those travelers never left. They married locals, opened guesthouses, and created a unique cultural blend that persists to this day.

## Walking the Village

Old Manali is best explored on foot. The narrow lanes wind past apple orchards and traditional Himachali houses, their wooden balconies overflowing with flowers. Cafes appear around corners—some serving hummus and falafel, others offering Tibetan thukpa and momos.

### Notable Spots:
- **Manu Temple:** Dedicated to the sage Manu, ancestor of humanity in Hindu mythology
- **Dylan's Cafe:** Yes, named after Bob Dylan
- **The Lazy Dog:** Legendary traveler hangout
- **Dragon Temple:** Beautiful wooden Buddhist temple

## The Manu Temple

Manu Temple is the spiritual heart of Old Manali. According to legend, the sage Manu meditated here after the great flood, and Manali takes its name from him (Manu-ali, "home of Manu").

The temple is modest—a simple stone structure surrounded by ancient trees. But sitting in its courtyard at dusk, watching the mountains turn pink, I understood why seekers have been drawn here for millennia.

> "In Old Manali, every stone has a story, every tree has witnessed a thousand travelers seeking something they couldn't name."

## The Cafe Culture

Old Manali's cafes are a world unto themselves. You'll find:
- **Israeli travelers** spending months post-army service
- **Digital nomads** working on laptops with mountain views
- **Yoga practitioners** between retreats
- **Artists** selling jewelry and paintings
- **Long-term residents** who came for a week and stayed for years

The menus reflect this diversity—shakshuka sits next to dal makhani, pizza alongside Tibetan bread.

## Beyond the Village

Old Manali is also a gateway to adventure:

**Day Hikes:**
- Jogini Waterfall (easy, 3 hours round trip)
- Lama Dugh (moderate, full day)
- Bhrigu Lake (challenging, 2 days)

**River Activities:**
- Rafting on the Beas (Grade II-III rapids)
- Fishing (requires permit)
- Simply sitting by the water

## The Full Moon

I happened to be in Old Manali during a full moon. That night, impromptu gatherings appeared along the river—travelers and locals sharing food, music, and stories. A fire was lit. Drums appeared. Someone produced a guitar.

It felt, for a moment, like the old hippie trail was alive again—not as nostalgia, but as a living tradition of seeking connection in beautiful places.

## Staying Long-Term

Many travelers come to Old Manali for a week and stay for months. If you're considering this:

**What to Know:**
- Rents drop significantly for long-term stays
- The "season" is March-June and September-November
- Winters are cold but magical (and cheap)
- Internet is reliable enough for remote work
- Learning basic Hindi opens many doors

## The Departure

Leaving Old Manali after a month, my backpack felt heavier with books exchanged, gifts from new friends, a Tibetan singing bowl I didn't need but couldn't resist.

The hippie trail may be history, but its spirit persists—in the cafes where strangers become friends, in the mountains that accept all seekers, in the timeless rhythm of a village that refuses to rush.

The trail doesn't end. It just waits for the next traveler to find it.
    `,
  },
]

export const diaryTags = ["spiritual", "trek", "adventure", "honeymoon", "family"]
export const diaryMonths = ["Spring", "Summer", "Autumn", "Winter"]
export const diaryRegions = ["Spiti", "Dharamshala", "Kullu", "Manali", "Kangra", "Shimla"]
