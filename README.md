# 👁️ News-eye
<div align="start">프로젝트 소개: AI 기반 뉴스 키워드 분석 플랫폼
뉴스 트렌드를 한눈에 파악하는 인텔리전트 뉴스 분석 시스템 </div><br /><br />

<div align="center">
프로젝트 링크 • 데모 보기 • 버그 제보 <br />
</div>
<br />
<br />

## 📖 목차 <br />
	•	프로젝트 소개<br />
	•	주요 기능<br />
	•	기술 스택<br />
	•	성과 및 최적화<br />
	•	실행 방법<br />
	•	프로젝트 구조<br />
<br />
<br />

## ✨ 핵심 가치
	•	🤖 AI 기반 자동 분석: OpenAI API를 활용한 뉴스 키워드 자동 추출 및 요약
	•	📊 데이터 시각화: Chart.js를 통한 직관적인 트렌드 분석
	•	⚡ 실시간 크롤링: cheerio를 활용한 뉴스 본문 실시간 추출
	•	💰 비용 최적화: 토큰 관리로 AI API 비용 효율화
<br />
<br />

## 🚀 주요 기능
### 1️⃣ 뉴스 본문 추출 시스템
<table>
<tr>
<td width="50%">🔍 스마트 크롤링
	•	Next.js API Handler를 통한 서버사이드 처리
	•	cheerio 라이브러리 기반 HTML 파싱
	•	CORS 문제 완벽 해결
</td>
<td width="50%">📝 텍스트 정제
	•	정규표현식 기반 한글 텍스트 필터링
	•	자동 줄바꿈 및 문장 종결 처리
	•	불필요한 요소 제거
</td>
</tr>
</table>
<br />

### 주요 구현:
```tsx
// Next.js API Handler를 통한 CORS 우회
export async function POST(req: NextApiRequest) {
  const { url } = await req.json();
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  
  // 한글 텍스트만 추출
  let articleBody = '';
  $('p').each((i, element) => {
    const text = $(element).text();
    const koreanText = text.replace(
      /(?!\d+\·\d+)[^가-힣0-9a-zA-Z\s()$%']+/g, 
      ''
    );
    articleBody += ' ' + koreanText;
  });
  
  return NextResponse.json({ content: articleBody });
}
```
<br />

### 2️⃣ AI 기반 키워드 분석 시스템
<div align="center">
테이블 
</div>토큰 관리 전략:
```
입력 토큰: 10,000 ~ 15,000 (뉴스 기사 개수에 따라 변동)
출력 토큰: 100개 제한
예산: $10로 충분한 테스트 및 운영
```
AI 프롬프트 최적화:
```tsx
{
  role: 'user',
  content: '1~3위 키워드를 다음 형식으로 제공: ' +
           '1. 언급된 단어 (5회) - 관련 내용 요약. ' +
           '줄바꿈 없이 출력해줘'
}
```
<br />

### 3️⃣ 정규표현식 엔진
복합 키워드 자동 처리:
	•	“양자 컴퓨터” → 띄어쓰기 포함 키워드 자동 결합
	•	“인공지능(AI)” → 괄호 포함 키워드 정규화
	•	숫자와 문자열 자동 분류 및 정제
```tsx
// AI 응답 파싱 예시
const filtering = answers.map((answer: string) => {
  return answer
    .split(' ')
    .map(word => word
      .replace(/\*/g, '')
      .replace(/[.]/g, '')
      .replace(/회/g,
	  '')
    )
    .filter(word => 
      /^[0-9가-힣a-zA-Z]+(?:\([a-zA-Z가-힣]+\))?$/.test(word)
    );
});
```
<br />
<br />

## 📊 성과 및 최적화
### 🎯 정량적 성과
<div align="center">
</div>⚡ 주요 개선사항
1. FSD 아키텍처 도입
Before: 각 카테고리마다 개별 페이지 (중복 코드 730KB)
After:  공통 컴포넌트 재사용 (149KB)
Result: 중복 코드 80% 제거
<br />
2. 라우팅 최적화
Before: 16개 개별 페이지
After:  11개 동적 라우팅 페이지
Result: 페이지 수 21.4% 감소, 유지보수성 향상
<br />
3. AI 비용 최적화
입력 토큰: 10,000~15,000개
출력 토큰: 100개 제한
결과: $10 예산으로 충분한 운영
<br />
<br />

## 🚀 실행 방법
Prerequisites
수정 예정
```bash
# 1. 저장소 클론
git clone https://github.com/tjrmswo/News-eye.git
cd News-eye

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env.local

# 필수 환경 변수:
# NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
# NEXT_PUBLIC_NAVER_CLIENT_ID=your_naver_client_id
# NEXT_PUBLIC_NAVER_CLIENT_SECRET=your_naver_client_secret
# OPENAI_API_KEY=your_openai_api_key

# 4. 개발 서버 실행
npm run dev
```
<br /><br />

## 📁 프로젝트 구조

```
News-eye/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── news/
│   │   │   │   ├── content/        # 본문 추출 API
│   │   │   │   └── search/         # 뉴스 검색 API
│   │   │   └── openai/             # OpenAI 분석 API
│   │   ├── search/                 # 검색 페이지
│   │   ├── analysis/               # 분석 페이지
│   │   └── [category]/             # 동적 카테고리 페이지
│   ├── features/
│   │   ├── news/                   # 뉴스 기능
│   │   ├── analysis/               # 분석 기능
│   │   └── search/                 # 검색 기능
│   ├── shared/
│   │   ├── api/                    # API 클라이언트
│   │   ├── hooks/                  # 커스텀 훅
│   │   ├── ui/                     # 공통 UI 컴포넌트
│   │   └── constants/              # 상수 (도메인 등)
│   └── contexts/                   # Context API
│       └── SearchContext.tsx
├── public/
└── package.json
```





