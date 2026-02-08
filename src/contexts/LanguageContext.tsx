import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'sv' | 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  sv: {
    // Navigation
    'nav.home': 'Hem',
    'nav.info': 'Bra att veta',
    'nav.travel': 'Resa',
    'nav.timeline': 'Bröllopshelgen',
    'nav.rsvp': 'OSA',
    'nav.contact': 'Kontakt',
    
    // Hero
    'hero.subtitle': 'Vi gifter oss!',
    
    // Countdown
    'countdown.title': 'Nedräkning till vårt bröllop',
    'countdown.subtitle': 'Snart är den stora dagen här!',
    'countdown.days': 'Dagar',
    'countdown.hours': 'Timmar',
    'countdown.minutes': 'Minuter',
    'countdown.seconds': 'Sekunder',
    
    // Travel Info
    'travel.title': 'Reseinformation',
    'travel.subtitle': 'All viktig information för er resa till vårt bröllop',
    'travel.findus.title': 'Hitta hit',
    'travel.findus.address': 'Nybynäs Gård, KÄRRBO NYBY 1, 725 97 Västerås',
    'travel.findus.distance': 'Cirka 20 minuter från Västerås centrum med bil.',
    'travel.findus.transport': 'Bussar hämtar och lämnar vid Steam Hotel och Elite Stadshotellet. Se schemat för avgångstider.',
    'travel.findus.parking': 'Gratis parkering finns vid Nybynäsgård.',
    'travel.findus.link': 'Öppna i Google Maps',
    'travel.accommodation.title': 'Boende',
    'travel.accommodation.content': 'Vi rekommenderar hotell i Västerås centrum. Steam Hotel och Elite Stadshotellet Västerås är båda utmärkta alternativ.',
    'travel.weekend.title': 'Helgtips',
    'travel.weekend.content': 'För er som stannar längre rekommenderar vi att utforska Västerås gamla stad, Anundshög och de vackra stränderna vid Mälaren.',
    
    // Timeline
    'timeline.header': 'Bröllopshelgen',
    'timeline.title': 'Schema för helgen',
    'timeline.subtitle': 'Här hittar du allt som händer under vår bröllopshelg',
    // Friday events
    'timeline.friday.day': 'Fredag',
    'timeline.friday.event': 'välkomstmingel',
    'timeline.friday.title': 'Fredag - Meet & Greet',
    'timeline.friday.time': 'På fredagskvällen startar vi bröllopshelgen med ett välkomstmingel på Nybynäs Gård.',
    'timeline.friday.location': 'En avslappnad kväll med fokus på att umgås, mingla och låta alla få träffas.',
    'timeline.friday.food': 'Vi bjuder på mat och dryck och hoppas kunna vara utomhus om vädret tillåter.',
    'timeline.friday.end': '',
    'timeline.friday.description': 'Avslappnat mingel med drinkar och lätta tilltugg. En perfekt chans att träffa andra gäster innan den stora dagen.',
    'timeline.friday.bus.title': 'Buss till hotellen',
    'timeline.friday.bus.time': '23:00',
    'timeline.friday.bus.description': 'Transport till hotellen.',
    // Saturday events
    'timeline.saturday.day': 'Lördag',
    'timeline.saturday.bus.title': 'Bussavgång från hotellen',
    'timeline.saturday.bus.time': '13:00',
    'timeline.saturday.bus.description': 'Bussen avgår från hotellen.',
    'timeline.saturday.mingel.title': 'Mingel med champagne',
    'timeline.saturday.mingel.time': '13:30–14:00',
    'timeline.saturday.mingel.description': 'Välkomstmingel med champagne.',
    'timeline.saturday.ceremony.title': 'Vigsel',
    'timeline.saturday.ceremony.time': '15:00',
    'timeline.saturday.ceremony.description': 'Vi samlas på Nybynäs gård för välkomstdrink innan det är dags för vigseln där vi säger ja till varandra.',
    'timeline.saturday.mingel2.title': 'Mingel',
    'timeline.saturday.mingel2.time': '16:00',
    'timeline.saturday.mingel2.description': 'Mer champagne och tilltugg.',
    'timeline.dinner.title': 'Middag',
    'timeline.dinner.time': '18:00',
    'timeline.dinner.description': 'Vi fortsätter bröllopsdagen med en sittande middag inne i Magasinet.',
    'timeline.dancing.title': 'Dans & Musik',
    'timeline.dancing.time': '22:00',
    'timeline.dancing.description': 'Efter middagen fortsätter vi firandet på dansgolvet med musik och drinkar.',
    'timeline.saturday.busend.title': 'Bussavgång',
    'timeline.saturday.busend.time': '01:30',
    'timeline.saturday.busend.description': 'Transport tillbaka till hotellen.',
    // Timeline card titles
    'timeline.and': 'och',
    'timeline.card1.part1': 'VÄLKOMSTDRINK',
    'timeline.card1.part2': 'VIGSEL',
    'timeline.card2.part1': 'MIDDAG',
    'timeline.card2.part2': 'FEST',
    'timeline.card3.part1': 'DRINKAR',
    'timeline.card3.part2': 'DANS',
    'timeline.friday.subtitle': 'välkomstmingel',
    
    // RSVP
    'rsvp.title': 'OSA',
    'rsvp.subtitle': 'Vänligen svara senast [Datum]',
    'rsvp.attending': 'Kommer du?',
    'rsvp.attending.yes': 'Ja, jag kommer!',
    'rsvp.attending.no': 'Nej, jag kan tyvärr inte komma',
    'rsvp.names': 'Namn',
    'rsvp.names.placeholder': 'Ditt namn',
    'rsvp.plusOne.name.placeholder': 'Din partners namn',
    'rsvp.email': 'E-post',
    'rsvp.email.placeholder': 'din@email.com',
    'rsvp.plusOne': 'Tar du med dig en partner?',
    'rsvp.dietary': 'Allergier/Specialkost',
    'rsvp.dietary.placeholder': 'Berätta om eventuella allergier eller specialkost...',
    'rsvp.meal': 'Måltidsval',
    'rsvp.meal.meat': 'Kött',
    'rsvp.meal.fish': 'Fisk',
    'rsvp.meal.vegetarian': 'Vegetarisk',
    'rsvp.meal.vegan': 'Vegansk',
    'rsvp.shuttle': 'Vill du åka med pendlingsbussen?',
    'rsvp.shuttle.both': 'Ja, tur och retur',
    'rsvp.shuttle.to': 'Bara dit',
    'rsvp.shuttle.from': 'Bara hem',
    'rsvp.shuttle.no': 'Nej tack',
    'rsvp.song': 'Önska en låt',
    'rsvp.song.placeholder': 'Vilken låt vill du höra på festen?',
    'rsvp.message': 'Meddelande till oss',
    'rsvp.message.placeholder': 'Skriv ett meddelande till oss...',
    'rsvp.submit': 'Skicka OSA',
    'rsvp.days': 'Vilka dagar kommer du?',
    'rsvp.days.both': 'Både fredag och lördag',
    'rsvp.days.saturday': 'Endast lördag',
    'rsvp.success': 'Tack! Ditt svar har sparats. Vi skickar mer information när bröllopet närmar sig.',
    'rsvp.error': 'Vänligen fyll i alla obligatoriska fält.',
    'rsvp.required': 'Detta fält är obligatoriskt',
    'rsvp.email.invalid': 'Vänligen ange en giltig e-postadress',
    
    // Wedding Details
    'details.title': 'Bra att veta',
    'details.subtitle': 'Här är all praktisk information för att göra er dag så bra som möjlig',
    'details.children.title': 'Barn',
    'details.children.content': 'Vi vill att ni som gäster ska kunna njuta fullt ut utan vardagens ansvar. Därför firar vi som en vuxenfest. Ammande spädbarn är givetvis varmt välkomna.',
    'details.hashtag.title': 'Hashtag',
    'details.hashtag.content': '#FalkKiani2026 - Dela gärna era bilder!',
    'details.gifts.title': 'Bröllopsönskan',
    'details.gifts.content': 'Det viktigaste för oss är att ni kommer och firar med oss. Vill ni ändå ge en gåva uppskattar vi bidrag till vår bröllopsresa.',
    'details.venue.title': 'Inomhus / Utomhus',
    'details.venue.content': 'Vigseln hålls i äppellunden utomhus (vid bra väder). Middag och fest hålls inomhus i Magasinet.',
    'details.photos.title': 'Bilder efter bröllopet',
    'details.photos.content': 'Efter bröllopet kommer vi samla alla bilder här så att ni kan ladda ner och återuppleva dagen tillsammans med oss.',
    'details.dresscode.title': 'Klädkod',
    'details.dresscode.friday.title': 'Fredag',
    'details.dresscode.friday.content': 'Festfint. Kvällarna kan bli svala – ta gärna med en extra tröja eller sjal.',
    'details.dresscode.saturday.title': 'Lördag',
    'details.dresscode.saturday.content': 'Mörk kostym (smoking går såklart bra)',
    'details.dresscode.women': 'Beskrivning för kvinnor',
    'details.dresscode.men': 'Beskrivning för män',
    
    // Toastmasters
    'toastmasters.title': 'Toastmasters',
    'toastmasters.names': 'Dennis & Jiezzah Lindahl',
    'toastmasters.bio': 'Vi presenterar stolt våra toastmasters, Dennis och Jiezzah Lindahl. De har känt brudgummen i nästan 30 år och träffade oss tidigt i vår relation. Sedan dess har vi delat många minnen tillsammans, från midsommarfiranden och nyårsaftnar till konserter och långa diskussioner. Med sin värme, humor och timing är de det perfekta paret att guida oss genom firandet.',
    'toastmasters.cta': 'Vill du hålla tal eller överraska brudparet? Kontakta oss!',
    'toastmasters.email': 'toastmasters.falkkiani@gmail.com',
    
    // Accommodation details
    'accommodation.steam.description': 'Designhotell vid Mälaren med spa.',
    'accommodation.steam.discount': '10% rabatt för bröllopsgäster',
    'accommodation.steam.code': 'Använd kod: bröllop2026',
    'accommodation.steam.pricing': 'Priserna är dynamiska och varierar.',
    'accommodation.elite.description': 'Klassiskt stadshotell i centrala Västerås.',
    'accommodation.elite.booking': 'Ring eller maila och nämn "Bröllop Josefin & Kiarash"',
    'accommodation.elite.pricing': 'Dubbelrum 1 350 kr/natt • Enkelrum 1 150 kr/natt',
    
    // Contact
    'contact.title': 'Kontakt',
    'contact.message': 'Vi ser fram emot att fira med er! Har ni några frågor är ni alltid välkomna att höra av er till oss.',
    'contact.regards': 'Med kärlek,',
    'contact.names': 'Josefin & Kiarash',
    
    // Password Gate
    'password.title': 'Välkommen till vårt bröllop',
    'password.subtitle': 'För att se mer detaljerad information behöver du ange lösenordet',
    'password.placeholder': 'Ange lösenord',
    'password.error': 'Fel lösenord. Försök igen.',
    'password.submit': 'Fortsätt',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.info': 'Good to Know',
    'nav.travel': 'Travel',
    'nav.timeline': 'Wedding Weekend',
    'nav.rsvp': 'RSVP',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.subtitle': 'We\'re getting married!',
    
    // Countdown
    'countdown.title': 'Countdown to our wedding',
    'countdown.subtitle': 'We\'re counting down the days until we get to celebrate with you!',
    'countdown.days': 'Days',
    'countdown.hours': 'Hours',
    'countdown.minutes': 'Minutes',
    'countdown.seconds': 'Seconds',
    
    // Travel Info
    'travel.title': 'Travel Information',
    'travel.subtitle': 'All essential information for your journey to our wedding',
    'travel.findus.title': 'How to Get Here',
    'travel.findus.address': 'Nybynäs Gård, KÄRRBO NYBY 1, 725 97 Västerås',
    'travel.findus.distance': 'About 20 minutes from Västerås city center by car.',
    'travel.findus.transport': 'Buses will pick up and drop off at Steam Hotel and Elite Stadshotellet. See the schedule for departure times.',
    'travel.findus.parking': 'Free parking is available at Nybynäsgård.',
    'travel.findus.link': 'Open in Google Maps',
    'travel.accommodation.title': 'Accommodation',
    'travel.accommodation.content': 'We recommend hotels in Västerås city center. Steam Hotel and Elite Stadshotellet Västerås are both excellent options.',
    'travel.weekend.title': 'Weekend Tips',
    'travel.weekend.content': 'For those staying longer, we recommend exploring Västerås old town, Anundshög, and the beautiful shores of Lake Mälaren.',
    
    // Timeline
    'timeline.header': 'Wedding Weekend',
    'timeline.title': 'Weekend Schedule',
    'timeline.subtitle': 'Here you\'ll find everything happening during our wedding weekend',
    // Friday events
    'timeline.friday.day': 'Friday',
    'timeline.friday.event': 'welcome mingle',
    'timeline.friday.title': 'Friday - Meet & Greet',
    'timeline.friday.time': 'On Friday evening, we kick off the wedding weekend with a welcome mingle at Nybynäs Gård.',
    'timeline.friday.location': 'A relaxed evening focused on socializing, mingling, and letting everyone get to know each other.',
    'timeline.friday.food': 'We will serve food and drinks and hope to be outdoors if the weather allows.',
    'timeline.friday.end': '',
    'timeline.friday.description': 'A relaxed mingle with drinks and light bites. A perfect chance to meet other guests before the big day.',
    'timeline.friday.bus.title': 'Bus to hotels',
    'timeline.friday.bus.time': '11:00 PM',
    'timeline.friday.bus.description': 'Transport to the hotels.',
    // Saturday events
    'timeline.saturday.day': 'Saturday',
    'timeline.saturday.bus.title': 'Bus departure from hotels',
    'timeline.saturday.bus.time': '1:00 PM',
    'timeline.saturday.bus.description': 'Bus departs from the hotels.',
    'timeline.saturday.mingel.title': 'Champagne reception',
    'timeline.saturday.mingel.time': '1:30–2:00 PM',
    'timeline.saturday.mingel.description': 'Welcome reception with champagne.',
    'timeline.saturday.ceremony.title': 'Ceremony',
    'timeline.saturday.ceremony.time': '3:00 PM',
    'timeline.saturday.ceremony.description': 'We gather at Nybynäs gård for welcome drinks before the ceremony where we say yes to each other.',
    'timeline.saturday.mingel2.title': 'Reception',
    'timeline.saturday.mingel2.time': '4:00 PM',
    'timeline.saturday.mingel2.description': 'More champagne and canapés.',
    'timeline.dinner.title': 'Dinner',
    'timeline.dinner.time': '6:00 PM',
    'timeline.dinner.description': 'We continue the wedding day with a seated dinner inside the Magasinet.',
    'timeline.dancing.title': 'Dancing & Music',
    'timeline.dancing.time': '10:00 PM',
    'timeline.dancing.description': 'After dinner, we continue the celebration on the dance floor with music and drinks.',
    'timeline.saturday.busend.title': 'Bus departure',
    'timeline.saturday.busend.time': '1:30 AM',
    'timeline.saturday.busend.description': 'Transport back to the hotels.',
    // Timeline card titles
    'timeline.and': 'and',
    'timeline.card1.part1': 'WELCOME DRINKS',
    'timeline.card1.part2': 'CEREMONY',
    'timeline.card2.part1': 'DINNER',
    'timeline.card2.part2': 'PARTY',
    'timeline.card3.part1': 'DRINKS',
    'timeline.card3.part2': 'DANCING',
    'timeline.friday.subtitle': 'welcome mingle',
    
    // RSVP
    'rsvp.title': 'RSVP',
    'rsvp.subtitle': 'Please reply no later than [Date]',
    'rsvp.attending': 'Will you attend?',
    'rsvp.attending.yes': 'Yes, I\'ll be there!',
    'rsvp.attending.no': 'No, I unfortunately can\'t make it',
    'rsvp.names': 'Name(s)',
    'rsvp.names.placeholder': 'Your name',
    'rsvp.plusOne.name.placeholder': 'Your partner\'s name',
    'rsvp.email': 'Email',
    'rsvp.email.placeholder': 'your@email.com',
    'rsvp.plusOne': 'Are you bringing a plus one?',
    'rsvp.dietary': 'Allergies/Dietary Requirements',
    'rsvp.dietary.placeholder': 'Please let us know about any allergies or dietary requirements...',
    'rsvp.meal': 'Meal Choice',
    'rsvp.meal.meat': 'Meat',
    'rsvp.meal.fish': 'Fish',
    'rsvp.meal.vegetarian': 'Vegetarian',
    'rsvp.meal.vegan': 'Vegan',
    'rsvp.shuttle': 'Would you like to take the shuttle bus?',
    'rsvp.shuttle.both': 'Yes, round trip',
    'rsvp.shuttle.to': 'Only there',
    'rsvp.shuttle.from': 'Only back',
    'rsvp.shuttle.no': 'No thank you',
    'rsvp.song': 'Song Request',
    'rsvp.song.placeholder': 'Which song would you like to hear at the party?',
    'rsvp.message': 'Message to us',
    'rsvp.message.placeholder': 'Write a message to us...',
    'rsvp.submit': 'Send RSVP',
    'rsvp.days': 'Which days will you attend?',
    'rsvp.days.both': 'Both Friday and Saturday',
    'rsvp.days.saturday': 'Saturday only',
    'rsvp.success': 'Thank you! Your response has been saved. We will send you details as the wedding approaches.',
    'rsvp.error': 'Please fill in all required fields.',
    'rsvp.required': 'This field is required',
    'rsvp.email.invalid': 'Please enter a valid email address',
    
    // Wedding Details
    'details.title': 'Good to Know',
    'details.subtitle': 'Here\'s all the practical information to make your day as great as possible',
    'details.children.title': 'Children',
    'details.children.content': 'We would like you to enjoy the day without everyday responsibilities, so the wedding is adults-only. Breastfeeding infants are of course welcome.',
    'details.hashtag.title': 'Hashtag',
    'details.hashtag.content': '#FalkKiani2026 - Please share your photos!',
    'details.gifts.title': 'Wedding Wishes',
    'details.gifts.content': 'The most important thing is that you come and celebrate with us. If you wish to give a gift, we would appreciate a contribution to our honeymoon.',
    'details.venue.title': 'Indoor / Outdoor',
    'details.venue.content': 'The ceremony will be held outdoors in the apple orchard (weather permitting). Dinner and party will be indoors in the Magasinet.',
    'details.photos.title': 'Photos after the wedding',
    'details.photos.content': 'After the wedding, we will collect all photos here so you can download them and relive the day with us.',
    'details.dresscode.title': 'Dress Code',
    'details.dresscode.friday.title': 'Friday',
    'details.dresscode.friday.content': 'Cocktail / festive attire. Evenings can be chilly – feel free to bring a light layer.',
    'details.dresscode.saturday.title': 'Saturday',
    'details.dresscode.saturday.content': 'Dark suit (tuxedo welcome)',
    'details.dresscode.women': 'Guide for women (Swedish)',
    'details.dresscode.men': 'Guide for men (Swedish)',
    
    // Toastmasters
    'toastmasters.title': 'Toastmasters',
    'toastmasters.names': 'Dennis & Jiezzah Lindahl',
    'toastmasters.bio': 'We are proud to present our toastmasters, Dennis and Jiezzah Lindahl. They have known the groom for almost 30 years and met us early in our relationship. Since then, we have shared many memories together, from midsummer celebrations and New Year\'s Eves to concerts and long nights of laughter. With their warmth, humor, and sense of timing, they are the perfect duo to guide us through the celebrations.',
    'toastmasters.cta': 'Would you like to give a speech or surprise the couple? Get in touch!',
    'toastmasters.email': 'toastmasters.falkkiani@gmail.com',
    
    // Accommodation details
    'accommodation.steam.description': 'Design hotel by Lake Mälaren with spa.',
    'accommodation.steam.discount': '10% discount for wedding guests',
    'accommodation.steam.code': 'Use code: bröllop2026',
    'accommodation.steam.pricing': 'Prices are dynamic and vary.',
    'accommodation.elite.description': 'Classic city hotel in central Västerås.',
    'accommodation.elite.booking': 'Call or email and mention "Bröllop Josefin & Kiarash"',
    'accommodation.elite.pricing': 'Double room 1,350 SEK/night • Single room 1,150 SEK/night',
    
    // Contact
    'contact.title': 'Contact',
    'contact.message': 'We look forward to celebrating with you! If you have any questions, please don\'t hesitate to reach out to us.',
    'contact.regards': 'With love,',
    'contact.names': 'Josefin & Kiarash',
    
    // Password Gate
    'password.title': 'Welcome to our wedding',
    'password.subtitle': 'To see more detailed information, please enter the password',
    'password.placeholder': 'Enter password',
    'password.error': 'Wrong password. Please try again.',
    'password.submit': 'Continue',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.info': 'Gut zu wissen',
    'nav.travel': 'Anreise',
    'nav.timeline': 'Hochzeitswochenende',
    'nav.rsvp': 'RSVP',
    'nav.contact': 'Kontakt',
    
    // Hero
    'hero.subtitle': 'Wir heiraten!',
    
    // Countdown
    'countdown.title': 'Countdown zu unserer Hochzeit',
    'countdown.subtitle': 'Wir zählen die Tage, bis wir mit euch feiern können!',
    'countdown.days': 'Tage',
    'countdown.hours': 'Stunden',
    'countdown.minutes': 'Minuten',
    'countdown.seconds': 'Sekunden',
    
    // Travel Info
    'travel.title': 'Anreiseinformationen',
    'travel.subtitle': 'Alle wichtigen Informationen für eure Reise zu unserer Hochzeit',
    'travel.findus.title': 'Anfahrt',
    'travel.findus.address': 'Nybynäs Gård, KÄRRBO NYBY 1, 725 97 Västerås',
    'travel.findus.distance': 'Etwa 20 Minuten vom Stadtzentrum Västerås mit dem Auto.',
    'travel.findus.transport': 'Busse holen ab und bringen zurück zum Steam Hotel und Elite Stadshotellet. Abfahrtszeiten siehe Programm.',
    'travel.findus.parking': 'Kostenlose Parkplätze sind bei Nybynäsgård vorhanden.',
    'travel.findus.link': 'In Google Maps öffnen',
    'travel.accommodation.title': 'Unterkunft',
    'travel.accommodation.content': 'Wir empfehlen Hotels im Stadtzentrum von Västerås. Das Steam Hotel und das Elite Stadshotellet Västerås sind beide ausgezeichnete Optionen.',
    'travel.weekend.title': 'Wochenendtipps',
    'travel.weekend.content': 'Für diejenigen, die länger bleiben, empfehlen wir die Altstadt von Västerås, Anundshög und die wunderschönen Strände am Mälaren-See zu erkunden.',
    
    // Timeline
    'timeline.header': 'Hochzeitswochenende',
    'timeline.title': 'Wochenendprogramm',
    'timeline.subtitle': 'Hier findet ihr alles, was während unseres Hochzeitswochenendes passiert',
    // Friday events
    'timeline.friday.day': 'Freitag',
    'timeline.friday.event': 'Willkommenstreffen',
    'timeline.friday.title': 'Freitag - Meet & Greet',
    'timeline.friday.time': 'Am Freitagabend starten wir das Hochzeitswochenende mit einem Willkommenstreffen auf Nybynäs Gård.',
    'timeline.friday.location': 'Ein entspannter Abend zum Plaudern, Kennenlernen und gemeinsamen Beisammensein.',
    'timeline.friday.food': 'Wir bieten Essen und Getränke an und hoffen, bei gutem Wetter draußen sein zu können.',
    'timeline.friday.end': '',
    'timeline.friday.description': 'Ein entspanntes Beisammensein mit Drinks und kleinen Häppchen. Eine perfekte Gelegenheit, andere Gäste vor dem großen Tag kennenzulernen.',
    'timeline.friday.bus.title': 'Bus zu den Hotels',
    'timeline.friday.bus.time': '23:00 Uhr',
    'timeline.friday.bus.description': 'Transport zu den Hotels.',
    // Saturday events
    'timeline.saturday.day': 'Samstag',
    'timeline.saturday.bus.title': 'Busabfahrt von den Hotels',
    'timeline.saturday.bus.time': '13:00 Uhr',
    'timeline.saturday.bus.description': 'Der Bus fährt von den Hotels ab.',
    'timeline.saturday.mingel.title': 'Champagnerempfang',
    'timeline.saturday.mingel.time': '13:30–14:00 Uhr',
    'timeline.saturday.mingel.description': 'Willkommensempfang mit Champagner.',
    'timeline.saturday.ceremony.title': 'Trauung',
    'timeline.saturday.ceremony.time': '15:00 Uhr',
    'timeline.saturday.ceremony.description': 'Wir versammeln uns auf Nybynäs gård zum Willkommensdrink, bevor die Trauung beginnt, bei der wir uns das Ja-Wort geben.',
    'timeline.saturday.mingel2.title': 'Empfang',
    'timeline.saturday.mingel2.time': '16:00 Uhr',
    'timeline.saturday.mingel2.description': 'Mehr Champagner und Häppchen.',
    'timeline.dinner.title': 'Abendessen',
    'timeline.dinner.time': '18:00 Uhr',
    'timeline.dinner.description': 'Wir setzen den Hochzeitstag mit einem festlichen Abendessen im Magasinet fort.',
    'timeline.dancing.title': 'Tanz & Musik',
    'timeline.dancing.time': '22:00 Uhr',
    'timeline.dancing.description': 'Nach dem Abendessen feiern wir weiter auf der Tanzfläche mit Musik und Drinks.',
    'timeline.saturday.busend.title': 'Busabfahrt',
    'timeline.saturday.busend.time': '01:30 Uhr',
    'timeline.saturday.busend.description': 'Transport zurück zu den Hotels.',
    // Timeline card titles
    'timeline.and': 'und',
    'timeline.card1.part1': 'EMPFANG',
    'timeline.card1.part2': 'TRAUUNG',
    'timeline.card2.part1': 'ABENDESSEN',
    'timeline.card2.part2': 'PARTY',
    'timeline.card3.part1': 'GETRÄNKE',
    'timeline.card3.part2': 'TANZ',
    'timeline.friday.subtitle': 'Willkommenstreffen',
    
    // RSVP
    'rsvp.title': 'Rückmeldung',
    'rsvp.subtitle': 'Bitte antwortet bis spätestens [Datum]',
    'rsvp.attending': 'Werdet ihr dabei sein?',
    'rsvp.attending.yes': 'Ja, ich bin dabei!',
    'rsvp.attending.no': 'Nein, ich kann leider nicht kommen',
    'rsvp.names': 'Name(n)',
    'rsvp.names.placeholder': 'Dein Name',
    'rsvp.plusOne.name.placeholder': 'Name deines Partners',
    'rsvp.email': 'E-Mail',
    'rsvp.email.placeholder': 'deine@email.de',
    'rsvp.plusOne': 'Bringst du eine Begleitung mit?',
    'rsvp.dietary': 'Allergien/Ernährungsanforderungen',
    'rsvp.dietary.placeholder': 'Bitte teile uns eventuelle Allergien oder besondere Ernährungsanforderungen mit...',
    'rsvp.meal': 'Menüwahl',
    'rsvp.meal.meat': 'Fleisch',
    'rsvp.meal.fish': 'Fisch',
    'rsvp.meal.vegetarian': 'Vegetarisch',
    'rsvp.meal.vegan': 'Vegan',
    'rsvp.shuttle': 'Möchtest du den Shuttle-Bus nutzen?',
    'rsvp.shuttle.both': 'Ja, Hin- und Rückfahrt',
    'rsvp.shuttle.to': 'Nur Hinfahrt',
    'rsvp.shuttle.from': 'Nur Rückfahrt',
    'rsvp.shuttle.no': 'Nein danke',
    'rsvp.song': 'Musikwunsch',
    'rsvp.song.placeholder': 'Welches Lied möchtest du auf der Party hören?',
    'rsvp.message': 'Nachricht an uns',
    'rsvp.message.placeholder': 'Schreibe uns eine Nachricht...',
    'rsvp.submit': 'Rückmeldung senden',
    'rsvp.days': 'An welchen Tagen nimmst du teil?',
    'rsvp.days.both': 'Freitag und Samstag',
    'rsvp.days.saturday': 'Nur Samstag',
    'rsvp.success': 'Vielen Dank! Deine Antwort wurde gespeichert. Wir senden dir weitere Details, wenn die Hochzeit näher rückt.',
    'rsvp.error': 'Bitte fülle alle Pflichtfelder aus.',
    'rsvp.required': 'Dieses Feld ist erforderlich',
    'rsvp.email.invalid': 'Bitte gib eine gültige E-Mail-Adresse ein',
    
    // Wedding Details
    'details.title': 'Gut zu wissen',
    'details.subtitle': 'Hier sind alle praktischen Informationen, um euren Tag so schön wie möglich zu gestalten',
    'details.children.title': 'Kinder',
    'details.children.content': 'Wir möchten, dass ihr den Tag ohne Alltagsverantwortung genießen könnt, daher ist die Hochzeit nur für Erwachsene. Stillende Säuglinge sind natürlich willkommen.',
    'details.hashtag.title': 'Hashtag',
    'details.hashtag.content': '#FalkKiani2026 - Teilt gerne eure Fotos!',
    'details.gifts.title': 'Hochzeitswünsche',
    'details.gifts.content': 'Das Wichtigste für uns ist, dass ihr kommt und mit uns feiert. Wenn ihr dennoch ein Geschenk machen möchtet, freuen wir uns über einen Beitrag zu unseren Flitterwochen.',
    'details.venue.title': 'Drinnen / Draußen',
    'details.venue.content': 'Die Trauung findet im Apfelgarten im Freien statt (bei gutem Wetter). Abendessen und Feier finden drinnen im Magasinet statt.',
    'details.photos.title': 'Fotos nach der Hochzeit',
    'details.photos.content': 'Nach der Hochzeit werden wir hier alle Fotos sammeln, damit ihr sie herunterladen und den Tag mit uns noch einmal erleben könnt.',
    'details.dresscode.title': 'Dresscode',
    'details.dresscode.friday.title': 'Freitag',
    'details.dresscode.friday.content': 'Festlich elegant. Abende können kühl werden – bringt gerne eine leichte Jacke mit.',
    'details.dresscode.saturday.title': 'Samstag',
    'details.dresscode.saturday.content': 'Dunkler Anzug (Smoking willkommen)',
    'details.dresscode.women': 'Hinweise für Damen',
    'details.dresscode.men': 'Hinweise für Herren',
    
    // Toastmasters
    'toastmasters.title': 'Toastmasters',
    'toastmasters.names': 'Dennis & Jiezzah Lindahl',
    'toastmasters.bio': 'Wir präsentieren stolz unsere Toastmasters, Dennis und Jiezzah Lindahl. Sie kennen den Bräutigam seit fast 30 Jahren und haben uns früh in unserer Beziehung kennengelernt. Seitdem haben wir viele Erinnerungen geteilt, von Mittsommerfeiern und Silvesterabenden bis zu Konzerten und langen Nächten voller Gelächter. Mit ihrer Wärme, ihrem Humor und ihrem Timing sind sie das perfekte Duo, um uns durch die Feierlichkeiten zu führen.',
    'toastmasters.cta': 'Möchtest du eine Rede halten oder das Brautpaar überraschen? Kontaktiere uns!',
    'toastmasters.email': 'toastmasters.falkkiani@gmail.com',
    
    // Accommodation details
    'accommodation.steam.description': 'Designhotel am Mälaren-See mit Spa.',
    'accommodation.steam.discount': '10% Rabatt für Hochzeitsgäste',
    'accommodation.steam.code': 'Code verwenden: bröllop2026',
    'accommodation.steam.pricing': 'Preise sind dynamisch und variieren.',
    'accommodation.elite.description': 'Klassisches Stadthotel im Zentrum von Västerås.',
    'accommodation.elite.booking': 'Anrufen oder per E-Mail mit Nennung von "Bröllop Josefin & Kiarash"',
    'accommodation.elite.pricing': 'Doppelzimmer 1.350 SEK/Nacht • Einzelzimmer 1.150 SEK/Nacht',
    
    // Contact
    'contact.title': 'Kontakt',
    'contact.message': 'Wir freuen uns darauf, mit euch zu feiern! Bei Fragen könnt ihr euch jederzeit an uns wenden.',
    'contact.regards': 'Mit Liebe,',
    'contact.names': 'Josefin & Kiarash',
    
    // Password Gate
    'password.title': 'Willkommen zu unserer Hochzeit',
    'password.subtitle': 'Um weitere Informationen zu sehen, gib bitte das Passwort ein',
    'password.placeholder': 'Passwort eingeben',
    'password.error': 'Falsches Passwort. Bitte versuche es erneut.',
    'password.submit': 'Weiter',
  }
};

const getInitialLanguage = (): Language => {
  // Check if user has a saved preference
  const saved = localStorage.getItem('wedding-language') as Language | null;
  if (saved && ['sv', 'en', 'de'].includes(saved)) {
    return saved;
  }
  
  // Detect from browser language
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith('de')) {
    return 'de';
  }
  if (browserLang.startsWith('en')) {
    return 'en';
  }
  // Default to Swedish
  return 'sv';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    localStorage.setItem('wedding-language', lang);
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};