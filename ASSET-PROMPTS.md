# 배경 3차 시안

내장 image_gen 도구 사용. 게임은 밝은 낮으로 유지. 두 이미지 모두 위아래 경계는 지면으로 구성하고 건물은 좌우로만 잘리도록 수정했습니다. CSS repeat-y로 같은 방향으로 반복합니다.

- 게임: assets/fantasy-village-v3.png
- 취미: assets/artisan-village-v3.png

## 게임 최종 프롬프트

Use case: precise-object-edit. Edit target: supplied pixel RPG map. Rebuild this as a genuinely vertically seamless repeating square background tile. bright sunny cozy medieval fantasy village, grass center. Left varied homes and castle entrance facing inward, right varied potion shop, fruit cart, inn, restaurant and general store. Keep daylight colors. Preserve rich pixel art, asymmetrical natural varied side clusters and spacious middle, doors facing middle, cropped buildings ONLY at LEFT and RIGHT edges. CRITICAL FIX: NO BUILDING, ROOF, FURNITURE, TREE, SHADOW OR PROP may intersect TOP or BOTTOM edges. Put all side architecture between y=12% and y=88%. Top 10% and bottom 10% across ENTIRE WIDTH must be only continuous identical ground texture, with matching color, lighting and texture density; no border, no horizontal line or shadow. Uppermost and lowermost pixel rows should match so copying this exact image directly beneath itself looks continuous. No horizon, no perspective vanishing, no vignette, no sky. Vertical wraparound game tile. Preserve natural uneven placement, don't make repeated identical rows. No text or UI.

## 취미 최종 프롬프트

Use case: precise-object-edit. Edit target: supplied pixel RPG map. Rebuild this as a genuinely vertically seamless repeating square background tile. warm artisan village, mossy cobblestone center. Left forge fire and hardware stalls and anvils, right varied feast tables with ale roast meats drinks and lute and tavern counter. Preserve rich pixel art, asymmetrical natural varied side clusters and spacious middle, doors facing middle, cropped buildings ONLY at LEFT and RIGHT edges. CRITICAL FIX: NO BUILDING, ROOF, FURNITURE, TREE, SHADOW OR PROP may intersect TOP or BOTTOM edges. Put all side architecture between y=12% and y=88%. Top 10% and bottom 10% across ENTIRE WIDTH must be only continuous identical ground texture, with matching color, lighting and texture density; no border, no horizontal line or shadow. Uppermost and lowermost pixel rows should match so copying this exact image directly beneath itself looks continuous. No horizon, no perspective vanishing, no vignette, no sky. Vertical wraparound game tile. Preserve natural uneven placement, don't make repeated identical rows. No text or UI.

