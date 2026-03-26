import { RiJavascriptFill } from 'react-icons/ri';
import { TbBrandNextjs } from 'react-icons/tb';
import { MdDataObject } from 'react-icons/md';
import { BiLogoVisualStudio } from 'react-icons/bi';
import { GiHummingbird } from 'react-icons/gi';
import { LuHeading1, LuNetwork } from 'react-icons/lu';
import { SiCplusplus, SiOpenai, SiThealgorithms, SiSynology } from 'react-icons/si';
import {
  FaBook,
  FaTag,
  FaRegCalendarPlus,
  FaRegCalendarXmark,
  FaHtml5,
  FaMarkdown,
  FaCss3Alt,
  FaNodeJs,
  FaNpm,
  FaReact,
  FaLinux,
  FaDatabase,
  FaGithub,
  FaCode,
  FaScrewdriverWrench,
  FaLaptopCode,
  FaBookOpen,
} from 'react-icons/fa6';

/**
 * @typedef {import('@/types').MarkdownDocumentData} MarkdownDocumentData
 * @typedef {import('@/types').MarkdownDocumentDataMeta} MarkdownDocumentDataMeta
 * @typedef {import('@/types').MarkdownDocumentDataTag} MarkdownDocumentDataTag
 * @typedef {import('@/types').MarkdownDocumentDataTagMeta} MarkdownDocumentDataTagMeta
 */

/**
 * The keys should be declared in {@link MarkdownDocumentData}.
 *
 * @type {{[key: string]: MarkdownDocumentDataMeta}}
 */
export const MARKDOWN_DOCUMENT_DATA_META = Object.freeze({
  title: {
    name: {
      en: 'Title',
      ko: '제목',
    },
    reactIcons: <LuHeading1 />,
  },
  description: {
    name: {
      en: 'Description',
      ko: '설명',
    },
    reactIcons: <FaBook />,
  },
  created: {
    name: {
      en: 'Created Date',
      ko: '생성한 날짜',
    },
    reactIcons: <FaRegCalendarPlus />,
  },
  updated: {
    name: {
      en: 'Updated Date',
      ko: '수정한 날짜',
    },
    reactIcons: <FaRegCalendarXmark />,
  },
  tags: {
    name: {
      en: 'Tags',
      ko: '태그',
    },
    reactIcons: <FaTag />,
  },
});

/**
 * The keys should be declared in {@link MarkdownDocumentDataTag}.
 *
 * @type {{[key: string]: MarkdownDocumentDataTagMeta}}
 */
export const MARKDOWN_DOCUMENT_DATA_TAG_META = Object.freeze({
  html: {
    name: {
      en: 'HTML',
      ko: '하이퍼 텍스트 마크업 언어',
    },
    reactIcons: <FaHtml5 />,
    order: 1,
  },
  markdown: {
    name: {
      en: 'Markdown',
      ko: '마크다운',
    },
    reactIcons: <FaMarkdown />,
    order: 2,
  },
  css: {
    name: {
      en: 'CSS',
      ko: '캐스케이딩 스타일 시트',
    },
    reactIcons: <FaCss3Alt />,
    order: 3,
  },
  cpp: {
    name: {
      en: 'C/C++',
      ko: 'C/C++',
    },
    reactIcons: <SiCplusplus />,
    order: 4,
  },
  javascript: {
    name: {
      en: 'JavaScript',
      ko: '자바스크립트',
    },
    reactIcons: <RiJavascriptFill />,
    order: 5,
  },
  nodejs: {
    name: {
      en: 'Node.js',
      ko: '노드JS',
    },
    reactIcons: <FaNodeJs />,
    order: 6,
  },
  npm: {
    name: {
      en: 'NPM',
      ko: '노드JS 패키지 매니저',
    },
    reactIcons: <FaNpm />,
    order: 7,
  },
  react: {
    name: {
      en: 'React',
      ko: '리액트',
    },
    reactIcons: <FaReact />,
    order: 8,
  },
  nextjs: {
    name: {
      en: 'Next.js',
      ko: '넥스트JS',
    },
    reactIcons: <TbBrandNextjs />,
    order: 9,
  },
  linux: {
    name: {
      en: 'Linux',
      ko: '리눅스',
    },
    reactIcons: <FaLinux />,
    order: 10,
  },
  data: {
    name: {
      en: 'Data Format',
      ko: '데이터 포맷',
    },
    reactIcons: <MdDataObject />,
    order: 11,
  },
  database: {
    name: {
      en: 'Database',
      ko: '데이터베이스',
    },
    reactIcons: <FaDatabase />,
    order: 12,
  },
  git: {
    name: {
      en: 'Git/GitHub',
      ko: '깃/깃허브',
    },
    reactIcons: <FaGithub />,
    order: 13,
  },
  vscode: {
    name: {
      en: 'VScode',
      ko: '비주얼 스튜디오 코드',
    },
    reactIcons: <BiLogoVisualStudio />,
    order: 14,
  },
  openai: {
    name: {
      en: 'OpenAI',
      ko: '오픈AI',
    },
    reactIcons: <SiOpenai />,
    order: 15,
  },
  baekjoon: {
    name: {
      en: 'Baekjoon',
      ko: '백준',
    },
    reactIcons: <FaCode />,
    order: 16,
  },
  programmers: {
    name: {
      en: 'Programmers',
      ko: '프로그래머스',
    },
    reactIcons: <GiHummingbird />,
    order: 17,
  },
  algorithm: {
    name: {
      en: 'Algorithm',
      ko: '알고리즘',
    },
    reactIcons: <SiThealgorithms />,
    order: 18,
  },
  network: {
    name: {
      en: 'Network',
      ko: '네트워크',
    },
    reactIcons: <LuNetwork />,
    order: 19,
  },
  convention: {
    name: {
      en: 'Coding Convention',
      ko: '코딩 컨벤션',
    },
    reactIcons: <FaScrewdriverWrench />,
    order: 20,
  },
  cs: {
    name: {
      en: 'Computer Science',
      ko: '컴퓨터 과학',
    },
    reactIcons: <FaLaptopCode />,
    order: 21,
  },
  synology: {
    name: {
      en: 'Synology Nas',
      ko: '시놀로지 나스',
    },
    reactIcons: <SiSynology />,
    order: 22,
  },
  essay: {
    name: {
      en: 'Essay',
      ko: '에세이',
    },
    reactIcons: <FaBookOpen />,
    order: 23,
  },
});
