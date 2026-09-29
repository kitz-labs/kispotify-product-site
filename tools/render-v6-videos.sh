#!/bin/bash
set -eu

# KI Spotify Agent V6 video render pipeline.
# Runtime engine: FFmpeg (upstream source: https://github.com/FFmpeg/FFmpeg)
# No OpenArt or external video API is used.

ROOT="${1:-$(pwd)/assets/v6}"
FF="${FFMPEG:-ffmpeg}"
FONT="${V6_FONT:-/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf}"
BOLD="${V6_FONT_BOLD:-/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf}"

mkdir -p "$ROOT"

QR_FILTER="drawbox=x=0:y=0:w=1280:h=720:color=0x070809:t=fill,drawbox=x=55:y=55:w=1170:h=610:color=0x0d1116:t=fill,drawbox=x=88:y=88:w=300:h=544:color=0x12171d:t=fill,drawbox=x=430:y=88:w=748:h=544:color=0x0a0d11:t=fill,drawtext=fontfile=$BOLD:text='GUEST WISH':x=105:y=125:fontsize=18:fontcolor=0xff5f7e,drawtext=fontfile=$BOLD:text='SCAN':x=135:y=210:fontsize=58:fontcolor=white:enable='between(t,0,2.7)',drawbox=x=118:y='285+mod(t*95,220)':w=230:h=3:color=0xff1744:t=fill:enable='between(t,0,2.7)',drawtext=fontfile=$FONT:text='QR CODE':x=160:y=530:fontsize=19:fontcolor=0xaeb6bf:enable='between(t,0,2.7)',drawtext=fontfile=$BOLD:text='Was moechtest du hoeren?':x=475:y=135:fontsize=34:fontcolor=white:enable='between(t,2.4,5.4)',drawtext=fontfile=$FONT:text='Stimmung':x=475:y=205:fontsize=18:fontcolor=0x7f8994:enable='between(t,2.4,5.4)',drawbox=x=475:y=238:w=145:h=52:color=0x20262d:t=fill:enable='between(t,2.4,5.4)',drawtext=fontfile=$BOLD:text='CHILL':x=514:y=254:fontsize=18:fontcolor=0x8ee9ae:enable='between(t,2.4,5.4)',drawtext=fontfile=$FONT:text='Musikwunsch':x=475:y=325:fontsize=18:fontcolor=0x7f8994:enable='between(t,2.4,5.4)',drawbox=x=475:y=360:w=620:h=72:color=0x151a20:t=fill:enable='between(t,2.4,5.4)',drawtext=fontfile=$BOLD:text='Beautiful Things':x=500:y=382:fontsize=24:fontcolor=white:enable='between(t,2.4,5.4)',drawbox=x=475:y=475:w=620:h=68:color=0xff1744:t=fill:enable='between(t,2.4,5.4)',drawtext=fontfile=$BOLD:text='WUNSCH SENDEN':x=655:y=496:fontsize=22:fontcolor=white:enable='between(t,2.4,5.4)',drawtext=fontfile=$BOLD:text='WUNSCH EMPFANGEN':x=505:y=205:fontsize=38:fontcolor=0x8ee9ae:enable='between(t,5.1,8)',drawtext=fontfile=$FONT:text='Passt zum aktuellen Musikprofil':x=505:y=275:fontsize=23:fontcolor=0xb2bac4:enable='between(t,5.1,8)',drawbox=x=505:y=340:w=520:h=74:color=0x142019:t=fill:enable='between(t,5.1,8)',drawtext=fontfile=$BOLD:text='LIVE  Guest Wish accepted':x=545:y=366:fontsize=22:fontcolor=0x8ee9ae:enable='between(t,5.1,8)',fade=t=in:st=0:d=0.35,fade=t=out:st=7.55:d=0.45"

"$FF" -y -f lavfi -i "color=c=0x070809:s=1280x720:r=30:d=8" -vf "$QR_FILTER" -an -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p -crf 22 -preset medium -movflags +faststart "$ROOT/qr-guest-wishes-v6.mp4"

HERO_FILTER="drawbox=x=0:y=0:w=1280:h=720:color=0x070809:t=fill,drawtext=fontfile=$BOLD:text='KI SPOTIFY AGENT':x=70:y=60:fontsize=25:fontcolor=white,drawtext=fontfile=$BOLD:text='Musik die deinen Betrieb versteht':x=70:y=150:fontsize=46:fontcolor=white:enable='between(t,0,3.3)',drawtext=fontfile=$FONT:text='Playlists  Tagesphasen  Events  Gaeste-Wuensche':x=72:y=220:fontsize=22:fontcolor=0x9ca5af:enable='between(t,0,3.3)',drawbox=x=720:y=90:w=490:h=520:color=0x0d1217:t=fill,drawtext=fontfile=$BOLD:text='LIVE MUSIC':x=760:y=125:fontsize=18:fontcolor=0x8ee9ae,drawtext=fontfile=$BOLD:text='Sunset Dinner Flow':x=760:y=185:fontsize=30:fontcolor=white,drawtext=fontfile=$BOLD:text='DINNER MODE':x=70:y=150:fontsize=52:fontcolor=0xff5f7e:enable='between(t,3.1,6.4)',drawtext=fontfile=$BOLD:text='NEUER GAESTE-WUNSCH':x=70:y=150:fontsize=44:fontcolor=0x8ee9ae:enable='between(t,6.2,10)',fade=t=in:st=0:d=0.4,fade=t=out:st=9.55:d=0.45"

"$FF" -y -f lavfi -i "color=c=0x070809:s=1280x720:r=30:d=10" -vf "$HERO_FILTER" -an -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p -crf 22 -preset medium -movflags +faststart "$ROOT/product-film-v6.mp4"

DAY_FILTER="drawbox=x=0:y=0:w=1280:h=720:color=0x070809:t=fill,drawtext=fontfile=$BOLD:text='DEIN MUSIKTAG':x=70:y=65:fontsize=28:fontcolor=white,drawtext=fontfile=$FONT:text='Musik wechselt automatisch mit deinem Betrieb':x=70:y=108:fontsize=19:fontcolor=0x8b949f,drawbox=x=130:y=250:w=1020:h=4:color=0x2a3037:t=fill,drawtext=fontfile=$BOLD:text='08 00':x=105:y=300:fontsize=19:fontcolor=0x9aa3ad,drawtext=fontfile=$FONT:text='Breakfast':x=88:y=335:fontsize=17:fontcolor=white,drawtext=fontfile=$BOLD:text='12 00':x=350:y=300:fontsize=19:fontcolor=0x9aa3ad,drawtext=fontfile=$FONT:text='Lunch':x=365:y=335:fontsize=17:fontcolor=white,drawtext=fontfile=$BOLD:text='17 00':x=595:y=300:fontsize=19:fontcolor=0xff6b88,drawtext=fontfile=$FONT:text='Sunset':x=610:y=335:fontsize=17:fontcolor=white,drawtext=fontfile=$BOLD:text='20 00':x=840:y=300:fontsize=19:fontcolor=0x9aa3ad,drawtext=fontfile=$FONT:text='Dinner':x=850:y=335:fontsize=17:fontcolor=white,drawtext=fontfile=$BOLD:text='23 00':x=1080:y=300:fontsize=19:fontcolor=0x9aa3ad,drawtext=fontfile=$FONT:text='Late Night':x=1060:y=335:fontsize=17:fontcolor=white,drawbox=x='130+mod(t*102,1020)':y=239:w=24:h=24:color=0xff1744:t=fill,drawtext=fontfile=$BOLD:text='EVENT MODE':x=470:y=465:fontsize=42:fontcolor=0xff5f7e:enable='between(t,5.5,9)',fade=t=in:st=0:d=0.4,fade=t=out:st=9.55:d=0.45"

"$FF" -y -f lavfi -i "color=c=0x070809:s=1280x720:r=30:d=10" -vf "$DAY_FILTER" -an -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p -crf 22 -preset medium -movflags +faststart "$ROOT/daypart-timeline-v6.mp4"

"$FF" -y -ss 3.7 -i "$ROOT/qr-guest-wishes-v6.mp4" -frames:v 1 -c:v libwebp -quality 88 "$ROOT/qr-guest-hero.webp"
"$FF" -y -ss 4.2 -i "$ROOT/product-film-v6.mp4" -frames:v 1 -c:v libwebp -quality 88 "$ROOT/hospitality-rooftop.webp"

echo "Rendered V6 media and posters to $ROOT"
