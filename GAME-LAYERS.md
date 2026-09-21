# 게임 패럴랙스 레이어

내장 image_gen으로 제작. 사용 파일은 네 장입니다.

- assets/game-distant.png: 1번 원본에서 분리한 공통 원경. 생성 후 하늘 상단 색상 오류를 도구로 수정.
- assets/game-village-1.png: 투명 마을 1
- assets/game-village-2.png: 투명 마을 2
- assets/game-village-3.png: 투명 마을 3

각 2172×724. PNG alpha 확인. 원경은 전경의 1/3 속도. 세 마을을 반복하고 전체 주기로 스크롤 좌표를 재배치합니다. 이미지 높이 전체를 100svh에 맞추며 가로 비율은 3:1로 유지합니다. 바닥은 1번 이미지 하단 9%를 공통 레이어로 재사용해 패널별 두께 차이를 가립니다. 방향 버튼은 제거했습니다. PC 마우스 휠은 가로 이동으로 변환하며 하단 스크롤바·방향키·가로 트랙패드·모바일 스와이프를 지원합니다. Ctrl/Meta 휠 확대는 유지합니다. 스크롤바를 드래그하는 동안에는 순환 위치 재배치를 미룹니다. 게시물은 아직 연결하지 않았습니다.

검증: JS 구문 검사, 실제 브라우저 1→2 및 2→3 경계, 전체 주기 순환, 390×844 모바일 높이/가로 넘침, 교육 배경과 슬롯 유지. 원경 자체의 수평 반복 경계는 풍경 변화가 드러날 수 있으며, 전경 구조물 잘림과는 별개입니다.

## 생성 프롬프트

### back

기준 이미지: games-panorama-v4-expressive.png

Extract and reconstruct ONLY DISTANT BACKGROUND from input 1. Keep sky clouds distant mountains castle distant town and aqueduct and forest. REMOVE ALL foreground village buildings, large foreground trees, people, stalls, fountain, flowers, street and bottom soil strip. Fill hidden areas naturally with distant forest/landscape to bottom. One opaque 3:1 pixel panorama same palette and style and same placement of distant castle. This will be slow-moving background behind transparent foreground village. No foreground objects or text.

### front1

기준 이미지: games-panorama-v4-expressive.png

Extract ONLY foreground village, all cute expressive SD characters, props, foreground trees and continuous thin grass/soil platform from supplied image. Delete sky, clouds, distant hills, distant castle/town, lake and forest COMPLETELY to real PNG alpha transparency. Keep same 3:1 canvas, foreground positions and original happy rounded faces and proportions. Ground top EXACTLY y94%, thin soil extends to bottom y100%. CRITICAL SEAM FIX: remove any clipped building fragments, signs, banners, fencing, trees, people at BOTH left and right edges; reposition whole edge structures inward if necessary. Leftmost and rightmost 6% of canvas above ground must be FULLY TRANSPARENT. No object may intersect side boundaries. All foreground trees/roof/people whole and intact inside central 88%. At edges only flat grass top at y94% and brown gray stone soil underneath. Same straight level and color at both ends; ground tile at the ends simple and matching so panels can butt together. NO opaque sky or checkerboard painted in. Return genuine RGBA transparent background PNG, no shadows in transparent empty area. Keep upper half fully transparent except actual tall foreground tree/roof. This is foreground panel 1 of a parallax side scrolling game.

### front2

기준 이미지: games-panorama-panel-2.png

Extract ONLY foreground village, all cute expressive SD characters, props, foreground trees and continuous thin grass/soil platform from supplied image. Delete sky, clouds, distant hills, distant castle/town, lake and forest COMPLETELY to real PNG alpha transparency. Keep same 3:1 canvas, foreground positions and original happy rounded faces and proportions. Ground top EXACTLY y94%, thin soil extends to bottom y100%. CRITICAL SEAM FIX: remove any clipped building fragments, signs, banners, fencing, trees, people at BOTH left and right edges; reposition whole edge structures inward if necessary. Leftmost and rightmost 6% of canvas above ground must be FULLY TRANSPARENT. No object may intersect side boundaries. All foreground trees/roof/people whole and intact inside central 88%. At edges only flat grass top at y94% and brown gray stone soil underneath. Same straight level and color at both ends; ground tile at the ends simple and matching so panels can butt together. NO opaque sky or checkerboard painted in. Return genuine RGBA transparent background PNG, no shadows in transparent empty area. Keep upper half fully transparent except actual tall foreground tree/roof. This is foreground panel 2 of a parallax side scrolling game.

### front3

기준 이미지: games-panorama-panel-3.png

Extract ONLY foreground village, all cute expressive SD characters, props, foreground trees and continuous thin grass/soil platform from supplied image. Delete sky, clouds, distant hills, distant castle/town, lake and forest COMPLETELY to real PNG alpha transparency. Keep same 3:1 canvas, foreground positions and original happy rounded faces and proportions. Ground top EXACTLY y94%, thin soil extends to bottom y100%. CRITICAL SEAM FIX: remove any clipped building fragments, signs, banners, fencing, trees, people at BOTH left and right edges; reposition whole edge structures inward if necessary. Leftmost and rightmost 6% of canvas above ground must be FULLY TRANSPARENT. No object may intersect side boundaries. All foreground trees/roof/people whole and intact inside central 88%. At edges only flat grass top at y94% and brown gray stone soil underneath. Same straight level and color at both ends; ground tile at the ends simple and matching so panels can butt together. NO opaque sky or checkerboard painted in. Return genuine RGBA transparent background PNG, no shadows in transparent empty area. Keep upper half fully transparent except actual tall foreground tree/roof. This is foreground panel 3 of a parallax side scrolling game.

