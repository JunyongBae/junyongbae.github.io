# NAIRO Lab 홈페이지 관리 안내

사이트 루트의 `*.html`과 `sitemap.xml`은 **빌드 결과물**입니다. 직접 고치지 말고 아래 데이터·템플릿을 고친 뒤 빌드하세요.
(`_src` 폴더는 밑줄로 시작해서 GitHub Pages가 사이트에 올리지 않습니다.)

## 무엇을 어디서 고치나

| 바꾸고 싶은 것 | 파일 |
|---|---|
| 연구실 이름·소속·이메일·사무실·모집 안내·상단 메뉴 | `data/site.yml` |
| 페이지 켜기/끄기, 페이지 제목·검색엔진 설명 | `data/pages.yml` (`enabled: false` → 파일·메뉴·sitemap에서 자동 제거) |
| Home 환영 문구·핵심 문장 | `data/home.yml` |
| News | `data/news.yml` (시간순, 새 소식은 맨 아래) |
| 교수 소개·경력·학력·수상 | `data/professor.yml` |
| 구성원 | `data/members.yml` |
| 연구 분야 | `data/research.yml` |
| 과제 | `data/projects.yml` |
| 논문·학회 발표 | `data/publications.yml` (번호·개수는 자동) |
| 공통 틀(head·메뉴·푸터) | `templates/base.html` |
| 페이지 배치 | `templates/<페이지>.html`, 반복 조각은 `templates/_macros.html` |
| 디자인 | `../assets/style.css`, 동작은 `../assets/site.js` |

## 빌드와 미리보기

```bash
pip install pyyaml jinja2        # 처음 한 번
python _src/build.py             # 사이트 폴더에서 실행
python -m http.server 8000       # 미리보기 → http://127.0.0.1:8000/
```

빌드가 알아서 하는 일: 논문 번호 [J…]/[C…]와 개수, CSS·JS 버전 번호(캐시 갱신),
저자 목록의 PI 이름 굵게, 메뉴의 현재 페이지 표시, 꺼둔 페이지 정리, 바뀐 페이지만 sitemap 날짜 갱신.

## 쓰는 법 메모

- YAML 문자열에 `:`나 `#`가 들어가면 큰따옴표로 감싸세요.
- 긴 문장은 `>-` 다음 줄에 들여써서 여러 줄로 써도 한 문단으로 합쳐집니다.
- HTML을 쓸 수 있는 칸(news의 text, research의 intro/desc, professor의 bio/detail/honors 등)에서는
  `&`를 `&amp;`로 쓰고, 줄바꿈 없이 붙일 말은 `&nbsp;`로 잇습니다.
- 새 논문 그림은 원본을 `figures/`에 넣고 `figures/thumbs/`에 폭 800px WebP를 만들어 연결합니다.
