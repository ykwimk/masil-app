import type { ImageRequireSource } from 'react-native';

export interface ArticlePreview {
  id: string;
  title: string;
  description: string;
  editorName: string;
  image?: {
    source: ImageRequireSource;
    alt: string;
  };
};

// 시안용 예시 글이다. 화면에 표시할 때 예시 콘텐츠임을 안내한다.
// 배열의 첫 글을 홈의 대표 글로 사용하며, 순서나 제목을 바꿔도 ID는 유지한다.
export const dummyArticles: ArticlePreview[] = [
  {
    id: 'sample-001',
    title: '잠깐 멈췄을 때, 비로소 보이는 것들',
    description:
      '바쁘게 일하던 사람이 자기만의 속도를 찾아가는 이야기. 쉼도 우리 일의 일부니까요.',
    editorName: '마실 에디터',
    image: {
      source: require('@/assets/images/articles/slow-down.png'),
      alt: '커피를 들고 잠시 산책하는 사람의 일러스트',
    },
  },
  {
    id: 'sample-002',
    title: '일의 기준을, 다시 나에게 맞추는 연습',
    description:
      '남의 정답을 따라가던 시간을 지나, 나에게 맞는 일을 묻기 시작했어요.',
    editorName: '마실 에디터',
  },
  {
    id: 'sample-003',
    title: '퇴근길에 발견한 작은 취향들',
    description:
      '늘 걷던 길에서 한 블록 벗어났을 뿐인데, 하루의 표정이 달라졌어요.',
    editorName: '마실 에디터',
  },
];
