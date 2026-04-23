---
title: "Missa aldrig tuben!"
pubDate: "Apr 23 2026"
# featured: True
---

![Foo Depart](/images/foo-depart.webp)

Byggde en egen tidtabell för att aldrig igen missa tunnelbanan igen på vägen hem från studentpuben [Foo Bar](https://maps.app.goo.gl/TgiGXqVqhSn2ttnFA) vid [Studentkaren DISK](https://disk.su.se). Gäster kan nu se när nästa bussar, tunnelbanor och pendeltåg går och får även en stor röd varning när sista tuben är på ingång.

Angångar hämtas med hälp av [Trafiklab](https://trafiklab.se/)'s [ResRobot v2.1](https://www.trafiklab.se/api/our-apis/resrobot-v21/timetables/). Appen är deployed som ett [nextjs](https://nextjs.org/) projekt på [Vercel](https://vercel.com) och själva displayen är en Raspberrypi 2 som kör chromium i --kiosk läge.

Kolla in repot [här](https://github.com/fetsare/foo-depart) för att skaffe en egen tidtabell.