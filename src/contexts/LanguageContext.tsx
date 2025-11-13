import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'sv' | 'en';

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
    'nav.info': 'Information',
    'nav.travel': 'Resa',
    'nav.timeline': 'Schema',
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
    'travel.transport.title': 'Transport',
    'travel.transport.content': 'Pendlingsbussar kommer att köra mellan Västerås centrum och Nybynäsgård. Mer information kommer snart!',
    'travel.accommodation.title': 'Boende',
    'travel.accommodation.content': 'Vi rekommenderar hotell i Västerås centrum. Steam Hotel och Elite Stadshotellet Västerås är båda utmärkta alternativ.',
    'travel.directions.title': 'Vägbeskrivning',
    'travel.directions.content': 'Nybynäs Gård, KÄRRBO NYBY 1, 725 97 Västerås. Cirka 20 minuter från Västerås centrum med bil.',
    'travel.weekend.title': 'Helgtips',
    'travel.weekend.content': 'För er som stannar längre rekommenderar vi att utforska Västerås gamla stad, Anundshög och de vackra stränderna vid Mälaren.',
    
    // Timeline
    'timeline.title': 'Schema för helgen',
    'timeline.subtitle': 'Här är vad som händer under våra bröllopsdagar',
    'timeline.friday.title': 'Fredag - Mingel',
    'timeline.friday.time': '18:00',
    'timeline.friday.description': 'Avslappnat mingel med drinkar och lätta tilltugg. En perfekt chans att träffa andra gäster innan den stora dagen.',
    'timeline.saturday.title': 'Lördag - Vigsel',
    'timeline.saturday.time': '15:00',
    'timeline.saturday.description': 'Vigselceremonin hålls i den vackra äppellunden på Nybynäsgård.',
    'timeline.dinner.title': 'Middag & Fest',
    'timeline.dinner.time': '17:00',
    'timeline.dinner.description': 'Bröllopsmiddag följt av dans och fest till sent på kvällen.',
    'timeline.dancing.title': 'Dans & Musik',
    'timeline.dancing.time': '21:00',
    'timeline.dancing.description': 'DJ och dansgolv öppet. Kom och dansa natten lång!',
    
    // RSVP
    'rsvp.title': 'OSA',
    'rsvp.subtitle': 'Vänligen svara senast [Datum]',
    'rsvp.attending': 'Kommer du?',
    'rsvp.attending.yes': 'Ja, jag kommer!',
    'rsvp.attending.no': 'Nej, jag kan tyvärr inte komma',
    'rsvp.names': 'Namn',
    'rsvp.names.placeholder': 'Ditt namn (och din partners namn om tillämpligt)',
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
    'rsvp.success': 'Tack! Ditt svar har sparats. Vi skickar mer information när bröllopet närmar sig.',
    'rsvp.error': 'Vänligen fyll i alla obligatoriska fält.',
    'rsvp.required': 'Detta fält är obligatoriskt',
    'rsvp.email.invalid': 'Vänligen ange en giltig e-postadress',
    
    // Wedding Details
    'details.title': 'Bra att veta',
    'details.subtitle': 'Här är all praktisk information för att göra er dag så bra som möjlig',
    'details.parking.title': 'Parkering',
    'details.parking.content': 'Gratis parkering finns vid Nybynäsgård',
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
    'details.dresscode.friday.title': 'Fredag – Festfint',
    'details.dresscode.friday.content': 'Festfint. Kvällarna kan bli svala – ta gärna med en extra tröja eller sjal.',
    'details.dresscode.saturday.title': 'Lördag – Mörk kostym (smoking går såklart bra)',
    'details.dresscode.women': 'Beskrivning för kvinnor',
    'details.dresscode.men': 'Beskrivning för män',
    
    // Contact
    'contact.title': 'Kontakt',
    'contact.message': 'Vi ser fram emot att fira med er! Har ni några frågor är ni alltid välkomna att höra av er till oss.',
    'contact.regards': 'Med kärlek,',
    'contact.names': 'Josefin & Kiarash',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.info': 'Information',
    'nav.travel': 'Travel',
    'nav.timeline': 'Schedule',
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
    'travel.transport.title': 'Transport',
    'travel.transport.content': 'Round-trip buses will run between Västerås city center and Nybynäs Gård. More information coming soon!',
    'travel.accommodation.title': 'Accommodation',
    'travel.accommodation.content': 'We recommend hotels in Västerås city center. Steam Hotel and Elite Stadshotellet Västerås are both excellent options.',
    'travel.directions.title': 'Directions',
    'travel.directions.content': 'Nybynäs Gård, KÄRRBO NYBY 1, 725 97 Västerås. About 20 minutes from Västerås city center by car.',
    'travel.weekend.title': 'Weekend Tips',
    'travel.weekend.content': 'For those staying longer, we recommend exploring Västerås old town, Anundshög, and the beautiful shores of Lake Mälaren.',
    
    // Timeline
    'timeline.title': 'Weekend Schedule',
    'timeline.subtitle': 'Here\'s what\'s happening during our wedding days',
    'timeline.friday.title': 'Friday - Meet & Greet',
    'timeline.friday.time': '6:00 PM',
    'timeline.friday.description': 'Relaxed meet and greet with drinks and light bites. A perfect chance to meet other guests before the big day.',
    'timeline.saturday.title': 'Saturday - Ceremony',
    'timeline.saturday.time': '3:00 PM',
    'timeline.saturday.description': 'The wedding ceremony will be held in the beautiful apple orchard at Nybynäs Gård.',
    'timeline.dinner.title': 'Dinner & Party',
    'timeline.dinner.time': '5:00 PM',
    'timeline.dinner.description': 'Wedding dinner followed by dancing and celebration late into the evening.',
    'timeline.dancing.title': 'Dancing & Music',
    'timeline.dancing.time': '9:00 PM',
    'timeline.dancing.description': 'DJ and dance floor open. Come and dance the night away!',
    
    // RSVP
    'rsvp.title': 'RSVP',
    'rsvp.subtitle': 'Please reply no later than [Date]',
    'rsvp.attending': 'Will you attend?',
    'rsvp.attending.yes': 'Yes, I\'ll be there!',
    'rsvp.attending.no': 'No, I unfortunately can\'t make it',
    'rsvp.names': 'Name(s)',
    'rsvp.names.placeholder': 'Your name (and your partner\'s name if applicable)',
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
    'rsvp.success': 'Thank you! Your response has been saved. We will send you details as the wedding approaches.',
    'rsvp.error': 'Please fill in all required fields.',
    'rsvp.required': 'This field is required',
    'rsvp.email.invalid': 'Please enter a valid email address',
    
    // Wedding Details
    'details.title': 'Good to Know',
    'details.subtitle': 'Here\'s all the practical information to make your day as great as possible',
    'details.parking.title': 'Parking',
    'details.parking.content': 'Free parking is available at Nybynäsgård',
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
    'details.dresscode.friday.title': 'Friday – Cocktail / Festive Attire',
    'details.dresscode.friday.content': 'Cocktail / festive attire. Evenings can be chilly – feel free to bring a light layer.',
    'details.dresscode.saturday.title': 'Saturday – Dark Suit (Tuxedo Welcome)',
    'details.dresscode.women': 'Guide for women (Swedish)',
    'details.dresscode.men': 'Guide for men (Swedish)',
    
    // Contact
    'contact.title': 'Contact',
    'contact.message': 'We look forward to celebrating with you! If you have any questions, please don\'t hesitate to reach out to us.',
    'contact.regards': 'With love,',
    'contact.names': 'Josefin & Kiarash',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('sv');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};