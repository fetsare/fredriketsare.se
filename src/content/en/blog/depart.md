---
title: "Foo Depart"
pubDate: "Apr 14 2026"
draft: True
---

#### Foo Depart

![Foo Depart image](/images/)

I built a custom timetable so I would never miss the subway on my way home from the student pub [Foo Bar](https://maps.app.goo.gl/TgiGXqVqhSn2ttnFA) at [Student Union DISK](https://disk.su.se). Guests can now see when the next buses, subways, and trains leave, and they also get a big red warning when the last train is about to depart.

Departures are fetched using [Trafiklab](https://trafiklab.se/)'s [ResRobot v2.1](https://www.trafiklab.se/api/our-apis/resrobot-v21/timetables/). The app is deployed as a [Next.js](https://nextjs.org/) project on [Vercel](https://vercel.com), and the display itself is a Raspberry Pi 2 running Chromium in `--kiosk` mode.

Check out the repo [here](https://github.com/fetsare/foo-depart) to set up your own timetable.
