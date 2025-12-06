// $lib/constants/pageDetailsConfig.js

import {
    excursions_page,
    cars_page,
    yachts_page,
    transfers_page,
    blogs_page,
    places_page,
} from "$lib/i18n/product_details_page";
import { currentYear } from "$lib/constants/date";

export const seo = {
    home: {
        ru: {
            list: {
                title: "Отдых в Кемере — экскурсии, аренда яхт и авто, трансфер",
                description:
                    "Все для комфортного отдыха в Кемере: экскурсии, аренда яхт и автомобилей, трансферы. Лучшие цены, онлайн-бронирование без предоплаты и проверенные организаторы.",
                keywords:
                    "отдых в кемере, экскурсии в кемере, аренда яхт кемер, аренда авто кемер, трансфер кемер, кемер туры, кемер прокат машин",
                twitter:
                    "Все для идеального отдыха в Кемере — экскурсии, аренда яхт и авто, трансферы без переплат.",
            },
            item: {
                title: "{{name}} — Экскурсии в Кемере",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
        en: {
            list: {
                title: "Vacation in Kemer — Excursions, Yacht & Car Rentals, Transfers",
                description:
                    "Everything for a comfortable vacation in Kemer: excursions, yacht and car rentals, transfers. Best prices, online booking with no prepayment, and trusted organizers.",
                keywords:
                    "vacation in Kemer, excursions in Kemer, yacht rental Kemer, car rental Kemer, transfer Kemer, Kemer tours, Kemer car hire",
                twitter:
                    "Everything for the perfect vacation in Kemer — excursions, yacht & car rentals, transfers with no extra fees.",
            },
            item: {
                title: "{{name}} — Excursion in Kemer",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
        tr: {
            list: {
                title: "Kemer'de Tatil — Turlar, Yat & Araç Kiralama, Transferler",
                description:
                    "Kemer'de konforlu bir tatil için her şey: turlar, yat ve araç kiralama, transferler. En iyi fiyatlar, ön ödemesiz çevrimiçi rezervasyon ve güvenilir organizatörler.",
                keywords:
                    "Kemer'de tatil, Kemer'de turlar, Kemer yat kiralama, Kemer araç kiralama, Kemer transfer, Kemer turları, Kemer araç kiralama",
                twitter:
                    "Kemer'de mükemmel bir tatil için her şey — turlar, yat & araç kiralama, transferler, aracısız.",
            },
            item: {
                title: "{{name}} — Excursion in Kemer",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
    },
    about: {
        ru: {
            list: {
                title: "О нас — кем мы являемся и зачем мы это делаем",
                description:
                    "Мы помогаем туристам находить лучшие экскурсии, трансферы и аренду в Кемере. Без комиссий и предоплат. Работаем напрямую с местными гидами.",
                keywords: "о нас, Кемер, экскурсии, аренда, трансферы, гиды",
                twitter:
                    "Почему туристы выбирают нас — честно, прозрачно и без переплат.",
            },
            item: {
                title: "{{name}} — Экскурсии в Кемере",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
        en: {
            list: {
                title: "About us — who we are and why we do this",
                description:
                    "We help travelers find the best excursions, transfers and rentals in Kemer. No commission, no prepayment. Direct cooperation with locals.",
                keywords:
                    "about us, Kemer, excursions, rental, transfers, guides",
                twitter:
                    "Why travelers choose us — honest, transparent, no extra fees.",
            },
            item: {
                title: "{{name}} — Excursion in Kemer",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
        tr: {
            list: {
                title: "Hakkımızda — kimiz ve neden bunu yapıyoruz",
                description:
                    "Kemer'de en iyi turları, transferleri ve kiralama hizmetlerini bulmanıza yardımcı oluyoruz. Komisyonsuz, ön ödemesiz. Yerel ortaklarla çalışıyoruz.",
                keywords:
                    "hakkımızda, Kemer, turlar, kiralama, transfer, rehberler",
                twitter: "Neden bizi seçiyorlar? Şeffaf ve güvenilir hizmet.",
            },
            item: {
                title: "{{name}} — Excursion in Kemer",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
    },
    excursions: {
        ru: {
            list: {
                title: `Экскурсии в Кемере ${currentYear} — экскурсии Кемер и экскурсии из Кемера`,
                description: `Экскурсии из Кемера (Анталия) ${currentYear} — идеальный способ открыть Турцию. Забронируйте экскурсии из Кемера с гарантией лучшей цены, удобным онлайн-бронированием без предоплаты и проверенными организаторами. Живописные бухты, горы, водопады и древние руины ждут вас.`,
                keywords:
                    "экскурсии, экскурсии в кемере, экскурсии кемер, кемер экскурсии, экскурсии анталия, экскурсии в турции, экскурсии из кемера",
            },
            item: {
                title: "{{name}} — Экскурсии в Кемере",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
        en: {
            list: {
                title: `Excursions in Kemer ${currentYear} — Kemer excursions and excursions from Kemer`,
                description: `Excursions from Kemer (Antalya) ${currentYear} — the perfect way to discover Turkey. Book excursions from Kemer with the best price guarantee, convenient online booking with no prepayment, and trusted organizers. Picturesque bays, mountains, waterfalls, and ancient ruins await you.`,
                keywords:
                    "excursions, excursions in Kemer, Kemer excursions, excursions from Kemer, Antalya excursions, excursions in Turkey, trips from Kemer",
            },
            item: {
                title: "{{title}} — Excursion in Kemer",
                description: "{{metaDescription}}",
                alt: "Excursion photo - {{title}}",
            },
        },
        tr: {
            list: {
                title: `Kemer ${currentYear} Turlar ve Geziler — Kemer Turları ve Kemer'den Geziler`,
                description: `Kemer'den (${currentYear}) Antalya turları — Türkiye'yi keşfetmenin mükemmel yolu. Kemer'den turları en iyi fiyat garantisi, ön ödemesiz çevrimiçi rezervasyon ve güvenilir organizatörlerle rezerve edin. Görkemli koylar, dağlar, şelaleler ve antik kalıntılar sizi bekliyor.`,
                keywords:
                    "turlar, Kemer turları, Kemer gezileri, Kemer'den turlar, Antalya turları, Türkiye turları, Kemer'den geziler",
            },
            item: {
                title: "{{name}} — Excursion in Kemer",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
    },
    yachts: {
        ru: {
            list: {
                title: `Аренда яхт в Кемере ${currentYear} — яхты, лодки и морские прогулки`,
                description: `Аренда яхт и катеров в Кемере ${currentYear}. Прогулки по бухтам, рыбалка и индивидуальные туры с капитаном. Комфортабельные яхты, честные цены без посредников и онлайн-бронирование без предоплаты.`,
                keywords:
                    "аренда яхт в кемере, яхты в кемере, морская прогулка кемер, аренда лодки в кемере, прогулка на яхте кемер, частная яхта кемер, прокат яхт кемер",
            },
            item: {
                title: "{{name}} — Экскурсии в Кемере",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
        en: {
            list: {
                title: `Yacht Rental in Kemer ${currentYear} — Yachts, Boats & Sea Trips`,
                description: `Yacht and boat rental in Kemer ${currentYear}. Cruises to scenic bays, fishing trips, and private tours with a skipper. Comfortable yachts, fair prices without intermediaries, and online booking with no prepayment.`,
                keywords:
                    "yacht rental in Kemer, yachts in Kemer, boat trip Kemer, boat hire in Kemer, private yacht Kemer, rent a yacht Kemer, Kemer yacht charter",
            },
            item: {
                title: "{{name}} — Excursion in Kemer",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
        tr: {
            list: {
                title: `Kemer'de Yat Kiralama ${currentYear} — Yatlar, Tekneler ve Deniz Turları`,
                description: `Kemer'de ${currentYear} yat ve tekne kiralama. Koylara geziler, balık tutma turları ve kaptanlı özel rotalar. Konforlu yatlar, aracısız uygun fiyatlar ve ön ödemesiz online rezervasyon.`,
                keywords:
                    "Kemer'de yat kiralama, Kemer yatları, Kemer tekne turu, Kemer tekne kiralama, özel yat Kemer, Kemer yat turu, Kemer yat kiralama fiyatları",
            },
            item: {
                title: "{{name}} — Excursion in Kemer",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
    },
    cars: {
        ru: {
            list: {
                title: `Аренда авто в Кемере ${currentYear} — прокат автомобилей без посредников`,
                description: `Аренда авто в Кемере ${currentYear} без предоплаты. Новые автомобили, честные цены и удобное бронирование онлайн. Прокат машин для отдыха и путешествий по Турции.`,
                keywords:
                    "аренда авто кемер, аренда автомобиля в кемере, аренда машин кемер, прокат авто кемер, прокат машин кемер, машина в аренду кемер, взять авто в аренду кемер, аренда авто без водителя кемер, аренда авто турция кемер",
            },
            item: {
                title: "{{name}} — Экскурсии в Кемере",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
        en: {
            list: {
                title: `Car Rental in Kemer ${currentYear} — Rent a Car Without Intermediaries`,
                description: `Car rental in Kemer ${currentYear} with no prepayment. New cars, fair prices, and easy online booking. Rent a car for holidays and trips across Turkey.`,
                keywords:
                    "car rental Kemer, rent a car Kemer, car hire Kemer, cheap car rental Kemer, car rental Turkey Kemer, car hire without driver Kemer, Kemer car rental prices, rent car Kemer Turkey",
            },
            item: {
                title: "{{name}} — Excursion in Kemer",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
        tr: {
            list: {
                title: `Kemer'de Araç Kiralama ${currentYear} — Aracısız Uygun Fiyatlar`,
                description: `Kemer'de ${currentYear} araç kiralama. Ön ödeme yok, yeni araçlar, şeffaf fiyatlar ve kolay online rezervasyon. Tatil ve Türkiye’deki geziler için araç kiralama.`,
                keywords:
                    "Kemer araç kiralama, Kemer rent a car, Kemer araba kiralama, ucuz araç kiralama Kemer, Kemer araba kiralama fiyatları, şöförsüz araç kiralama Kemer, Türkiye Kemer araba kiralama",
            },
            item: {
                title: "{{name}} — Excursion in Kemer",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
    },
    transfers: {
        ru: {
            list: {
                title: `Трансфер из аэропорта Анталии до Кемера ${currentYear} и обратно`,
                description: `Быстрый и комфортный трансфер из аэропорта Анталии в Кемер и обратно. Индивидуальные поездки, новые автомобили, профессиональные водители. Онлайн-бронирование без предоплаты и удобное планирование поездки.`,
                keywords:
                    "трансфер Анталия Кемер, такси Анталия Кемер, трансфер из аэропорта Анталии, индивидуальный трансфер в Кемер, трансфер Кемер, аэропорт Анталии трансфер",
            },
            item: {
                title: "{{name}} — Экскурсии в Кемере",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
        en: {
            list: {
                title: `Transfer from Antalya Airport to Kemer ${currentYear} and back`,
                description: `Fast and comfortable transfer from Antalya Airport to Kemer and back. Private rides, modern cars, professional drivers. Online booking with no prepayment for hassle-free planning.`,
                keywords:
                    "Antalya Kemer transfer, taxi Antalya Kemer, Antalya airport transfer, private transfer to Kemer, Kemer transfer, Antalya airport shuttle",
            },
            item: {
                title: "{{name}} — Excursion in Kemer",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
        tr: {
            list: {
                title: `Antalya Havalimanı'ndan Kemer'e ${currentYear} ve geri transfer`,
                description: `Antalya Havalimanı'ndan Kemer'e hızlı ve konforlu transfer. Özel araçlar, modern filolar, profesyonel şoförler. Ön ödeme olmadan çevrimiçi rezervasyon ile rahat planlama.`,
                keywords:
                    "Antalya Kemer transfer, Antalya havalimanı transfer, Kemer özel transfer, Antalya Kemer taksi, Kemer transfer, Antalya havalimanı servis",
            },
            item: {
                title: "{{name}} — Excursion in Kemer",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
    },
    places: {
        ru: {
            list: {
                title: `Достопримечательности и места Кемера`,
                description: `Откройте для себя достопримечательности Кемера — древние города, природные парки, живописные бухты и горные тропы. Подробные описания, фотографии и советы для комфортного посещения каждого места.`,
                keywords:
                    "достопримечательности Кемера, места Кемера, туризм Кемер, экскурсии, природные парки, исторические места, путешествия в Кемере",
            },
            item: {
                title: "{{name}} — Экскурсии в Кемере",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
        en: {
            list: {
                title: `Kemer Attractions and Places`,
                description: `Discover the top attractions in Kemer — ancient cities, nature parks, scenic bays, and mountain trails. Detailed descriptions, photos, and tips for a comfortable visit to each place.`,
                keywords:
                    "Kemer attractions, Kemer places, Kemer tourism, excursions, nature parks, historical sites, travel in Kemer",
            },
            item: {
                title: "{{name}} — Excursion in Kemer",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
        tr: {
            list: {
                title: `Kemer'deki Turistik Yerler ve Mekanlar`,
                description: `Kemer'deki en popüler turistik yerleri keşfedin — antik şehirler, doğal parklar, manzaralı koylar ve dağ yürüyüşleri. Her yer için detaylı açıklamalar, fotoğraflar ve ziyaret ipuçları.`,
                keywords:
                    "Kemer turistik yerleri, Kemer mekanları, Kemer turizmi, geziler, doğal parklar, tarihi yerler, Kemer'de seyahat",
            },
            item: {
                title: "{{name}} — Excursion in Kemer",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
    },
    blogs: {
        ru: {
            list: {
                title: `Новости и события Кемера`,
                description: `Читайте последние новости и события Кемера — фестивали, праздники, культурные мероприятия, открытия и полезные обновления для туристов и жителей.`,
                keywords:
                    "новости Кемера, события Кемера, фестивали Кемера, мероприятия Кемер, туризм Кемер, афиша Кемер, новости Турции",
            },
            item: {
                title: "{{name}} — Экскурсии в Кемере",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
        en: {
            list: {
                title: `News and Events in Kemer`,
                description: `Stay updated with the latest news and events in Kemer — festivals, holidays, cultural activities, openings, and useful updates for tourists and locals.`,
                keywords:
                    "Kemer news, Kemer events, Kemer festivals, Kemer activities, Kemer tourism, Kemer guide, Turkey news",
            },
            item: {
                title: "{{name}} — Excursion in Kemer",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
        tr: {
            list: {
                title: `Kemer'de Haberler ve Etkinlikler`,
                description: `Kemer'deki en son haberler ve etkinliklerle güncel kalın — festivaller, kutlamalar, kültürel etkinlikler, açılışlar ve turistler ile yerel halk için faydalı bilgiler.`,
                keywords:
                    "Kemer haberleri, Kemer etkinlikleri, Kemer festivalleri, Kemer aktiviteleri, Kemer turizmi, Kemer rehberi, Türkiye haberleri",
            },
            item: {
                title: "{{name}} — Excursion in Kemer",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
    },
    faqs: {
        ru: {
            list: {
                title: `Наиболее часто задаваемые вопросы о Кемере`,
                description: `Вы найдете ответы на часто задаваемые вопросы о Кемере — транспорт, достопримечательности, проживание, экскурсии и многое другое.`,
                keywords:
                    "часто задаваемые вопросы Кемер, FAQ Кемер, информация Кемер, советы путешественникам Кемер, гид по Кемеру",
            },
            item: {
                title: "{{name}} — Экскурсии в Кемере",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
        en: {
            list: {
                title: `Frequently Asked Questions about Kemer`,
                description: `Find answers to frequently asked questions about Kemer — transportation, attractions, accommodation, excursions, and more.`,
                keywords:
                    "Kemer FAQ, Kemer information, travel tips Kemer, Kemer guide",
            },
            item: {
                title: "{{name}} — Excursion in Kemer",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
        tr: {
            list: {
                title: `Kemer Hakkında Sıkça Sorulan Sorular`,
                description: `Kemer hakkında sıkça sorulan soruların cevaplarını bulun — ulaşım, turistik yerler, konaklama, turlar ve daha fazlası.`,
                keywords:
                    "Kemer SSS, Kemer bilgileri, Kemer seyahat ipuçları, Kemer rehberi",
            },
            item: {
                title: "{{name}} — Excursion in Kemer",
                description: "{{shortDescription}}",
                image: "{{mainPhoto}}",
            },
        },
    },
};
